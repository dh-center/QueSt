import hasOwnProperty from './hasOwnProperty';

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
 * Check if there is any errors from API
 *
 * @param apiResult - result to check
 */
export default function checkApiErrors(apiResult: unknown): void {
  if (typeof apiResult === 'object' && apiResult !== null && hasOwnProperty(apiResult, 'errors')) {
    const errors = apiResult.errors as AuthServerError[];
    const firstError = errors[0];

    throw new Error(firstError?.extensions.code);
  }
}
