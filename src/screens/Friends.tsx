import React from 'react';
import { ProfileStackParamList } from '../navigation/profileStack';
import { StackScreenProps } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import useTabBarHeight from '../components/utils/useTabBarHeight';
import styled from 'styled-components/native';
import Colors from '../styles/colors';
import BlueCircle15 from '../images/blueCircle15.svg';
import { StyledFonts } from '../styles/textStyles';
import Back from '../images/back.svg';
import FriendRequests from '../images/friendRequests.svg';
import { graphql, QueryRenderer } from 'react-relay';
import { useAuthContext } from '../contexts/AuthProvider';
import { useRelayEnvironment } from 'react-relay/hooks';
import checkApiErrors from '../utils/checkApiErrors';
import ScreenWrapper from '../components/utils/ScreenWrapper';
import { ActivityIndicator, FlatList, Text, TouchableOpacity } from 'react-native';
import Button from '../components/ui/Button';
import { FriendsQuery } from './__generated__/FriendsQuery.graphql';
import FriendButton from '../components/FriendButton';
import Plus from '../images/plus.svg';

type Props = StackScreenProps<ProfileStackParamList, 'Friends'>;

const Body = styled.View<{tabBarHeight: number}>`
  background-color: ${Colors.Background};
  flex: 1;
  padding-bottom: ${props => props.tabBarHeight}px;
`;

const BlueCircle = styled(BlueCircle15)`
  position: absolute;
  top: -376px;
  right: -169px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 74px 36px 15px 0;
`;

const BackButton = styled.TouchableOpacity`
  padding: 11px 15px;
`;

const Title = styled.Text`
  flex: 1;
  ${StyledFonts.roboto};
  font-size: 28px;
  line-height: 34px;
  color: ${Colors.Black};
`;

const FriendRequestsBadge = styled.View`
  position: absolute;
  top: -7px;
  right: -9px;
  background-color: ${Colors.Red};
  width: 16px;
  height: 16px;
  border-radius: 9px;
`;

const BadgeText = styled.Text`
  ${StyledFonts.uiWebMedium};
  font-size: 12px;
  line-height: 16px;
  color: ${Colors.White};
  text-align: center;
`;

const AddButton = styled(Button)<{tabBarHeight: number}>`
  align-self: center;
  position: absolute;
  bottom: ${props => props.tabBarHeight + 15}px;
  elevation: ${8};
  box-shadow: 0 4px 4.65px rgba(0,0,0,0.2);
`;

const LoaderWrapper = styled(ScreenWrapper)`
  justify-content: center;
`;

const Loader = (): React.ReactElement => (
  <LoaderWrapper>
    <ActivityIndicator size="large"/>
  </LoaderWrapper>
);

const flatListStyle = {
  paddingBottom: 75,
  paddingHorizontal: 15,
};

/**
 * Displays friends screen
 *
 * @param props - props for component rendering
 */
export default function FriendsScreen({ navigation }: Props): React.ReactElement {
  const authContext = useAuthContext();
  const environment = useRelayEnvironment();
  const { t } = useTranslation();
  const tabBarHeight = useTabBarHeight();

  return (
    <QueryRenderer<FriendsQuery>
      environment={environment}
      query={graphql`
        query FriendsQuery {
            user: me {
              username
              friends {
                id
                firstName
                username
                level
                photo
              }
              friendRequests {
                id
                firstName
                username
                level
                photo
              }
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

        return (
          <Body tabBarHeight={tabBarHeight}>
            <BlueCircle/>
            <Row>
              <BackButton onPress={(): void => navigation.goBack()}>
                <Back/>
              </BackButton>
              <Title>{t('profile.friends')}</Title>
              <TouchableOpacity activeOpacity={1}>
                <FriendRequests/>
                {props.user.friendRequests.length > 0 &&
                  <FriendRequestsBadge>
                    <BadgeText>{props.user.friendRequests.length}</BadgeText>
                  </FriendRequestsBadge>
                }
              </TouchableOpacity>
            </Row>
            <FlatList
              contentContainerStyle={flatListStyle}
              data={[
                ...props.user.friends, ...props.user.friends, ...props.user.friends, ...props.user.friends,
                ...props.user.friends, ...props.user.friends, ...props.user.friends, ...props.user.friends,
                ...props.user.friends, ...props.user.friends, ...props.user.friends, ...props.user.friends,
              ]}
              renderItem={({ item }): React.ReactElement => (
                <FriendButton
                  avatar={item.photo ? { uri: item.photo } : require('../images/lapki.jpg')}
                  level={item.level}
                  name={item.firstName || item.username}
                  username={item.username}/>
              )}
              keyExtractor={(item, index): string => index.toString()}
            />
            <AddButton
              tabBarHeight={tabBarHeight}
              icon={Plus}
              title={'Добавить друга'}
              onPress={() => {}}
            />
          </Body>
        );
      }}
      variables={{}}
    />
  );
}
