import React, { ReactElement } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../styles/colors';
import textStyles from '../styles/textStyles';
import { CustomButtonProps } from './Button';

/**
 * Underlined button styles
 */
const styles = StyleSheet.create({
  /**
   * Button container styles
   */
  button: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BLACK,
  },

  /**
   * Button text styles
   */
  buttonText: {
    ...textStyles.default,
  },
});

/**
 * Custom button with underline
 *
 * @param props - component props
 */
export default function UnderlinedButton(props: CustomButtonProps): ReactElement {
  return (
    <TouchableOpacity onPress={props.onPress} style={[props.style, styles.button]}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}
