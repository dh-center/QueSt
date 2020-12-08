import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import { graphql, QueryRenderer } from 'react-relay';
import env from '../enviroment';
import {
  QuestsQuery,
  QuestsQueryResponse
} from './__generated__/QuestsQuery.graphql';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { QuestsStackParamList } from '../navigation/questsStack';
import ScreenWrapper from '../components/utils/ScreenWrapper';

/**
 * Type with props of screen 'List' in QuestsStackScreen
 */
type ListScreenNavigationProp = StackNavigationProp<QuestsStackParamList, 'List'>;

const styles = StyleSheet.create({
  loading: {
    backgroundColor: '#ffffff',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 69,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  title: {
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 38,
    color: 'rgba(0,0,0,0.8)',
  },
  questItem: {
    minHeight: 60,
    height: 'auto',
    backgroundColor: 'rgba(64, 190, 32, 0.5)',
    borderRadius: 15,
    marginBottom: 15,
    paddingTop: 15,
    paddingRight: 60,
    paddingBottom: 15,
    paddingLeft: 60,
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  questName: {
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 20,
    color: 'rgba(0,0,0,0.8)',
  },
  icon: {
    position: 'absolute',
    height: 62,
    width: 62,
    right: -9,
    top: -9,
  },
});

/**
 * Component of the quests list
 *
 * @param props - data with query results
 */
function QuestsListScreen(props: QuestsQueryResponse): React.ReactElement {
  const navigation = useNavigation<ListScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.title}>{t('quests.title')}</Text>
      </View>
      <FlatList
        data={props.quests.edges}
        renderItem={({ item }): React.ReactElement => (
          <TouchableOpacity style={styles.questItem}
            onPress={(): void => navigation.navigate('Description', {
              id: item.node.id,
              title: item.node.name,
              description: item.node.description,
            })
            }
          >
            <Text style={styles.questName}>
              {item.node.name}
            </Text>
            <Image source={require('../images/done.png')} style={styles.icon}/>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index): string => index.toString()}
      />
    </ScreenWrapper>
  );
}

const query = graphql`
  query QuestsQuery {
    quests {
      edges {
        node {
          id
          name
          description
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
    <QueryRenderer<QuestsQuery>
      environment={env}
      query={query}
      variables={{}}
      render={({ error, props }): React.ReactElement => {
        if (error) {
          return (
            <Container>
              <Content>
                <Text>Квест не найден</Text>
              </Content>
            </Container>
          );
        } else if (props) {
          return <QuestsListScreen {...props} />;
        }

        return (
          <View style={styles.loading}>
            <Spinner />
          </View>
        );
      }}
    />
  );
}
