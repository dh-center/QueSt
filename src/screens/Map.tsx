import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { MAPBOX_ACCESS_TOKEN } from '@env';
import TestView from './TestView';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../navigation/AppNavigator';

/**
 * Type with props of screen 'Map' in BottomTabNavigator
 */
type Props = BottomTabScreenProps<TabParamList, 'Map'>;

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    height: '100%',
    width: '100%',
  },
});

/**
 * Renders map for quests
 */
export default function Map({ route }: Props): React.ReactElement {
  return (
    <View style={styles.page}>
      <MapboxGL.MapView style={styles.map} />
      {route.params?.questId && <TestView />}
    </View>
  );
}
