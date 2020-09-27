import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import Quests from './Quests';
import Map from './Map';
import PersonList from './PersonList';

const Tab = createBottomTabNavigator();

/**
 * Functional component for implementing navigation between screens
 */
export default function TabsNavigator(): React.ReactElement {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Map" tabBarOptions={{
        style: {
          paddingTop: 10,
          paddingBottom: 10,
          height: 71,
        },
      }}>
        <Tab.Screen
          name="Quest"
          options={{
            title: 'КВЕСТЫ',
            tabBarIcon: (): React.ReactElement => {
              return <Icon type="FontAwesome5" name="route" />;
            },
          }}
          component={Quests} />
        <Tab.Screen
          name="Map"
          options={{
            title: 'КАРТА',
            tabBarIcon: (): React.ReactElement => {
              return <Icon type="FontAwesome5" name="map-marked-alt" />;
            },
          }}
          component={Map} />
        <Tab.Screen
          name="Person"
          options={{
            title: 'ПРОФИЛЬ',
            tabBarIcon: (): React.ReactElement => {
              return <Icon type="FontAwesome5" name="user" />;
            },
          }}
          component={PersonList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
