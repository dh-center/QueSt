import React, { useEffect, useRef, useState, Suspense, useMemo } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { createFragmentContainer, graphql, QueryRenderer } from 'react-relay';
import Colors from '../styles/colors';
import { QuestWalkthroughRendererQuery } from './__generated__/QuestWalkthroughRendererQuery.graphql';
import { Modalize } from 'react-native-modalize';
import { QuestWalkthroughRenderer_quest } from './__generated__/QuestWalkthroughRenderer_quest.graphql';
import {
  CurrentTaskBlock,
  groupQuestData,
  QuestBlock
} from '../types/questData';
import TextBlock from './questBlocks/Text/TextBlock';
import QuestLocationInstanceBlock from './questBlocks/LocationInstance';
import MapView from './MapView';
import TestView from './questBlocks/TestView';
import QuestionView from './questBlocks/QuestionView';
import { Spinner } from 'native-base';
import CurrentTask from './questBlocks/CurrentTask';
import styled from 'styled-components/native';
import QuestEnding from './questBlocks/QuestEnding';
import { useRelayEnvironment } from 'react-relay/hooks';
import { TargetLocationProvider } from '../contexts/TargetLocationContext';
import useTabBarHeight from './utils/useTabBarHeight';
import useAudioAccompanimentContext, { AudioAccompanimentProvider } from '../contexts/AudioAccompanimentContext';
import { useIsFocused } from '@react-navigation/native';
import QuestLocationFromCoordsBlock from './questBlocks/LocationFromCoords';
import AllocationTask from './questBlocks/AllocationTask';

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
  quest: QuestWalkthroughRenderer_quest;
}

/**
 * Component for rendering quest blocks
 */
const QuestWalkthroughContent = createFragmentContainer<QuestWalkthroughContentProps>((props) => {
  const modalizeRef = useRef<Modalize>(null);
  const tabBarHeight = useTabBarHeight();
  const BOTTOM_SHEET_TOP = tabBarHeight + 40;
  const isFocused = useIsFocused();
  const { setIsPlaying } = useAudioAccompanimentContext();

  useEffect(() => {
    if (!isFocused) {
      setIsPlaying(false);
    }
  }, [ isFocused ]);


  const [currentTarget, setCurrentTarget] = useState<string>();
  const [currentTargetCoords, setCurrentTargetCoords] = useState<{ latitude: number; longitude: number}>();
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [currentTaskBlock, setCurrentTaskBlock] = useState<CurrentTaskBlock>();

  const rawQuestData = props.quest?.data?.blocks as QuestBlock[];

  const groupedQuestData = useMemo(() => groupQuestData(rawQuestData), [ rawQuestData ]);

  /**
   * Go to next quest block
   */
  const next = (): void => setCurrentBlockIndex(currentBlockIndex + 1);

  useEffect(() => {
    if (!groupedQuestData) {
      return;
    }

    const currentBlock = groupedQuestData[currentBlockIndex];

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
        setCurrentTargetCoords(undefined);
        next();
        break;
      case 'approximationToCoordinates':
        /**
         * Minimize bottom sheet panel
         */
        if (modalizeRef.current) {
          modalizeRef.current.close('alwaysOpen');
        }
        setCurrentTargetCoords(currentBlock.data);
        setCurrentTarget(undefined);
        next();
        break;
      case 'currentQuestTask':
        setCurrentTaskBlock(currentBlock);
        next();
        break;
      case 'page':
      case 'test':
      case 'question':
      case 'matchOptions':
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
  }, [groupedQuestData, currentBlockIndex]);

  if (!groupedQuestData) {
    return <Text>No quest data</Text>;
  }

  const currentBlock = groupedQuestData[currentBlockIndex];

  let component;

  if (!currentBlock) {
    const questId = props.quest?.id;

    if (!questId) {
      return <Text>No quest id</Text>;
    }

    return (
      <View>
        <MapView/>
        <QuestEnding questId={questId} data={props.quest}/>
      </View>
    );
  }

  switch (currentBlock.type) {
    case 'page':
      component = <TextBlock page={currentBlock} nextCallback={next}/>;
      break;
    case 'test':
      component = <TestView data={currentBlock} nextCallback={next}/>;
      break;
    case 'question':
      component = <QuestionView data={currentBlock} nextCallback={next}/>;
      break;
    case 'matchOptions':
      component = <AllocationTask data={currentBlock} nextCallback={next}/>;
      break;
    case 'approximationToCoordinates':
    case 'locationInstance':
      component = <Spinner color={Colors.DarkBlue}/>;
      break;
    default:
      component = <Text>Unknown block type</Text>;
  }

  return (
    <TargetLocationProvider>
      <Suspense fallback={<Spinner color={Colors.DarkBlue}/>}>
        <MapView>
          {currentTarget && <QuestLocationInstanceBlock locationInstanceId={currentTarget}/>}
          {currentTargetCoords && <QuestLocationFromCoordsBlock latitude={currentTargetCoords.latitude} longitude={currentTargetCoords.longitude}/>}
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
      </Suspense>
    </TargetLocationProvider>
  );
}, {
  quest: graphql`
    fragment QuestWalkthroughRenderer_quest on Quest {
      id
      data {
        blocks
      }
      ...QuestEndingData
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
                    id
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

        if (!props.quest) {
          return <Text>No such quest</Text>;
        }


        return (
          <AudioAccompanimentProvider questId={props.quest?.id || ''}>
            <QuestWalkthroughContent quest={props.quest}/>
          </AudioAccompanimentProvider>
        );
      }}
      variables={{
        questId,
      }}
    />
  );
}
