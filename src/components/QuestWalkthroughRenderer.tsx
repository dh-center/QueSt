import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createFragmentContainer, graphql, QueryRenderer } from 'react-relay';
import enviroment from '../enviroment';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Colors from '../styles/colors';
import { QuestWalkthroughRendererQuery } from './__generated__/QuestWalkthroughRendererQuery.graphql';
import { Modalize } from 'react-native-modalize';
import { QuestWalkthroughRenderer_quest } from './__generated__/QuestWalkthroughRenderer_quest.graphql';
import { QuestBlock, TextQuestBlock } from '../types/questData';
import QuestTextBlock from './questBlocks/Text';

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

interface QuestWalkthroughContentProps {
  quest?: QuestWalkthroughRenderer_quest | null;
}

const QuestWalkthroughContentFragmentContainer = createFragmentContainer<QuestWalkthroughContentProps>((props) => {
  const modalizeRef = useRef<Modalize>(null);

  const currentTask = useState('');
  const [currentTarget, setCurrentTarget] = useState<any>();
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [currentTextData, setCurrentTextData] = useState<TextQuestBlock[]>([]);

  const questData = props.quest?.data?.blocks as QuestBlock[];

  const next = () => {
    setCurrentBlockIndex(currentBlockIndex + 1);
  };

  useEffect(() => {
    if (!questData) {
      return;
    }

    const currentBlock = questData[currentBlockIndex];

    switch (currentBlock.type) {
      case 'locationInstance':
        setCurrentTarget(currentBlock);
        next();
        break;
      case 'header':
      case 'paragraph':
      case 'quote': {
        setCurrentTextData([...currentTextData, currentBlock]);
        const nextBlock = questData[currentBlockIndex + 1];
        const textBlockTypes = ['header', 'paragraph', 'quote'];

        if (nextBlock && textBlockTypes.includes(nextBlock.type)) {
          next();
        }
        break;
      }
      case 'delimiter':
        break;
      default:
        next();
    }
  }, [questData, currentBlockIndex]);

  if (!questData) {
    return <Text>No quest data</Text>;
  }

  const set = new Set();

  questData.forEach(block => set.add(block.type));

  console.log(set);

  const currentBlock = questData[currentBlockIndex];

  let component;

  console.log(currentBlock);
  switch (currentBlock.type) {
    case 'locationInstance':
      component = <Text>locationInstance</Text>;
      break;
    case 'header':
    case 'quote':
    case 'paragraph':
    case 'delimiter':
      component = <QuestTextBlock data={currentTextData}/>;
      break;
    default:
      component = <Text>Unknown block type</Text>;
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
        {component}
      </Modalize>
    </View>
  );
}, {
  quest: graphql`
    fragment QuestWalkthroughRenderer_quest on Quest {
      id
      data {
        blocks
        time
        version
      }
    }
  `,
});

/**
 * Component that renders quest blocks
 *
 * @param props - props for component rendering
 */
export default function QuestWalkthroughRenderer({ questId }: QuestWalkthroughRendererProps): React.ReactElement {
  return (
    <QueryRenderer<QuestWalkthroughRendererQuery>
      environment={enviroment}
      query={graphql`
            query QuestWalkthroughRendererQuery($questId: GlobalId!) {
                quest(id: $questId) {
                    ...QuestWalkthroughRenderer_quest
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

        return <QuestWalkthroughContentFragmentContainer quest={props.quest}/>;
      }}
      variables={{
        questId,
      }}
    />
  );
}
