import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/Map';
import { useTranslation } from 'react-i18next';
import ProfileStackNavigation from './profileStack';
import QuestsStackNavigation from './questsStack';
import styled from 'styled-components/native';
import Colors from '../styles/colors';
import Map from '../images/navigation/map.svg';
import Account from '../images/navigation/account.svg';
import Quests from '../images/navigation/quests.svg';

/**
 * Type with params of screens and their props in BottomTabNavigator
 */
export type TabParamList = {
  Quests: undefined;
  Map: {questId: string | undefined};
  Profile: undefined;
};
const Tab = createBottomTabNavigator();

/**
 * Styled tab navigator component
 */
const TabNavigator = styled(Tab.Navigator).attrs(() => ({
  tabBarOptions: {
    /**
     * Tab bar container styles
     */
    style: {
      /**
       * Screens will be displayed under the tab navigator
       */
      position: 'absolute',
      backgroundColor: Colors.WHITE,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderTopColor: 'transparent',
      height: 75,

      /**
       * Android shadow
       */
      elevation: 8,

      /**
       * IOS shadow
       */
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
    },
    /**
     * Label styles
     */
    labelStyle: {
      /**
       * Font styles
       */
      fontSize: 12,
      lineHeight: 18,
      fontFamily: 'PTRootUIWeb-Regular',
      color: Colors.DARK_BLUE,

      /**
       * Fix position
       */
      flex: 1,
    },
    /**
     * Icon styles
     */
    iconStyle: {
      flex: 1,
      marginTop: 15,
    },
  },
}))``;

/**
 * Styled svg icons
 */
const MapIcon = styled(Map)`
  color: ${Colors.DARK_BLUE}
`;

const AccountIcon = styled(Account)`
  color: ${Colors.DARK_BLUE}
`;

const QuestsIcon = styled(Quests)`
  color: ${Colors.DARK_BLUE}
`;

/**
 * Functional component for implementing navigation between screens
 */
export default function MainTabsNavigation(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <TabNavigator initialRouteName="Map">
        <Tab.Screen
          name="Map"
          options={{
            title: t('map.title').toLowerCase(),
            tabBarIcon: (): React.ReactElement => {
              return <MapIcon/>;
            },
          }}
          component={MapScreen}
        />
        <Tab.Screen
          name="Quests"
          options={{
            title: t('quests.title').toLowerCase(),
            tabBarIcon: (): React.ReactElement => {
              return <QuestsIcon/>;
            },
          }}
          component={QuestsStackNavigation}
        />
        <Tab.Screen
          name="Profile"
          options={{
            title: t('profile.title').toLowerCase(),
            tabBarIcon: (): React.ReactElement => {
              return <AccountIcon/>;
            },
          }}
          component={ProfileStackNavigation}
        />
      </TabNavigator>
    </NavigationContainer>
  );
}
