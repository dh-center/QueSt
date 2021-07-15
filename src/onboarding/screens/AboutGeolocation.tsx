import React, { useState } from 'react';
import OnboardingBody from '../components/OnboardingBody';
import MockPhone from '../../images/mockPhoneWithGeo.svg';
import { Dimensions } from 'react-native';
import ScreenInfo from '../components/ScreenInfo';
import styled from 'styled-components/native';

const MockPhoneView = styled.View`
  flex: 1;
  max-height: ${Dimensions.get('screen'). width * 400 / 375 + 50}px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: flex-end;
`;

/**
 * Screen with information about geolocation
 */
export default function AboutGeolocation(): React.ReactElement {
  const mockPhoneWidth = Dimensions.get('screen').width;
  const [mockPhoneHeight, setMockPhoneHeight] = useState(mockPhoneWidth * 400 / 375);

  return (
    <OnboardingBody>
      <MockPhoneView onLayout={(event) => setMockPhoneHeight(Math.min(mockPhoneHeight, event.nativeEvent.layout.height))}>
        <MockPhone width={mockPhoneWidth} height={mockPhoneHeight}/>
      </MockPhoneView>
      <ScreenInfo title={'Геолокация'} description={'Во время прохождения квестов и маршрутов необходимо перемещаться между локациями.'}/>
    </OnboardingBody>
  );
}
