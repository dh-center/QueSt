import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

const Body = styled.View<{bottomOffset: number}>`
  background-color: ${Colors.Background};
  flex: 1;
  padding: ${props => 60 + props.bottomOffset}px 15px;
  justify-content: space-between;
`;

const PatternView = styled.View<{pos: 'top' | 'bottom'}>`
  position: absolute;
  ${props => props.pos === 'top' ? 'top: 0;' : 'bottom: 0;'}
  width: ${Dimensions.get('screen').width}px;
  aspect-ratio: ${375 / 218};
`;

const Pattern = styled.Image`
  width: 100%;
  height: 100%;
`;

interface OnboardingBodyProps {
  /**
   * If it is first screen of onboarding
   */
  isFirstScreen?: boolean,

  /**
   * Children
   */
  children: React.ReactElement[] | React.ReactElement,
}

/**
 * Wrapper for onboarding screens
 *
 * @param props - props for component rendering
 */
export default function OnboardingBody({ isFirstScreen, children }: OnboardingBodyProps): React.ReactElement {
  const insets = useSafeAreaInsets();

  return (
    <Body bottomOffset={insets.bottom}>
      <PatternView pos={'top'}>
        <Pattern
          source={isFirstScreen ? require('../../images/onboardingHighTop.png') : require('../../images/onboardingTop.png')}
        />
      </PatternView>
      {children}
      <PatternView pos={'bottom'}>
        <Pattern
          source={isFirstScreen ? require('../../images/onboardingHighBottom.png') : require('../../images/onboardingBottom.png')}
        />
      </PatternView>
    </Body>
  );
}
