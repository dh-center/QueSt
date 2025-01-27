import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import Colors from '../styles/colors';
import styled from 'styled-components/native';
import { StyledFonts } from '../styles/textStyles';
import Human from '../images/human.svg';
import Route from '../images/route.svg';
import Book from '../images/book.svg';
import Puzzle from '../images/puzzle.svg';
import Next from '../images/next.svg';
import Passed from '../images/passed.svg';
import Lock from '../images/lock.svg';
import { useTranslation } from 'react-i18next';
import { QuestUserProgressStates } from '../screens/__generated__/QuestsListQuery.graphql';

const PassedQuestItemView = styled.View`
  margin: 0 15px 15px;
  opacity: 0.5;
`;

const AvailableQuestItemView = styled.View`
  margin: 0 15px 15px;
  background-color: ${Colors.White};
  border-radius: 15px;
  elevation: ${4};
  box-shadow: 0 2px 2.62px rgba(0,0,0,0.1);
`;

const LockedQuestItemView = styled.View`
  margin: 0 15px 15px;
  background-color: #E4E7EA;
  border-radius: 15px;
`;

const QuestItem = styled.TouchableOpacity`
  min-height: 60px;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.White};
  border-radius: 15px;
  padding-right: 22px;
`;

const IconView = styled.View<{ color: string }>`
  align-self: stretch;
  width: 50px;
  background-color: ${(props): string => props.color};
  justify-content: center;
  align-items: center;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;

const QuestName = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
  margin: 15px 30px 15px 9px;
  flex: 1;
`;

const AvailableCondition = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
  margin: 15px 30px;
`;

const PassedTick = styled(Passed)`
  position: absolute;
  right: 15px;
  bottom: 9px;
  border-radius: 16px;
  elevation: ${5};
  box-shadow: 0 2px 3.84px rgba(0,0,0,0.25);
`;

/**
 * Props for QuestsListItem component
 */
export interface QuestItemProps {
  /**
   * Quests name
   */
  name: string;

  /**
   * Quests type
   */
  type: string;

  /**
   * The minimum level required by the user to complete this quest
   */
  minLevel: number;

  /**
   * Quest progress state
   */
  progressState: QuestUserProgressStates;
}

/**
 * Component with QuestItems for QuestsList
 *
 * @param props - props for item
 */
export default function QuestsListItem({ style: _style, name, type, minLevel, progressState, ...rest }: TouchableOpacityProps & QuestItemProps): React.ReactElement {
  const { t } = useTranslation();
  let iconViewColor;
  let Wrapper;
  let icon;

  switch (progressState) {
    case 'PASSED':
      iconViewColor = Colors.Blue;
      Wrapper = PassedQuestItemView;
      break;
    case 'AVAILABLE':
      iconViewColor = Colors.Yellow;
      Wrapper = AvailableQuestItemView;
      break;
    case 'LOCKED':
      iconViewColor = '#888898';
      Wrapper = LockedQuestItemView;
      break;
  }

  switch (type) {
    case 'QUEST':
      icon = <Human/>;
      break;
    case 'ROUTE':
      icon = <Route/>;
      break;
    case 'STORY':
      icon = <Book/>;
      break;
    case 'QUIZ':
      icon = <Puzzle/>;
      break;
  }

  return (
    <>
      <Wrapper>
        <QuestItem {...rest}>
          <IconView color={iconViewColor}>
            {icon}
          </IconView>
          <QuestName>{name}</QuestName>
          {progressState === 'LOCKED' && <Lock/>}
          {progressState === 'AVAILABLE' && <Next/>}
        </QuestItem>
        {progressState === 'LOCKED' && <AvailableCondition>{t('quests.condition', { minLevel })}</AvailableCondition>}
      </Wrapper>
      {progressState === 'PASSED' && <PassedTick/>}
    </>
  );
}
