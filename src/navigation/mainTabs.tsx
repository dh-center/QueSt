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
import textStyles from '../styles/textStyles';
import TabBar from '../components/TabBar';

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
      backgroundColor: Colors.White,
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
      ...textStyles.ptRootRegular,
      color: Colors.DarkBlue,

      /**
       * Fix position
       */
      flex: 1,

      /**
       * Remove margins in landscape
       */
      marginLeft: 0,
      marginTop: 0,
    },

    /**
     * Icon styles
     */
    iconStyle: {
      flex: 1,
      marginTop: 15,
    },

    /**
     * Tabs styles
     */
    tabStyle: {
      flexDirection: 'column',
    },
  },
}))``;

/**
 * Styled svg icons
 * Adds color for icons
 */
const Icon = styled.View`
  color: ${Colors.DarkBlue}
`;

/**
 * Functional component for implementing navigation between screens
 */
export default function MainTabsNavigation(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Map" tabBar={props => <TabBar {...props} />}>
        <Tab.Screen
          name="Map"
          options={{
            title: t('map.title').toLowerCase(),
            tabBarIcon: (): React.ReactElement => {
              return <Icon as={Map}/>;
            },
          }}
          component={MapScreen}
        />
        <Tab.Screen
          name="Quests"
          options={{
            title: t('quests.title').toLowerCase(),
            tabBarIcon: (): React.ReactElement => {
              return <Icon as={Quests}/>;
            },
          }}
          component={QuestsStackNavigation}
        />
        <Tab.Screen
          name="Profile"
          options={{
            title: t('profile.title').toLowerCase(),
            tabBarIcon: (): React.ReactElement => {
              return <Icon as={Account}/>;
            },
          }}
          component={ProfileStackNavigation}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
