import { TokenPair } from '../contexts/AuthProvider';
import SInfo from 'react-native-sensitive-info';


/**
 * Controller for working with app storage
 */
class StorageController {
  /**
   * Caches access token
   */
  public accessToken: string | null = null;

  /**
   * Caches refresh token
   */
  public refreshToken: string | null = null;

  /**
   * Key for storing access token
   */
  private readonly ACCESS_TOKEN_KEY = 'access-token';

  /**
   * Key for storing refresh token
   */
  private readonly REFRESH_TOKEN_KEY = 'refresh-token';

  /**
   * Storage options
   */
  private readonly sensitiveInfoOptions = {
    sharedPreferencesName: 'questSharedPrefs',
    keychainService: 'questKeychain',
  };

  /**
   * Restores tokens from storage
   */
  public async restoreTokens(): Promise<TokenPair> {
    const accessToken = await SInfo.getItem(this.ACCESS_TOKEN_KEY, this.sensitiveInfoOptions);
    const refreshToken = await SInfo.getItem(this.REFRESH_TOKEN_KEY, this.sensitiveInfoOptions);

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    return {
      accessToken: accessToken || null,
      refreshToken: refreshToken || null,
    };
  }

  /**
   * Saves tokens to storage
   *
   * @param tokens - tokens to save
   */
  public async saveTokens(tokens: TokenPair): Promise<void> {
    if (tokens.accessToken && tokens.refreshToken) {
      await SInfo.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken, this.sensitiveInfoOptions);
      await SInfo.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken, this.sensitiveInfoOptions);
      this.accessToken = tokens.accessToken;
      this.refreshToken = tokens.refreshToken;
    }
  }

  /**
   * Removes tokens from storage
   */
  public async deleteTokens(): Promise<void> {
    await SInfo.deleteItem(this.ACCESS_TOKEN_KEY, this.sensitiveInfoOptions);
    await SInfo.deleteItem(this.REFRESH_TOKEN_KEY, this.sensitiveInfoOptions);

    this.accessToken = null;
    this.refreshToken = null;
  }
}

export default new StorageController();
