import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import Colors from '../styles/colors';
import styled from 'styled-components/native';
import { StyledFonts } from '../styles/textStyles';

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  margin-bottom: 15px;
  padding-left: 13px;
  border-radius: 15px;
  background-color: ${Colors.WHITE};
  elevation: ${4};
  box-shadow: 0 2px 2.62px rgba(0,0,0,0.23);
  flex-direction: row;
  align-items: center;
`;

// shadowColor: "#000";
// shadowOffset: {
// width: 0;
// height: 2;
// },
// shadowOpacity: 0.23;
// shadowRadius: 2.62;

const ButtonText = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.BLACK};
  margin-left: 22px;
`;

/**
 * Props for ProfileButton component
 */
export interface ButtonProps {
  /**
   * SVG icon to display on button
   */
  icon: React.ReactNode;

  /**
   * Button text content
   */
  buttonText: string;
}

/**
 * Component with buttons for profile
 *
 * @param props - props for button
 */
export default function ProfileButton({ style, icon, buttonText, ...rest }: TouchableOpacityProps & ButtonProps): React.ReactElement {
  return (
    <Button {...rest}>
      {icon}
      <ButtonText>{buttonText}</ButtonText>
    </Button>
  );
}
