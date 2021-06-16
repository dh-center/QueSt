import React, { ReactElement } from 'react';
import { StyleSheet, TextInput, TextInputProps, TextStyle, View } from 'react-native';
import textStyles from '../../styles/textStyles';
import Colors from '../../styles/colors';
import styled from 'styled-components/native';

/**
 * Styles for custom Input field
 */
const styles = StyleSheet.create({
  container: {
    /**
     * Colors
     */
    backgroundColor: Colors.White,

    borderRadius: 5,

    /**
     * Margins and paddings
     */
    paddingVertical: 11,
    paddingHorizontal: 30,
    width: '100%',
    flexDirection: 'row',
  },
  textInput: {
    /**
     * Text styles
     */
    ...textStyles.default,
    flex: 1,

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

const Icon = styled.View`
  margin: 0 10px;
`;

/**
 * Props for input text
 */
export interface TextProps {
  /**
   * Text style
   */
  textStyle?: TextStyle;
}

/**
 * Props for input container
 */
export interface InputProps {
  /**
   * Icon for displaying
   */
  icon?: React.ComponentType;
}

/**
 * Text input with custom style
 *
 * @param props - input props
 */
export default function Input(props: TextInputProps & TextProps & InputProps): ReactElement {
  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        {...props}
        placeholderTextColor={'rgba(34, 34, 34, 0.5)'}
        style={[styles.textInput, props.textStyle]}
        underlineColorAndroid={props.underlineColorAndroid || 'transparent'}
        spellCheck={props.spellCheck || false}
        autoCorrect={props.autoCorrect || false}
      />
      {props.icon && <Icon as={props.icon}/>}
    </View>
  );
}
