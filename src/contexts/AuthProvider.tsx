import React, { Dispatch, PropsWithChildren, useMemo } from 'react';
import { API_ENDPOINT, VK_APP_ID } from '@env';
import checkApiErrors from '../utils/checkApiErrors';
import VKLogin from 'react-native-vkontakte-login';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
import SplashScreen from 'react-native-splash-screen';
import storageController from '../controllers/storageController';
import objToQueryString from '../utils/objToQueryString';
import { appleAuth } from '@invertase/react-native-apple-authentication';

/**
 * Application auth state
 */
export interface TokenPair {
  /**
   * User access token
   */
  accessToken: string | null;

  /**
   * User refresh token
   */
  refreshToken: string | null;
}

/**
 * State actions
 */
type AuthStateActionTypes =
  | { type: 'SET_TOKENS', payload: TokenPair }
  | { type: 'LOGOUT' };

/**
 * Reducer to create new state
 *
 * @param state - previous state
 * @param action - action to perform
 */
const authReducer = (state: TokenPair, action: AuthStateActionTypes): TokenPair => {
  switch (action.type) {
    case 'SET_TOKENS':
      return action.payload;
    case 'LOGOUT':
      return {
        accessToken: null,
        refreshToken: null,
      };
  }
};

/**
 * Controller for auth actions
 */
class AuthContextActions {
  /**
   * Application auth state
   */
  private readonly state: TokenPair;

  /**
   * Dispatch function for modifying application auth state
   */
  private readonly dispatch: Dispatch<AuthStateActionTypes>;

  /**
   * Creates instance
   *
   * @param state - application auth state
   * @param dispatch - dispatch function for modifying application auth state
   */
  constructor(state: TokenPair, dispatch: Dispatch<AuthStateActionTypes>) {
    this.state = state;
    this.dispatch = dispatch;
  }

  /**
   * Performs user login via email and password
   *
   * @param email - user's email
   * @param password - user's password
   */
  public async loginWithEmailAndPassword(email: string, password: string): Promise<void> {
    const queryString = objToQueryString({
      email,
      password,
    });

    const response = await fetch(`${API_ENDPOINT}/login?${queryString}`);

    const data = await response.json();

    checkApiErrors(data);

    await this.saveTokens(data.data);
  }

  /**
   * Performs authorization via VKontakte
   */
  public async authWithVK(): Promise<void>     {
    const data = await VKLogin.login(['friends', 'photos', 'email', 'offline']);

    const userDataResponse = await (await fetch(`https://api.vk.com/method/users.get?v=5.126&fields=photo_200,has_photo&access_token=${data.access_token}`)).json();

    const userData = userDataResponse.response.pop();
    const queryString = objToQueryString({
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

    checkApiErrors(requestData);

    await this.saveTokens(requestData.data);

    return requestData.data;
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

    checkApiErrors(requestData);

    await this.saveTokens(requestData.data);

    return requestData.data;
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

      const requestData = await response.json();

      await this.saveTokens(requestData.data);

      return requestData.data;
    } else {
      throw new Error('MISSING_AUTH_CODE');
    }
  }

  /**
   * Performs auth with Apple ID
   */
  public async authWithApple(): Promise<void> {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [
        appleAuth.Scope.EMAIL,
        appleAuth.Scope.FULL_NAME,
      ],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    // If the Auth is authorized, we call our API and pass the authorization code.
    if (credentialState === appleAuth.State.AUTHORIZED) {
      const queryString = objToQueryString({
        code: appleAuthRequestResponse.authorizationCode,
        ...appleAuthRequestResponse.fullName,
      });

      const response = await fetch(`${API_ENDPOINT}/oauth/apple/callback?${queryString}`, {
        method: 'POST',
      });

      const requestData = await response.json();

      await this.saveTokens(requestData.data);

      return requestData.data;
    } else {
      throw new Error('MISSING_AUTH_CODE');
    }
  }


  /**
   * Performs user registration via email and password
   *
   * @param name - name for registration
   * @param email - email for registration
   * @param password - password for registration
   */
  public async registerWithEmailAndPassword(name: string, email: string, password: string): Promise<void> {
    const response = await fetch(`${API_ENDPOINT}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (response.status !== 201) {
      checkApiErrors(await response.json());
    }
  }

  /**
   * Performs user logout
   */
  public async logout(): Promise<void> {
    await storageController.deleteTokens();
    this.dispatch({ type: 'LOGOUT' });
  }

  /**
   * Performs token refreshing to obtain to token pair
   */
  public async refreshTokens(): Promise<void> {
    const response = await fetch(
      `${API_ENDPOINT}/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: this.state.refreshToken,
        }),
      }
    );

    if (response.status === 200) {
      const responseJson = await response.json();

      await this.saveTokens(responseJson.data);

      return responseJson.data;
    }
    throw new Error(`Can't refresh tokens`);
  }

  /**
   * Saves token to application storage and auth state
   *
   * @param tokens - tokens to save
   */
  private async saveTokens(tokens: TokenPair): Promise<void> {
    await storageController.saveTokens(tokens);

    this.dispatch({
      type: 'SET_TOKENS',
      payload: tokens,
    });
  }
}

/**
 * Auth context value that components will consume
 */
export interface AuthContextValue {
  /**
   * Auth state with token pair
   */
  state: TokenPair;

  /**
   * Auth actions that other components can perform
   */
  actions: AuthContextActions
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

/**
 * Authentication data provider
 *
 * @param props - props for component rendering
 */
export default function AuthProvider(props: PropsWithChildren<unknown>): React.ReactElement {
  const [state, dispatch] = React.useReducer(
    authReducer,
    {
      accessToken: null,
      refreshToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrap = async (): Promise<void> => {
      VKLogin.initialize(VK_APP_ID);

      const tokens = await storageController.restoreTokens();

      dispatch({
        type: 'SET_TOKENS',
        payload: tokens,
      });
      SplashScreen.hide();
    };

    bootstrap();
  }, []);

  const actions = useMemo(
    () => new AuthContextActions(state, dispatch),
    [ state ]
  );

  return (
    <AuthContext.Provider value={{
      state,
      actions,
    }} {...props}/>
  );
}

/**
 * Hook for accessing auth context
 */
export function useAuthContext(): AuthContextValue {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error(`useAuthContext must be used within a AuthContext`);
  }

  return context;
}
