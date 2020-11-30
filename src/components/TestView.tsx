import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import colors from '../styles/colors';
import Question from '../images/question.svg';
import RightAnswer from '../images/rightAnswer.svg';
import WrongAnswer from '../images/wrongAnswer.svg';
import Voice from '../images/voice.svg';
import Next from '../images/nextButton.svg';

const testQuestion = {
  question: 'Как называл Маяковский упадочное настроение среди молодежи?',
  answers: ['Солжиница', 'Есенищина', 'Гумильвица', 'Сологубщина'],
  correctAnswerIndex: 1,
};

const answerButton = StyleSheet.create({
  button: {
    minHeight: 60,
    marginBottom: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 22,
  },
});

const styles = StyleSheet.create({
  body: {
    position: 'absolute',
    backgroundColor: colors.white,
    height: '100%',
  },
  view: {
    backgroundColor: colors.fond,
  },
  headerBlock: {
    backgroundColor: colors.white,
    paddingTop: 50,
    paddingRight: 15,
    paddingBottom: 30,
    paddingLeft: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    elevation: 4,
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerImage: {
    marginBottom: 30,
  },
  answersView: {
    paddingTop: 30,
    paddingRight: 15,
    paddingBottom: 20,
    paddingLeft: 15,
  },
  activeAnswerButton: {
    ...answerButton.button,
    backgroundColor: colors.white,
    elevation: 10,
  },
  disabledAnswerButton: {
    ...answerButton.button,
    backgroundColor: colors.white,
  },
  rightAnswerButton: {
    ...answerButton.button,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: colors.green,
  },
  rightAnsweredButton: {
    ...answerButton.button,
    backgroundColor: colors.green,
  },
  wrongAnsweredButton: {
    ...answerButton.button,
    backgroundColor: colors.red,
  },
  headerText: {
    color: colors.black,
    fontSize: 22,
    lineHeight: 22,
  },
  blackAnswerText: {
    ...answerButton.buttonText,
    color: colors.black,
  },
  whiteAnswerText: {
    ...answerButton.buttonText,
    color: colors.white,
  },
  next: {
    height: 64,
    width: 64,
    marginBottom: 30,
    borderRadius: 32,
    elevation: 10,
    alignSelf: 'center',
  },
});

/**
 * Displays test
 */
export default function TestView(): React.ReactElement {
  const [result, setResult] = useState<boolean>();
  const [selectedAnswer, setSelectedAnswer] = useState<number>();

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView style={styles.view}>
        <View style={styles.headerBlock}>
          <View style={styles.headerImage}>
            {(result == undefined) && <Question/>}
            {(result == true) && <RightAnswer/>}
            {(result == false) && <WrongAnswer/>}
          </View>
          <Text style={styles.headerText}>{testQuestion.question}</Text>
        </View>
        <View style={styles.answersView}>
          {
            testQuestion.answers.map((answer, index) => {
              return (
                <TouchableOpacity
                  disabled={!(result == undefined)}
                  style={
                    (result == undefined) ? styles.activeAnswerButton
                      : (result && index == testQuestion.correctAnswerIndex) ? styles.rightAnsweredButton
                        : (!result && index == testQuestion.correctAnswerIndex) ? styles.rightAnswerButton
                          : (!result && index == selectedAnswer) ? styles.wrongAnsweredButton
                            : styles.disabledAnswerButton
                  }
                  key={index.toString()}
                  activeOpacity={0.5}
                  onPress={(): void => {
                    (index == testQuestion.correctAnswerIndex)
                      ? setResult(true)
                      : setResult(false);
                    setSelectedAnswer(index);
                  }}
                >
                  <Text style={
                    (result && index == testQuestion.correctAnswerIndex) || (!result && index == selectedAnswer)
                      ? styles.whiteAnswerText : styles.blackAnswerText
                  }>{answer}</Text>
                </TouchableOpacity>
              );
            })
          }
        </View>
        {(result != undefined) && <TouchableOpacity><Next style={styles.next}/></TouchableOpacity>}
      </ScrollView>
    </SafeAreaView>
  );
}
