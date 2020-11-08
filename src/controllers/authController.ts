import { API_ENDPOINT } from '@env';
import SInfo from 'react-native-sensitive-info';
import { useEffect, useState } from 'react';

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
 * Auth state to use in React components
 */
interface AuthState {
  /**
   * Current access token for API
   */
  accessToken: string | null;
}

type SubscribeHandler = (authState: AuthState) => void;

/**
 * Controller for auth actions
 */
class AuthController {
  /**
   * User access token
   */
  public accessToken: string | null = null;

  private static sensitiveInfoOptions = {
    sharedPreferencesName: 'questSharedPrefs',
    keychainService: 'questKeychain',
  }

  /**
   * LocalStorage key for storing access token
   */
  private static ACCESS_TOKEN_KEY = 'access-token';

  private listeners: SubscribeHandler[] = []

  /**
   * Auth controller initializer
   * Restores last authed user
   */
  public async init(): Promise<void> {
    this.accessToken = await SInfo.getItem(AuthController.ACCESS_TOKEN_KEY, AuthController.sensitiveInfoOptions);
    this.notifySubscribers();
  }

  /**
   * Process user login
   *
   * @param username - username to login with
   * @param password - user password
   */
  public async login(username: string, password: string): Promise<void> {
    const response = await fetch(
      `${API_ENDPOINT}login?username=${username}&password=${password}`
    );

    await this.setTokens(await response.json());
  }

  /**
   * Returns true if user is authenticated
   */
  public isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  /**
   * Performs auth with Google
   *
   * @param code - code for token exchanging
   */
  public async authWithGoogle(code: string): Promise<void> {
    const response = await fetch(`${API_ENDPOINT}/oauth/google/callback?code=${code}`, {
      method: 'POST',
    });

    await this.setTokens(await response.json());
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
   *
   * @private
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
   * Stores tokens in secure storage
   *
   * @param tokensData - tokens data to store
   */
  private async setTokens(tokensData: AuthServerResponse): Promise<void> {
    this.accessToken = tokensData.data.accessToken;
    await SInfo.setItem(AuthController.ACCESS_TOKEN_KEY, this.accessToken, AuthController.sensitiveInfoOptions);
    this.notifySubscribers();
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
