import React, { ReactElement } from 'react';
import { CurrentTaskBlock } from '../../types/questData';
import styled from 'styled-components/native';
import Colors from '../../styles/colors';
import Alarm from '../../images/alarm.svg';
import { StyledFonts } from '../../styles/textStyles';

/**
 * Panel for displaying with information
 */
const Container = styled.View`
  /**
   * Element position
   */
  position: absolute;
  top: 0;

  /**
   * Element styles
   */
  width: 100%;
  padding: 40px 25px 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: ${Colors.White};
  flex-direction: row;
  align-items: center;

  /**
   * IOS shadows
   */
  box-shadow: 0 4px 4.65px rgba(0,0,0,0.2);

  /**
   * Android shadows
   */
  elevation: ${3};
`;

/**
 * Current task text
 */
const TaskText = styled.Text`
  /**
   * Element position
   */
  margin-left: 25px;

  /**
   * Font styles
   */
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
`;

/**
 * Props of CurrentTask component
 */
interface CurrentTaskProps {
  /**
   * Editor block for render
   */
  block: CurrentTaskBlock;
}

/**
 * Panel with current quest task
 *
 * @param props - props of component
 */
export default function CurrentTask(props: CurrentTaskProps): ReactElement {
  return (
    <Container>
      <Alarm/>
      <TaskText>{props.block.data.currentQuestTask}</TaskText>
    </Container>
  );
}
