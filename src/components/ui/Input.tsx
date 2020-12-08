import React, { ReactElement } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import textStyles from '../../styles/textStyles';
import Colors from '../../styles/colors';

/**
 * Styles for custom Input field
 */
const styles = StyleSheet.create({
  container: {
    /**
     * Colors
     */
    backgroundColor: Colors.WHITE,

    /**
     * Margins and paddings
     */
    paddingVertical: 11,
    paddingHorizontal: 30,
    width: '100%',

    /**
     * Border
     */
    borderColor: '#E0E0E0',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 0.5,

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
  textInput: {
    /**
     * Text styles
     */
    ...textStyles.default,

    /**
     * Margins and paddings
     */
    margin: 0,
    padding: 0,

    /**
     * Underline
     */
    borderBottomColor: 'rgba(34, 34, 34, 0.5)',
    borderStyle: 'solid',
    borderBottomWidth: 0.5,
  },
});

/**
 * Text input with custom style
 *
 * @param props - input props
 */
export default function Input(props: TextInputProps): ReactElement {
  return (
    <View style={[props.style, styles.container]}>
      <TextInput
        {...props}
        placeholderTextColor={'rgba(34, 34, 34, 0.5)'}
        style={styles.textInput}
        underlineColorAndroid={props.underlineColorAndroid || 'transparent'}
        spellCheck={props.spellCheck || false}
        autoCorrect={props.autoCorrect || false}
      />
    </View>
  );
}