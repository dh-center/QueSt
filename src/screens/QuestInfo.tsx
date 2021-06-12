import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StackScreenProps } from '@react-navigation/stack';
import { TabParamList } from '../navigation/mainTabs';
import Achievement from '../components/Achievement';
import Button from '../components/ui/Button';
import CollectionCard from '../components/CollectionCard';
import Colors from '../styles/colors';
import textStyles, { StyledFonts } from '../styles/textStyles';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import BackArrow from '../images/back.svg';
import Walker from '../images/walker.svg';
import BlueCircle5 from '../images/blueCircle5.svg';
import { QuestsStackParamList } from '../navigation/questsStack';
import styled from 'styled-components/native';
import Exp from '../images/exp.svg';
import AchievementIcon from '../images/achievement.svg';
import Cards from '../images/cards.svg';
import Passed from '../images/passed.svg';
import WhiteGradient from '../components/WhiteGradient';
import decodeHTMLEntities from '../components/utils/decodingHTMLEntities';
import useTabBarHeight from '../components/utils/useTabBarHeight';
import { CreditBlock } from '../types/questData';

/**
 * Type with props of screen 'Map' in BottomTabNavigator
 */
type MapScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Map'>;

/**
 * Type with props of screen 'Description' in QuestsStackScreen
 */
type Props = StackScreenProps<QuestsStackParamList, 'Description'>;

const Body = styled.View`
  height: 100%;
  background-color: ${Colors.Background};
`;

const Header = styled.View`
  padding: 60px 15px 15px;
  flex-direction: row;
  max-height: 160px;
`;

const BlueCircle = styled(BlueCircle5)`
  position: absolute;
  top: -376px;
  right: -169px;
`;

const BackButton = styled.TouchableOpacity`
  padding: 8px 15px 0 0;
`;

const ContainerView = styled.View`
  background-color: ${Colors.White};
  flex: 1;
  border-radius: 15px;
`;

const Container = styled.View`
  flex: 1;
  overflow: hidden;
  border-radius: 15px;
`;

const PassedView = styled.View`
  width: 40px;
  height: 40px;
  background-color: ${Colors.Background};
  border-radius: 20px;
  position: absolute;
  align-self: center;
  top: -20px;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Info = styled.ScrollView
  .attrs(() => ({
    showsVerticalScrollIndicator: false,
  }))<{tabBarHeight: number}>`
  padding: 0 15px;
  margin-bottom: ${props => props.tabBarHeight}px;
`;

const Block = styled.View<{isEmpty?: boolean}>`
  margin: ${props => props.isEmpty ? 0 : 30}px 0;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  height: 50px;
  margin: 30px 0;
`;

const Cell = styled.View<{vertical?: boolean}>`
  flex: 1;
  flex-direction: ${props => props.vertical ? 'column' : 'row'};
  align-items: center;
  justify-content: center;
`;

const Line = styled.View<{vertical?: boolean}>`
  height: ${props => props.vertical ? 50 : 1}px;
  width: ${props => props.vertical ? '1px' : '100%'};
  background-color: ${Colors.Blue};
`;

const Icon = styled.View`
  margin-right: 10px;
`;

const BasicText = styled.Text<{margined?: boolean, count?: boolean}>`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
  margin-bottom: ${props => props.margined ? 30 : 0}px;
  margin-left: ${props => props.count ? 15 : 0}px;
`;

const AdviceText = styled(BasicText)`
  color: ${Colors.DarkBlue};
  text-align: center;
`;

const HeadersText = styled.Text<{margined?: boolean}>`
  ${StyledFonts.uiWebMedium};
  font-size: 22px;
  line-height: 22px;
  color: ${Colors.Black};
  margin-top: ${props => props.margined ? 5 : 0}px;
`;

const CreditsText = styled.Text`
  ${StyledFonts.uiWebMedium};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
`;

const Subtitle = styled(CreditsText)`
  font-size: 22px;
  margin-bottom: 15px;
`;

const TextRow = styled.View`
  flex-direction: row;
`;

const CardsView = styled.View`
  flex: 1;
  margin: 0 -4.5px;
  flex-direction: row;
  justify-content: space-between;
`;

const CreditsImage = styled.Image<{margined?: boolean}>`
  align-self: center;
  width: 70%;
  aspect-ratio: 1;
  resize-mode: contain;
  margin-top: ${props => props.margined ? '15' : '0'}px;
