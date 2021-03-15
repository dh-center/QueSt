import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/Profile';
import LoginScreen from '../screens/Login';
import SettingsScreen from '../screens/Settings';
import RegistrationScreen from '../screens/Registration';
import {useAuthContext} from "../contexts/AuthProvider";

/**
 * Type with params of screens and their props in ProfileStackScreen
 */
export type ProfileStackParamList = {
  /**
   * Main screen props
   */
  Main: undefined;

  /**
   * Settings screen props
   */
  Settings: undefined;

  /**
   * Login screen props
   */
  Login: undefined;

  /**
   * Registration screen props
   */
  Registration: undefined;
};

const ProfileStack = createStackNavigator<ProfileStackParamList>();

/**
 * Component for implementing navigation between screens in profile tab
 */
export default function ProfileStackNavigation(): React.ReactElement {
  const authContext = useAuthContext();

  return (
    <ProfileStack.Navigator>
      {authContext.state.accessToken
        ? <>
          <ProfileStack.Screen name="Main" component={ProfileScreen} options={{ headerShown: false }}/>
          <ProfileStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
        </>
        : <>
          <ProfileStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
          <ProfileStack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }}/>
        </>
      }
    </ProfileStack.Navigator>
  );
}
