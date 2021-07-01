import React from 'react';
import { useAuthContext } from '../contexts/AuthProvider';
import MainTabsNavigation from './mainTabs';
import AuthStackNavigation from './authStack';

/**
 * Main navigation component
 */
export default function AppNavigator(): React.ReactElement {
  const authContext = useAuthContext();

  return authContext.state.accessToken ? <MainTabsNavigation/> : <AuthStackNavigation/>;
}
