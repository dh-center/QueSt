import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { graphql, QueryRenderer } from 'react-relay';
import enviroment from '../../enviroment';
import { LocationInstanceQuestBlockQuery } from './__generated__/LocationInstanceQuestBlockQuery.graphql';

interface QuestLocationInstanceBlockProps {
  locationInstanceId: string;
}

/**
 * @param props
 */
export default function QuestLocationInstanceBlock({ locationInstanceId }: QuestLocationInstanceBlockProps): React.ReactElement | null {
  console.log(locationInstanceId);

  return (
    <QueryRenderer<LocationInstanceQuestBlockQuery>
      environment={enviroment}
      query={graphql`
        query LocationInstanceQuestBlockQuery($id: GlobalId!) {
            locationInstance(id: $id) {
              id
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
            id={'we'}
            title="Test"
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
