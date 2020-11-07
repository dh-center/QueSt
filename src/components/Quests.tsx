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
import { QuestsStackParamList } from './AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

/**
 * Type with props of screen 'List' in QuestsStackScreen
 */
type ListScreenNavigationProp = StackNavigationProp<QuestsStackParamList, 'List'>;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  header: {
    height: 69,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 38,
    color: 'rgba(0,0,0,0.8)',
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
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
function QuestView(props: QuestsQueryResponse): React.ReactElement {
  const navigation = useNavigation<ListScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('quests.title')}</Text>
      </View>
      <FlatList
        style={styles.content}
        data={props.quests.edges}
        renderItem={({ item }): React.ReactElement => (
          <TouchableOpacity style={styles.questItem}
            onPress={(): void => navigation.navigate('Description')}
          >
            <Text style={styles.questName}>
              {item.node.name}
            </Text>
            <Image source={require('../images/done.png')} style={styles.icon}/>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index): string => index.toString()}
      />
    </SafeAreaView>
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
          return <QuestView {...props} />;
        }

        return <Spinner />;
      }}
    />
  );
}
