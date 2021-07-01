import React, { useState } from 'react';
import BlockBody from './BlockBody';
import { DialogBlock } from '../../types/questData';
import NextButton from '../ui/NextButton';
import Message from './Message';

/**
 * Props for DialogBlock
 */
interface DialogBlockProps {
  /**
   * Data for rendering dialog
   */
  data: DialogBlock;

  /**
   * Function to go to the next block
   */
  nextCallback: () => void;
}

/**
 * Component for dialog displaying
 *
 * @param props - dialog data
 */
export default function DialogBlockView(props: DialogBlockProps): React.ReactElement {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(1);

  const getMoreMessages = (): void => setCurrentMessageIndex(currentMessageIndex + 1);

  return (
    <BlockBody>
      {props.data.data.messages.slice(0, currentMessageIndex).map((message, index) =>
        <Message
          key={index}
          messageIndex={index}
          senderId={message.sender}
          isLeft={message.isLeft}
          reaction={message.reaction}
          message={message.message}
          needImage={index === 0 || message.sender !== props.data.data.messages[index - 1].sender}
          getMoreMessage={getMoreMessages}
        />
      )}
      {currentMessageIndex === props.data.data.messages.length + 1 && <NextButton onPress={() => props.nextCallback()}/>}
    </BlockBody>
  );
}
