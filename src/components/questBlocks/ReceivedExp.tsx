import React from 'react';
import styled from 'styled-components/native';
import { StyledFonts } from '../../styles/textStyles';
import Colors from '../../styles/colors';
import ExpIcon from '../../images/exp.svg';
import { useTranslation } from 'react-i18next';

const Title = styled.Text`
  ${StyledFonts.roboto};
  font-size: 28px;
  line-height: 28px;
  margin-top: 30px;
  color: ${Colors.White};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
`;

const Exp = styled(ExpIcon)`
  margin-right: 10px;
`;

const ExpText = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 22px;
  color: ${Colors.White};
`;

/**
 * Props for ReceivedExp component
 */
export interface ExpProps {
  /**
   * Received experience
   */
  exp: number;
}

/**
 * Component for displaying received experience
 *
 * @param props - component props
 */
export default function ReceivedExp(props: ExpProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <>
      <Title>{t('quests.experience')}</Title>
      <Row>
        <Exp/>
        <ExpText>{props.exp} exp</ExpText>
      </Row>
    </>
  );
}
