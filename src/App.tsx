import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './components/AppNavigator';

/**
 * Imports i18next plugin to react native app
 */
import './i18n';

const App = (): React.ReactElement => {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <AppNavigator/>
    </>
  );
};

export default App;
