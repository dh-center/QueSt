import React, { useEffect, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { graphql } from 'react-relay';
import { MessageQuery } from './__generated__/MessageQuery.graphql';
import styled from 'styled-components/native';
import Colors from '../../styles/colors';
import { StyledFonts } from '../../styles/textStyles';
import Button from '../ui/Button';
import TypingIcon from '../../images/typing.svg';

interface MessageProps {
  /**
   * Index of current message
   */
  messageIndex: number;

  /**
   * Id of message sender
   */
  senderId: string;

  /**
   * Is the message left-side
   */
  isLeft: boolean;

  /**
   * User reaction for displaying on button
   */
  reaction?: string;

  /**
   * Message text
   */
  message: string;

  /**
   * Is the senders avatar needed to display
   */
  needImage: boolean;

  /**
   * Function to increment messages count
   */
  getMoreMessage:  () => void;
}

const Body = styled.View`
  padding: 0 15px 30px;
`;

const Row = styled.View<{isLeft: boolean}>`
  padding-right: 15px;
  flex-direction: ${props => props.isLeft ? 'row' : 'row-reverse'};
`;

const SenderImageView = styled.View`
  height: 50px;
  aspect-ratio: 1;
  border-radius: 25px;
  background-color: ${Colors.White};
  elevation: ${2};
  box-shadow: 0 2px 3px rgba(0,0,0,0.2);
`;

const SenderImage = styled.Image`
  flex: 1;
  aspect-ratio: 1;
  border-radius: 25px;
`;

const MessageView = styled.View`
  flex: 1;
  margin: 0 10px;
`;

const MessageBlock = styled.View<{isLeft: boolean}>`
  background-color: ${Colors.White};
  align-self: ${props => props.isLeft ? 'flex-start' : 'flex-end'};
  margin-top: 5px;
  padding: 10px;
  border-radius: 15px;
  elevation: ${2};
  box-shadow: 0 2px 3px rgba(0,0,0,0.2);
`;

const MessageBlockWithoutAvatar = styled.View<{isLeft: boolean}>`
  background-color: ${Colors.White};
  align-self: ${props => props.isLeft ? 'flex-start' : 'flex-end'};
  ${props => props.isLeft ? 'margin: -25px 30px 0 60px;' : 'margin: -25px 60px 0 30px;'}
  padding: 10px;
  border-radius: 15px;
  elevation: ${2};
  box-shadow: 0 2px 3px rgba(0,0,0,0.2);
`;

const DefaultText = styled.Text<{isLeft: boolean}>`
  ${StyledFonts.uiWebMedium};
  align-self: ${props => props.isLeft ? 'flex-start' : 'flex-end'};
  font-size: 18px;
  line-height: 22px;
`;

const ReactionButton = styled(Button)`
  margin-top: 15px;
`;

/**
 * Message component
 *
 * @param props - props of current message
 */
export default function Message(props: MessageProps): React.ReactElement {
  useEffect(() => {
    !props.reaction && props.getMoreMessage();
  }, [ props.messageIndex ]);

  const data = useLazyLoadQuery<MessageQuery>(
    graphql`
      query MessageQuery($id: GlobalId!, $needFetch: Boolean!) {
        person(id: $id) @include(if: $needFetch) {
          id
          firstName
          lastName
          mainPhotoLink
        }
        user: me @skip(if: $needFetch) {
          id
          firstName
          photo
        }
      }
    `,
    { id: props.senderId,
      needFetch: props.senderId !== 'user' }
  );

  let senderImageSource = require('../../images/lapki.jpg');

  if (props.senderId === 'user' && data.user?.photo) {
    senderImageSource = { uri: data.user?.photo };
  } else if (data.person?.mainPhotoLink) {
    senderImageSource = { uri: data.person?.mainPhotoLink };
  }

  const senderName = props.senderId === 'user'
    ? data.user?.firstName
    : data.person?.firstName + ' ' + data.person?.lastName;

  const [isReacted, setIsReacted] = useState(!props.reaction);

  return (
    <Body>
      {props.needImage
        ?
        <Row isLeft={props.isLeft}>
          <SenderImageView>
            <SenderImage source={senderImageSource}/>
          </SenderImageView>
          <MessageView>
            <DefaultText isLeft={props.isLeft}>{senderName}</DefaultText>
            <MessageBlock isLeft={props.isLeft}>
              {isReacted
                ? <DefaultText isLeft={true}>{props.message}</DefaultText>
                : <TypingIcon/>
              }
            </MessageBlock>
          </MessageView>
        </Row>
        :
        <MessageBlockWithoutAvatar isLeft={props.isLeft}>
          {isReacted
            ? <DefaultText isLeft={true}>{props.message}</DefaultText>
            : <TypingIcon/>
          }
        </MessageBlockWithoutAvatar>
      }
      {props.reaction && !isReacted &&
        <ReactionButton title={props.reaction} onPress={() => {
          setIsReacted(true);
          props.getMoreMessage();
        }}/>
      }
    </Body>
  );
}
