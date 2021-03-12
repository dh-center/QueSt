import React, { useEffect, useState } from 'react';
import {Platform, StatusBar} from 'react-native';
import MainTabsNavigation from './navigation/mainTabs';
import authController from './controllers/authController';
import VKLogin from 'react-native-vkontakte-login';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { VK_APP_ID } from '@env';
import SplashScreen from 'react-native-splash-screen';

/**
 * Imports i18next plugin to react native app
 */
import './i18n';

/**
 * Main application component
 */
function App(): React.ReactElement {
  const [isAppInitialized, setIsAppInitialized] = useState(false);

  const initApp = async (): Promise<void> => {
    await authController.init();
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
    initApp().finally(() => setIsAppInitialized(true));
    VKLogin.initialize(VK_APP_ID);
  }, []);

  if (!isAppInitialized) {
    return (
      (
        <>
          <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        </>
      )
    );
  }

  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      <SafeAreaProvider>
        <MainTabsNavigation/>
      </SafeAreaProvider>
    </>
  );
}

export default App;
