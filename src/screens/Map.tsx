import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { MAPBOX_ACCESS_TOKEN } from '@env';
import TestView from '../components/TestView';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../navigation/mainTabs';
import { Modalize } from 'react-native-modalize';
import Colors from '../styles/colors';

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
  testModal: {
    overflow: 'hidden',
    backgroundColor: Colors.Background,
  },
});

/**
 * Function for request location permission
 */
export async function requestLocationPermission(): Promise<boolean> {
  try {
    return await MapboxGL.requestAndroidLocationPermissions();
  } catch (err) {
    return false;
  }
}

/**
 * Renders map for quests
 *
 * @param props - props for component rendering
 */
export default function MapScreen({ route: _route }: Props): React.ReactElement {
  const modalizeRef = useRef<Modalize>(null);
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    const task = async (): Promise<void> => {
      const per = await requestLocationPermission();

      setPermission(per);
    };

    task().then();
  }, []);

  return (
    <View style={styles.page}>
      <Modalize
        handlePosition={'inside'}
        ref={modalizeRef}
        alwaysOpen={150}
        modalStyle={styles.testModal}
      >
        <TestView/>
      </Modalize>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          defaultSettings={{
            centerCoordinate: [30.3462, 59.9296],
            zoomLevel: 9,
          }}
          maxBounds={{
            ne: [31.263740364566985, 60.282501691026226],
            sw: [29.281524984914313, 59.62023377214044],
          }}
          minZoomLevel={8.5}
        />
        {permission && <MapboxGL.UserLocation/>}
      </MapboxGL.MapView>
    </View>
  );
}
