/**
 * User for friends list
 */
export default interface Friend {
  id: string;
  firstName: string | null;
  username: string;
  level: number;
  photo: string | null;
}
