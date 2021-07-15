import React from 'react';
import OnboardingBody from '../components/OnboardingBody';
import LogoIcon from '../../images/fullLogo.svg';
import styled from 'styled-components/native';
import { StyledFonts } from '../../styles/textStyles';
import Colors from '../../styles/colors';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Logo = styled(LogoIcon)`
  margin-bottom: 25px;
`;

const DefaultText = styled.Text`
  ${StyledFonts.uiWebMedium};
  line-height: 22px;
  font-size: 22px;
  color: ${Colors.Black};
  text-align: center;
`;

const Delimiter = styled.View`
  background-color: ${Colors.Blue};
  height: 1px;
  margin: 25px 75px;
  align-self: stretch;
`;

/**
 * First screen of onboarding
 */
export default function MainInfo(): React.ReactElement {
  return (
    <OnboardingBody isFirstScreen>
      <Container>
        <Logo height={80} width={144}/>
        <DefaultText>Que.St: квесты по Петербургу</DefaultText>
        <Delimiter/>
        <DefaultText>Приложение, посвещенное изучению истории и культруы Санкт-Петербурга!</DefaultText>
      </Container>
    </OnboardingBody>
  );
}
