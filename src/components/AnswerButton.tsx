import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import colors from '../styles/colors';

const button = StyleSheet.create({
  button: {
    minHeight: 60,
    marginBottom: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 22,
  },
});

const buttonStyles = StyleSheet.create({
  active: {
    ...button.button,
    backgroundColor: colors.white,
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
    backgroundColor: colors.white,
  },
  unselectedCorrect: {
    ...button.button,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: colors.green,
  },
  selectedCorrect: {
    ...button.button,
    backgroundColor: colors.green,
  },
  selectedWrong: {
    ...button.button,
    backgroundColor: colors.red,
  },
  blackButtonText: {
    ...button.buttonText,
    color: colors.black,
  },
  whiteButtonText: {
    ...button.buttonText,
    color: colors.white,
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
