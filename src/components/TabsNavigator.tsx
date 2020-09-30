import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import Quests from './Quests';
import Map from './Map';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

/**
 * Functional component for implementing navigation between screens
 */
export default function TabsNavigator(): React.ReactElement {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Map">
        <Tab.Screen
          name="Quests"
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
          name="Profile"
          options={{
            title: 'ПРОФИЛЬ',
            tabBarIcon: (): React.ReactElement => {
              return <Icon type="FontAwesome5" name="user" />;
            },
          }}
          component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
