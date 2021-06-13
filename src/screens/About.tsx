import React from 'react';
import Logo from '../images/fullLogo.svg';
import ScreenWrapper from '../components/utils/ScreenWrapper';
import Back from '../images/back.svg';
import styled from 'styled-components/native';
import Colors from '../styles/colors';
import { StyledFonts } from '../styles/textStyles';
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../navigation/profileStack';
import { useTranslation } from 'react-i18next';
import Next from '../images/next.svg';

/**
 * Type with props of screen 'About' in ProfileStackScreen
 */
type Props = StackScreenProps<ProfileStackParamList, 'About'>;

const Title = styled.Text`
  ${StyledFonts.roboto};
  font-size: 28px;
  line-height: 34px;
  color: ${Colors.Black};
`;

const StyledLogo = styled(Logo)`
  margin: 90px 0 20px 0;
`;

const DefaultText = styled.Text<{note?: boolean}>`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
  ${props => props.note && 'opacity: 0.5; text-align: center;'}
`;

const Button = styled.TouchableOpacity<{first?: boolean}>`
  width: 100%;
  margin-bottom: 10px;
  ${props => props.first && 'margin-top: 50px'}
  padding: 11px 20px;
  border: solid rgba(34, 34, 34, 0.2) 1px;
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
`;

const ButtonText = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
  flex: 1;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: -15px;
  align-self: flex-start;
`;

const BackButton = styled.TouchableOpacity`
  padding: 11px 15px;
`;

/**
 * Displays screen with info about the app
 *
 * @param props - props for component rendering
 */
export default function AboutScreen({ navigation }: Props): React.ReactElement {
  const { t } = useTranslation();

  return (
    <ScreenWrapper>
      <Row>
        <BackButton onPress={(): void => navigation.goBack()}>
          <Back/>
        </BackButton>
        <Title>{t('settings.about')}</Title>
      </Row>
      <StyledLogo height={80} width={144}/>
      <DefaultText note>Версия 1.3 от 08.05.2021{'\n'}© 2021 Университет ИТМО</DefaultText>
      <Button first>
        <ButtonText>{t('settings.privacyPolicy')}</ButtonText>
        <Next/>
      </Button>
      <Button>
        <ButtonText>{t('settings.feedback')}</ButtonText>
        <Next/>
      </Button>
    </ScreenWrapper>
  );
}