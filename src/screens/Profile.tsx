import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, Text } from 'react-native';
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
import { graphql, QueryRenderer } from 'react-relay';
import enviroment from '../enviroment';
import { ProfileQuery } from './__generated__/ProfileQuery.graphql';
import ScreenWrapper from '../components/utils/ScreenWrapper';

/**
 * Type with props of screen 'Main' in ProfileStack
 */
type MainScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Main'>;

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
  color: ${Colors.Black};
  margin: 15px 0;
`;

const LoaderWrapper = styled(ScreenWrapper)`
  justify-content: center;
`;

const Loader = (): React.ReactElement => (
  <LoaderWrapper>
    <ActivityIndicator size="large"/>
  </LoaderWrapper>
);

/**
 * Displays user's profile
 */
export default function ProfileScreen(): React.ReactElement {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <QueryRenderer<ProfileQuery>
      environment={enviroment}
      query={graphql`
        query ProfileQuery {
            user: me {
              id
              username
              photo
              firstName
            }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          return (
            <ScreenWrapper>
              <Text>Something went wrong</Text>
            </ScreenWrapper>
          );
        }

        if (!props) {
          return <Loader/>;
        }

        const imageSource = props.user.photo
          ? { uri: props.user.photo }
          : require('../images/lapki.jpg');

        return (
          <ScreenWrapper scrollable>
            <Ellipse/>
            <SettingsButton onPress={(): void => navigation.navigate('Settings')}>
              <Settings/>
            </SettingsButton>
            <AvatarView>
              <Avatar source={imageSource}/>
            </AvatarView>
            <Name>{props.user.firstName || props.user.username}</Name>
            <ProgressBlock totalExp={200} currentExp={153}/>
            <ProfileButton icon={Friends} buttonText={t('profile.friends')}/>
            <ProfileButton icon={Rating} buttonText={t('profile.rating')}/>
            <ProfileButton icon={Achievements} buttonText={t('profile.achievements')}/>
            <ProfileButton icon={Collection} buttonText={t('profile.cards')}/>
            <ProfileButton icon={Rewards} buttonText={t('profile.rewards')}/>
          </ScreenWrapper>
        );
      }}
      variables={{}}
    />
  );
}
