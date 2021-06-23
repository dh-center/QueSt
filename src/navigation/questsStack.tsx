import React, { Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Quests from '../screens/QuestsList';
import QuestInfoScreen from '../screens/QuestInfo';
import { Spinner } from 'native-base';
import Colors from '../styles/colors';

/**
 * Type with params of screens and their props in QuestsStackScreen
 */
export type QuestsStackParamList = {
  List: { needRefresh: boolean };
  Description: {
    questId: string
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
      <QuestsStack.Screen name="Description" options={{ headerShown: false }}>
        {(props) => (
          <Suspense fallback={<Spinner color={Colors.DarkBlue}/>}>
            <QuestInfoScreen {...props}/>
          </Suspense>
        )}
      </QuestsStack.Screen>
    </QuestsStack.Navigator>
  );
}
