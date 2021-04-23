import React from 'react';
import { useTranslation } from 'react-i18next';
import AchievementItem from './AchievementItem';
import styled from 'styled-components/native';
import { StyledFonts } from '../../styles/textStyles';
import Colors from '../../styles/colors';

const Title = styled.Text`
  ${StyledFonts.roboto};
  font-size: 28px;
  line-height: 28px;
  margin-top: 30px;
  color: ${Colors.White};
`;

/**
 * Component for displaying all received achievements
 */
export default function ReceivedAchievements(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <>
      <Title>{t('quests.achievements')}</Title>
      <AchievementItem text={'Петербургская интеллигенция'}/>
      <AchievementItem text={'Друг Достоевского'}/>
    </>
  );
}
