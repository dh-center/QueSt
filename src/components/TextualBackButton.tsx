import React from 'react';
import styled from 'styled-components/native';
import Back from '../images/back.svg';
import Colors from '../styles/colors';
import { StyledFonts } from '../styles/textStyles';
import { TouchableOpacityProps } from 'react-native';
import { useTranslation } from 'react-i18next';

const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const BackArrow = styled(Back)`
  padding: 0 10px;
  color: ${Colors.DarkBlue};
`;

const BackButtonText = styled.Text`
  ${StyledFonts.uiWebRegular};
  color: ${Colors.DarkBlue};
  font-size: 18px;
  line-height: 22px;
`;

/**
 * Back button with text
 *
 * @param props - props for button
 */
export default function TextualBackButton(props: TouchableOpacityProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <BackButton onPress={props.onPress}>
      <BackArrow/>
      <BackButtonText>{t('signUp.back')}</BackButtonText>
    </BackButton>
  );
}
