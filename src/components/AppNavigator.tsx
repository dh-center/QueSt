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
import Login from './Login';
import { useAuthState } from '../controllers/authController';

/**
 * Type with params of screens and their props in QuestsStackScreen
 */
export type QuestsStackParamList = {
    List: undefined;
    Description: {title: string; description: string | null};
};
const QuestsStack = createStackNavigator<QuestsStackParamList>();

/**
 * Type with params of screens and their props in ProfileStackScreen
 */
export type ProfileStackParamList = {
    Main: undefined;
    Settings: undefined;
    Login: undefined;
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
  const authState = useAuthState();

  return (
    <ProfileStack.Navigator>
      {authState.accessToken
        ? <>
          <ProfileStack.Screen name="Main" component={Profile} options={{ headerShown: false }}/>
          <ProfileStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
        </>
        : <>
          <ProfileStack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        </>
      }
    </ProfileStack.Navigator>
  );
}

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
