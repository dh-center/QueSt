import React, { useState } from 'react';
import Colors from '../../styles/colors';
import AnswerInTextIcon from '../../images/answerInText.svg';
import RightAnswer from '../../images/rightAnswer.svg';
import WrongAnswer from '../../images/wrongAnswer.svg';
import styled from 'styled-components/native';
import { StyledFonts } from '../../styles/textStyles';
import { HighlightingInTextBlock } from '../../types/questData';
import BlockBody from './BlockBody';
import useTargetLocationContext from '../../contexts/TargetLocationContext';
import HighlightingButton from '../HighlightingButton';
import NextButton from '../ui/NextButton';

const Header = styled.View`
  background-color: ${Colors.White};
  padding: 24px 15px 30px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  elevation: ${4};
  box-shadow: 0 2px 2.62px rgba(0,0,0,0.1);
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderText = styled.Text`
  ${StyledFonts.uiWebMedium};
  font-size: 22px;
  line-height: 22px;
  color: ${Colors.Black};
  margin-top: 30px;
`;

const Row = styled.View`
  min-height: 34px;
  margin: 10px 15px 0;
  flex-direction: row;
  align-items: center;
`;

const DefaultText = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
`;

/**
 * Props for HighlightingInTextView
 */
interface HighlightingInTextViewProps {
  /**
   * Data for block rendering
   */
  data: HighlightingInTextBlock;

  /**
   * Function to go to the next block
   */
  nextCallback: () => void;
}

/**
 * Displays HighlightingInTextBlock
 *
 * @param props - question data
 */
export default function HighlightingInTextView(props: HighlightingInTextViewProps): React.ReactElement {
  const { isUserNearLocation, targetLocation } = useTargetLocationContext();
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(boolean | undefined)[]>([]);
  const [isCorrectlyAnswered, setIsCorrectlyAnswered] = useState<boolean>();
  let questionIcon;

  const strings = props.data.data.text.split('<br>');

  const rightAnswersCount = props.data.data.text.split('<span class="true-answer">').length - 1;

  if (isCorrectlyAnswered === undefined) {
    /**
     * Question component, if question is active
     */
    questionIcon = <AnswerInTextIcon/>;
  } else {
    /**
     * RightAnswer or WrongAnswer component, according the user answer
     */
    questionIcon = (isCorrectlyAnswered) ? <RightAnswer/> : <WrongAnswer/>;
  }

  let wordIndex = 0;

  return (
    <BlockBody>
      <Header>
        {questionIcon}
        <HeaderText>{props.data.data.task}</HeaderText>
      </Header>
      {strings.map((string, index) =>
        <Row key={index}>
          {string
            .replace(/span/g, '')
            .replace(/\/>/g, '')
            .split('<')
            .map((item) => {
              wordIndex++;

              if (item.includes('class="true-answer">')) {
                return <HighlightingButton
                  key={wordIndex}
                  index={wordIndex}
                  text={item.slice(21)}
                  isRightAnswer={true}
                  isAnswered={isAnswered}
                  answers={userAnswers}
                  setAnswers={setUserAnswers}
                />;
              }
              if (item.includes('class="possible-answer">')) {
                return <HighlightingButton
                  key={wordIndex}
                  index={wordIndex}
                  text={item.slice(25)}
                  isRightAnswer={false}
                  isAnswered={isAnswered}
                  answers={userAnswers}
                  setAnswers={setUserAnswers}
                />;
              }

              return <DefaultText key={wordIndex}>{item}</DefaultText>;
            })}
        </Row>
      )}
      {!isAnswered &&
        <NextButton onPress={() => {
          setIsCorrectlyAnswered(userAnswers.filter(answer => answer === false).length === 0 && userAnswers.filter(answer => answer === true).length === rightAnswersCount);
          setIsAnswered(true);
        }} />
      }
      {isAnswered && (isUserNearLocation || !targetLocation) &&
        <NextButton onPress={() => props.nextCallback()} />
      }
    </BlockBody>
  );
}
