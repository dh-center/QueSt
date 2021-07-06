import React from 'react';
import OnboardingBody from '../components/OnboardingBody';
import Phone from '../../images/mockPhone.svg';
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

const Gradient = styled(LinearGradient)`
  position: absolute;
  align-self: center;
  height: 147%;
  width: 100%;
  z-index: 999;
`;

const MockPhone = styled(Phone)`
  margin-bottom: 20px;
`;

const ModalizeView = styled.View<{width: number, height: number}>`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  position: absolute;
  bottom: 0;
  align-self: center;
  background-color: ${Colors.White};
  border-radius: 10px;
  padding: 12px 15px;
  elevation: ${8};
  box-shadow: 0 4px 4.65px rgba(0, 0, 0, 0.2);
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
  const phoneSVGWidth = Dimensions.get('screen').width;
  const phoneSVGHeight = phoneSVGWidth * 400 / 375;
  const modalizeWidth = phoneSVGWidth * 305 / 375;
  const modalizeHeight = phoneSVGHeight * 325 / 400;

  return (
    <TargetLocationProvider>
      <AudioAccompanimentProvider questId={''}>
        <OnboardingBody>
          <View>
            <MockPhone width={phoneSVGWidth} height={phoneSVGHeight}/>
            <ModalizeView width={modalizeWidth} height={modalizeHeight}>
              <Handle/>
              <TextBlock page={pageBlock} nextCallback={() => console.log()}/>
            </ModalizeView>
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
          </View>
          <ScreenInfo title={'Потяните вверх'} description={'Во время прохождения квеста весь контент появляется в окне, которое можно открыть, потянув вверх, или, наоборот, свернуть, смахнув вниз, чтобы посмотреть на карту.'}/>
        </OnboardingBody>
      </AudioAccompanimentProvider>
    </TargetLocationProvider>
  );
}
