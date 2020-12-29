import React, { PropsWithChildren, useState, useEffect } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import styled from 'styled-components/native';
import { Alert, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';

const MapboxView = styled(MapboxGL.MapView)`
  height: 100%;
  width: 100%;
`;

/**
 * Component that renders map
 *
 * @param props - props for component rendering
 */
export default function MapView(props: PropsWithChildren<unknown>): React.ReactElement {
  const [hasPermission, setHasPermission] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      setHasPermission(true);

      return;
    }
    MapboxGL.requestAndroidLocationPermissions()
      .then(per => setHasPermission(per))
      .catch(() => Alert.alert(t('map.permissionDenied')));
  }, [ t ]);

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
      {hasPermission && <MapboxGL.UserLocation/>}
      {props.children}
    </MapboxView>
  );
}
