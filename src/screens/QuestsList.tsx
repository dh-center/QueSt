import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Spinner } from 'native-base';
import { graphql, QueryRenderer } from 'react-relay';
import env from '../environment';
import {
  QuestsListQuery,
  QuestsListQueryResponse
} from './__generated__/QuestsListQuery.graphql';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { QuestsStackParamList } from '../navigation/questsStack';
import styled from 'styled-components/native';
import { StyledFonts } from '../styles/textStyles';
import Colors from '../styles/colors';
import BlueCircle from '../images/blueCircle15.svg';
import QuestsListItem from '../components/QuestsListItem';

/**
 * Type with props of screen 'List' in QuestsStackScreen
 */
type ListScreenNavigationProp = StackNavigationProp<QuestsStackParamList, 'List'>;

const Body = styled.View`
  background-color: ${Colors.Background};
  flex: 1;
  align-items: stretch;
  padding-bottom: 80px;
`;

const SpinnerView = styled.View`
  background-color: ${Colors.Background};
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Circle = styled(BlueCircle)`
  position: absolute;
  top: -376px;
  right: -169px;
`;

const Title = styled.Text`
  ${StyledFonts.roboto};
  font-size: 28px;
  line-height: 28px;
  color: ${Colors.Black};
  margin: 74px 15px 25px;
`;

const ErrorText = styled.Text`
  ${StyledFonts.uiWebMedium};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
  margin: 0 15px;
`;

/**
 * Component of the quests list
 *
 * @param props - data with query results
 */
function QuestsListScreen(props: QuestsListQueryResponse & {retry: (() => void) | null}): React.ReactElement {
  const navigation = useNavigation<ListScreenNavigationProp>();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Body>
      <Circle/>
      <FlatList
        data={props.quests.edges}
        renderItem={({ item, index }): React.ReactElement => (
          <>
            {(index === 0) && <Title>{t('quests.title')}</Title>}
            <QuestsListItem
              onPress={(): void => navigation.navigate('Description', {
                id: item.node.id,
                title: item.node.name,
                description: item.node.description,
                locked: item.node.questProgressState === 'LOCKED',
              })
              }
              name={item.node.name}
              type={item.node.type}
              progressState={item.node.questProgressState}
            />
          </>
        )}
        refreshing={isLoading}
        onRefresh={(): void => {
          setIsLoading(true);
          if (props.retry) {
            props.retry();
          }
          /**
           * @todo set false only when receiving data
           */
          setIsLoading(false);
        }}
        keyExtractor={(item, index): string => index.toString()}
      />
    </Body>
  );
}

const query = graphql`
  query QuestsListQuery {
    quests {
      edges {
        node {
          id
          name
          description
          type
          questProgressState
        }
      }
    }
  }
`;

/**
 * Functional component of the query result
 */
export default function Quests(): React.ReactElement {
  return (
    <QueryRenderer<QuestsListQuery>
      environment={env}
      query={query}
      variables={{}}
      render={({ error, props, retry }): React.ReactElement => {
        if (error) {
          return (
            <Body>
              <Title>
                К сожалению, произошла ошибка 😔
              </Title>
              <ErrorText>
                Пожалуйста, попробуйте повторить попытку спустя некоторое время
              </ErrorText>
            </Body>
          );
        }
        if (props) {
          return <QuestsListScreen {...props} retry={retry} />;
        }

        return (
          <SpinnerView>
            <Spinner color={Colors.DarkBlue}/>
          </SpinnerView>
        );
      }}
    />
  );
}
