/**
 * Decoding HTML entities
 *
 * @param str - string to decode
 */
export default function decodeHTMLEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, '\u00A0');
}
