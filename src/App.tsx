import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {QueryRenderer, graphql} from 'react-relay';
import env from './enviroment';
import {AppQuery} from './__generated__/AppQuery.graphql';

class LocationView extends Component {
  render() {
    const name = this.props.location.instances[0].name;
    return (
      <View>
        <Text>{name}</Text>
      </View>
    );
  }
}

// creating the params for the user
const variables = {
  locationId: '5d83443e0cb433003f223be6',
};

/*
  Here is our GraphQL Query that receives a user_id and returns a name and a email
*/
const query = graphql`
  query AppQuery($locationId: ID!) {
    location(id: $locationId) {
      instances {
        name
      }
    }
  }
`;

const App = () => {
  return (
    <QueryRenderer<AppQuery>
      environment={env}
      variables={variables}
      query={query}
      render={({error, props}) => {
        if (error) {
          return (
            <View>
              {' '}
              <Text>Error!!!</Text>{' '}
            </View>
          );
        } else if (props) {
          return <LocationView {...props} />;
        }
        return <ActivityIndicator />;
      }}
    />
  );
};

export default App;
