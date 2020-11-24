import { StyleSheet } from 'react-native';
import Colors from './colors';

/**
 * Default text styles
 */
const textStyles = StyleSheet.create({
  /**
   * Default font
   */
  default: {
    fontSize: 18,
    fontFamily: 'PT Root UI-Regular',
    color: Colors.BLACK,
  },

  /**
   * Roboto Medium font
   */
  robotoMedium: {
    fontSize: 28,
    fontFamily: 'Roboto-Medium',
    color: Colors.BLACK,
  },

  /**
   * PT Root Medium font
   */
  ptRootMedium: {
    fontSize: 18,
    fontFamily: 'PT Root UI-Medium',
    color: Colors.BLACK,
  },
});

export default textStyles;