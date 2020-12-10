import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from '../navigation/profileStack';
import Colors from '../styles/colors';
import textStyles, { StyledFonts } from '../styles/textStyles';
import Settings from '../images/settings.svg';
import BlueEllipse from '../images/blueEllipse.svg';
import Friends from '../images/friends.svg';
import Rating from '../images/rating.svg';
import Achievements from '../images/achievements.svg';
import Collection from '../images/collection.svg';
import Rewards from '../images/rewards.svg';
import ProfileButton from '../components/ProfileButton';

/**
 * Type with props of screen 'Main' in ProfileStack
 */
type MainScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Main'>;

const Body = styled.SafeAreaView`
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
  box-shadow: 0 4px 4.65px rgba(0,0,0,0.3);
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

const LevelView = styled.View`
  margin: 0 60px 30px;
  align-self: stretch;
  align-items: center;
`;

const Level = styled.Text`
  ${StyledFonts.uiWebMedium};
  font-size: 22px;
  line-height: 22px;
  color: ${Colors.BLACK};
  position: absolute;
  left: 0;
  top: 0;
`;

const Progress = styled.Text`
  ${StyledFonts.uiWebMedium};
  font-size: 12px;
  line-height: 18px;
  color: ${Colors.BLACK};
`;

const ProgressBar = styled.View`
  width: 100%;
  height: 10px;
  margin-top: 3px;
  border-radius: 6px;
  background-color: ${Colors.BLUE};
  opacity: 0.15;
`;

const progress = 153 * 100 / 200;

const ProgressFill = styled.View`
  width: ${progress}%;
  height: 10px;
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 6px;
  background-color: ${Colors.YELLOW};
  elevation: ${4};
  box-shadow: 0 2px 2.62px rgba(0,0,0,0.23);
`;

const FriendsIcon = styled(Friends)`
  color: ${Colors.DARK_BLUE};
`;

const RatingIcon = styled(Rating)`
  color: ${Colors.DARK_BLUE};
`;

const AchievementsIcon = styled(Achievements)`
  color: ${Colors.DARK_BLUE};
`;

const CollectionIcon = styled(Collection)`
  color: ${Colors.DARK_BLUE};
`;

const RewardsIcon = styled(Rewards)`
  color: ${Colors.DARK_BLUE};
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
        <LevelView>
          <Progress>153/200</Progress>
          <Level>LV. 5</Level>
          <ProgressBar/>
          <ProgressFill/>
        </LevelView>
        <ProfileButton icon={<FriendsIcon/>} buttonText={t('profile.friends')}/>
        <ProfileButton icon={<RatingIcon/>} buttonText={t('profile.rating')}/>
        <ProfileButton icon={<AchievementsIcon/>} buttonText={t('profile.achievements')}/>
        <ProfileButton icon={<CollectionIcon/>} buttonText={t('profile.cards')}/>
        <ProfileButton icon={<RewardsIcon/>} buttonText={t('profile.rewards')}/>
      </Scroll>
    </Body>
  );
}
