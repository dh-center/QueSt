import { ImageSourcePropType } from 'react-native';
import React from 'react';
import { StyledFonts } from '../styles/textStyles';
import Colors from '../styles/colors';
import styled from 'styled-components/native';
import LockSVG from '../images/lock.svg';

/**
 * Card props
 */
export interface CollectionCardProps {
  /**
   * Text on card
   */
  text: string;

  /**
   * Path to image
   */
  imgSource: ImageSourcePropType;

  /**
   * Is the card already received
   */
  isReceived: boolean;
}

const Card = styled.View<{passed?: boolean}>`
  flex: 1;
  background-color: ${Colors.White};
  margin: 0 4.5px ${props => props.passed ? 0 : 7}px;
  border: 0.5px solid #E0E0E0;
  border-radius: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  elevation: ${2};
  ${props => !props.passed && 'justify-content: center;'}
`;

const CardImage = styled.Image`
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  width: 100%;
  height: 250px;
  resize-mode: cover;
`;

const CardText = styled.Text<{passed?: boolean}>`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
  text-align: center;
  padding: ${props => props.passed ? 10 : 15}px;
`;

const Lock = styled(LockSVG)`
  position: absolute;
  bottom: -7px;
  right: 4px;
`;

/**
 * Component of the card
 *
 * @param props - component props
 */
export default function CollectionCard(props: CollectionCardProps): React.ReactElement {
  return (
    <Card passed={props.isReceived}>
      {props.isReceived && <CardImage source={props.imgSource}/>}
      <CardText passed={props.isReceived}>{props.text}</CardText>
      {!props.isReceived && <Lock/>}
    </Card>
  );
}
