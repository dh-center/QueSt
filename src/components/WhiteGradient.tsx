import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';


const Gradient = styled(LinearGradient)`
  height: 30px;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 999;
`;

/**
 * Gradient for QuestInfo
 */
export default function WhiteGradient(): React.ReactElement {
  return <Gradient
    start={{
      x: 0.5,
      y: 0,
    }}
    end={{
      x: 0.5,
      y: 1,
    }}
    colors={['#ffffff', 'rgba(255, 255, 255, 0)']}
  />;
}
