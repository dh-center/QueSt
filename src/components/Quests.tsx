import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
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

type ProfileScreenNavigationProp = StackNavigationProp<
    QuestsStackParamList,
    'List'
>;

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
    fontFamily: 'SF UI Display',
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
    fontFamily: 'SF UI Display',
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 20,
    color: 'rgba(0,0,0,0.8)',
  },
});

/**
 * Component of the quests list
 *
 * @param props - data with query results
 */
function QuestView(props: QuestsQueryResponse): React.ReactElement {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Text style={styles.title}>Квесты</Text>
      </View>
      <FlatList
        style={{
          paddingLeft: 16,
          paddingRight: 16,
        }}
        data={props.quests.edges}
        renderItem={({ item }): React.ReactElement => (
          <TouchableOpacity style={styles.questItem}
            onPress={(): void => navigation.navigate('Description')}
          >
            <Text style={styles.questName}>
              {item.node.name}
            </Text>
            <Image source={require('../images/done.png')} style={{
              position: 'absolute',
              right: -9,
              top: -9,
            }}/>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index): string => index.toString()}
      />
    </View>
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
