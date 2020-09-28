import React from 'react';
import { StatusBar } from 'react-native';
import TabsNavigator from './components/TabsNavigator';

const App = (): React.ReactElement => {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <TabsNavigator/>
    </>
  );
};

export default App;
