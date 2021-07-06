import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../styles/colors';

const Body = styled.View`
  background-color: ${Colors.Background};
  flex: 1;
  padding: 0 15px;
  align-items: center;
  justify-content: center;
`;

const PatternView = styled.View<{pos: 'top' | 'bottom'}>`
  position: absolute;
  ${props => props.pos === 'top' ? 'top: 0;' : 'bottom: 0;'}
  width: 100%;
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
  children: React.ReactElement[]
}

/**
 * Wrapper for onboarding screens
 *
 * @param props - props for component rendering
 */
export default function OnboardingBody({ isFirstScreen, children }: OnboardingBodyProps): React.ReactElement {
  return (
    <Body>
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
