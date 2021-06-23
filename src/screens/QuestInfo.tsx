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
import Walker from '../images/walker.svg';
import BlueCircle5 from '../images/blueCircle5.svg';
import { QuestsStackParamList } from '../navigation/questsStack';
import styled from 'styled-components/native';
import Passed from '../images/passed.svg';
import WhiteGradient from '../components/WhiteGradient';
import useTabBarHeight from '../components/utils/useTabBarHeight';
import BackArrow from '../components/BackArrow';
import { graphql } from 'react-relay';
import { useLazyLoadQuery, usePreloadedQuery } from 'react-relay/hooks';
import { QuestInfoQuery } from './__generated__/QuestInfoQuery.graphql';
import Credits from '../components/questInfo/Credits';
import { BasicText, Block, Icon, Line } from '../components/questInfo/common';
import AwardsAndStats from '../components/questInfo/AwardsAndStats';
import CollectionCardsList from '../components/CollectionCardsList';

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

const AdviceText = styled(BasicText)`
  color: ${Colors.DarkBlue};
  text-align: center;
`;

const Subtitle = styled.Text`
  ${StyledFonts.uiWebMedium};
  line-height: 22px;
  color: ${Colors.Black};
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

export const questInfoDataQuery = graphql`
    query QuestInfoQuery($id: GlobalId!) {
      quest(id: $id) {
        id
        name
        earnedExp
        description
        wayToTravel
        distanceInKilometers
        durationInMinutes
        questProgressState
        ...AwardsAndStats
        ...CreditsInfo
        linkedAchievements {
          id
          ...AchievementData
        }
        personsCards {
          id
          ...CollectionCardData
        }
      }
    }
`;

/**
 * Functional component of the screen with quest info
 *
 * @param props - props for component rendering
 */
export default function QuestInfoScreen({ route }: Props): React.ReactElement {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const tabBarHeight = useTabBarHeight();
  const { t } = useTranslation();
  const { quest } = useLazyLoadQuery<QuestInfoQuery>(questInfoDataQuery, { id: route.params.questId });


  if (!quest) {
    return <div>No quest with this id</div>;
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
            {quest.name}
          </Text>
        </ScrollView>
      </Header>
      <ContainerView>
        {quest.questProgressState === 'PASSED' &&
          <PassedView>
            <Passed/>
          </PassedView>
        }
        <Container>
          <WhiteGradient/>
          <Info tabBarHeight={tabBarHeight}>
            <AwardsAndStats data={quest}/>
            <Line/>
            <Block isEmpty={!quest.description && quest.questProgressState === 'PASSED'}>
              {quest.description ?
                <BasicText margined={quest.questProgressState !== 'PASSED'}>{quest.description}</BasicText> : undefined
              }
              {quest.questProgressState !== 'PASSED' &&
              <>
                <View style={styles.routeLength}>
                  <Icon as={Walker}/>
                  <BasicText>
                    {quest.distanceInKilometers} {t('measures.kilometers')} ~ {quest.durationInMinutes} {t('measures.minutes')}
                  </BasicText>
                </View>
                {quest.wayToTravel === 'WITH_TRANSPORT' &&
                  <View style={styles.advice}>
                    <AdviceText>{t('quests.advice')}</AdviceText>
                  </View>
                }
              </>
              }
            </Block>
            {(!!quest.description || quest.questProgressState !== 'PASSED') && <Line/>}
            <Block>
              {quest.linkedAchievements.length > 0 &&
                <>
                  <TextRow>
                    <Subtitle>
                      {quest.questProgressState === 'PASSED' ? t('quests.achievementsPassed') : t('quests.achievements')}
                    </Subtitle>
                    {quest.questProgressState !== 'PASSED' &&
                    <BasicText count>{quest.linkedAchievements.length}</BasicText>
                    }
                  </TextRow>
                  <View style={styles.achievementsView}>
                    {
                      quest.linkedAchievements.map(ach => (
                        <Achievement data={ach} key={ach.id}/>
                      ))
                    }
                  </View>
                </>
              }

              <TextRow>
                <Subtitle>{t('quests.cards')}</Subtitle>
                {quest.questProgressState !== 'PASSED' &&
                <BasicText count>{quest.personsCards.length}</BasicText>
                }
              </TextRow>
              <CardsView>
                {quest.personsCards
                  .slice(0, 2)
                  .map(item => <CollectionCard key={item.id} isReceived={quest.questProgressState === 'PASSED'} data={item}/>)
                }
              </CardsView>
            </Block>
            <Credits data={quest}/>
            <Button
              title={quest.questProgressState === 'PASSED' ? t('quests.repeatQuest') : t('quests.startQuest')}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.startButton,
                backgroundColor: quest.questProgressState === 'PASSED' ? Colors.Blue : Colors.Green,
                opacity: quest.questProgressState === 'LOCKED' ? 0.5 : 1,
              }}
              onPress={(): void => navigation.navigate('Map', {
                questId: quest.id,
              })}
              disabled={quest.questProgressState === 'LOCKED'}
            />
          </Info>
        </Container>
      </ContainerView>
    </Body>
  );
}
