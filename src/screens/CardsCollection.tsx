import React, { useState } from 'react';
import BlueCircle15 from '../images/blueCircle15.svg';
import styled from 'styled-components/native';
import { StyledFonts } from '../styles/textStyles';
import Colors from '../styles/colors';
import { useTranslation } from 'react-i18next';
import useTabBarHeight from '../components/utils/useTabBarHeight';
import Back from '../images/back.svg';
import Emphasis from '../images/emphasis.svg';
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../navigation/profileStack';
import CollectionCard from '../components/CollectionCard';
import { FlatList, ImageSourcePropType } from 'react-native';

interface CardData {
  name: string,
  img: ImageSourcePropType,
  isReceived: boolean,
}

interface EmptyCardData {
  name: null,
  img: null,
  isReceived: null,
}

const cardsList: (CardData | EmptyCardData)[] = [
  {
    name: 'Федор\nДостоевский №1',
    img: require('../images/Dostoevsky.png'),
    isReceived: true,
  },
  {
    name: 'Виссарион\nБелинский №4',
    img: require('../images/Belinsky.png'),
    isReceived: false,
  },
  {
    name: 'Виссарион\nБелинский №1',
    img: require('../images/Belinsky.png'),
    isReceived: true,
  },
  {
    name: 'Федор\nДостоевский №2',
    img: require('../images/Dostoevsky.png'),
    isReceived: true,
  },
  {
    name: 'Виссарион\nБелинский №3',
    img: require('../images/Belinsky.png'),
    isReceived: false,
  },
  {
    name: 'Виссарион\nБелинский №2',
    img: require('../images/Belinsky.png'),
    isReceived: true,
  },
  {
    name: 'Федор\nДостоевский №3',
    img: require('../images/Dostoevsky.png'),
    isReceived: true,
  },
  {
    name: 'Федор\nДостоевский №4',
    img: require('../images/Dostoevsky.png'),
    isReceived: false,
  },
];

const emptyCardData: EmptyCardData = {
  name: null,
  img: null,
  isReceived: null,
};

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

const EmptyCard = styled.View`
  flex: 1;
  margin: 0 4.5px;
`;

/**
 * List of tabs on AchievementsScreen
 */
enum CardsScreenTabs {
  ALL,
  RECEIVED,
  PROCESS
}

const flatContentStyle = {
  paddingBottom: 15,
};

const flatColumnStyle = {
  paddingTop: 9,
  paddingHorizontal: 10.5,
};

/**
 * Displays achievements screen
 *
 * @param props - props for component rendering
 */
export default function CardsCollectionScreen({ navigation }: Props): React.ReactElement {
  const { t } = useTranslation();
  const tabBarHeight = useTabBarHeight();
  let data;

  const [currentTab, setCurrentTab] = useState<CardsScreenTabs>(CardsScreenTabs.ALL);

  switch (currentTab) {
    case CardsScreenTabs.RECEIVED:
      const receivedList = cardsList.filter(card => card.isReceived);

      receivedList.length % 2 === 1 && receivedList.push(emptyCardData);
      data = receivedList;
      break;
    case CardsScreenTabs.PROCESS:
      const blockedList = cardsList.filter(card => !card.isReceived);

      blockedList.length % 2 === 1 && blockedList.push(emptyCardData);
      data = blockedList;
      break;
    default:
      const received = cardsList.filter(card => card.isReceived);
      const locked = cardsList.filter(card => !card.isReceived);

      received.length % 2 === 1 && received.push(emptyCardData);
      locked.length % 2 === 1 && locked.push(emptyCardData);

      data = received.concat(locked);
  }

  return (
    <Body tabBarHeight={tabBarHeight}>
      <BlueCircle/>
      <Row margined>
        <BackButton onPress={(): void => navigation.goBack()}>
          <Back/>
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
      <FlatList
        contentContainerStyle={flatContentStyle}
        data={data}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={flatColumnStyle}
        renderItem={({ item }): React.ReactElement => (
          item.name === null ? <EmptyCard/> : <CollectionCard imgSource={item.img} text={item.name} isReceived={item.isReceived}/>
        )}
        keyExtractor={(item, index): string => index.toString()}
      />
    </Body>
  );
}
