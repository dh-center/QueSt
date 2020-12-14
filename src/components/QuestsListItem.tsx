import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import Colors from '../styles/colors';
import styled from 'styled-components/native';
import { StyledFonts } from '../styles/textStyles';
import Human from '../images/human.svg';
import Next from '../images/next.svg';

const QuestItem = styled.TouchableOpacity`
  min-height: 60px;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.WHITE};
  border-radius: 15px;
  margin: 5px 15px 10px;
  padding-right: 22px;
  elevation: ${4};
  box-shadow: 0 2px 2.62px rgba(0,0,0,0.1);
`;

const IconView = styled.View`
  align-self: stretch;
  width: 50px;
  background-color: ${Colors.YELLOW};
  justify-content: center;
  align-items: center;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;

const QuestName = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.BLACK};
  margin-left: 9px;
  margin-right: 30px;
  flex: 1;
`;

/**
 * Props for QuestsListItem component
 */
export interface QuestItemProps {

  /**
   * Quests name
   */
  name: string;
}

/**
 * Component with QuestItems for QuestsList
 *
 * @param props - props for item
 */
export default function QuestsListItem({ style: _style, name, ...rest }: TouchableOpacityProps & QuestItemProps): React.ReactElement {
  return (
    <QuestItem {...rest}>
      <IconView>
        <Human/>
      </IconView>
      <QuestName>{name}</QuestName>
      <Next/>
    </QuestItem>
  );
}
