import React, { Suspense, useState } from 'react';
import { ProfileStackParamList } from '../navigation/profileStack';
import { StackScreenProps } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import useTabBarHeight from '../components/utils/useTabBarHeight';
import styled from 'styled-components/native';
import Colors from '../styles/colors';
import BlueCircle15 from '../images/blueCircle15.svg';
import { StyledFonts } from '../styles/textStyles';
import { commitMutation, graphql } from 'react-relay';
import { useLazyLoadQuery, useRelayEnvironment } from 'react-relay/hooks';
import { Spinner } from 'native-base';
import Input from '../components/ui/Input';
import Search from '../images/search.svg';
import { FriendsAddingQuery } from './__generated__/FriendsAddingQuery.graphql';
import { FlatList } from 'react-native';
import FriendButton from '../components/FriendButton';
import BackArrow from '../components/BackArrow';

type Props = StackScreenProps<ProfileStackParamList, 'FriendAdding'>;

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

const Content = styled.View`
  padding: 0 15px;
`;

const SearchInput = styled(Input)`
  padding-left: 20px;
  padding-right: 0;
`;

const flatListStyle = {
  marginTop: 15,
};

const flatListContentStyle = {
  marginTop: -13,
  paddingHorizontal: 15,
  paddingBottom: 15,
};

const addMutation = graphql`
  mutation FriendsAddingMutation($userId: GlobalId!) {
    user {
      sendFriendRequest(id: $userId) {
        record {
          id
          friends {
            id
            ...FriendButton_data
          }
        }
      }
    }
  }
`;

/**
 * Displays friends screen
 *
 * @param props - props for component rendering
 */
function FriendAddingScreen({ navigation }: Props): React.ReactElement {
  const { t } = useTranslation();
  const tabBarHeight = useTabBarHeight();
  const environment = useRelayEnvironment();
  const [searchString, setSearchString] = useState('');

  const data = useLazyLoadQuery<FriendsAddingQuery>(
    graphql`
      query FriendsAddingQuery($username: String!, $needFetch: Boolean!) {
        usersSearch(username: $username) @include(if: $needFetch) {
          id
          ...FriendButton_data
        }
      }
    `,
    { username: searchString,
      needFetch: searchString.length > 2 }
  );

  return (
    <Body tabBarHeight={tabBarHeight}>
      <BlueCircle/>
      <Row>
        <BackButton onPress={(): void => navigation.goBack()}>
          <BackArrow/>
        </BackButton>
        <Title>{t('profile.friendAdding')}</Title>
      </Row>
      <Content>
        <SearchInput
          icon={Search}
          placeholder={t('quests.enterAnswer')}
          value={searchString}
          onChangeText={username => setSearchString(username)}
        />
      </Content>
      <FlatList
        style={flatListStyle}
        contentContainerStyle={flatListContentStyle}
        data={data.usersSearch}
        renderItem={({ item }): React.ReactElement => (
          <FriendButton
            forAddingScreen
            userData={item}
            onAddPress={(): void => {
              commitMutation(
                environment,
                {
                  mutation: addMutation,
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

/**
 * Displays friends screen in Suspense
 *
 * @param props - props for component rendering
 */
export default function FriendAddingScreenWithSuspense(props: Props): React.ReactElement {
  return (
    <Suspense fallback={<Spinner color={Colors.DarkBlue}/>}>
      <FriendAddingScreen {...props}/>
    </Suspense>
  );
}
