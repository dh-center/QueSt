import React, { useState } from 'react';
import OnboardingBody from '../components/OnboardingBody';
import MockPhone from '../../images/mockPhone.svg';
import ScreenInfo from '../components/ScreenInfo';
import { Dimensions, View } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../styles/colors';
import Alarm from '../../images/alarm.svg';
import { StyledFonts } from '../../styles/textStyles';

const MockPhoneView = styled.View`
  flex: 1;
  max-height: ${Dimensions.get('screen'). width * 400 / 375 + 50}px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: flex-end;
`;

const TaskView = styled.View<{width: number, topOffset: number}>`
  min-height: 64px;
  width: ${props => props.width}px;
  position: absolute;
  top: ${props => props.topOffset}px;
  align-self: center;
  background-color: ${Colors.White};
  border: rgba(85, 85, 107, 0.15) 1px;
  border-radius: 10px;
  padding: 15px 20px;
  flex-direction: row;
  align-items: center;
  elevation: ${8};
  box-shadow: 0 4px 4.65px rgba(0,0,0,0.2);
`;

const TaskText = styled.Text`
  ${StyledFonts.uiWebRegular};
  flex: 1;
  margin-left: 15px;
  font-size: 14px;
  line-height: 16px;
  color: ${Colors.Black};
`;

/**
 * Screen with information about passing the quest
 */
export default function QuestPassing(): React.ReactElement {
  const [mockPhoneHeight, setMockPhoneHeight] = useState(Dimensions.get('screen').width * 400 / 375);
  const mockPhoneWidth = mockPhoneHeight * 375 / 400;
  const taskViewWidth = mockPhoneWidth * 320 / 375;
  const taskViewTopOffset = mockPhoneHeight / 10;

  return (
    <OnboardingBody>
      <MockPhoneView onLayout={(event) => setMockPhoneHeight(Math.min(mockPhoneHeight, event.nativeEvent.layout.height))}>
        <View>
          <MockPhone width={mockPhoneWidth} height={mockPhoneHeight}/>
          <TaskView width={taskViewWidth} topOffset={taskViewTopOffset}>
            <Alarm/>
            <TaskText>Добраться до квартиры Бриков, где жила Лиля Брик</TaskText>
          </TaskView>
        </View>
      </MockPhoneView>
      <ScreenInfo title={'Выполнение квеста'} description={'Текущее задание находится в верхней части экрана.\nЕго необходимо выполнить, чтобы продолжить квест.'}/>
    </OnboardingBody>
  );
}
