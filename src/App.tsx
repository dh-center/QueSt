import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import MainTabsNavigation from './navigation/mainTabs';
import authController from './controllers/authController';

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
    setIsAppInitialized(true);
  };

  useEffect(() => {
    initApp();
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
      <MainTabsNavigation/>
    </>
  );
}

export default App;
