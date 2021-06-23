import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import Colors from '../styles/colors';
import styled from 'styled-components/native';
import { StyledFonts } from '../styles/textStyles';
import NextCircle from '../images/nextCircle.svg';
import InfoCircle from '../images/info.svg';
import ProgressCircle from './ProgressCircle';

const Button = styled.TouchableOpacity`
  width: 100%;
  min-height: 60px;
  margin-bottom: 15px;
  padding: 0 20px;
  border-radius: 15px;
  background-color: ${Colors.White};
  elevation: ${2};
  box-shadow: 0 2px 3px rgba(0,0,0,0.2);
  flex-direction: row;
  align-items: center;
`;

const ButtonText = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
  flex: 1;
  margin: 20px 0;
`;

const Icon = styled.View`
  margin-left: -7px;
  margin-right: 22px;
  color: ${Colors.DarkBlue};
`;

const Next = styled(NextCircle)<{rotated?: boolean}>`
  margin-left: auto;
  ${p => p.rotated && `transform: rotate(90deg)`};
`;

/**
 * Props for ListButton component
 */
export interface ButtonProps {
  /**
   * SVG icon to display on button
   */
  icon?: React.ComponentType;

  /**
   * Achievement completion percentage
   */
  percent?: number;

  /**
   * Type of button (settings, achievements)
   */
  type?: 'settings' | 'achievements' | 'info';

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
export default function ListButton({ style: _style, icon, percent, type, buttonText, ...rest }: TouchableOpacityProps & ButtonProps): React.ReactElement {
  return (
    <Button {...rest}>
      {icon && <Icon as={icon}/>}
      {type === 'achievements' && percent !== undefined && <ProgressCircle percent={percent}/>}
      <ButtonText>{buttonText}</ButtonText>
      {type !== 'info' && <Next rotated={type === 'achievements'}/>}
      {type === 'info' && <InfoCircle/>}
    </Button>
  );
}
