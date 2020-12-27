import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { graphql, QueryRenderer } from 'react-relay';
import enviroment from '../../enviroment';
import { LocationInstanceQuestBlockQuery } from './__generated__/LocationInstanceQuestBlockQuery.graphql';

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
  return (
    <QueryRenderer<LocationInstanceQuestBlockQuery>
      environment={enviroment}
      query={graphql`
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
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error);

          return null;
        }

        if (!props || !props.locationInstance) {
          return null;
        }

        const location = props.locationInstance.location;

        if (!location.latitude || !location.longitude) {
          return;
        }

        return (
          <MapboxGL.PointAnnotation
            id={props.locationInstance.id}
            title={props.locationInstance.name || ''}
            coordinate={[location.longitude, location.latitude]}
          />
        );
      }}
      variables={{
        id: locationInstanceId,
      }}
    />
  );
}
