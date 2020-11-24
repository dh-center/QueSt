import React, { ReactElement } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../styles/colors';
import textStyles from '../styles/textStyles';
import { CustomButtonProps } from './CustomButton';

const styles = StyleSheet.create({
  button: {
    paddingVertical: 3,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BLACK,
  },
  buttonText: {
    ...textStyles.default,
  },
});

/**
 * @param props
 */
export default function UnderlinedButton(props: CustomButtonProps): ReactElement {
  return (
    <TouchableOpacity onPress={props.onPress} style={[props.style, styles.button]}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}
