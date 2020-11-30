import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'native-base';
import Quests from './Quests';
import Map from './Map';
import Profile from './Profile';
import QuestInfo from './QuestInfo';
import SettingsScreen from './SettingsScreen';
import { useTranslation } from 'react-i18next';

/**
 * Type with params of screens and their props in QuestsStackScreen
 */
export type QuestsStackParamList = {
    List: undefined;
    Description: {id: string; title: string; description: string | null};
};
const QuestsStack = createStackNavigator<QuestsStackParamList>();

/**
 * Type with params of screens and their props in ProfileStackScreen
 */
export type ProfileStackParamList = {
    Main: undefined;
    Settings: undefined;
};
const ProfileStack = createStackNavigator<ProfileStackParamList>();

/**
 * Component for implementing navigation between screens in quest tab
 */
function QuestsStackScreen(): React.ReactElement {
  return (
    <QuestsStack.Navigator>
      <QuestsStack.Screen name="List" component={Quests} options={{ headerShown: false }}/>
      <QuestsStack.Screen name="Description" component={QuestInfo} options={{ headerShown: false }}/>
    </QuestsStack.Navigator>
  );
}

/**
 * Component for implementing navigation between screens in profile tab
 */
function ProfileStackScreen(): React.ReactElement {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Main" component={Profile} options={{ headerShown: false }}/>
      <ProfileStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
    </ProfileStack.Navigator>
  );
}

/**
 * Type with params of screens and their props in BottomTabNavigator
 */
export type TabParamList = {
  Quests: undefined;
  Map: {questId: string | undefined};
  Profile: undefined;
};
const Tab = createBottomTabNavigator();

/**
 * Functional component for implementing navigation between screens
 */
export default function AppNavigator(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Map" tabBarOptions={{ labelPosition: 'below-icon' }}>
        <Tab.Screen
          name="Quests"
          options={{
            title: t('quests.title').toUpperCase(),
            tabBarIcon: (): React.ReactElement => {
              return <Icon type="FontAwesome5" name="route" />;
            },
          }}
          component={QuestsStackScreen} />
        <Tab.Screen
          name="Map"
          options={{
            title: t('map.title').toUpperCase(),
            tabBarIcon: (): React.ReactElement => {
              return <Icon type="FontAwesome5" name="map-marked-alt" />;
            },
          }}
          component={Map} />
        <Tab.Screen
          name="Profile"
          options={{
            title: t('profile.title').toUpperCase(),
            tabBarIcon: (): React.ReactElement => {
              return <Icon type="FontAwesome5" name="user" />;
            },
          }}
          component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
