import React from 'react';
import OnboardingBody from '../components/OnboardingBody';
import Human from '../../images/human.svg';
import Route from '../../images/route.svg';
import Book from '../../images/book.svg';
import Puzzle from '../../images/puzzle.svg';
import QuestType from '../components/QuestType';
import ScreenInfo from '../components/ScreenInfo';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const Container = styled.View`
  flex: 1;
  max-height: ${Dimensions.get('screen'). width * 400 / 375 + 50}px;
  margin-bottom: 40px;
  justify-content: flex-end;
`;

const QuestTypesView = styled.View`
  flex: 1;
  max-height: 400px;
  justify-content: space-between;
`;

/**
 * Screen with information about quests
 */
export default function AboutQuests(): React.ReactElement {
  return (
    <OnboardingBody>
      <Container>
        <QuestTypesView>
          <QuestType icon={<Human/>} title={'Квесты'} description={'Прогулки по городу с заданиями и интерактивными действиями'}/>
          <QuestType icon={<Route/>} title={'Маршруты'} description={'Подборка связанных между собой локаций по одной теме'}/>
          <QuestType icon={<Book/>} title={'Истории'} description={'Интерактивные новеллы. Выходить из дома необязательно :)'}/>
          <QuestType icon={<Puzzle/>} title={'Тесты'} description={'Проверь свое знание истории и культуры города'}/>
        </QuestTypesView>
      </Container>
      <ScreenInfo title={'Квесты'} description={'В приложении есть разные виды квестов, за выполнение которых дается награда в виде очков опыта, достижений и карточек.'}/>
    </OnboardingBody>
  );
}
