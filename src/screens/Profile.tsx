import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from '../navigation/profileStack';
import Colors from '../styles/colors';
import { StyledFonts } from '../styles/textStyles';
import Settings from '../images/settings.svg';
import BlueEllipse from '../images/blueEllipse.svg';
import Friends from '../images/friends.svg';
import Rating from '../images/rating.svg';
import Achievements from '../images/achievements.svg';
import Collection from '../images/collection.svg';
import Rewards from '../images/rewards.svg';
import ProgressBlock from '../components/ProgressBlock';
import ProfileButton from '../components/ProfileButton';

/**
 * Type with props of screen 'Main' in ProfileStack
 */
type MainScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Main'>;

const Body = styled.View`
  background-color: ${Colors.BACKGROUND};
  height: 100%;
`;

const Scroll = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: 15,
    paddingTop: 74,
    paddingBottom: 15,
    alignItems: 'center',
  },
}))``;

const Ellipse = styled(BlueEllipse)`
  position: absolute;
  top: -341px;
`;

const SettingsButton = styled.TouchableOpacity`
  position: absolute;
  top: 74px;
  right: 15px;
`;

const AvatarView = styled.View`
  height: 110px;
  width: 110px;
  border-radius: 60px;
  elevation: ${8};
  box-shadow: 0 4px 4.65px rgba(0,0,0,0.2);
`;

const Avatar = styled.Image`
  height: 110px;
  width: 110px;
  border-radius: 60px;
`;

const Name = styled.Text`
  ${StyledFonts.roboto};
  font-size: 28px;
  line-height: 28px;
  color: ${Colors.BLACK};
  margin: 15px 0;
`;

/**
 * Displays user's profile
 */
export default function ProfileScreen(): React.ReactElement {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <Body>
      <Scroll>
        <Ellipse/>
        <SettingsButton onPress={(): void => navigation.navigate('Settings')}>
          <Settings/>
        </SettingsButton>
        <AvatarView>
          <Avatar source={require('../images/lapki.jpg')}/>
        </AvatarView>
        <Name>Соня</Name>
        <ProgressBlock totalExp={200} currentExp={153}/>
        <ProfileButton icon={Friends} buttonText={t('profile.friends')}/>
        <ProfileButton icon={Rating} buttonText={t('profile.rating')}/>
        <ProfileButton icon={Achievements} buttonText={t('profile.achievements')}/>
        <ProfileButton icon={Collection} buttonText={t('profile.cards')}/>
        <ProfileButton icon={Rewards} buttonText={t('profile.rewards')}/>
      </Scroll>
    </Body>
  );
}
