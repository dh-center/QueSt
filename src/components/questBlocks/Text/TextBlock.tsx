import React from 'react';
import { TextQuestBlock } from '../../../types/questData';
import Colors from '../../../styles/colors';
import { StyledFonts } from '../../../styles/textStyles';
import styled from 'styled-components/native';
import NextButton from '../../ui/NextButton';
import { Spinner } from 'native-base';
import decodeHTMLEntities from '../../utils/decodingHTMLEntities';
import Quote from './Quote';
import BlockBody from '../BlockBody';
import useTargetLocationContext from '../../../contexts/TargetLocationContext';

const Body = styled(BlockBody)`
  padding-left: 15px;
  padding-right: 15px;
`;

const BlockView = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
`;

const Header = styled.Text`
  ${StyledFonts.uiWebMedium};
  font-size: 22px;
  line-height: 22px;
  color: ${Colors.Black};
`;

const Paragraph = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
`;

/**
 * Props for QuestTextBlock
 */
interface QuestTextBlockProps {
  /**
   * Blocks for rendering text data
   */
  data: (TextQuestBlock)[]

  /**
   * Function to go to the next block
   */
  nextCallback: () => void;
}

/**
 * Renders text blocks of quest
 *
 * @param props - props for component rendering
 */
export default function TextBlock(props: QuestTextBlockProps): React.ReactElement {
  const { isUserNearLocation } = useTargetLocationContext();

  if (props.data.length === 0) {
    return <Spinner color={Colors.DarkBlue}/>;
  }

  return (
    <Body>
      {props.data.map((block, index) => {
        let component;

        const text = decodeHTMLEntities(block.data.text);

        switch (block.type) {
          case 'header':
            component = <Header>{text}</Header>;
            break;
          case 'quote':
            component = <Quote block={block}/>;
            break;
          case 'paragraph':
            component = <Paragraph>{text}</Paragraph>;
            break;
          case 'delimiter':
            break;
        }

        return (
          <BlockView key={index}>
            {component}
          </BlockView>
        );
      })}
      {isUserNearLocation && <NextButton onPress={() => props.nextCallback()}/>}
    </Body>
  );
}
