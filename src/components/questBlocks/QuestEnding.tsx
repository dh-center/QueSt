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
import Congratulations from '../../images/congratulations.svg';
import { StyledFonts } from '../../styles/textStyles';
import Colors from '../../styles/colors';
import { Modal } from 'react-native';

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

const CongratulationsText = styled.Text`
  ${StyledFonts.roboto};
  font-size: 28px;
  line-height: 28px;
  margin-top: 30px;
  color: ${Colors.White};
`;

const EndingText = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 50px;
  color: ${Colors.White};
`;

const Delimiter = styled.View`
  width: 110px;
  border: 0.5px solid ${Colors.White};
  margin: 10px 0;
`;

const GetButton = styled(Button)`
  width: 100%;
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
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType="fade"
        transparent={true}
        visible={true}
        statusBarTranslucent={true}
      >
        <ModalView activeOpacity={1}>
          <Container>
            <Congratulations/>
            <CongratulationsText>Поздравляем!</CongratulationsText>
            <Delimiter/>
            <EndingText>Вы прошли квест</EndingText>
            <GetButton
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
          </Container>
        </ModalView>
      </Modal>
    </Body>
  );
}
