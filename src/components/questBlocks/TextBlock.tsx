import React from 'react';
import { TextQuestBlock } from '../../types/questData';
import Colors from '../../styles/colors';
import { StyledFonts } from '../../styles/textStyles';
import styled from 'styled-components/native';
import NextButton from '../ui/NextButton';
import { Spinner } from 'native-base';

const Body = styled.View`
  padding: 0 15px;
`;

const BlockView = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
`;

const FlexView = styled.View`
  flex: 1;
`;

const Header = styled.Text`
  ${StyledFonts.uiWebMedium};
  font-size: 22px;
  line-height: 22px;
  color: ${Colors.Black};
`;

const QuoteLine = styled.View`
  background-color: ${Colors.Blue};
  width: 5px;
  border-radius: 5px;
  margin: 0 10px;
  elevation: ${8};
  box-shadow: 0 4px 4.65px rgba(0,0,0,0.2);
`;

const Paragraph = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
`;

const Line = styled.View`
  width: 50px;
  height: 0.1px;
  border-top-width: 1px;
  border-top-color: ${Colors.DarkBlue};
  margin: 15px 0;
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
export default function QuestTextBlock(props: QuestTextBlockProps): React.ReactElement {
  if (props.data.length === 0) {
    return <Spinner color={Colors.DarkBlue}/>;
  }

  return (
    <Body>
      {props.data.map((block, index) => {
        let component;

        switch (block.type) {
          case 'header':
            component = <Header>{block.data.text}</Header>;
            break;
          case 'quote':
            component =
              <>
                <QuoteLine/>
                <FlexView>
                  <Paragraph>{block.data.text}</Paragraph>
                  <Line/>
                  <Paragraph>{block.data.caption}</Paragraph>
                </FlexView>
              </>;
            break;
          case 'paragraph':
            component = <Paragraph>{block.data.text}</Paragraph>;
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
      <NextButton onPress={() => props.nextCallback()} />
    </Body>
  );
}
