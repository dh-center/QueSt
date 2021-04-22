import React, { useState } from 'react';
import BlockBody from './BlockBody';
import styled from 'styled-components/native';
import { commitMutation, graphql } from 'react-relay';
import { StackNavigationProp } from '@react-navigation/stack';
import { QuestsStackParamList } from '../../navigation/questsStack';
import { useNavigation } from '@react-navigation/native';
import { useRelayEnvironment } from 'react-relay/hooks';
import { Modal } from 'react-native';
import ReceivedExp from './ReceivedExp';
import ReceivedCards from './ReceivedCards';
import ReceivedAchievements from './ReceivedAchievements';
import Congratulation from './Congratulation';

/**
 * Type with props of screen 'List' in QuestsStackScreen
 */
type QuestScreenNavigationProp = StackNavigationProp<QuestsStackParamList, 'List'>;

const Body = styled(BlockBody)`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const ModalView = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, .7);
  flex: 1;
  padding: 0 15px;
`;

const Container = styled.View`
  height: 80%;
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
  const [step, setStep] = useState('congratulations');
  const [visibility, setVisibility] = useState(true);

  return (
    <Body>
      <Modal
        transparent={true}
        visible={visibility}
        statusBarTranslucent={true}
      >
        <ModalView
          activeOpacity={1}
          onPress={() => {
            switch (step) {
              case 'exp':
                setStep('cards');
                break;
              case 'cards':
                setStep('achievements');
                break;
              case 'achievements':
                setVisibility(false);
                navigation.navigate('List', { needRefresh: true });
                break;
            }
          }}
        >
          <Container>
            {step === 'congratulations' &&
              <Congratulation onPress={(): void => {
                commitMutation(
                  environment,
                  {
                    mutation,
                    variables: { questId: props.questId },
                    onError: err => console.error(err),
                  }
                );
                setStep('exp');
              }}/>
            }
            {step === 'exp' &&
              <ReceivedExp exp={90}/>
            }
            {step === 'cards' &&
              <ReceivedCards/>
            }
            {step === 'achievements' &&
              <ReceivedAchievements/>
            }
          </Container>
        </ModalView>
      </Modal>
    </Body>
  );
}
