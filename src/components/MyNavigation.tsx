import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import Quests from './Quests';
import MapList from './MapList';
import PersonList from './PersonList';

const Tab = createBottomTabNavigator();

/**
 * Functional component for implementing navigation between screens
 */
export default function MyNavigation(): React.ReactElement {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Map">
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
          component={MapList} />
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
