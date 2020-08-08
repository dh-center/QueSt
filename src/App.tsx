/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {QueryRenderer, graphql} from 'react-relay';
import env from './Enviroment';
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

// IMPORTANT: We need to 'export default' the query renderer to the query run
const App = () => {
  return (
    <QueryRenderer<AppQuery>
      environment={env} //Here is the environment that we configured before
      variables={variables} //Passing the params/variables that we created
      query={query} //And here goes your GraphQL query
      render={({error, props}) => {
        if (error) {
          //Here we pass our error view in case of query errors or fetch failture
          return (
            <View>
              {' '}
              <Text>Error!!!</Text>{' '}
            </View>
          );
        } else if (props) {
          //Here we pass our component that should be rendered
          // @ts-ignore
          return <LocationView {...props} />;
        }
        //Here goes our activity indicator or loading view
        return <ActivityIndicator />;
      }}
    />
  );
};

export default App;
