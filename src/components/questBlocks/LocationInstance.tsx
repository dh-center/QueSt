import React, { useEffect } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { graphql } from 'react-relay';
import { LocationInstanceQuestBlockQuery } from './__generated__/LocationInstanceQuestBlockQuery.graphql';
import { useLazyLoadQuery } from 'react-relay/hooks';
import CustomMarker from '../../images/customMarker.svg';
import useTargetLocationContext from '../../contexts/TargetLocationContext';

/**
 * Props for QuestLocationInstanceBlock component
 */
interface QuestLocationInstanceBlockProps {
  /**
   * Location instance id to fetch and display
   */
  locationInstanceId: string;
}

/**
 * Renders location pointer on map
 *
 * @param props - props for component rendering
 */
export default function QuestLocationInstanceBlock({ locationInstanceId }: QuestLocationInstanceBlockProps): React.ReactElement | null {
  const { setTargetLocation } = useTargetLocationContext();
  const data = useLazyLoadQuery<LocationInstanceQuestBlockQuery>(
    graphql`
    query LocationInstanceQuestBlockQuery($id: GlobalId!) {
      locationInstance(id: $id) {
        id
        name
        location {
          id
          latitude
          longitude
        }
      }
    }
  `,
    {
      id: locationInstanceId,
    });

  // offset custom marker to display it correctly
  const markerOffset = -21.5;

  useEffect(() => {
    if (location.latitude && location.longitude) {
      setTargetLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  }, [ data.locationInstance ]);

  if (!data.locationInstance) {
    return null;
  }

  const location = data.locationInstance.location;

  if (!location.latitude || !location.longitude) {
    return null;
  }

  return (
    <>
      <MapboxGL.PointAnnotation
        id={data.locationInstance.id}
        title={data.locationInstance.name || ''}
        coordinate={[location.longitude, location.latitude]}
      >
        <CustomMarker style={{ transform: [ { translateY: markerOffset } ] }}/>
      </MapboxGL.PointAnnotation>
      <MapboxGL.Camera
        animationDuration={1000}
        centerCoordinate={[location.longitude, location.latitude]}
        zoomLevel={14}
      />
    </>
  );
}
