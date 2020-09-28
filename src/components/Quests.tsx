import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import { graphql, QueryRenderer } from 'react-relay';
import env from '../enviroment';
import {
  QuestsQuery,
  QuestsQueryResponse
} from './__generated__/QuestsQuery.graphql';

const styles = StyleSheet.create({
  body: {
    marginLeft: 16,
    marginRight: 16,
  },
  title: {
    fontFamily: 'SF UI Display',
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 38,
    color: '#000000',
    opacity: 0.8,
    marginTop: 14,
    marginBottom: 25,
  },
  button: {
    height: 60,
    backgroundColor: 'rgba(64, 190, 32, 0.5)',
    borderRadius: 15,
    marginBottom: 15,
    paddingRight: 60,
    paddingLeft: 60,
    justifyContent: 'center',
    overflow: 'hidden',
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
 * @param props - data with query results
 */
function QuestView(props: QuestsQueryResponse): React.ReactElement {
  return (
    <View style={styles.body}>
      <Text style={styles.title} >Квесты</Text>
      <FlatList
        data={props.quests.edges}
        renderItem={({ item }): React.ReactElement => (
          <TouchableOpacity style={styles.button}>
            <Text numberOfLines={2} style={styles.questName}>
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
        }
      }
    }
  }
`;

/**
 * Functional component of the quests list
 */
export default function Quests(): React.ReactElement {
  return (
    <QueryRenderer<QuestsQuery>
      environment={env}
      query={query}
      variables={{}}
      render={({ error, props }): React.ReactElement => {
        if (error) {
          console.log(error);

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
