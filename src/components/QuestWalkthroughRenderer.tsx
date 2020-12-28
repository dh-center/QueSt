import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createFragmentContainer, graphql, QueryRenderer } from 'react-relay';
import enviroment from '../enviroment';
import Colors from '../styles/colors';
import { QuestWalkthroughRendererQuery } from './__generated__/QuestWalkthroughRendererQuery.graphql';
import { Modalize } from 'react-native-modalize';
import { QuestWalkthroughRenderer_quest } from './__generated__/QuestWalkthroughRenderer_quest.graphql';
import { QuestBlock, TextQuestBlock } from '../types/questData';
import QuestTextBlock from './questBlocks/Text';
import QuestLocationInstanceBlock from './questBlocks/LocationInstance';
import MapView from './MapView';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const styles = StyleSheet.create({
  modal: {
    overflow: 'hidden',
    backgroundColor: Colors.Background,
  },
});

/**
 * Props for renderer component
 */
interface QuestWalkthroughRendererProps {
  /**
   * Quest id for rendering
   */
  questId: string;
}

/**
 * Props for walkthrough component
 */
interface QuestWalkthroughContentProps {
  /**
   * Quest data for rendering
   */
  quest?: QuestWalkthroughRenderer_quest | null;
}

/**
 * Component for rendering quest blocks
 */
const QuestWalkthroughContent = createFragmentContainer<QuestWalkthroughContentProps>((props) => {
  const modalizeRef = useRef<Modalize>(null);
  const tabBarHeight = useBottomTabBarHeight();
  const BOTTOM_SHEET_TOP = 40 + tabBarHeight;

  const [currentTarget, setCurrentTarget] = useState<string>();
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [currentTextData, setCurrentTextData] = useState<TextQuestBlock[]>([]);

  const questData = props.quest?.data?.blocks as QuestBlock[];
  /**
   * Go to next quest block
   */
  const next = (): void => setCurrentBlockIndex(currentBlockIndex + 1);

  useEffect(() => {
    if (!questData) {
      return;
    }

    const currentBlock = questData[currentBlockIndex];

    if (!currentBlock) {
      return;
    }

    switch (currentBlock.type) {
      case 'locationInstance':
        setCurrentTarget(currentBlock.data.locationInstanceId);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questData, currentBlockIndex]);

  if (!questData) {
    return <Text>No quest data</Text>;
  }

  const currentBlock = questData[currentBlockIndex];

  let component;

  if (!currentBlock) {
    component = <Text>Quest ended</Text>;
  } else {
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
  }

  return (
    <View>
      <MapView>
        {currentTarget && <QuestLocationInstanceBlock locationInstanceId={currentTarget}/>}
      </MapView>
      <Modalize
        handlePosition={'inside'}
        ref={modalizeRef}
        alwaysOpen={BOTTOM_SHEET_TOP}
        modalStyle={styles.modal}
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
      }
    }
  `,
});

/**
 * Component that fetches and renders quest blocks
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

        return <QuestWalkthroughContent quest={props.quest}/>;
      }}
      variables={{
        questId,
      }}
    />
  );
}
