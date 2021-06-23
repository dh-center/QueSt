import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { graphql } from 'react-relay';
import { AwardsAndStats$key } from './__generated__/AwardsAndStats.graphql';
import styled from 'styled-components/native';
import { BasicText, Icon, Line } from './common';
import Exp from '../../images/exp.svg';
import AchievementIcon from '../../images/achievement.svg';
import Cards from '../../images/cards.svg';
import Colors from '../../styles/colors';
import { StyledFonts } from '../../styles/textStyles';
import { useTranslation } from 'react-i18next';

/**
 * Component props
 */
interface Props {
  /**
   * Data for rendering
   */
  data: AwardsAndStats$key
}

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  height: 50px;
  margin: 30px 0;
`;

const Cell = styled.View<{vertical?: boolean}>`
  flex: 1;
  flex-direction: ${props => props.vertical ? 'column' : 'row'};
  align-items: center;
  justify-content: center;
`;

const HeadersText = styled.Text<{margined?: boolean}>`
  ${StyledFonts.uiWebMedium};
  font-size: 22px;
  line-height: 22px;
  color: ${Colors.Black};
  margin-top: ${props => props.margined ? 5 : 0}px;
`;

/**
 * Displays awards for not passed quests and statistic for passed quests
 *
 * @param props - props for component rendering
 */
export default function AwardsAndStats(props: Props): React.ReactElement {
  const { t } = useTranslation();
  const data = useFragment(graphql`
    fragment AwardsAndStats on Quest {
      earnedExp
      personsCards {
        id
      }
      linkedAchievements {
        id
      }
      questProgressState
      distanceInKilometers
    }
  `, props.data);

  if (data.questProgressState !== 'PASSED') {
    return (
      <Row>
        <Cell>
          <Icon as={Exp}/>
          <BasicText>{data.earnedExp} exp</BasicText>
        </Cell>
        <Line vertical/>
        <Cell>
          <Icon as={AchievementIcon}/>
          <BasicText>+{data.linkedAchievements.length}</BasicText>
        </Cell>
        <Line vertical/>
        <Cell>
          <Icon as={Cards}/>
          <BasicText>+{data.personsCards.length}</BasicText>
        </Cell>
      </Row>
    );
  }

  return (
    <Row>
      <Cell vertical>
        <BasicText>{t('quests.mileage')}</BasicText>
        <HeadersText margined>{data.distanceInKilometers} {t('measures.kilometers')}</HeadersText>
      </Cell>
      <Line vertical/>
      <Cell vertical>
        <BasicText>{t('quests.received')}</BasicText>
        <HeadersText margined>{data.earnedExp} exp</HeadersText>
      </Cell>
    </Row>
  );
}
