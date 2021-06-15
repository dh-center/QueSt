import React from 'react';
import { ProfileStackParamList } from '../navigation/profileStack';
import { StackScreenProps } from '@react-navigation/stack';
import Back from '../images/back.svg';
import styled from 'styled-components/native';
import Colors from '../styles/colors';
import BlueCircle15 from '../images/blueCircle15.svg';
import { StyledFonts } from '../styles/textStyles';
import { useTranslation } from 'react-i18next';
import useTabBarHeight from '../components/utils/useTabBarHeight';
import { FlatList } from 'react-native';
import FriendButton from '../components/FriendButton';
import { commitMutation, graphql } from 'react-relay';
import { useFragment, useRelayEnvironment } from 'react-relay/hooks';

type Props = StackScreenProps<ProfileStackParamList, 'FriendRequests'>;

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

const flatListStyle = {
  paddingBottom: 75,
  paddingHorizontal: 15,
};

const declineMutation = graphql`
  mutation FriendRequestsDeclineMutation($userId: GlobalId!) {
    user {
      rejectFriendRequest(id: $userId) {
        record {
          id
          friends {
            id
            ...FriendButton_data
          }
          friendRequests {
            id
          }
        }
      }
    }
  }
`;

const acceptMutation = graphql`
  mutation FriendRequestsAcceptMutation($userId: GlobalId!) {
    user {
      acceptFriendRequest(id: $userId) {
        record {
          id
          friends {
            id
            ...FriendButton_data
          }
          friendRequests {
            id
          }
        }
      }
    }
  }
`;

/**
 * Displays friendRequests screen
 *
 * @param props - props for component rendering
 */
export default function FriendRequestsScreen({ route, navigation }: Props): React.ReactElement {
  const { t } = useTranslation();
  const tabBarHeight = useTabBarHeight();
  const environment = useRelayEnvironment();

  const data = useFragment(graphql`
    fragment FriendRequests_data on User {
      friendRequests {
        id
        ...FriendButton_data
      }
    }
  `, route.params.fragmentRef);

  return (
    <Body tabBarHeight={tabBarHeight}>
      <BlueCircle/>
      <Row>
        <BackButton onPress={(): void => navigation.goBack()}>
          <Back/>
        </BackButton>
        <Title>{t('profile.friendRequests')}</Title>
      </Row>
      <FlatList
        contentContainerStyle={flatListStyle}
        data={data.friendRequests}
        renderItem={({ item }): React.ReactElement => (
          <FriendButton
            userData={item}
            request
            onDeclinePress={(): void => {
              commitMutation(
                environment,
                {
                  mutation: declineMutation,
                  variables: { userId: item.id },
                  onError: err => console.error(err),
                }
              );
            }}
            onAcceptPress={(): void => {
              commitMutation(
                environment,
                {
                  mutation: acceptMutation,
                  variables: { userId: item.id },
                  onError: err => console.error(err),
                }
              );
            }}
          />
        )}
        keyExtractor={(item, index): string => index.toString()}
      />
    </Body>
  );
}
