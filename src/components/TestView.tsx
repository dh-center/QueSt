import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import Colors from '../styles/colors';
import AnswerButton, { AnswerButtonState } from './AnswerButton';
import Question from '../images/question.svg';
import RightAnswer from '../images/rightAnswer.svg';
import WrongAnswer from '../images/wrongAnswer.svg';
import Next from '../images/nextButton.svg';

const testQuestion = {
  question: 'Как называл Маяковский упадочное настроение среди молодежи?',
  answers: ['Солжиница', 'Есенищина', 'Гумильвица', 'Сологубщина'],
  correctAnswerIndex: 1,
};

const styles = StyleSheet.create({
  body: {
    position: 'absolute',
    backgroundColor: Colors.WHITE,
    height: '100%',
    width: '100%',
  },
  view: {
    backgroundColor: Colors.BACKGROUND,
  },
  headerBlock: {
    backgroundColor: Colors.WHITE,
    paddingTop: 50,
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
  answersView: {
    paddingTop: 30,
    paddingRight: 15,
    paddingBottom: 20,
    paddingLeft: 15,
  },
  headerText: {
    marginTop: 30,
    color: Colors.BLACK,
    fontSize: 22,
    lineHeight: 22,
  },
  blackAnswerText: {
    fontSize: 18,
    lineHeight: 22,
    color: Colors.BLACK,
  },
  whiteAnswerText: {
    fontSize: 18,
    lineHeight: 22,
    color: Colors.WHITE,
  },
  next: {
    height: 64,
    width: 64,
    marginBottom: 30,
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

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView style={styles.view}>
        <View style={styles.headerBlock}>
          {(selectedAnswer === undefined) && <Question/>}
          {(selectedAnswer === testQuestion.correctAnswerIndex) && <RightAnswer/>}
          {(selectedAnswer !== undefined && selectedAnswer !== testQuestion.correctAnswerIndex) && <WrongAnswer/>}
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
        </View>
        {(selectedAnswer !== undefined) && <TouchableOpacity><Next style={styles.next}/></TouchableOpacity>}
      </ScrollView>
    </SafeAreaView>
  );
}