`;

const styles = StyleSheet.create({
  routeLength: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  advice: {
    backgroundColor: 'rgba(104,198,223, 0.15)',
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  achievementsView: {
    marginBottom: 20,
  },
  startButton: {
    height: 44,
    backgroundColor: Colors.Green,
    marginBottom: 30,
  },
});

/**
 * Functional component of the screen with quest info
 *
 * @param props - props for component rendering
 */
export default function QuestInfoScreen({ route }: Props): React.ReactElement {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const tabBarHeight = useTabBarHeight();
  const { t } = useTranslation();
  const creditsData = route.params.credits as CreditBlock[];

  let creditsInfo;
  let creditsImage;

  if (creditsData) {
    creditsData.forEach(item => {
      switch (item.type) {
        case 'paragraph':
          creditsInfo = item.data.text;
          break;
        case 'image':
          creditsImage = item.data.file.url;
          break;
      }
    });
  }

  return (
    <Body>
      <Header>
        <BlueCircle/>
        <BackButton onPress={(): void => navigation.goBack()}>
          <BackArrow/>
        </BackButton>
        <ScrollView>
          <Text style={textStyles.robotoMedium}>
            {route.params.title}
          </Text>
        </ScrollView>
      </Header>
      <ContainerView>
        {route.params.state === 'PASSED' &&
          <PassedView>
            <Passed/>
          </PassedView>
        }
        <Container>
          <WhiteGradient/>
          <Info tabBarHeight={tabBarHeight}>
            {route.params.state !== 'PASSED' &&
            <Row>
              <Cell>
                <Icon as={Exp}/>
                <BasicText>{route.params.exp} exp</BasicText>
              </Cell>
              <Line vertical/>
              <Cell>
                <Icon as={AchievementIcon}/>
                <BasicText>+2</BasicText>
              </Cell>
              <Line vertical/>
              <Cell>
                <Icon as={Cards}/>
                <BasicText>+2</BasicText>
              </Cell>
            </Row>
            }
            {route.params.state === 'PASSED' &&
            <Row>
              <Cell vertical>
                <BasicText>{t('quests.mileage')}</BasicText>
                <HeadersText margined>{route.params.distanceInKilometers} км</HeadersText>
              </Cell>
              <Line vertical/>
              <Cell vertical>
                <BasicText>{t('quests.received')}</BasicText>
                <HeadersText margined>{route.params.exp} exp</HeadersText>
              </Cell>
            </Row>
            }
            <Line/>
            <Block isEmpty={!route.params.description && route.params.state === 'PASSED'}>
              {route.params.description ?
                <BasicText margined={route.params.state !== 'PASSED'}>{route.params.description}</BasicText> : undefined
              }
              {route.params.state !== 'PASSED' &&
              <>
                <View style={styles.routeLength}>
                  <Icon as={Walker}/>
                  <BasicText>{route.params.distanceInKilometers} км ~ {route.params.durationInMinutes} мин</BasicText>
                </View>
                {route.params.wayToTravel === 'WITH_TRANSPORT' &&
                  <View style={styles.advice}>
                    <AdviceText>{t('quests.advice')}</AdviceText>
                  </View>
                }
              </>
              }
            </Block>
            {(!!route.params.description || route.params.state !== 'PASSED') && <Line/>}
            <Block>
              <TextRow>
                <Subtitle>
                  {route.params.state === 'PASSED' ? t('quests.achievementsPassed') : t('quests.achievements')}
                </Subtitle>
                {route.params.state !== 'PASSED' &&
                <BasicText count>2</BasicText>
                }
              </TextRow>
              <View style={styles.achievementsView}>
                <Achievement text={'Петербургская интеллигенция'}/>
                <Achievement text={'Друг Достоевского'}/>
              </View>
              <TextRow>
                <Subtitle>{t('quests.cards')}</Subtitle>
                {route.params.state !== 'PASSED' &&
                <BasicText count>2</BasicText>
                }
              </TextRow>
              <CardsView>
                <CollectionCard
                  imgSource={require('../images/Dostoevsky.png')}
                  text={'Федор\nДостоевский'}
                  isReceived={route.params.state === 'PASSED'}
                />
                <CollectionCard
                  imgSource={require('../images/Belinsky.png')}
                  text={'Виссарион\nБелинский'}
                  isReceived={route.params.state === 'PASSED'}
                />
              </CardsView>
            </Block>
            {creditsData && !!creditsData.length &&
              <>
                <Line/>
                <Block>
                  {creditsInfo !== undefined && <CreditsText>{decodeHTMLEntities(creditsInfo)}</CreditsText>}
                  {creditsImage !== undefined && <CreditsImage source={{ uri: creditsImage }} margined={creditsInfo}/>}
                </Block>
              </>
            }
            <Button
              title={route.params.state === 'PASSED' ? t('quests.repeatQuest') : t('quests.startQuest')}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.startButton,
                backgroundColor: route.params.state === 'PASSED' ? Colors.Blue : Colors.Green,
                opacity: route.params.state === 'LOCKED' ? 0.5 : 1,
              }}
              onPress={(): void => navigation.navigate('Map', {
                questId: route.params.id,
              })}
              disabled={route.params.state === 'LOCKED'}
            />
          </Info>
        </Container>
      </ContainerView>
    </Body>
  );
}
