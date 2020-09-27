import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

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
 * Functional component of the map
 */
export default function MapList(): React.ReactElement {
  return (
    <View style={styles.page}>
      <MapboxGL.MapView style={styles.map} />
    </View>
  );
}
