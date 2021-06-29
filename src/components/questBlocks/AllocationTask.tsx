import React, { useState } from 'react';
import Colors from '../../styles/colors';
import RightAnswer from '../../images/rightAnswer.svg';
import WrongAnswer from '../../images/wrongAnswer.svg';
import styled from 'styled-components/native';
import { StyledFonts } from '../../styles/textStyles';
import { AllocationBlock } from '../../types/questData';
import NextButton from '../ui/NextButton';
import BlockBody from './BlockBody';
import AllocationIcon from '../../images/allocationIcon.svg';
import AllocationDropDown from './AllocationDropDown';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

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
  margin-bottom: 20px;
`;

const HeaderText = styled.Text`
  ${StyledFonts.uiWebMedium};
  font-size: 22px;
  line-height: 22px;
  color: ${Colors.Black};
  margin-top: 30px;
`;

const Next = styled(NextButton)`
  margin-top: 30px;
`;

/**
 * Props for QuestionView
 */
interface AllocationTaskProps {
  /**
   * Data for rendering question
   */
  data: AllocationBlock;

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
export default function AllocationTask(props: AllocationTaskProps): React.ReactElement {
  const { t } = useTranslation();
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [userAnswersCorrectness, setUserAnswersCorrectness] = useState<boolean[]>(new Array(props.data.data.options.length));
  const [isAnswered, setIsAnswered] = useState(false);
  let questionIcon;

  const optionItems = props.data.data.options
    .map((option, index) => {
      return {
        label: option.right,
        value: index,
      };
    })
    .sort(() => Math.random() - 0.5);

  if (isAnswered) {
    /**
     * RightAnswer or WrongAnswer component, according the user answer
     */
    questionIcon = (userAnswersCorrectness.filter(item => !item).length > 0) ? <WrongAnswer/> : <RightAnswer/>;
  } else {
    /**
     * Question component, if question is active
     */
    questionIcon = <AllocationIcon/>;
  }

  return (
    <Body>
      <Header>
        {questionIcon}
        <HeaderText>{props.data.data.task}</HeaderText>
      </Header>
      {props.data.data.options.map((option, index) =>
        <AllocationDropDown
          key={index}
          index={index}
          name={option.right}
          optionItems={optionItems}
          answers={userAnswers}
          setAnswers={setUserAnswers}
          isDisabled={isAnswered}
          state={userAnswersCorrectness[index]}
        />
      )}
      <Next
        onPress={() => {
          const isAllItemsWithAnswers = userAnswers.filter(answer => answer !== undefined).length === props.data.data.options.length;

          if (isAnswered) {
            return props.nextCallback();
          }
          if (!isAllItemsWithAnswers) {
            Alert.alert(t('quests.chooseAnswer'));
          } else {
            setIsAnswered(true);
            userAnswers.map((answer, index) => {
              userAnswersCorrectness[index] = answer === props.data.data.options[index].left;
            });
            setUserAnswersCorrectness(userAnswersCorrectness);
          }
        }}
      />
    </Body>
  );
}
