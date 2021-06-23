import React, { useState, useMemo, useRef, useEffect } from 'react';
import BlueCircle15 from '../images/blueCircle15.svg';
import styled from 'styled-components/native';
import { StyledFonts } from '../styles/textStyles';
import Colors from '../styles/colors';
import { useTranslation } from 'react-i18next';
import useTabBarHeight from '../components/utils/useTabBarHeight';
import Emphasis from '../images/emphasis.svg';
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../navigation/profileStack';
import { CollectionCardProps } from '../components/CollectionCard';
import { FlatList } from 'react-native';
import BackArrow from '../components/BackArrow';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { graphql } from 'react-relay';
import { CardsCollectionQuery } from './__generated__/CardsCollectionQuery.graphql';
import CollectionCardsList, { EmptyCardData, getEmptyCard } from '../components/CollectionCardsList';

type Props = StackScreenProps<ProfileStackParamList, 'CardsCollection'>;

const Body = styled.View<{tabBarHeight: number}>`
  background-color: ${Colors.Background};
  flex: 1;
  padding-bottom: ${props => props.tabBarHeight}px;
`;

const BlueCircle = styled(BlueCircle15)`
  position: absolute;
  top: -376px;
  right: -169px;
`;

const Row = styled.View<{margined?: boolean}>`
  flex-direction: row;
  align-items: center;
  ${props => props.margined && 'margin: 74px 0 20px'}
`;

const BackButton = styled.TouchableOpacity`
  padding: 11px 15px;
`;

const Title = styled.Text`
  ${StyledFonts.roboto};
  font-size: 28px;
  line-height: 34px;
  color: ${Colors.Black};
`;

const TabView = styled.TouchableOpacity`
  padding: 0 25px 3px 15px;
`;

const BasicText = styled.Text<{active?: boolean}>`
  ${props => props.active ? StyledFonts.uiWebMedium : StyledFonts.uiWebRegular};
  ${props => props.active === false && 'opacity: 0.6'};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
`;

/**
 * List of tabs on AchievementsScreen
 */
enum CardsScreenTabs {
  ALL,
  RECEIVED,
  PROCESS
}


/**
 * Displays screen with collection of cards
 *
 * @param props - props for component rendering
 */
export default function CardsCollectionScreen({ navigation }: Props): React.ReactElement {
  const { t } = useTranslation();
  const tabBarHeight = useTabBarHeight();
  const flatListRef = useRef<FlatList>(null);
  const cardsData = useLazyLoadQuery<CardsCollectionQuery>(graphql`
    query CardsCollectionQuery {
      personsCards {
        id
        ...CollectionCardData
      }
      me {
        receivedPersonsCards {
          id
          ...CollectionCardData
        }
      }
    }
  `, {});
  const cardsList = cardsData.personsCards;
  const receivedCardIds = useMemo(() => cardsData.me.receivedPersonsCards.map(card => card.id), [ cardsList ]);
  const receivedCards: (CollectionCardProps | EmptyCardData)[] = useMemo(() => {
    const result: CollectionCardProps[] = cardsData.me.receivedPersonsCards
      .map(card => {
        return ({
          data: card,
          isReceived: true,
        });
      });

    if (result.length % 2 === 1) {
      return [...result, getEmptyCard()];
    }

    return result;
  }, [ cardsList ]);

  const lockedCards: (CollectionCardProps | EmptyCardData)[] = useMemo(() => {
    const result = cardsList
      .filter(card => !receivedCardIds.includes(card.id))
      .map(card => {
        return ({
          data: card,
          isReceived: receivedCardIds.includes(card.id),
        });
      });


    if (result.length % 2 === 1) {
      return [...result, getEmptyCard()];
    }

    return result;
  }, [ cardsList ]);

  const [currentTab, setCurrentTab] = useState<CardsScreenTabs>(CardsScreenTabs.ALL);
  let data: (CollectionCardProps | EmptyCardData)[];

  switch (currentTab) {
    case CardsScreenTabs.RECEIVED:
      data = receivedCards;
      break;
    case CardsScreenTabs.PROCESS:
      data = lockedCards;
      break;
    default:
      data = [...receivedCards, ...lockedCards];
  }

  useEffect(() => {
    if (flatListRef.current && data.length) {
      flatListRef.current.scrollToIndex({
        animated: false,
        index: 0,
      });
    }
  }, [ currentTab ]);

  return (
    <Body tabBarHeight={tabBarHeight}>
      <BlueCircle/>
      <Row margined>
        <BackButton onPress={(): void => navigation.goBack()}>
          <BackArrow/>
        </BackButton>
        <Title>{t('profile.cards')}</Title>
      </Row>
      <Row>
        <TabView activeOpacity={1} onPress={() => setCurrentTab(CardsScreenTabs.ALL)}>
          <BasicText active={currentTab === CardsScreenTabs.ALL}>{t('achievements.all')}</BasicText>
          {currentTab === CardsScreenTabs.ALL && <Emphasis/>}
        </TabView>
        <TabView activeOpacity={1} onPress={() => setCurrentTab(CardsScreenTabs.RECEIVED)}>
          <BasicText active={currentTab === CardsScreenTabs.RECEIVED}>{t('achievements.received')}</BasicText>
          {currentTab === CardsScreenTabs.RECEIVED && <Emphasis/>}
        </TabView>
        <TabView activeOpacity={1} onPress={() => setCurrentTab(CardsScreenTabs.PROCESS)}>
          <BasicText  active={currentTab === CardsScreenTabs.PROCESS}>{t('achievements.process')}</BasicText>
          {currentTab === CardsScreenTabs.PROCESS && <Emphasis/>}
        </TabView>
      </Row>
      <CollectionCardsList ref={flatListRef} items={data}/>
    </Body>
  );
}
