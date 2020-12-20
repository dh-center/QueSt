import React, { ReactElement } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  NativeSyntheticEvent, NativeTouchEvent, ViewStyle
} from 'react-native';
import Colors from '../../styles/colors';
import textStyles from '../../styles/textStyles';

/**
 * Custom button props
 */
export interface CustomButtonProps {
  /**
   * Text on button
   */
  title: string;

  /**
   * onPress event handler
   *
   * @param ev - event object
   */
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;

  /**
   * View styles
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Styles for custom button
 */
const styles = StyleSheet.create({
  /**
   * Button container
   */
  button: {
    backgroundColor: Colors.Blue,
    minWidth: 227,
    borderRadius: 25,
    paddingVertical: 11,
    paddingHorizontal: 30,

    /**
     * Shadows on IOS
     */
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    /**
     * Shadows on Android
     */
    elevation: 5,
  },

  /**
   * Button text
   */
  buttonText: {
    ...textStyles.ptRootMedium,
    color: Colors.White,
    textAlign: 'center',
  },
});

/**
 * Custom button with light blue background
 *
 * @param props - component props
 */
export default function Button(props: CustomButtonProps): ReactElement {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.button, props.style]}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}
