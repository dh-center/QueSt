import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './components/AppNavigator';

const App = (): React.ReactElement => {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <AppNavigator/>
    </>
  );
};

export default App;
