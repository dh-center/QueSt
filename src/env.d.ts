declare module '@env' {
  /**
   * Access token for mapbox to display map
   */
  export const MAPBOX_ACCESS_TOKEN: string;

  /**
   * Endpoint for API queries
   */
  export const API_ENDPOINT: string;

  /**
   * OAuth client id for google app from Cloud Console
   */
  export const OAUTH_WEB_CLIENT_ID: string;

  /**
   * VK application id for Auth
   */
  export const VK_APP_ID: string;

  /**
   * API endpoint of the quest-to-speech service
   */
  export const QTS_API_ENDPOINT: string;
}
