import { StyleSheet } from 'react-native';
import Colors from './colors';

const textStyles = StyleSheet.create({
  default: {
    fontSize: 18,
    fontFamily: 'PT Root UI-Regular',
    color: Colors.BLACK,
  },
  robotoMedium: {
    fontSize: 28,
    fontFamily: 'Roboto-Medium',
    color: Colors.BLACK,
  },
  ptRootMedium: {
    fontSize: 18,
    fontFamily: 'PT Root UI-Medium',
    color: Colors.BLACK,
  },
});

export default textStyles;
