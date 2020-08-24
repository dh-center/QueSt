import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import Quests from './components/Quests';
import MapList from './components/MapList';
import PersonList from './components/PersonList';

const Tab = createBottomTabNavigator();

const App = (): React.ReactElement => {
  return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Map">
          <Tab.Screen
              name="Quest"
              options={{
                  title: 'КВЕСТЫ',
                  tabBarIcon: (): React.ReactElement=>{
                      return <Icon type="FontAwesome5" name="route" />;
                  }}}
              component={Quests} />
          <Tab.Screen
              name="Map"
              options={{
                  title: 'КАРТА',
                  tabBarIcon: (): React.ReactElement=>{
                      return <Icon type="FontAwesome5" name="map-marked-alt" />;
                  }}}
              component={MapList} />
          <Tab.Screen
              name="Person"
              options={{
                  title: 'ПРОФИЛЬ',
                  tabBarIcon: (): React.ReactElement=>{
                      return <Icon type="FontAwesome5" name="user" />;
                  }}}
              component={PersonList} />
        </Tab.Navigator>
      </NavigationContainer>
  );
};

export default App;
