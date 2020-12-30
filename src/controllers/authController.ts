import { API_ENDPOINT } from '@env';
import SInfo from 'react-native-sensitive-info';
import { useEffect, useState } from 'react';
import VKLogin from 'react-native-vkontakte-login';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
import hasOwnProperty from '../utils/hasOwnProperty';

/**
 * Represents response of the auth server in case of success
 */
interface AuthServerResponse {
  data: {
    /**
     * Access login to interact with API
     */
    accessToken: string;
  };
}

/**
 * Server error representation
 */
interface AuthServerError {
  /**
   * Error extensions
   */
  extensions: {
    /**
     * Error code
     */
    code: string;
  };
}

/**
 * Auth state to use in React components
 */
interface AuthState {
  /**
   * Current access token for API
   */
  accessToken: string | null;
}

/**
 * Type for on AuthState change event handler
 */
type SubscribeHandler = (authState: AuthState) => void;

/**
 * Controller for auth actions
 */
class AuthController {
  /**
   * User access token
   */
  public accessToken: string | null = null;

  /**
   * Settings for react-native-sensitive-info
   */
  private static sensitiveInfoOptions = {
    sharedPreferencesName: 'questSharedPrefs',
    keychainService: 'questKeychain',
  };

  /**
   * LocalStorage key for storing access token
   */
  private static ACCESS_TOKEN_KEY = 'access-token';

  /**
   * Array of listeners on AuthState change event
   */
  private listeners: SubscribeHandler[] = [];

  /**
   * Auth controller initializer
   * Restores last authed user
   */
  public async init(): Promise<void> {
    this.accessToken = await SInfo.getItem(AuthController.ACCESS_TOKEN_KEY, AuthController.sensitiveInfoOptions);
    this.notifySubscribers();
  }

  /**
   * Performs authorization via VKontakte
   */
  public async authWithVK(): Promise<void> {
    const data = await VKLogin.login(['friends', 'photos', 'email', 'offline']);

    const userDataResponse = await (await fetch(`https://api.vk.com/method/users.get?v=5.126&fields=photo_200,has_photo&access_token=${data.access_token}`)).json();

    const userData = userDataResponse.response.pop();
    const queryString = this.objToQueryString({
      accessToken: data.access_token,
      userId: data.user_id,
      firstName: userData.first_name,
      lastName: userData.last_name,
      photo: userData.has_photo ? userData.photo_200 : undefined,
    });

    const response = await fetch(`${API_ENDPOINT}/oauth/vk/callback?${queryString}`, {
      method: 'POST',
    });

    const requestData = await response.json();

    this.checkApiErrors(requestData);

    await this.setTokens(requestData);
  }

  /**
   * Performs authorization via Facebook
   */
  public async authWithFacebook(): Promise<void> {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email', 'user_photos']);

    if (result.isCancelled) {
      return;
    }

    const data = await AccessToken.getCurrentAccessToken();

    const response = await fetch(`${API_ENDPOINT}/oauth/facebook/callback?token=${data?.accessToken}`, {
      method: 'POST',
    });

    const requestData = await response.json();

    this.checkApiErrors(requestData);

    await this.setTokens(requestData);
  }

  /**
   * Returns true if user is authenticated
   */
  public isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  /**
   * Performs auth with Google
   */
  public async authWithGoogle(): Promise<void> {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    if (userInfo.serverAuthCode) {
      const response = await fetch(`${API_ENDPOINT}/oauth/google/callback?code=${userInfo.serverAuthCode}`, {
        method: 'POST',
      });

      await this.setTokens(await response.json());
    } else {
      throw new Error('MISSING_AUTH_CODE');
    }
  }

  /**
   * Performs user registration via email and password
   *
   * @param email - email for registration
   * @param password - password for registration
   */
  public async registerWithEmailAndPassword(email: string, password: string): Promise<void> {
    const response = await fetch(`${API_ENDPOINT}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.status !== 201) {
      this.checkApiErrors(await response.json());
    }
  }

  /**
   * Performs user login via email and password
   *
   * @param email - user's email
   * @param password - user's password
   */
  public async loginWithEmailAndPassword(email: string, password: string): Promise<void> {
    const response = await fetch(`${API_ENDPOINT}/login?${this.objToQueryString({
      email,
      password,
    })}`);

    const data = await response.json();

    this.checkApiErrors(data);

    await this.setTokens(data);
  }

  /**
   * Logouts user
   */
  public async logout(): Promise<void> {
    this.accessToken = null;
    await SInfo.deleteItem(AuthController.ACCESS_TOKEN_KEY, AuthController.sensitiveInfoOptions);
    this.notifySubscribers();
  }

  /**
   * Add subscriber for auth state changes
   *
   * @param handler - handler on change event
   */
  public subscribe(handler: SubscribeHandler): void {
    this.listeners.push(handler);
  }

  /**
   * Remove subscriber for auth state changes
   *
   * @param handler - handler on change event
   */
  public unsubscribe(handler: SubscribeHandler): void {
    this.listeners = this.listeners.filter((l) => l !== handler);
  }

  /**
   * Call subscribers handlers with new AuthState
   */
  private notifySubscribers(): void {
    const newState = {
      accessToken: this.accessToken,
    };

    this.listeners.forEach((listener) => {
      listener(newState);
    });
  }

  /**
   * Check if there is any errors form API
   *
   * @param apiResult - result to check
   */
  private checkApiErrors(apiResult: unknown): void {
    if (typeof apiResult === 'object' && apiResult !== null && hasOwnProperty(apiResult, 'errors')) {
      const errors = apiResult.errors as AuthServerError[];

      throw new Error(errors.pop()?.extensions.code);
    }
  }

  /**
   * Stores tokens in secure storage
   *
   * @param tokensData - tokens data to store
   */
  private async setTokens(tokensData: AuthServerResponse): Promise<void> {
    this.accessToken = tokensData.data.accessToken;
    await SInfo.setItem(AuthController.ACCESS_TOKEN_KEY, this.accessToken, AuthController.sensitiveInfoOptions);
    this.notifySubscribers();
  }

  /**
   * Converts object to query string
   *
   * @param obj - object to convert
   */
  private objToQueryString(obj: Record<string, string | number | boolean | null>): string {
    return Object.entries(obj)
      .reduce((acc, [key, value]) => {
        acc.push(encodeURIComponent(key) + '=' + encodeURIComponent(value || ''));

        return acc;
      }, [] as string[])
      .join('&');
  }
}

const authController = new AuthController();

/**
 * Hook for accessing auth state from React components
 */
export function useAuthState(): AuthState {
  const [authState, setAuthState] = useState<AuthState>({ accessToken: authController.accessToken });

  useEffect(() => {
    const handler: SubscribeHandler = (newVal) => {
      setAuthState(newVal);
    };

    authController.subscribe(handler);

    return (): void => {
      authController.unsubscribe(handler);
    };
  }, []);

  return authState;
}

export default authController;
