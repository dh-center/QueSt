import { StyleProp } from 'react-native';

/**
 * Util interface to add some styles to the components
 */
export default interface WithStyles<T> {
  /**
   * Component styles
   */
  style?: StyleProp<T>
}
