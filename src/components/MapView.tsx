import React, { PropsWithChildren, useState, useEffect } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import styled from 'styled-components/native';
import {Alert, Platform} from 'react-native';

const MapboxView = styled(MapboxGL.MapView)`
  height: 100%;
  width: 100%;
`;

/**
 * Function for request location permission
 */
export async function requestLocationPermission(): Promise<boolean> {
  try {
    return await MapboxGL.requestAndroidLocationPermissions();
  } catch (err) {
    Alert.alert('Something went wrong :c');

    return false;
  }
}

/**
 * Component that renders map
 *
 * @param props - props for component rendering
 */
export default function MapView(props: PropsWithChildren<unknown>): React.ReactElement {
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      setPermission(true);

      return;
    }
    const task = async (): Promise<void> => {
      const per = await requestLocationPermission();

      setPermission(per);
    };

    task().then();
  }, []);

  return (
    <MapboxView>
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
      {props.children}
    </MapboxView>
  );
}
