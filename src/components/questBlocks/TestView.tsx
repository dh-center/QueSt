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

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.Background,
  },
  headerBlock: {
    backgroundColor: Colors.White,
    paddingTop: 24,
    paddingRight: 15,
    paddingBottom: 30,
    paddingLeft: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    elevation: 4,
    shadowColor: '#414366',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
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
  const [selectedAnswer, setSelectedAnswer] = useState<number>();
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
    questionIcon = (selectedAnswer === test.correctAnswerIndex) ? <RightAnswer/> : <WrongAnswer/>;
  }

  return (
    <View style={styles.body}>
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

              case test.correctAnswerIndex:
                buttonState = index === test.correctAnswerIndex ? 'selectedCorrect' : 'disabled';
                break;

              default:
                if (index === test.correctAnswerIndex) {
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
      <NextButton onPress={() => props.nextCallback()} />
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
    </View>
  );
}
