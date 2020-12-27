import React from 'react';
import { TextQuestBlock } from '../../types/questData';
import { View, Text } from 'react-native';

/**
 * Props for QuestTextBlock
 */
interface QuestTextBlockProps {
  /**
   * Blocks for rendering text data
   */
  data: (TextQuestBlock)[]
}

/**
 * Renders text blocks of quest
 *
 * @param props - props for component rendering
 */
export default function QuestTextBlock(props: QuestTextBlockProps): React.ReactElement {
  return (
    <View>
      {props.data.map((block, index) => {
        return <Text key={index}>{JSON.stringify(block)}</Text>;
      })}
    </View>
  );
}
