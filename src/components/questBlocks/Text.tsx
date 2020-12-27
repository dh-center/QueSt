import React from 'react';
import { TextQuestBlock } from '../../types/questData';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../styles/colors';
import textStyles from '../../styles/textStyles';
import Next from '../../images/nextButton.svg';

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 15,
  },
  blockView: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  header: {
    ...textStyles.ptRootMedium,
    fontSize: 22,
  },
  quoteLine: {
    backgroundColor: Colors.Blue,
    width: 5,
    borderRadius: 5,
    marginHorizontal: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
  },
  quote: {
    ...textStyles.default,
    flex: 1,
  },
  line: {
    width: 50,
    height: 0.1,
    borderTopWidth: 1,
    borderTopColor: Colors.DarkBlue,
    marginVertical: 15,
  },
  paragraph: {
    ...textStyles.default,
  },
  delimiter: {},
});

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
    <View style={styles.body}>
      {props.data.map((block, index) => {
        return (
          <View style={styles.blockView} key={index}>
            {block.type === 'quote' && <View style={styles.quoteLine}/>}
            <View>
              <Text style={styles[block.type]}>{block.data.text}</Text>
              {block.type === 'quote' && block.data.caption &&
                <>
                  <View style={styles.line}/>
                  <Text style={styles[block.type]}>{block.data.caption}</Text>
                </>
              }
            </View>
          </View>
        );
      })}
    </View>
  );
}
