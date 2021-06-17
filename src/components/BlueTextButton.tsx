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
  onPress: () => void;

  text: string;

  right?: boolean;

  last?: boolean;

  style?: StyleProp<ViewStyle>
}

/**
 * @param props - props for button
 */
export default function BlueTextButton(props: ButtonProps): React.ReactElement {
  return (
    <Button
      right={props.right}
      last={props.last}
      style={props.style}
      onPress={props.onPress}
    >
      <ButtonText>{props.text}</ButtonText>
    </Button>
  );
}
