import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { CurrentTaskBlock } from '../../types/questData';

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
    <View>{props.block.data.currentQuestTask}</View>
  );
}
