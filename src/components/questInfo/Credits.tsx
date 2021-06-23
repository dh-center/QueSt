import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { graphql } from 'react-relay';
import { CreditsInfo$key } from './__generated__/CreditsInfo.graphql';
import { CreditBlock } from '../../types/questData';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Block, Line } from './common';
import Colors from '../../styles/colors';
import { StyledFonts } from '../../styles/textStyles';
import decodeHTMLEntities from '../utils/decodingHTMLEntities';

/**
 * Props for rendering Credits block
 */
interface Props {
  /**
   * Data for rendering
   */
  data: CreditsInfo$key
}

const CreditsImage = styled.Image<{margined?: boolean}>`
  align-self: center;
  width: 70%;
  aspect-ratio: 1;
  resize-mode: contain;
  margin-top: ${props => props.margined ? '15' : '0'}px;
`;

const CreditsText = styled.Text`
  ${StyledFonts.uiWebMedium};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
`;

/**
 * Displays credit info for quest
 *
 * @param props - props for component rendering
 */
export default function Credits(props: Props): React.ReactElement | null {
  const data = useFragment(graphql`
    fragment CreditsInfo on Quest {
      credits {
        blocks
      }
    }
  `, props.data);

  const creditsData = data.credits?.blocks as CreditBlock[];

  if (!creditsData || creditsData.length === 0) {
    return null;
  }


  let creditsInfo;
  let creditsImage;

  if (creditsData) {
    creditsData.forEach(item => {
      switch (item.type) {
        case 'paragraph':
          creditsInfo = item.data.text;
          break;
        case 'image':
          creditsImage = item.data.file.url;
          break;
      }
    });
  }

  return (
    <View>
      <Line/>
      <Block>
        {creditsInfo !== undefined && <CreditsText>{decodeHTMLEntities(creditsInfo)}</CreditsText>}
        {creditsImage !== undefined && <CreditsImage source={{ uri: creditsImage }} margined={creditsInfo}/>}
      </Block>
    </View>
  );
}
