import React from 'react';
import { View, FlatList } from 'react-native';
import { Button, Container, Content, Spinner, Text } from 'native-base';
import { graphql, QueryRenderer } from 'react-relay';
import env from '../enviroment';
import {
  QuestsQuery,
  QuestsQueryResponse,
} from './__generated__/QuestsQuery.graphql';

/**
 * @param props - data with query results
 */
function QuestView(props: QuestsQueryResponse): React.ReactElement {
  return (
    <View>
      <FlatList
        data={props.quests.edges}
        renderItem={({ item }): React.ReactElement => (
          <Button
            large
            block
            rounded
            success
            style={{ margin: 10 }}
          >
            <Text uppercase={false} numberOfLines={2}>
              {item.node.name}
            </Text>
          </Button>
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
              <Content padder>
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
