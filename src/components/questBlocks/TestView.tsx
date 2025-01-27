import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';
import Colors from '../../styles/colors';
import AnswerButton, { AnswerButtonState } from '../AnswerButton';
import Question from '../../images/question.svg';
import RightAnswer from '../../images/rightAnswer.svg';
import WrongAnswer from '../../images/wrongAnswer.svg';
import { TestBlock } from '../../types/questData';
import NextButton from '../ui/NextButton';
import styled from 'styled-components/native';
import { StyledFonts } from '../../styles/textStyles';
import BlockBody from './BlockBody';
import useTargetLocationContext from '../../contexts/TargetLocationContext';

const Body = styled(BlockBody)`
  background-color: ${Colors.Background};
`;

const styles = StyleSheet.create({
  headerBlock: {
    backgroundColor: Colors.White,
    paddingTop: 24,
    paddingRight: 15,
    paddingBottom: 30,
    paddingLeft: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.62,
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageView: {
    borderRadius: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowOpacity: 0.2,
  },
  image: {
    height: 168,
    width: 168,
    borderRadius: 15,
  },
  modalView: {
    backgroundColor: 'rgba(85,85,107,0.5)',
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 50,
    alignItems: 'center',
  },
  modalImageView: {
    backgroundColor: 'aliceblue',
    maxWidth: '100%',
    maxHeight: '100%',
    aspectRatio: 1,
    borderRadius: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowOpacity: 0.2,
  },
  modalImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 15,
    alignSelf: 'center',
  },
  answersView: {
    paddingTop: 30,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  headerText: {
    marginTop: 30,
    color: Colors.Black,
    fontSize: 22,
    lineHeight: 22,
  },
});

const MessageText = styled.Text<{color: string}>`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${(props): string => props.color};
  margin: 5px 25px 30px;
`;

/**
 * Props for TestView
 */
interface TestViewProps {
  /**
   * Data for rendering test
   */
  data: TestBlock

  /**
   * Function to go to the next block
   */
  nextCallback: () => void;
}

/**
 * Displays test
 *
 * @param props - test data
 */
export default function TestView(props: TestViewProps): React.ReactElement {
  const { isUserNearLocation, targetLocation } = useTargetLocationContext();
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const test = props.data.data;
  let questionIcon;

  if (test.picture) {
    /**
     * Image component, if TestBlock has picture uri
     */
    questionIcon =
      <TouchableOpacity style={styles.imageView} onPress={(): void => setModalVisible(true)}>
        <Image source={{ uri: test.picture }} style={styles.image}/>
      </TouchableOpacity>;
  } else if (selectedAnswer === undefined) {
    /**
     * Question component, if question is active
     */
    questionIcon = <Question/>;
  } else {
    /**
     * RightAnswer or WrongAnswer component, according the user answer
     */
    questionIcon = (selectedAnswer === Number(test.correctAnswerIndex)) ? <RightAnswer/> : <WrongAnswer/>;
  }

  return (
    <Body>
      <View style={styles.headerBlock}>
        {questionIcon}
        <Text style={styles.headerText}>{test.question}</Text>
      </View>
      <View style={styles.answersView}>
        {
          test.answers.map((answer, index) => {
            let buttonState: AnswerButtonState = 'disabled';

            switch (selectedAnswer) {
              case undefined:
                buttonState = 'active';
                break;

              case Number(test.correctAnswerIndex):
                buttonState = index === Number(test.correctAnswerIndex) ? 'selectedCorrect' : 'disabled';
                break;

              default:
                if (index === Number(test.correctAnswerIndex)) {
                  buttonState = 'unselectedCorrect';
                } else if (index === selectedAnswer) {
                  buttonState = 'selectedWrong';
                }
            }

            return <AnswerButton
              answerButtonState={buttonState}
              buttonText={answer}
              disabled={selectedAnswer !== undefined}
              key={index.toString()}
              activeOpacity={0.5}
              onPress={(): void => {
                setSelectedAnswer(index);
              }}
            />;
          }
          )
        }
      </View>
      {(selectedAnswer !== undefined) &&
        <>
          {selectedAnswer === Number(test.correctAnswerIndex)
            ? <MessageText color={Colors.Green}>{props.data.data.rightAnswerMessage}</MessageText>
            : <MessageText color={Colors.Red}>{props.data.data.wrongAnswerMessage}</MessageText>
          }
          {(isUserNearLocation || !targetLocation) && <NextButton onPress={() => {
            setSelectedAnswer(undefined);
            props.nextCallback();
          }}/>}
        </>
      }
      {test.picture &&
        <Modal
          supportedOrientations={['portrait', 'landscape']}
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={(): void => setModalVisible(false)}
          statusBarTranslucent={true}
        >
          <TouchableOpacity style={styles.modalView} onPress={(): void => setModalVisible(false)}>
            <View style={styles.modalImageView}>
              <Image source={{ uri: test.picture }} style={styles.modalImage}/>
            </View>
          </TouchableOpacity>
        </Modal>
      }
    </Body>
  );
}
