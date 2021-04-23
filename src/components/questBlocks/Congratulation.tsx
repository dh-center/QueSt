import React from 'react';
import CongratulationsIcon from '../../images/congratulations.svg';
import styled from 'styled-components/native';
import { StyledFonts } from '../../styles/textStyles';
import Colors from '../../styles/colors';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';

const CongratulationsText = styled.Text`
  ${StyledFonts.roboto};
  font-size: 28px;
  line-height: 28px;
  margin-top: 30px;
  color: ${Colors.White};
`;

const Delimiter = styled.View`
  width: 110px;
  border: 0.5px solid ${Colors.White};
  margin: 10px 0;
`;

const EndingText = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 50px;
  color: ${Colors.White};
`;

const GetButton = styled(Button)`
  width: 100%;
`;

/**
 * Props for Congratulation component
 */
export interface CongratulationProps {
  /**
   * onPress callback
   */
  onPress: () => void;
}

/**
 * Component for displaying congratulations when user ended quest
 *
 * @param props - component props
 */
export default function Congratulation(props: CongratulationProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <>
      <CongratulationsIcon/>
      <CongratulationsText>{t('quests.congratulations')}</CongratulationsText>
      <Delimiter/>
      <EndingText>{t('quests.passed')}</EndingText>
      <GetButton
        title={t('quests.endQuest')}
        onPress={props.onPress}
      />
    </>
  );
}
