import React from 'react';
import styled from 'styled-components/native';
import { ImageSourcePropType } from 'react-native';

const BlurView = styled.Image<{size: number, offset: number}>`
  position: absolute;
  height: ${props => props.size * 2}px;
  width: ${props => props.size * 2}px;
  align-self: center;
  top: -${props => props.offset}px;
  resize-mode: contain;
`;

const AvatarView = styled.View<{size: number}>`
  height: ${props => props.size}px;
  aspect-ratio: 1;
  border-radius: ${props => props.size / 2}px;
`;

const AvatarImage = styled.Image<{size: number}>`
  flex: 1;
  border-radius: ${props => props.size / 2}px;
`;

/**
 * Props for Avatar component
 */
interface AvatarProps {
  /**
   * Size of avatar (width & height)
   */
  size: number;

  /**
   * Source with avatar image
   */
  source: ImageSourcePropType;
}

/**
 * Component for rendering avatar with blue shadow
 *
 * @param props - props for component rendering
 */
export default function Avatar(props: AvatarProps): React.ReactElement {
  const offset = props.size / 2 - 3;

  return (
    <AvatarView size={props.size}>
      <BlurView
        source={require('../images/blueCircle.png')}
        blurRadius={20}
        size={props.size}
        offset={offset}
      />
      <AvatarImage source={props.source} size={props.size}/>
    </AvatarView>
  );
}
