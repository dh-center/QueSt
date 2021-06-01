import React from 'react';
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
import { ScrollView } from 'react-native';

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

const TabView = styled.View`
  padding: 0 25px 4px 15px;
`;

const BasicText = styled.Text<{inactive?: boolean, active?: boolean}>`
  ${props => props.active ? StyledFonts.uiWebMedium : StyledFonts.uiWebRegular};
  ${props => props.inactive && 'opacity: 0.6'};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
`;

const AchievementsView = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    paddingTop: 27,
    paddingHorizontal: 15,
  },
}))``;

/**
 * Displays achievements screen
 *
 * @param props - props for component rendering
 */
export default function AchievementsScreen({ navigation }: Props): React.ReactElement {
  const { t } = useTranslation();
  const tabBarHeight = useTabBarHeight();

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
        <TabView>
          <BasicText active>{t('achievements.all')}</BasicText>
          <Emphasis/>
        </TabView>
        <TabView>
          <BasicText inactive>{t('achievements.received')}</BasicText>
        </TabView>
        <TabView>
          <BasicText inactive>{t('achievements.process')}</BasicText>
        </TabView>
      </Row>
      <AchievementsView>
        <ListButton buttonText={'Друг Достоевского'} type={'achievements'} percent={85}/>
        <ListButton buttonText={'Петербургская интеллигенция'} type={'achievements'} percent={30}/>
        <ListButton buttonText={'История наводнений в Санкт-Петербурге'} type={'achievements'} percent={70}/>
        <ListButton buttonText={'Начало положено!'} type={'achievements'} percent={100}/>
      </AchievementsView>
    </Body>
  );
}
