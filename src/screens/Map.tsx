import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { MAPBOX_ACCESS_TOKEN } from '@env';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../navigation/mainTabs';
import Colors from '../styles/colors';
import QuestWalkthroughRenderer from '../components/QuestWalkthroughRenderer';

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
 * Renders map for quests
 *
 * @param props - props for component rendering
 */
export default function MapScreen({ route }: Props): React.ReactElement {
  if (route.params?.questId) {
    return <QuestWalkthroughRenderer questId={route.params.questId}/>;
  }

  return (
    <View style={styles.page}>
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
    </View>
  );
}
