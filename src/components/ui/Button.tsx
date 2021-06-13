import React, { ReactElement } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeTouchEvent,
  ViewStyle, TouchableOpacityProps
} from 'react-native';
import Colors from '../../styles/colors';
import textStyles from '../../styles/textStyles';
import WithStyles from '../../types/withStyles';
import styled from 'styled-components/native';

/**
 * Custom button props
 */
export interface CustomButtonProps extends WithStyles<ViewStyle> {
  /**
   * Text on button
   */
  title: string;

  /**
   * Text on button
   */
  icon?: React.ComponentType;

  /**
   * onPress event handler
   *
   * @param ev - event object
   */
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
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
    flexDirection: 'row',

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

const Icon = styled.View`
  margin-right: 10px;
`;

/**
 * Custom button with light blue background
 *
 * @param props - component props
 */
export default function Button(props: TouchableOpacityProps & CustomButtonProps): ReactElement {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.button, props.style]} disabled={props.disabled}>
      {props.icon && <Icon as={props.icon}/>}
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}
