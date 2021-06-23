import React, { Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/Profile';
import LoginScreen from '../screens/Login';
import SettingsScreen from '../screens/Settings';
import RegistrationScreen from '../screens/Registration';
import { useAuthContext } from '../contexts/AuthProvider';
import { ImageSourcePropType } from 'react-native';
import AchievementsScreen from '../screens/Achievements';
import AboutScreen from '../screens/About';
import CardsCollectionScreen from '../screens/CardsCollection';
import FriendsScreen from '../screens/Friends';
import FriendRequestsScreen from '../screens/FriendRequests';
import { FriendRequests_data$key } from '../screens/__generated__/FriendRequests_data.graphql';
import { Spinner } from 'native-base';
import Colors from '../styles/colors';
import FriendAddingScreenWithSuspense from '../screens/FriendsAdding';
import SendEmailScreen from '../screens/SendEmail';
import InputCodeScreen from '../screens/InputCode';
import SetNewPasswordScreen from '../screens/SetNewPassword';
import ChangeUsernameScreen from '../screens/ChangeUsername';
import ChangePasswordScreen from '../screens/ChangePassword';

/**
 * Type with params of screens and their props in ProfileStackScreen
 */
export type ProfileStackParamList = {
  /**
   * ChangeUsername screen props
   */
  ChangeUsername: undefined;

  /**
   * ChangeUsername screen props
   */
  ChangePassword: { email: string };

  /**
   * Main screen props
   */
  Main: undefined;

  /**
   * Settings screen props
   */
  Settings: { avatar: ImageSourcePropType, name: string, username: string, email?: string };

  /**
   * Login screen props
   */
  Login: undefined;

  /**
   * Registration screen props
   */
  Registration: undefined;

  /**
   * SendEmail screen props
   */
  SendEmail: undefined;

  /**
   * InputCode screen props
   */
  InputCode: { email: string };

  /**
   * SetNewPassword screen props
   */
  SetNewPassword: { email: string, code: string };

  /**
   * Achievements screen props
   */
  Achievements: undefined;

  /**
   * Props for screen with information about app
   */
  About: undefined;

  /**
   * CardsCollection screen props
   */
  CardsCollection: undefined;

  /**
   * Friends screen props
   */
  Friends: undefined;

  /**
   * FriendRequests screen props
   */
  FriendRequests: { fragmentRef: FriendRequests_data$key };

  /**
   * FriendAdding screen props
   */
  FriendAdding: undefined;
};

const ProfileStack = createStackNavigator<ProfileStackParamList>();

/**
 * Component for implementing navigation between screens in profile tab
 */
export default function ProfileStackNavigation(): React.ReactElement {
  const authContext = useAuthContext();

  return (
    <ProfileStack.Navigator initialRouteName={'Login'} screenOptions={{ headerShown: false }}>
      {authContext.state.accessToken
        ? <>
          <ProfileStack.Screen name="Main" component={ProfileScreen}/>
          <ProfileStack.Screen name="ChangeUsername" component={ChangeUsernameScreen}/>
          <ProfileStack.Screen name="ChangePassword" component={ChangePasswordScreen}/>
          <ProfileStack.Screen name="Settings" component={SettingsScreen}/>
          <ProfileStack.Screen name="About" component={AboutScreen}/>
          <ProfileStack.Screen name="Friends">
            {(props) => (
              <Suspense fallback={<Spinner color={Colors.DarkBlue}/>}>
                <FriendsScreen {...props}/>
              </Suspense>
            )}
          </ProfileStack.Screen>
          <ProfileStack.Screen name="FriendRequests" component={FriendRequestsScreen}/>
          <ProfileStack.Screen name="FriendAdding" component={FriendAddingScreenWithSuspense}/>
          <ProfileStack.Screen name="Achievements" component={AchievementsScreen}/>
          <ProfileStack.Screen name="CardsCollection">
            {(props) => (
              <Suspense fallback={<Spinner color={Colors.DarkBlue}/>}>
                <CardsCollectionScreen {...props}/>
              </Suspense>
            )}
          </ProfileStack.Screen>
        </>
        : <>
          <ProfileStack.Screen name="Login" component={LoginScreen}/>
          <ProfileStack.Screen name="Registration" component={RegistrationScreen}/>
          <ProfileStack.Screen name="SendEmail" component={SendEmailScreen}/>
          <ProfileStack.Screen name="InputCode" component={InputCodeScreen}/>
          <ProfileStack.Screen name="SetNewPassword" component={SetNewPasswordScreen}/>
        </>
      }
    </ProfileStack.Navigator>
  );
}
