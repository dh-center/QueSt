import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { createFragmentContainer, graphql, QueryRenderer } from 'react-relay';
import Colors from '../styles/colors';
import { QuestWalkthroughRendererQuery } from './__generated__/QuestWalkthroughRendererQuery.graphql';
import { Modalize } from 'react-native-modalize';
import { QuestWalkthroughRenderer_quest } from './__generated__/QuestWalkthroughRenderer_quest.graphql';
import { CurrentTaskBlock, QuestBlock, TextQuestBlock } from '../types/questData';
import TextBlock from './questBlocks/Text/TextBlock';
import QuestLocationInstanceBlock from './questBlocks/LocationInstance';
import MapView from './MapView';
import TestView from './questBlocks/TestView';
import QuestionView from './questBlocks/QuestionView';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Spinner } from 'native-base';
import CurrentTask from './questBlocks/CurrentTask';
import styled from 'styled-components/native';
import QuestEnding from './questBlocks/QuestEnding';
import { useRelayEnvironment } from 'react-relay/hooks';

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  root: {
    elevation: 5,
  },
});

const ModalScrollView = styled(Animated.ScrollView)
  .attrs(() => ({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      flexGrow: 1,
    },
  }))`
  margin-top: 50px;
`;

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
  const [currentTaskBlock, setCurrentTaskBlock] = useState<CurrentTaskBlock>();

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
        /**
         * Minimize bottom sheet panel
         */
        if (modalizeRef.current) {
          modalizeRef.current.close('alwaysOpen');
        }
        setCurrentTarget(currentBlock.data.locationInstanceId);
        next();
        break;
      case 'currentQuestTask':
        setCurrentTaskBlock(currentBlock);
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
        next();
        break;
      case 'test':
      case 'question':
        /**
         * Opens modal to top if there are test or question blocks
         */
        if (modalizeRef.current) {
          modalizeRef.current.open('top');
        }
        break;
      default:
        next();
    }
  }, [questData, currentBlockIndex]);

  if (!questData) {
    return <Text>No quest data</Text>;
  }

  const currentBlock = questData[currentBlockIndex];

  let component;

  if (!currentBlock) {
    const questId = props.quest?.id;

    if (!questId) {
      return <Text>No quest id</Text>;
    }
    component = <QuestEnding questId={questId}/>;
  } else {
    switch (currentBlock.type) {
      case 'header':
      case 'quote':
      case 'paragraph':
        component = <TextBlock data={currentTextData} nextCallback={
          () => {
            setCurrentTextData([]);
            next();
          }
        }/>;
        break;
      case 'test':
        component = <TestView data={currentBlock} nextCallback={next}/>;
        break;
      case 'question':
        component = <QuestionView data={currentBlock} nextCallback={next}/>;
        break;
      case 'locationInstance':
      case 'delimiter':
        component = <Spinner color={Colors.DarkBlue}/>;
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
      {currentTaskBlock && <CurrentTask block={currentTaskBlock}/>}
      <Modalize
        avoidKeyboardLikeIOS
        handlePosition={'inside'}
        ref={modalizeRef}
        keyboardAvoidingBehavior={'padding'}
        keyboardAvoidingOffset={-100} // magic value that fixes bottom padding if keyboard is open
        alwaysOpen={BOTTOM_SHEET_TOP}
        modalStyle={styles.modal}
        rootStyle={styles.root}
        customRenderer={<ModalScrollView>{component}</ModalScrollView>}
      />
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
  const environment = useRelayEnvironment();

  return (
    <QueryRenderer<QuestWalkthroughRendererQuery>
      environment={environment}
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
