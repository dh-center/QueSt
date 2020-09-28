import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'native-base';
import Quests from './Quests';
import Map from './Map';
import PersonList from './PersonList';
import QuestInfo from './QuestInfo';

export type QuestsStackParamList = {
    List: undefined;
    Description: undefined;
};
const QuestsStack = createStackNavigator<QuestsStackParamList>();

/**
 *
 */
function QuestsStackScreen(): React.ReactElement {
  return (
    <QuestsStack.Navigator>
      <QuestsStack.Screen name="List" component={Quests} options={{ headerShown: false }}/>
      <QuestsStack.Screen name="Description" component={QuestInfo} options={{ headerShown: false }}/>
    </QuestsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

/**
 * Functional component for implementing navigation between screens
 */
export default function AppNavigator(): React.ReactElement {
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
          component={QuestsStackScreen} />
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
