import React, { useEffect, useState } from 'react';
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
  ${props => (props.pressed || props.answered) && 'border-radius: 3px;'}
`;

interface TextButtonProps {
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
   * onPress callback
   */
  onPress: (pressed: boolean) => void,
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
        props.onPress(pressed);
        setPressed(!pressed);
      }}
    >
      <DefaultText>{props.text}</DefaultText>
    </TextButton>
  );
}
