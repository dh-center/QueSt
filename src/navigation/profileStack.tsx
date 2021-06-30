import React, { Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/Profile';
import SettingsScreen from '../screens/Settings';
import { ImageSourcePropType } from 'react-native';
import AboutScreen from '../screens/About';
import CardsCollectionScreen from '../screens/CardsCollection';
import FriendsScreen from '../screens/Friends';
import FriendRequestsScreen from '../screens/FriendRequests';
import { FriendRequests_data$key } from '../screens/__generated__/FriendRequests_data.graphql';
import { Spinner } from 'native-base';
import Colors from '../styles/colors';
import FriendAddingScreenWithSuspense from '../screens/FriendsAdding';
import ChangeUsernameScreen from '../screens/ChangeUsername';
import ChangePasswordScreen from '../screens/ChangePassword';
import AchievementsScreenWithSuspense from '../screens/Achievements';

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
   * Props for screen with information about app
   */
  About: undefined;

  /**
   * Achievements screen props
   */
  Achievements: undefined;

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
  return (
    <ProfileStack.Navigator initialRouteName={'Main'} screenOptions={{ headerShown: false }}>
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
      <ProfileStack.Screen name="FriendRequests" component={FriendRequestsScreen} options={{ headerShown: false }}/>
      <ProfileStack.Screen name="FriendAdding" component={FriendAddingScreenWithSuspense} options={{ headerShown: false }}/>
      <ProfileStack.Screen name="Achievements" component={AchievementsScreenWithSuspense} options={{ headerShown: false }}/>
      <ProfileStack.Screen name="CardsCollection">
        {(props) => (
          <Suspense fallback={<Spinner color={Colors.DarkBlue}/>}>
            <CardsCollectionScreen {...props}/>
          </Suspense>
        )}
      </ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
}
