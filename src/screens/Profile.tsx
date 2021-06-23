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
// import Rating from '../images/rating.svg';
import Achievements from '../images/achievements.svg';
import Collection from '../images/collection.svg';
import ProgressBlock from '../components/ProgressBlock';
import ListButton from '../components/ListButton';
import { graphql, QueryRenderer } from 'react-relay';
import { ProfileQuery } from './__generated__/ProfileQuery.graphql';
import ScreenWrapper from '../components/utils/ScreenWrapper';
import checkApiErrors from '../utils/checkApiErrors';
import Button from '../components/ui/Button';
import { useAuthContext } from '../contexts/AuthProvider';
import { useRelayEnvironment } from 'react-relay/hooks';
import Avatar from '../components/Avatar';

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
  const authContext = useAuthContext();
  const navigation = useNavigation<MainScreenNavigationProp>();
  const { t } = useTranslation();
  const environment = useRelayEnvironment();

  return (
    <QueryRenderer<ProfileQuery>
      environment={environment}
      query={graphql`
        query ProfileQuery {
            user: me {
              id
              username
              photo
              firstName
              level
              exp
              email
            }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          let errorMessage = t('errors.unspecific');

          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            checkApiErrors((error as any).source);
          } catch (e) {
            errorMessage = t([`errors.${e.message}`, 'errors.unspecific']);
            if (e.message === 'INVALID_ACCESS_TOKEN') {
              authContext.actions.logout();
            }
          }

          return (
            <ScreenWrapper>
              <Text>{errorMessage}</Text>
              <Button title={'Logout'} onPress={authContext.actions.logout}/>
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
            <SettingsButton onPress={(): void => navigation.navigate('Settings', {
              avatar: imageSource,
              name: props.user.firstName || props.user.username,
              username: props.user.username,
              email: props.user.email ? props.user.email : undefined,
            })}>
              <Settings/>
            </SettingsButton>
            <Avatar size={110} source={imageSource}/>
            <Name>{props.user.firstName || props.user.username}</Name>
            <ProgressBlock
              level={props.user.level}
              totalExp={100}
              currentExp={props.user.exp - props.user.level * 100}
            />
            <ListButton icon={Friends} buttonText={t('profile.friends')} onPress={(): void => navigation.navigate('Friends')}/>
            {/* <ListButton icon={Rating} buttonText={t('profile.rating')}/>*/}
            <ListButton icon={Achievements} buttonText={t('profile.achievements')} onPress={(): void => navigation.navigate('Achievements')}/>
            <ListButton icon={Collection} buttonText={t('profile.cards')} onPress={(): void => navigation.navigate('CardsCollection')}/>
          </ScreenWrapper>
        );
      }}
      variables={{}}
    />
  );
}
