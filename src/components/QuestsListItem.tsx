import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import Colors from '../styles/colors';
import styled from 'styled-components/native';
import { StyledFonts } from '../styles/textStyles';
import Human from '../images/human.svg';
import Puzzle from '../images/puzzle.svg';
import Next from '../images/next.svg';
import Passed from '../images/passed.svg';
import Lock from '../images/lock.svg';

const PassedQuestItemView = styled.View`
  margin: 0 15px 15px;
  opacity: 0.5;
`;

const AvailableQuestItemView = styled.View`
  margin: 0 15px 15px;
  elevation: ${4};
  box-shadow: 0 2px 2.62px rgba(0,0,0,0.1);
`;

const LockedQuestItemView = styled.View<{ state: string }>`
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
   * Quest progress state
   */
  progressState: 'PASSED' | 'AVAILABLE' | 'LOCKED';
}

/**
 * Component with QuestItems for QuestsList
 *
 * @param props - props for item
 */
export default function QuestsListItem({ style: _style, name, type, progressState, ...rest }: TouchableOpacityProps & QuestItemProps): React.ReactElement {
  let iconViewColor;
  let Wrapper;

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

  return (
    <>
      <Wrapper>
        <QuestItem {...rest}>
          <IconView color={iconViewColor}>
            {type === 'ROUTE' ? <Human/> : <Puzzle/>}
          </IconView>
          <QuestName>{name}</QuestName>
          {progressState === 'LOCKED' && <Lock/>}
          {progressState === 'AVAILABLE' && <Next/>}
        </QuestItem>
        {progressState === 'LOCKED' && <AvailableCondition>Достигните 7 уровня</AvailableCondition>}
      </Wrapper>
      {progressState === 'PASSED' && <PassedTick/>}
    </>
  );
}
