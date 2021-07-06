import React from 'react';
import OnboardingBody from '../components/OnboardingBody';
import Human from '../../images/human.svg';
import Route from '../../images/route.svg';
import Book from '../../images/book.svg';
import Puzzle from '../../images/puzzle.svg';
import QuestType from '../components/QuestType';
import ScreenInfo from '../components/ScreenInfo';

/**
 * Screen with information about quests
 */
export default function AboutQuests(): React.ReactElement {
  return (
    <OnboardingBody>
      <QuestType icon={<Human/>} title={'Квесты'} description={'Прогулки по городу с заданиями и интерактивными действиями'}/>
      <QuestType icon={<Route/>} title={'Маршруты'} description={'Подборка связанных между собой локаций по одной теме'}/>
      <QuestType icon={<Book/>} title={'Истории'} description={'Интерактивные новеллы. Выходить из дома необязательно :)'}/>
      <QuestType icon={<Puzzle/>} title={'Тесты'} description={'Проверь свое знание истории и культуры города'}/>
      <ScreenInfo title={'Квесты'} description={'В приложении есть разные виды квестов, за выполнение которых дается награда в виде очков опыта, достижений и карточек.'}/>
    </OnboardingBody>
  );
}
