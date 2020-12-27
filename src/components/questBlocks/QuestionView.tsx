import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Colors from '../../styles/colors';
import Input from '../ui/Input';
import Question from '../../images/questionWrite.svg';
import RightAnswer from '../../images/rightAnswer.svg';
import WrongAnswer from '../../images/wrongAnswer.svg';
import Next from '../../images/nextButton.svg';
import styled from 'styled-components/native';
import { StyledFonts } from '../../styles/textStyles';
import { useTranslation } from 'react-i18next';

const testQuestion = {
  question: 'Как называл Маяковский упадочное настроение среди молодежи?',
  answer: 'Есенищина',
};

const Body = styled.ScrollView`
  position: absolute;
  height: 100%;
  background-color: ${Colors.Background};
`;

const Header = styled.View`
  background-color: ${Colors.White};
  padding: 74px 15px 30px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  elevation: ${4};
  box-shadow: 0 2px 2.62px rgba(0,0,0,0.1);
  align-items: center;
`;

const HeaderText = styled.Text`
  ${StyledFonts.uiWebMedium};
  font-size: 22px;
  line-height: 22px;
  color: ${Colors.Black};
  margin-top: 30px;
`;

const Answer = styled.View`
  padding: 30px 15px 75px;
`;

const NextButton = styled(Next)`
  height: 64px;
  width: 64px;
  margin: 15px 0;
  border-radius: 32px;
  elevation: ${8};
  box-shadow: 0 4px 4.65px rgba(0,0,0,0.2);
  align-self: center;
`;

const AnswerInput = styled(Input)<{ customBackground: string }>`
  background-color: ${(props) => props.customBackground};
  margin-bottom: 10px;
`;

/**
 * Displays test
 */
export default function QuestionView(): React.ReactElement {
  const [answer, setAnswer] = useState('');
  const [isCorrectlyAnswered, setIsCorrectlyAnswered] = useState<boolean>();
  const { t } = useTranslation();
  let questionIcon;
  let background;
  let textColor = Colors.Black;

  if (isCorrectlyAnswered === undefined) {
    /**
     * Question component, if question is active
     */
    questionIcon = <Question/>;

    /**
     * Background color for input, if question is active
     */
    background = Colors.White;
  } else {
    /**
     * RightAnswer or WrongAnswer component, according the user answer
     */
    questionIcon = (isCorrectlyAnswered) ? <RightAnswer/> : <WrongAnswer/>;

    /**
     * Background color for input, according the user answer
     */
    background = (isCorrectlyAnswered) ? Colors.Green : Colors.Red;

    /**
     * Background color for input, according the user answer
     */
    textColor = Colors.White;
  }

  return (
    <Body>
      <Header>
        {questionIcon}
        <HeaderText>{testQuestion.question}</HeaderText>
      </Header>
      <Answer>
        <AnswerInput
          customBackground={background}
          textStyle={{
            color: textColor,
            borderBottomColor: textColor,
          }}
          placeholder={t('quests.enterAnswer')}
          value={answer}
          onChangeText={text => setAnswer(text)}
          editable={isCorrectlyAnswered === undefined}
        />
        {(answer !== '') &&
          <TouchableOpacity onPress={() => setIsCorrectlyAnswered(answer === testQuestion.answer)}>
            <NextButton/>
          </TouchableOpacity>
        }
      </Answer>
    </Body>
  );
}
