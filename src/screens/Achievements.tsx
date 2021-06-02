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
import ListButton from '../components/ListButton';
import { FlatList } from 'react-native';

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

/**
 * Displays achievements screen
 *
 * @param props - props for component rendering
 */
export default function AchievementsScreen({ navigation }: Props): React.ReactElement {
  const { t } = useTranslation();
  const tabBarHeight = useTabBarHeight();
  const [currentTab, setCurrentTab] = useState(1);

  return (
    <Body tabBarHeight={tabBarHeight}>
      <BlueCircle/>
      <Row margined>
        <BackButton onPress={(): void => navigation.goBack()}>
          <Back/>
        </BackButton>
        <Title>{t('profile.achievements')}</Title>
      </Row>
      <Row>
        <TabView activeOpacity={1} onPress={() => setCurrentTab(1)}>
          <BasicText active={currentTab === 1}>{t('achievements.all')}</BasicText>
          {currentTab === 1 && <Emphasis/>}
        </TabView>
        <TabView activeOpacity={1} onPress={() => setCurrentTab(2)}>
          <BasicText active={currentTab === 2}>{t('achievements.received')}</BasicText>
          {currentTab === 2 && <Emphasis/>}
        </TabView>
        <TabView activeOpacity={1} onPress={() => setCurrentTab(3)}>
          <BasicText  active={currentTab === 3}>{t('achievements.process')}</BasicText>
          {currentTab === 3 && <Emphasis/>}
        </TabView>
      </Row>
      <FlatList
        contentContainerStyle={{
          paddingTop: 27,
          paddingHorizontal: 15,
        }}
        data={
          currentTab === 1 ? achievementsList
            : currentTab === 2 ? achievementsList.filter(achievement => achievement.progress === 100)
              : achievementsList.filter(achievement => achievement.progress < 100)
        }
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
