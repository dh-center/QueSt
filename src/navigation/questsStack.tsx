import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Quests from '../screens/QuestsList';
import QuestInfoScreen from '../screens/QuestInfo';

/**
 * Type with params of screens and their props in QuestsStackScreen
 */
export type QuestsStackParamList = {
  List: { needRefresh: boolean };
  Description: {
    id: string;
    title: string;
    description: string | null,
    state: string,
    exp: number,
    credits: readonly unknown[] | undefined,
  };
};

const QuestsStack = createStackNavigator<QuestsStackParamList>();

/**
 * Component for implementing navigation between screens in quest tab
 */
export default function QuestsStackNavigation(): React.ReactElement {
  return (
    <QuestsStack.Navigator>
      <QuestsStack.Screen name="List" component={Quests} options={{ headerShown: false }}/>
      <QuestsStack.Screen name="Description" component={QuestInfoScreen} options={{ headerShown: false }}/>
    </QuestsStack.Navigator>
  );
}
