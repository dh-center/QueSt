import React, { ReactElement } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Next from '../../images/nextButton.svg';
import styled from 'styled-components/native';

const NextButtonView = styled(TouchableOpacity)`
  height: 64px;
  width: 64px;
  border-radius: 32px;
  align-self: center;
  margin-bottom: 30px;
  elevation: ${8};
  box-shadow: 0 4px 4.65px rgba(0,0,0,0.2);
`;

/**
 * Custom button with next arrow
 *
 * @param props - component props
 */
export default function NextButton(props: TouchableOpacityProps): ReactElement {
  return (
    <NextButtonView {...props}>
      <Next/>
    </NextButtonView>
  );
}
