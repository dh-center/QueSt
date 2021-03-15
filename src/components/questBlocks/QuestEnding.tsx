import React from 'react';
import BlockBody from './BlockBody';
import Button from '../ui/Button';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { commitMutation, graphql } from 'react-relay';
import { StackNavigationProp } from '@react-navigation/stack';
import { QuestsStackParamList } from '../../navigation/questsStack';
import { useNavigation } from '@react-navigation/native';
import { useRelayEnvironment } from 'react-relay/hooks';

/**
 * Type with props of screen 'List' in QuestsStackScreen
 */
type QuestScreenNavigationProp = StackNavigationProp<QuestsStackParamList, 'List'>;

const Body = styled(BlockBody)`
  justify-content: center;
  align-items: center;
`;

/**
 * Props for component
 */
interface QuestEndingProps {
  /**
   * Quest id
   */
  questId: string;
}

const mutation = graphql`
  mutation QuestEndingMutation($questId: GlobalId!) {
    user {
      completeQuest(questId: $questId) {
        record {
          username
          exp
          level
          completedQuests {
            id
            questProgressState
          }
        }
      }
    }
  }
`;

/**
 * Renders text ending of quest
 *
 * @param props - id of current quest
 */
export default function QuestEnding(props: QuestEndingProps): React.ReactElement {
  const navigation = useNavigation<QuestScreenNavigationProp>();
  const environment = useRelayEnvironment();

  const { t } = useTranslation();

  return (
    <Body>
      <Button
        title={t('quests.endQuest')}
        onPress={(): void => {
          commitMutation(
            environment,
            {
              mutation,
              variables: { questId: props.questId },
              onError: err => console.error(err),
            }
          );
          navigation.navigate('List', { needRefresh: true });
        }}
      />
    </Body>
  );
}
