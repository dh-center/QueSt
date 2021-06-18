import React from 'react';
import styled from 'styled-components/native';
import { StyledFonts } from '../styles/textStyles';
import Colors from '../styles/colors';
import { StyleProp, ViewStyle } from 'react-native';

const Button = styled.TouchableOpacity<{right?: boolean, last?: boolean}>`
  ${props => props.right && 'align-self: flex-end;'}
  ${props => props.last && 'margin-bottom: 15px;'}
`;

const ButtonText = styled.Text`
  ${StyledFonts.uiWebRegular};
  color: ${Colors.Blue};
  font-size: 18px;
  line-height: 22px;
`;

interface ButtonProps {
  /**
   * Callback when press on button
   */
  onPress: () => void;

  /**
   * Text to display
   */
  text: string;

  /**
   * If need to align to right
   */
  isRight?: boolean;

  /**
   * If it is the last element
   */
  isLast?: boolean;

  /**
   * Custom style
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Blue text with TouchableOpacity properties
 *
 * @param props - props for button
 */
export default function BlueTextButton(props: ButtonProps): React.ReactElement {
  return (
    <Button
      right={props.isRight}
      last={props.isLast}
      style={props.style}
      onPress={props.onPress}
    >
      <ButtonText>{props.text}</ButtonText>
    </Button>
  );
}
