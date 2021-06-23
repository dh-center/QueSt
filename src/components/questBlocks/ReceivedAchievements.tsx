import React from 'react';
import { useTranslation } from 'react-i18next';
import AchievementItem from './AchievementItem';
import styled from 'styled-components/native';
import { StyledFonts } from '../../styles/textStyles';
import Colors from '../../styles/colors';
import { graphql } from 'react-relay';
import { useFragment } from 'react-relay/hooks';
import { ReceivedAchievementsData$key } from './__generated__/ReceivedAchievementsData.graphql';

const Title = styled.Text`
  ${StyledFonts.roboto};
  font-size: 28px;
  line-height: 28px;
  margin-top: 30px;
  color: ${Colors.White};
`;

/**
 * Props for received achievements
 */
interface Props {
  /**
   * Data to render
   */
  data: ReceivedAchievementsData$key
}

/**
 * Component for displaying all received achievements
 *
 * @param props - props for component rendering
 */
export default function ReceivedAchievements(props: Props): React.ReactElement {
  const { t } = useTranslation();
  const data = useFragment(graphql`
    fragment ReceivedAchievementsData on Achievement @relay(plural: true) {
      id
      name
    }
  `, props.data);

  return (
    <>
      <Title>{t('quests.achievements')}</Title>
      {data.map(item => (
        <AchievementItem key={item.id} text={item.name}/>
      ))}
    </>
  );
}
