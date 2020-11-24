import React, { ReactElement } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewProps,
  NativeSyntheticEvent, NativeTouchEvent
} from 'react-native';
import Colors from '../styles/colors';
import textStyles from '../styles/textStyles';

export interface CustomButtonProps {
  title: string;
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  style: StyleProp<ViewProps>;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.BLUE,
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
  buttonText: {
    ...textStyles.ptRootMedium,
    color: Colors.WHITE,
    textAlign: 'center',
  },
});

/**
 * @param props
 */
export default function CustomButton(props: CustomButtonProps): ReactElement {
  return (
    <TouchableOpacity onPress={props.onPress} style={[props.style, styles.button]}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}
