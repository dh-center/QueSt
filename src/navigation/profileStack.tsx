import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthState } from '../controllers/authController';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/Login';
import SettingsScreen from '../screens/Settings';

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
 * Component for implementing navigation between screens in profile tab
 */
export default function ProfileStackNavigation(): React.ReactElement {
  const authState = useAuthState();

  return (
    <ProfileStack.Navigator>
      {authState.accessToken
        ? <>
          <ProfileStack.Screen name="Main" component={ProfileScreen} options={{ headerShown: false }}/>
          <ProfileStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
        </>
        : <>
          <ProfileStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        </>
      }
    </ProfileStack.Navigator>
  );
}
