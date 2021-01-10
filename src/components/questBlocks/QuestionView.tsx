import React, { useState } from 'react';
import Colors from '../../styles/colors';
import Input from '../ui/Input';
import Question from '../../images/questionWrite.svg';
import RightAnswer from '../../images/rightAnswer.svg';
import WrongAnswer from '../../images/wrongAnswer.svg';
import styled from 'styled-components/native';
import { StyledFonts } from '../../styles/textStyles';
import { useTranslation } from 'react-i18next';
import { QuestionBlock } from '../../types/questData';
import NextButton from '../ui/NextButton';
import BlockBody from './BlockBody';

const Body = styled(BlockBody)`
  background-color: ${Colors.Background};
`;

const Header = styled.View`
  background-color: ${Colors.White};
  padding: 24px 15px 30px;
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
  padding: 30px 15px;
`;

const AnswerInput = styled(Input)<{ customBackground: string }>`
  background-color: ${(props) => props.customBackground};
`;

const MessageText = styled.Text<{color: string}>`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${(props): string => props.color};
  margin: 15px 25px 0;
`;

/**
 * Props for QuestionView
 */
interface QuestionViewProps {
  /**
   * Data for rendering question
   */
  data: QuestionBlock;

  /**
   * Function to go to the next block
   */
  nextCallback: () => void;
}

/**
 * Displays question
 *
 * @param props - question data
 */
export default function QuestionView(props: QuestionViewProps): React.ReactElement {
  const [userAnswer, setUserAnswer] = useState('');
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
        <HeaderText>{props.data.data.question}</HeaderText>
      </Header>
      <Answer>
        <AnswerInput
          customBackground={background}
          textStyle={{
            color: textColor,
            borderBottomColor: textColor,
          }}
          placeholder={t('quests.enterAnswer')}
          value={userAnswer}
          onChangeText={text => setUserAnswer(text)}
          editable={isCorrectlyAnswered === undefined}
        />
        {(isCorrectlyAnswered !== undefined) &&
          (isCorrectlyAnswered
            ? <MessageText color={Colors.Green}>{props.data.data.rightAnswerMessage}</MessageText>
            : <MessageText color={Colors.Red}>{props.data.data.wrongAnswerMessage}</MessageText>)
        }
      </Answer>
      {(userAnswer !== '') && (isCorrectlyAnswered === undefined) &&
        <NextButton onPress={() => setIsCorrectlyAnswered(userAnswer === props.data.data.answer)} />
      }
      {(isCorrectlyAnswered !== undefined) &&
        <NextButton onPress={() => props.nextCallback()} />
      }
    </Body>
  );
}
