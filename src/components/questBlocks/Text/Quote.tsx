import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../styles/colors';
import { StyledFonts } from '../../../styles/textStyles';
import { QuoteBlock } from '../../../types/questData';
import decodeHTMLEntities from '../../utils/decodingHTMLEntities';

const FlexView = styled.View`
  flex: 1;
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
 * Props for Quote
 */
interface QuoteProps {
  /**
   * Quote data
   */
  block: QuoteBlock;
}

/**
 * Renders quote of TextBlock
 *
 * @param props - props for quote rendering
 */
export default function Quote(props: QuoteProps): React.ReactElement {
  const text = decodeHTMLEntities(props.block.data.text);
  const caption = decodeHTMLEntities(props.block.data.caption);

  return (
    <>
      <QuoteLine/>
      <FlexView>
        <Paragraph>{text}</Paragraph>
        <Line/>
        <Paragraph>{caption}</Paragraph>
      </FlexView>
    </>
  );
}
