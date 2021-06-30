import React  from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider  from './contexts/AuthProvider';
import RelayEnvProvider from './contexts/RelayEnvProvider';
import AppNavigator from './navigation/AppNavigator';

/**
 * Imports i18next plugin to react native app
 */
import './i18n';

/**
 * Main application component
 */
function App(): React.ReactElement {
  return (
    <AuthProvider>
      <RelayEnvProvider>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
        <SafeAreaProvider>
          <AppNavigator/>
        </SafeAreaProvider>
      </RelayEnvProvider>
    </AuthProvider>
  );
}

export default App;
