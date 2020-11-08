import { API_ENDPOINT } from '@env';
import SInfo from 'react-native-sensitive-info';

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

  /**
   * Auth controller initializer
   * Restores last authed user
   */
  public async init(): Promise<void> {
    this.accessToken = await SInfo.getItem(AuthController.ACCESS_TOKEN_KEY, AuthController.sensitiveInfoOptions);
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
  }

  /**
   * Stores tokens in secure storage
   *
   * @param tokensData - tokens data to store
   */
  private async setTokens(tokensData: AuthServerResponse): Promise<void> {
    this.accessToken = tokensData.data.accessToken;
    await SInfo.setItem(AuthController.ACCESS_TOKEN_KEY, this.accessToken, AuthController.sensitiveInfoOptions);
  }
}

export default new AuthController();
