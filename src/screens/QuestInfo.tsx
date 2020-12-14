import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StackScreenProps } from '@react-navigation/stack';
import { TabParamList } from '../navigation/mainTabs';
import Achievement from '../components/Achievement';
import Button from '../components/ui/Button';
import CollectionCard from '../components/CollectionCard';
import Colors from '../styles/colors';
import textStyles from '../styles/textStyles';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import BackArrow from '../images/back.svg';
import Walker from '../images/walker.svg';
import BlueCircle from '../images/blueCircle5.svg';
import { QuestsStackParamList } from '../navigation/questsStack';

/**
 * Type with props of screen 'Map' in BottomTabNavigator
 */
type MapScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Map'>;

/**
 * Type with props of screen 'Description' in QuestsStackScreen
 */
type Props = StackScreenProps<QuestsStackParamList, 'Description'>;

const styles = StyleSheet.create({
  body: {
    height: '100%',
    backgroundColor: Colors.BACKGROUND,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    maxHeight: 160,
  },
  blueCircle: {
    position: 'absolute',
    top: -376,
    right: -169,
  },
  backButton: {
    paddingTop: 8,
    paddingRight: 15,
  },
  scrollContainer: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flex: 1,
    overflow: 'hidden',
  },
  questInfo: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 105,
  },
  routeLength: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  walker: {
    marginRight: 10,
  },
  advice: {
    backgroundColor: 'rgba(104,198,223, 0.15)',
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  adviceText: {
    ...textStyles.default,
    color: Colors.DARK_BLUE,
    textAlign: 'center',
  },
  line: {
    marginVertical: 30,
    borderTopWidth: 0.5,
    borderStyle: 'solid',
    borderColor: Colors.BLUE,
  },
  descriptionTitleText: {
    ...textStyles.ptRootMedium,
    fontSize: 22,
    marginBottom: 15,
  },
  achievementsView: {
    marginBottom: 20,
  },
  cardView: {
    flex: 1,
    marginHorizontal: -4.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  startButton: {
    height: 44,
    backgroundColor: Colors.GREEN,
    marginTop: 30,
  },
});

/**
 * Functional component of the screen with quest info
 */
export default function QuestInfoScreen({ route }: Props): React.ReactElement {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <BlueCircle style={styles.blueCircle}/>
        <TouchableOpacity style={styles.backButton}
          onPress={(): void => navigation.goBack()}
        >
          <BackArrow/>
        </TouchableOpacity>
        <ScrollView>
          <Text style={textStyles.robotoMedium}>
            {route.params.title}
          </Text>
        </ScrollView>
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.questInfo}>
          <Text style={textStyles.default}>{route.params.description}</Text>
          <View style={styles.routeLength}>
            <Walker style={styles.walker}/>
            <Text style={textStyles.default}>7,8 км ~ 90 мин</Text>
          </View>
          <View style={styles.advice}>
            <Text style={styles.adviceText}>{t('quests.advice')}</Text>
          </View>
          <View style={styles.line}/>
          <Text style={styles.descriptionTitleText}>{t('quests.achievements')}</Text>
          <View style={styles.achievementsView}>
            <Achievement text={'Петербургская интеллигенция'}/>
            <Achievement text={'Друг Достоевского'}/>
          </View>
          <Text style={styles.descriptionTitleText}>{t('quests.cards')}</Text>
          <View style={styles.cardView}>
            <CollectionCard imgSource={require('../images/Dostoevsky.png')} text={'Федор Достоевский'}/>
            <CollectionCard imgSource={require('../images/Belinsky.png')} text={'Виссарион Белинский'}/>
          </View>
          <Button
            title={t('quests.startQuest')}
            style={styles.startButton}
            onPress={(): void => navigation.navigate('Map', {
              questId: route.params.id,
            })}
          />
        </ScrollView>
      </View>
    </View>
  );
}
