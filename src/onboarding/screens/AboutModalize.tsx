import React, { useState } from 'react';
import OnboardingBody from '../components/OnboardingBody';
import MockPhone from '../../images/mockPhone.svg';
import ScreenInfo from '../components/ScreenInfo';
import styled from 'styled-components/native';
import { Dimensions, View } from 'react-native';
import Colors from '../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import TextBlock from '../../components/questBlocks/Text/TextBlock';
import { PageBlock } from '../../types/questData';
import { TargetLocationProvider } from '../../contexts/TargetLocationContext';
import { AudioAccompanimentProvider } from '../../contexts/AudioAccompanimentContext';

const pageBlock: PageBlock = {
  'type': 'page',
  'data': [
    {
      'type': 'header',
      'data': {
        'level': 2,
        'text': 'Есенщина',
      },
    },
    {
      'type': 'paragraph',
      'data': {
        'text': 'Причина образования слова — противостояние Есенина и Маяковского. Маяковский глубоко осуждал Есенина, в частности за его меланхоличные мысли:',
      },
    },
    {
      'type': 'quote',
      'data': {
        'caption': 'Выступление на диспуте  «Упадочное настроение среди молодежи (Есенщина)», 5 марта 1927 г., публикация Ф. Н. Пицкельэ&nbsp;',
        'text': '«По вопросу об есенинщине я глубоко убежден, конечно, что Есенин сам по себе не так страшен и не мог бы быть так страшен, как есенинщина. Конечно, есенинщина производное от Есенина, потому что многие идеализируют в этом отношении Есенина, а он не имеет никакого отношения к этому. Но на множество процентов это результат дальнейших популяризаторов, дальнейших пропагандистов Есенина. Нельзя же все-таки скрывать такой факт, что выступавшие товарищи, и т. Бухарин в своих заметках выступали не только против есенинщины, а против Есенина, против Есенина самого, как он есть.»',
      },
    },
  ],
};

const MockPhoneView = styled.View`
  flex: 1;
  max-height: ${Dimensions.get('screen'). width * 400 / 375 + 50}px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: flex-end;
`;

const GradientView = styled.View`
  height: 147%;
  width: 100%;
  position: absolute;
  align-self: center;
  z-index: 999;
  elevation: ${999};
`;

const Gradient = styled(LinearGradient)`
  flex: 1;
`;

const ModalizeContainer = styled.View<{width: number, height: number}>`
  background-color: ${Colors.White};
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  position: absolute;
  bottom: 0;
  align-self: center;
  border-radius: 10px;
  elevation: ${16};
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
`;

const ModalizeView = styled.View`
  flex: 1;
  padding: 12px 15px;
  overflow: hidden;
`;

const Handle = styled.View`
  background-color: rgba(85, 85, 107, 0.1);
  width: 50px;
  height: 5px;
  border-radius: 3px;
  align-self: center;
  margin-bottom: 20px;
`;

/**
 *
 */
export default function AboutModalize(): React.ReactElement {
  const [mockPhoneHeight, setMockPhoneHeight] = useState(Dimensions.get('screen').width * 400 / 375);
  const mockPhoneWidth = mockPhoneHeight * 375 / 400;
  const modalizeWidth = mockPhoneWidth * 305 / 375;
  const modalizeHeight = mockPhoneHeight * 325 / 400;

  return (
    <TargetLocationProvider>
      <AudioAccompanimentProvider questId={''}>
        <OnboardingBody>
          <MockPhoneView onLayout={(event) => event.nativeEvent.layout.height > 0 && setMockPhoneHeight(Math.min(mockPhoneHeight, event.nativeEvent.layout.height))}>
            <View>
              <MockPhone width={mockPhoneWidth} height={mockPhoneHeight}/>
              <ModalizeContainer width={modalizeWidth} height={modalizeHeight}>
                <ModalizeView>
                  <Handle/>
                  <TextBlock page={pageBlock} nextCallback={() => console.log()}/>
                </ModalizeView>
              </ModalizeContainer>
              <GradientView>
                <Gradient
                  start={{
                    x: 0.5,
                    y: 1,
                  }}
                  end={{
                    x: 0.5,
                    y: 0,
                  }}
                  colors={[Colors.Background, 'rgba(255, 255, 255, 0)']}
                  locations={[0.35, 0.65]}
                />
              </GradientView>
            </View>
          </MockPhoneView>
          <ScreenInfo title={'Потяните вверх'} description={'Во время прохождения квеста весь контент появляется в окне, которое можно открыть, потянув вверх, или, наоборот, свернуть, смахнув вниз, чтобы посмотреть на карту.'}/>
        </OnboardingBody>
      </AudioAccompanimentProvider>
    </TargetLocationProvider>
  );
}
