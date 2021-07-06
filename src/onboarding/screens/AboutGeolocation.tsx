import React from 'react';
import OnboardingBody from '../components/OnboardingBody';
import Phone from '../../images/mockPhoneWithGeo.svg';
import { Dimensions } from 'react-native';
import ScreenInfo from '../components/ScreenInfo';
import styled from 'styled-components/native';

const MockPhone = styled(Phone)`
  margin-bottom: 20px;
`;

/**
 * Screen with information about geolocation
 */
export default function AboutGeolocation(): React.ReactElement {
  return (
    <OnboardingBody>
      <MockPhone width={Dimensions.get('screen').width} height={Dimensions.get('screen').width * 400 / 375}/>
      <ScreenInfo title={'Геолокация'} description={'Во время прохождения квестов и маршрутов необходимо перемещаться между локациями.'}/>
    </OnboardingBody>
  );
}
