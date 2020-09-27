import React from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: Dimensions.get('window').height - 71 - (StatusBar.currentHeight || 0),
    width: Dimensions.get('window').width,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

/**
 * Functional component of the map
 */
export default function MapList(): React.ReactElement {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} />
      </View>
    </View>
  );
}
