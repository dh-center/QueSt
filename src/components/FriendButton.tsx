import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import Colors from '../styles/colors';
import styled from 'styled-components/native';
import { StyledFonts } from '../styles/textStyles';
import { useFragment } from 'react-relay/hooks';
import { graphql } from 'react-relay';
import { FriendButton_data$key } from './__generated__/FriendButton_data.graphql';
import { useTranslation } from 'react-i18next';
import AddFriend from '../images/addFriend.svg';

const Button = styled.TouchableOpacity`
  width: 100%;
  margin-top: 15px;
  border-radius: 15px;
  background-color: ${Colors.White};
  elevation: ${2};
  box-shadow: 0 2px 3px rgba(0,0,0,0.2);
  flex-direction: row;
  align-items: center;
  z-index: 999;
`;

const ButtonContent = styled.View<{add?: boolean}>`
  padding: 15px;
  margin-right: 45px;
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

const LevelView = styled.View`
  position: absolute;
  right: 15px;
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

const DecideButtonsView = styled.View`
  flex-direction: row;
  margin-top: -15px;
`;

const DecideButton = styled.TouchableOpacity<{accept?: boolean, decline?: boolean}>`
  flex: 1;
  height: 64px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  ${props => props.accept && 'background-color: #5BC378;'}
  ${props => props.decline && 'border: 1px solid rgba(34, 34, 34, 0.3);'}
`;

const DecideButtonText = styled.Text<{accept?: boolean}>`
  font-family: ${props => props.accept ? 'PTRootUIWeb-Regular' : 'PTRootUIWeb-Medium'};
  color: ${props => props.accept ? Colors.White : Colors.Black};
  font-size: 18px;
  line-height: 22px;
  margin-top: 31px;
  text-align: center;
`;

const AddingButton = styled.TouchableOpacity`
  max-height: 100%;
  height: 100%;
  width: 60px;
  background-color: ${Colors.Green};
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
`;

/**
 * Props for FriendButton component
 */
export interface ButtonProps {
  /**
   * Fragment with data for component
   */
  userData: FriendButton_data$key;

  /**
   * If it is friend request
   */
  forRequestsScreen?: boolean;

  /**
   * If it is friend adding
   */
  forAddingScreen?: boolean;

  /**
   * onPress for Decline button
   */
  onDeclinePress?: () => void;

  /**
   * onPress for Accept button
   */
  onAcceptPress?: () => void;

  /**
   * onPress for Add button
   */
  onAddPress?: () => void;
}

/**
 * Component with buttons for profile
 *
 * @param props - props for button
 */
export default function FriendButton({ style: _style, userData, forRequestsScreen, forAddingScreen, onDeclinePress, onAcceptPress, onAddPress, ...rest }: TouchableOpacityProps & ButtonProps): React.ReactElement {
  const { t } = useTranslation();

  const data = useFragment(graphql`
    fragment FriendButton_data on User {
      firstName
      username
      level
      photo
    }
  `, userData);

  return (
    <>
      <Button {...rest}>
        <ButtonContent add={forAddingScreen}>
          <Avatar source={data.photo ? { uri: data.photo } : require('../images/lapki.jpg')}/>
          <NameView>
            <DefaultText>{data.firstName || data.username}</DefaultText>
            <Username>@{data.username}</Username>
          </NameView>
        </ButtonContent>
        {!forAddingScreen &&
        <LevelView>
          <Level>LVL</Level>
          <LevelCircle>
            <DefaultText white>{data.level}</DefaultText>
          </LevelCircle>
        </LevelView>
        }
        {forAddingScreen &&
          <AddingButton onPress={onAddPress}>
            <AddFriend/>
          </AddingButton>
        }
      </Button>
      {forRequestsScreen &&
        <DecideButtonsView>
          <DecideButton decline onPress={onDeclinePress}>
            <DecideButtonText>{t('profile.decline')}</DecideButtonText>
          </DecideButton>
          <DecideButton accept onPress={onAcceptPress}>
            <DecideButtonText accept>{t('profile.accept')}</DecideButtonText>
          </DecideButton>
        </DecideButtonsView>
      }
    </>
  );
}
