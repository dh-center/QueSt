import React, { useEffect } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import CustomMarker from '../../images/customMarker.svg';
import useTargetLocationContext from '../../contexts/TargetLocationContext';

/**
 * Props for QuestLocationInstanceBlock component
 */
interface QuestLocationFromCoordsBlockProps {
  /**
   * Location latitude
   */
  latitude: number;

  /**
   * Location longitude
   */
  longitude: number;
}

/**
 * Renders location pointer on map
 *
 * @param props - props for component rendering
 */
export default function QuestLocationFromCoordsBlock({ latitude, longitude }: QuestLocationFromCoordsBlockProps): React.ReactElement | null {
  const { setTargetLocation } = useTargetLocationContext();

  // offset custom marker to display it correctly
  const markerOffset = -21.5;

  useEffect(() => {
    setTargetLocation({
      latitude: latitude,
      longitude: longitude,
    });
  }, [latitude, longitude]);

  return (
    <>
      <MapboxGL.PointAnnotation
        id={`${longitude}${latitude}`}
        coordinate={[longitude, latitude]}
      >
        <CustomMarker style={{ transform: [ { translateY: markerOffset } ] }}/>
      </MapboxGL.PointAnnotation>
      <MapboxGL.Camera
        animationDuration={1000}
        centerCoordinate={[longitude, latitude]}
        zoomLevel={14}
      />
    </>
  );
}
