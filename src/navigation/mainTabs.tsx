import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import MapScreen from '../screens/Map';
import { useTranslation } from 'react-i18next';
import ProfileStackNavigation from './profileStack';
import QuestsStackNavigation from './questsStack';

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
 * Functional component for implementing navigation between screens
 */
export default function MainTabsNavigation(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Map" tabBarOptions={{ labelPosition: 'below-icon' }}>
        <Tab.Screen
          name="Quests"
          options={{
            title: t('quests.title').toUpperCase(),
            tabBarIcon: (): React.ReactElement => {
              return <Icon type="FontAwesome5" name="route" />;
            },
          }}
          component={QuestsStackNavigation} />
        <Tab.Screen
          name="Map"
          options={{
            title: t('map.title').toUpperCase(),
            tabBarIcon: (): React.ReactElement => {
              return <Icon type="FontAwesome5" name="map-marked-alt" />;
            },
          }}
          component={MapScreen} />
        <Tab.Screen
          name="Profile"
          options={{
            title: t('profile.title').toUpperCase(),
            tabBarIcon: (): React.ReactElement => {
              return <Icon type="FontAwesome5" name="user" />;
            },
          }}
          component={ProfileStackNavigation} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
