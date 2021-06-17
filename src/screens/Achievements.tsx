import React, { useState } from 'react';
import BlueCircle15 from '../images/blueCircle15.svg';
import styled from 'styled-components/native';
import { StyledFonts } from '../styles/textStyles';
import Colors from '../styles/colors';
import { useTranslation } from 'react-i18next';
import useTabBarHeight from '../components/utils/useTabBarHeight';
import Emphasis from '../images/emphasis.svg';
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../navigation/profileStack';
import ListButton from '../components/ListButton';
import { FlatList } from 'react-native';
import BackArrow from '../components/BackArrow';

type Props = StackScreenProps<ProfileStackParamList, 'Achievements'>;

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
  padding: 0 25px 4px 15px;
`;

const BasicText = styled.Text<{active?: boolean}>`
  ${props => props.active ? StyledFonts.uiWebMedium : StyledFonts.uiWebRegular};
  ${props => props.active === false && 'opacity: 0.6'};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
`;

const achievementsList = [
  {
    name: 'Друг Достоевского',
    progress: 85,
  },
  {
    name: 'Петербургская интеллигенция',
    progress: 30,
  },
  {
    name: 'История наводнений в Санкт-Петербурге',
    progress: 70,
  },
  {
    name: 'Начало положено!',
    progress: 100,
  },
];

const flatListStyle = {
  paddingTop: 27,
  paddingHorizontal: 15,
};

/**
 * List of tabs on AchievementsScreen
 */
enum AchievementsScreenTabs {
  ALL,
  RECEIVED,
  PROCESS
}

/**
 * Displays achievements screen
 *
 * @param props - props for component rendering
 */
export default function AchievementsScreen({ navigation }: Props): React.ReactElement {
  const { t } = useTranslation();
  const tabBarHeight = useTabBarHeight();
  let data;

  const [currentTab, setCurrentTab] = useState<AchievementsScreenTabs>(AchievementsScreenTabs.ALL);

  switch (currentTab) {
    case AchievementsScreenTabs.RECEIVED:
      data = achievementsList.filter(achievement => achievement.progress === 100);
      break;
    case AchievementsScreenTabs.PROCESS:
      data = achievementsList.filter(achievement => achievement.progress < 100);
      break;
    default:
      data = achievementsList;
  }

  return (
    <Body tabBarHeight={tabBarHeight}>
      <BlueCircle/>
      <Row margined>
        <BackButton onPress={(): void => navigation.goBack()}>
          <BackArrow/>
        </BackButton>
        <Title>{t('profile.achievements')}</Title>
      </Row>
      <Row>
        <TabView activeOpacity={1} onPress={() => setCurrentTab(AchievementsScreenTabs.ALL)}>
          <BasicText active={currentTab === AchievementsScreenTabs.ALL}>{t('achievements.all')}</BasicText>
          {currentTab === AchievementsScreenTabs.ALL && <Emphasis/>}
        </TabView>
        <TabView activeOpacity={1} onPress={() => setCurrentTab(AchievementsScreenTabs.RECEIVED)}>
          <BasicText active={currentTab === AchievementsScreenTabs.RECEIVED}>{t('achievements.received')}</BasicText>
          {currentTab === AchievementsScreenTabs.RECEIVED && <Emphasis/>}
        </TabView>
        <TabView activeOpacity={1} onPress={() => setCurrentTab(AchievementsScreenTabs.PROCESS)}>
          <BasicText  active={currentTab === AchievementsScreenTabs.PROCESS}>{t('achievements.process')}</BasicText>
          {currentTab === AchievementsScreenTabs.PROCESS && <Emphasis/>}
        </TabView>
      </Row>
      <FlatList
        contentContainerStyle={flatListStyle}
        data={data}
        renderItem={({ item }): React.ReactElement => (
          <ListButton
            buttonText={item.name}
            type={'achievements'}
            percent={item.progress}
          />
        )}
        keyExtractor={(item, index): string => index.toString()}
        ListEmptyComponent={<BasicText>Empty</BasicText>}
      />
    </Body>
  );
}
