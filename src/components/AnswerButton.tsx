import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Colors from '../styles/colors';
import textStyles from '../styles/textStyles';

const button = StyleSheet.create({
  button: {
    minHeight: 60,
    marginBottom: 10,
    borderRadius: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...textStyles.default,
    textAlign: 'center',
  },
});

const buttonStyles = StyleSheet.create({
  active: {
    ...button.button,
    backgroundColor: Colors.White,
    elevation: 10,
    shadowColor: '#414366',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  disabled: {
    ...button.button,
    backgroundColor: Colors.White,
    opacity: 0.6,
  },
  unselectedCorrect: {
    ...button.button,
    backgroundColor: Colors.White,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: Colors.Green,
  },
  selectedCorrect: {
    ...button.button,
    backgroundColor: Colors.Green,
  },
  selectedWrong: {
    ...button.button,
    backgroundColor: Colors.Red,
  },
  blackButtonText: {
    ...button.buttonText,
    color: Colors.Black,
  },
  whiteButtonText: {
    ...button.buttonText,
    color: Colors.White,
  },
});

/**
 * Possible AnswerButton states
 */
export type AnswerButtonState = 'active' | 'disabled' | 'unselectedCorrect' | 'selectedCorrect' | 'selectedWrong';

/**
 * Props for AnswerButton component
 */
export interface ButtonProps {
  /**
   * State for applying correct button styles
   */
  answerButtonState: AnswerButtonState;

  /**
   * Button text content
   */
  buttonText: string;
}

/**
 * Component with buttons for tests
 *
 * @param props - props for TouchableOpacity and Text
 */
export default function AnswerButton({ answerButtonState, buttonText, ...rest }: TouchableOpacityProps & ButtonProps): React.ReactElement {
  const answerButtonTextState = answerButtonState === 'selectedCorrect' || answerButtonState === 'selectedWrong'
    ? 'whiteButtonText'
    : 'blackButtonText';

  return (
    <TouchableOpacity
      style={buttonStyles[answerButtonState]}
      {...rest}
    >
      <Text style={buttonStyles[answerButtonTextState]}>{buttonText}</Text>
    </TouchableOpacity>
  );
}
