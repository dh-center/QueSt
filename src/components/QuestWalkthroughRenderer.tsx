import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { graphql, QueryRenderer } from 'react-relay';
import enviroment from '../enviroment';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Colors from '../styles/colors';
import { QuestWalkthroughRendererQuery } from './__generated__/QuestWalkthroughRendererQuery.graphql';
import { Modalize } from 'react-native-modalize';
import TestView from './TestView';

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

interface QuestWalkthroughRendererProps {
  questId: string;
}

/**
 * Component that renders quest blocks
 *
 * @param props - props for component rendering
 */
export default function QuestWalkthroughRenderer({ questId }: QuestWalkthroughRendererProps): React.ReactElement {
  const modalizeRef = useRef<Modalize>(null);

  return (
    <QueryRenderer<QuestWalkthroughRendererQuery>
      environment={enviroment}
      query={graphql`
            query QuestWalkthroughRendererQuery($questId: GlobalId!) {
                quest(id: $questId) {
                    data {
                        blocks
                        time
                        version
                    }
                }
            }
      `}
      render={({ error, props }) => {
        if (error) {
          return <Text>Error</Text>;
        }

        if (!props) {
          return <Text>Loading</Text>;
        }

        return (
          <View>
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
            </MapboxGL.MapView>
            <Modalize
              handlePosition={'inside'}
              ref={modalizeRef}
              alwaysOpen={150}
              modalStyle={styles.testModal}
            >
              <TestView/>
            </Modalize>
          </View>
        );
      }}
      variables={{
        questId,
      }}
    />

  );
}
