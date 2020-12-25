import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';
import Colors from '../styles/colors';
import AnswerButton, { AnswerButtonState } from './AnswerButton';
import Question from '../images/question.svg';
import RightAnswer from '../images/rightAnswer.svg';
import WrongAnswer from '../images/wrongAnswer.svg';
import Next from '../images/nextButton.svg';

/**
 * Props for test question
 */
interface Question {
  /**
   * Question to answer
   */
  question: string;

  /**
   * Array of answers to choose from
   */
  answers: string[];

  /**
   * Index of right answer
   */
  correctAnswerIndex: number;

  /**
   * Picture attachment for the test
   */
  picture?: string;
}

const testQuestion: Question = {
  question: 'Как называл Маяковский упадочное настроение среди молодежи?',
  answers: ['Солжиница', 'Есенищина', 'Гумильвица', 'Сологубщина'],
  correctAnswerIndex: 1,
  picture: 'https://n1s1.hsmedia.ru/44/f1/e9/44f1e97b200859547e74cbe459e18dab/620x413_1_7b996db83cf408ba5a9d88c735ec94fc@2121x1414_0xac120003_18959742231606980285.jpg',
};

const styles = StyleSheet.create({
  headerBlock: {
    paddingTop: 74,
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
    paddingRight: 15,
    paddingBottom: 75,
    paddingLeft: 15,
  },
  headerText: {
    marginTop: 30,
    color: Colors.Black,
    fontSize: 22,
    lineHeight: 22,
  },
  blackAnswerText: {
    fontSize: 18,
    lineHeight: 22,
    color: Colors.Black,
  },
  whiteAnswerText: {
    fontSize: 18,
    lineHeight: 22,
    color: Colors.White,
  },
  next: {
    height: 64,
    width: 64,
    marginVertical: 15,
    borderRadius: 32,
    elevation: 10,
    alignSelf: 'center',
    shadowColor: '#414366',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
});

/**
 * Displays test
 */
export default function TestView(): React.ReactElement {
  const [selectedAnswer, setSelectedAnswer] = useState<number>();
  const [modalVisible, setModalVisible] = useState(false);
  let questionIcon;

  if (testQuestion.picture) {
    /**
     * Image component, if testQuestion has picture uri
     */
    questionIcon =
      <TouchableOpacity style={styles.imageView} onPress={(): void => setModalVisible(true)}>
        <Image source={{ uri: testQuestion.picture }} style={styles.image}/>
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
    questionIcon = (selectedAnswer === testQuestion.correctAnswerIndex) ? <RightAnswer/> : <WrongAnswer/>;
  }

  return (
    <View>
      <View style={styles.headerBlock}>
        {questionIcon}
        <Text style={styles.headerText}>{testQuestion.question}</Text>
      </View>
      <View style={styles.answersView}>
        {
          testQuestion.answers.map((answer, index) => {
            let buttonState: AnswerButtonState = 'disabled';

            switch (selectedAnswer) {
              case undefined:
                buttonState = 'active';
                break;

              case testQuestion.correctAnswerIndex:
                buttonState = index === testQuestion.correctAnswerIndex ? 'selectedCorrect' : 'disabled';
                break;

              default:
                if (index === testQuestion.correctAnswerIndex) {
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
        {(selectedAnswer !== undefined) &&
          <TouchableOpacity>
            <Next style={styles.next}/>
          </TouchableOpacity>
        }
      </View>
      {testQuestion.picture &&
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
            <Image source={{ uri: testQuestion.picture }} style={styles.modalImage}/>
          </View>
        </TouchableOpacity>
      </Modal>
      }
    </View>
  );
}
