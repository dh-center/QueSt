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
  align-self: flex-start;
`;

const Row = styled.View`
  margin: 10px 15px 0;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const DefaultText = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 34px;
  color: ${Colors.Black};
`;

const Next = styled(NextButton)`
  margin-top: 30px;
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
  const [userAnswersObj, setUserAnswersObj] = useState<Record<number, boolean | undefined>>({});
  const [isCorrectlyAnswered, setIsCorrectlyAnswered] = useState<boolean>();
  const [rightAnswerIdentifier, wrongAnswerIdentifier] = ['class="true-answer">', 'class="possible-answer">'];
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

  let buttonIndex = 0;

  return (
    <BlockBody>
      <Header>
        {questionIcon}
        <HeaderText>{props.data.data.task}</HeaderText>
      </Header>
      {strings.map((string, strIndex) =>
        <Row key={strIndex}>
          {string
            .replace(/span/g, '')
            .replace(/\/>/g, '')
            .split('<')
            .map((item, itemIndex) => {
              if (item.includes(rightAnswerIdentifier)) {
                const currentButton = buttonIndex++;

                return <HighlightingButton
                  key={`${strIndex}${itemIndex}`}
                  text={item.slice(rightAnswerIdentifier.length + 1)}
                  isRightAnswer={true}
                  isAnswered={isCorrectlyAnswered !== undefined}
                  onPress={(pressed: boolean) => setUserAnswersObj({
                    ...userAnswersObj,
                    [currentButton]: !pressed ? true : undefined,
                  })}
                />;
              }
              if (item.includes(wrongAnswerIdentifier)) {
                const currentButton = buttonIndex++;

                return <HighlightingButton
                  key={`${strIndex}${itemIndex}`}
                  text={item.slice(wrongAnswerIdentifier.length + 1)}
                  isRightAnswer={false}
                  isAnswered={isCorrectlyAnswered !== undefined}
                  onPress={(pressed: boolean) => setUserAnswersObj({
                    ...userAnswersObj,
                    [currentButton]: !pressed ? false : undefined,
                  })}
                />;
              }

              return item.split(' ').map((word, wordIndex) => <DefaultText key={`${strIndex}${itemIndex}${wordIndex}`}>{word} </DefaultText>);
            })}
        </Row>
      )}
      {isCorrectlyAnswered === undefined &&
        <Next onPress={() => {
          const haveWrongAnswers = Object.values(userAnswersObj).filter(answer => answer === false).length !== 0;
          const allRightAnswersPressed = Object.values(userAnswersObj).filter(answer => answer === true).length === rightAnswersCount;

          setIsCorrectlyAnswered(!haveWrongAnswers && allRightAnswersPressed);
        }} />
      }
      {isCorrectlyAnswered !== undefined && (isUserNearLocation || !targetLocation) &&
        <Next onPress={() => props.nextCallback()} />
      }
    </BlockBody>
  );
}
