import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity
} from 'react-native';
import Colors from '../styles/colors';
import Input from '../components/ui/Input';
import Question from '../images/questionWrite.svg';
import RightAnswer from '../images/rightAnswer.svg';
import WrongAnswer from '../images/wrongAnswer.svg';
import Next from '../images/nextButton.svg';
import ScreenWrapper from './utils/ScreenWrapper';

/**
 * Props for test question
 */
interface Question {
  /**
   * Question to answer
   */
  question: string;

  /**
   * Correct answer
   */
  answer: string;
}

const testQuestion: Question = {
  question: 'Как называл Маяковский упадочное настроение среди молодежи?',
  answer: 'Есенищина',
};

const styles = StyleSheet.create({
  body: {
    position: 'absolute',
    height: '100%',
  },
  view: {
    backgroundColor: Colors.Background,
  },
  headerBlock: {
    backgroundColor: Colors.White,
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
  answersView: {
    paddingTop: 30,
    paddingHorizontal: 15,
    paddingBottom: 75,
  },
  headerText: {
    marginTop: 30,
    color: Colors.Black,
    fontSize: 22,
    lineHeight: 22,
  },
  input: {
    marginBottom: 10,
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
export default function QuestionView(): React.ReactElement {
  const [answer, setAnswer] = useState('');
  let questionIcon;

  if (answer === undefined) {
    /**
     * Question component, if question is active
     */
    questionIcon = <Question/>;
  } else {
    /**
     * RightAnswer or WrongAnswer component, according the user answer
     */
    questionIcon = (answer) ? <RightAnswer/> : <WrongAnswer/>;
  }

  return (
    <View style={styles.body}>
      <ScrollView style={styles.view}>
        <View style={styles.headerBlock}>
          {questionIcon}
          <Text style={styles.headerText}>{testQuestion.question}</Text>
        </View>
        <View style={styles.answersView}>
          <Input
            placeholder={'Введите ответ'}
            style={styles.input}
            value={answer}
            onChangeText={text => setAnswer(text)}
          />
          {answer &&
          <TouchableOpacity>
            <Next style={styles.next}/>
          </TouchableOpacity>
          }
        </View>
      </ScrollView>
    </View>
  );
}
