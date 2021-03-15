
/**
 * Converts object to query string
 *
 * @param obj - object to convert
 */
export default function objToQueryString(obj: Record<string, string | number | boolean | null>): string {
  return Object.entries(obj)
    .reduce((acc, [key, value]) => {
      acc.push(encodeURIComponent(key) + '=' + encodeURIComponent(value || ''));

      return acc;
    }, [] as string[])
    .join('&');
}
