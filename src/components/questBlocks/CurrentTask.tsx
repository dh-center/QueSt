import React, { ReactElement } from 'react';
import { CurrentTaskBlock } from '../../types/questData';
import styled from 'styled-components/native';
import Colors from '../../styles/colors';
import Alarm from '../../images/alarm.svg';
import { StyledFonts } from '../../styles/textStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Panel for displaying with information
 *
 * @param props
 */
const Container = styled.View<{topOffset: number}>`
  /**
   * Element position
   */
  position: absolute;
  top: 0;

  /**
   * Element styles
   */
  width: 100%;
  padding: ${props => props.topOffset}px 25px 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: ${Colors.White};
  flex-direction: row;
  align-items: center;

  /**
   * IOS shadows
   */
  box-shadow: 0 2px 5px rgba(0,0,0,0.24);

  /**
   * Android shadows
   */
  elevation: ${4};
`;

/**
 * Current task text
 */
const TaskText = styled.Text`
  /**
   * Element position
   */
  margin-left: 25px;
  flex: 1;

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
  const insets = useSafeAreaInsets();

  return (
    <Container topOffset={insets.top + 15}>
      <Alarm/>
      <TaskText>{props.block.data.currentQuestTask}</TaskText>
    </Container>
  );
}
