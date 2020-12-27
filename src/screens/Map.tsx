import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { MAPBOX_ACCESS_TOKEN } from '@env';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../navigation/mainTabs';
import QuestWalkthroughRenderer from '../components/QuestWalkthroughRenderer';
import styled from 'styled-components/native';
import MapView from '../components/MapView';
import Colors from '../styles/colors';

/**
 * Type with props of screen 'Map' in BottomTabNavigator
 */
type Props = BottomTabScreenProps<TabParamList, 'Map'>;

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

const Page = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.Background};
`;

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
    <Page>
      <MapView/>
    </Page>
  );
}
