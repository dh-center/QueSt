import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/Map';
import { useTranslation } from 'react-i18next';
import ProfileStackNavigation from './profileStack';
import QuestsStackNavigation from './questsStack';
import styled from 'styled-components/native';
import Map from '../images/navigation/map.svg';
import Account from '../images/navigation/account.svg';
import Quests from '../images/navigation/quests.svg';
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
 * Styled svg icons
 * Adds color for icons
 *
 * @param p - props
 */
const Icon = styled.View<{color: string}>`
  color: ${p => p.color}
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
            tabBarIcon: ({ color }): React.ReactElement => {
              return <Icon color={color} as={Map}/>;
            },
          }}
          component={MapScreen}
        />
        <Tab.Screen
          name="Quests"
          options={{
            title: t('quests.title').toLowerCase(),
            tabBarIcon: ({ color }): React.ReactElement => {
              return <Icon color={color} as={Quests}/>;
            },
          }}
          component={QuestsStackNavigation}
        />
        <Tab.Screen
          name="Profile"
          options={{
            title: t('profile.title').toLowerCase(),
            tabBarIcon: ({ color }): React.ReactElement => {
              return <Icon color={color} as={Account}/>;
            },
          }}
          component={ProfileStackNavigation}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
