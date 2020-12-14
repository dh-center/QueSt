import { StyleSheet } from 'react-native';
import Colors from './colors';

/**
 * Default text styles for StyleSheet
 *
 * @todo only font families will stay here
 */
const textStyles = StyleSheet.create({
  /**
   * Default font
   */
  default: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'PTRootUIWeb-Regular',
    color: Colors.BLACK,
  },

  /**
   * Roboto Medium font
   */
  robotoMedium: {
    fontSize: 28,
    lineHeight: 28,
    fontFamily: 'Roboto-Medium',
    color: Colors.BLACK,
  },

  /**
   * PT Root Medium font
   */
  ptRootMedium: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'PTRootUIWeb-Medium',
    color: Colors.BLACK,
  },

  /**
   * PT Root Regular font
   */
  ptRootRegular: {
    fontFamily: 'PTRootUIWeb-Regular',
  },
});

export default textStyles;

/**
 * Fonts for styled-components
 */
export const StyledFonts = {
  uiWebRegular: 'font-family: PTRootUIWeb-Regular',
  uiWebMedium: 'font-family: PTRootUIWeb-Medium',
  roboto: 'font-family: Roboto-Medium',
};
