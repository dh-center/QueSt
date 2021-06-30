import React  from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import RegistrationScreen from '../screens/Registration';
import SendEmailScreen from '../screens/SendEmail';
import InputCodeScreen from '../screens/InputCode';
import SetNewPasswordScreen from '../screens/SetNewPassword';
import { NavigationContainer } from '@react-navigation/native';

/**
 * Type with params of screens and their props in AuthStackParamList
 */
export type AuthStackParamList = {
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
};

const AuthStack = createStackNavigator<AuthStackParamList>();

/**
 * Component for implementing navigation between screens with login, registration etc.
 */
export default function AuthStackNavigation(): React.ReactElement {
  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName={'Login'} screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={LoginScreen}/>
        <AuthStack.Screen name="Registration" component={RegistrationScreen}/>
        <AuthStack.Screen name="SendEmail" component={SendEmailScreen}/>
        <AuthStack.Screen name="InputCode" component={InputCodeScreen}/>
        <AuthStack.Screen name="SetNewPassword" component={SetNewPasswordScreen}/>
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
