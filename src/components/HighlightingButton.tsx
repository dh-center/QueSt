import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { StyledFonts } from '../styles/textStyles';
import Colors from '../styles/colors';

const DefaultText = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
  margin: 5px 0;
`;

const TextButton = styled.TouchableOpacity<{color: string, pressed: boolean, answered: boolean, withGreenBorder: boolean}>`
  background-color: ${props => props.color};
  ${props => !props.pressed && !props.answered && 'border-bottom-color: #222222; border-bottom-width: 0.5px;'}
  ${props => props.withGreenBorder && 'border: #5BC378 1.5px;'}
  border-radius: 3px;
`;

interface TextButtonProps {
  /**
   * Item index
   */
  index: number,

  /**
   * Text for displaying
   */
  text: string,

  /**
   * If it is right answer
   */
  isRightAnswer: boolean,

  /**
   * If user already answered
   */
  isAnswered: boolean,

  /**
   * Users answers
   */
  answers: (boolean | undefined)[];

  /**
   * Function to set users answers
   */
  setAnswers: Dispatch<SetStateAction<(boolean | undefined)[]>>;
}

/**
 * Pressable text for HighlightingInTextView
 *
 * @param props - props for button
 */
export default function HighlightingButton(props: TextButtonProps): React.ReactElement {
  const [pressed, setPressed] = useState(false);
  const [withGreenBorder, setWithGreenBorder] = useState(false);
  let color: Colors | string = pressed ? Colors.Yellow : Colors.White;

  useEffect(() => {
    props.isAnswered && setWithGreenBorder(props.isRightAnswer && !pressed);
  }, [ props.isAnswered ]);

  if (props.isAnswered) {
    if (pressed) {
      color = props.isRightAnswer ? Colors.Green : Colors.Red;
    } else {
      color = 'rgba(85,85,107,.1)';
    }
  }

  return (
    <TextButton
      color={color}
      pressed={pressed}
      withGreenBorder={withGreenBorder}
      answered={props.isAnswered}
      disabled={props.isAnswered}
      onPress={() => {
        props.answers[props.index] = !pressed ? props.isRightAnswer : undefined;
        props.setAnswers(props.answers);
        setPressed(!pressed);
      }}
    >
      <DefaultText>{props.text}</DefaultText>
    </TextButton>
  );
}
