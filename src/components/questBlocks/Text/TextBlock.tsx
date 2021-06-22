import React, { useEffect, useRef, useState } from 'react';
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
import qtsApi from '../../../utils/qtsApi';
import Sound from 'react-native-sound';
import VoiceIcon from '../../../images/voice.svg';
import { TouchableOpacity } from 'react-native';
import useAudioAccompanimentContext from '../../../contexts/AudioAccompanimentContext';


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

const VoiceButton = styled.TouchableOpacity`
  align-self: flex-end;
  padding: 10px;
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
  const { isUserNearLocation, targetLocation } = useTargetLocationContext();
  const { setIsPlaying, setText } = useAudioAccompanimentContext();

  useEffect(() => {
    setText(props.data.map(block => decodeHTMLEntities(block.data.text).replace(/[<>]/ig, '')).join('\n'));
  }, [ props.data ]);

  if (props.data.length === 0) {
    return <Spinner color={Colors.DarkBlue}/>;
  }

  return (
    <Body>
      <VoiceButton onPress={() => setIsPlaying(isPl => !isPl)}>
        <VoiceIcon/>
      </VoiceButton>
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
      {(isUserNearLocation || !targetLocation) && <NextButton onPress={() => props.nextCallback()}/>}
    </Body>
  );
}
