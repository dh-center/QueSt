import React from 'react';
import BlockBody from './BlockBody';
import Button from '../ui/Button';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { commitMutation, graphql } from 'react-relay';
import env from '../../environment';

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
 * @param props
 */
export default function QuestEnding(props: QuestEndingProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <Body>
      <Button
        title={t('quests.endQuest')}
        onPress={(): void => {
          commitMutation(
            env,
            {
              mutation,
              variables: { questId: props.questId },
              onError: err => console.error(err),
            }
          );
        }}
      />
    </Body>
  );
}
