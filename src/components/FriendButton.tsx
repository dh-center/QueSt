import React from 'react';
import { ImageSourcePropType, TouchableOpacityProps, View } from 'react-native';
import Colors from '../styles/colors';
import styled from 'styled-components/native';
import { StyledFonts } from '../styles/textStyles';

const Button = styled.TouchableOpacity`
  width: 100%;
  margin-top: 15px;
  padding: 15px 15px;
  border-radius: 15px;
  background-color: ${Colors.White};
  elevation: ${2};
  box-shadow: 0 2px 3px rgba(0,0,0,0.2);
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 15px;
`;

const NameView = styled.View`
  flex: 1;
  margin: 0 13px;
`;

const DefaultText = styled.Text<{white?: boolean}>`
  ${StyledFonts.uiWebMedium};
  font-size: 22px;
  color: ${props => props.white ? Colors.White : Colors.Black};
`;

const Username = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 14px;
  margin-top: 5px;
  color: ${Colors.Black};
  opacity: 0.5;
`;

const Level = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 12px;
  line-height: 18px;
  color: ${Colors.DarkBlue};
  text-align: center;
`;

const LevelCircle = styled.View`
  background-color: ${Colors.Blue};
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

/**
 * Props for ListButton component
 */
export interface ButtonProps {
  /**
   * User avatar
   */
  avatar: ImageSourcePropType;

  /**
   * User first name
   */
  name: string;

  /**
   * User username
   */
  username: string;

  /**
   * User level
   */
  level: number;
}

/**
 * Component with buttons for profile
 *
 * @param props - props for button
 */
export default function FriendButton({ style: _style, avatar, name, username, level, ...rest }: TouchableOpacityProps & ButtonProps): React.ReactElement {
  return (
    <Button {...rest}>
      <Avatar source={avatar}/>
      <NameView>
        <DefaultText>{name}</DefaultText>
        <Username>@{username}</Username>
      </NameView>
      <View>
        <Level>LVL</Level>
        <LevelCircle>
          <DefaultText white>{level}</DefaultText>
        </LevelCircle>
      </View>
    </Button>
  );
}
