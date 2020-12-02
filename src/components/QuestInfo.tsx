import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { QuestsStackParamList, TabParamList } from './AppNavigator';
import { useTranslation } from 'react-i18next';
import { StackScreenProps } from '@react-navigation/stack';
import Colors from '../styles/colors';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import BackArrow from '../images/back.svg';
import Walker from '../images/walker.svg';
import BlueCircle from '../images/blueCircle5.svg';
import YellowCircle from '../images/yellowCircle.svg';
import Dostoevsky from '../images/Dostoevsky.svg';
import Belinsky from '../images/Belinsky.svg';

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
    backgroundColor: Colors.WHITE,
  },
  container: {
    height: '100%',
    backgroundColor: Colors.BACKGROUND,
  },
  header: {
    paddingTop: 59,
    paddingHorizontal: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    maxHeight: 158,
  },
  blueCircle: {
    position: 'absolute',
    bottom: 26,
    right: -169,
  },
  title: {
    fontSize: 28,
    lineHeight: 28,
    color: Colors.BLACK,
  },
  backButton: {
    paddingTop: 8,
    paddingRight: 15,
  },
  questInfo: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  descriptionText: {
    fontSize: 18,
    lineHeight: 22,
    color: Colors.BLACK,
  },
  routeLength: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  walker: {
    marginRight: 9,
  },
  advice: {
    backgroundColor: 'rgba(104,198,223, 0.15)',
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  adviceText: {
    fontSize: 18,
    lineHeight: 22,
    color: Colors.DARK_BLUE,
    textAlign: 'center',
  },
  line: {
    marginVertical: 30,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: Colors.BLUE,
  },
  descriptionTitleText: {
    fontSize: 22,
    lineHeight: 22,
    color: Colors.BLACK,
    marginBottom: 15,
  },
  achievementsView: {
    marginBottom: 20,
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  achievementCircle: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  cardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#414366',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardText: {
    fontSize: 18,
    lineHeight: 22,
    color: Colors.BLACK,
    textAlign: 'center',
    paddingVertical: 10,
  },
  startButton: {
    width: '100%',
    height: 44,
    backgroundColor: Colors.GREEN,
    marginTop: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 22,
    color: Colors.WHITE,
  },
});

/**
 * Functional component of the screen with quest info
 */
export default function QuestInfo({ route }: Props): React.ReactElement {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BlueCircle style={styles.blueCircle}/>
          <TouchableOpacity style={styles.backButton}
            onPress={(): void => navigation.goBack()}
          >
            <BackArrow/>
          </TouchableOpacity>
          <ScrollView>
            <Text style={styles.title}>
              {route.params.title}
            </Text>
          </ScrollView>
        </View>
        <ScrollView>
          <View style={styles.questInfo}>
            <Text style={styles.descriptionText}>{route.params.description}</Text>
            <View style={styles.routeLength}>
              <Walker style={styles.walker}/>
              <Text style={styles.descriptionText}>7,8 км ~ 90 мин</Text>
            </View>
            <View style={styles.advice}>
              <Text style={styles.adviceText}>Мы советуем Вам воспользоваться электросамокатом или велосипедом</Text>
            </View>
            <View style={styles.line}/>
            <Text style={styles.descriptionTitleText}>Достижения</Text>
            <View style={styles.achievementsView}>
              <View style={styles.achievement}>
                <YellowCircle style={styles.achievementCircle}/>
                <Text style={styles.descriptionText}>Петербургская интеллигенция</Text>
              </View>
              <View style={styles.achievement}>
                <YellowCircle style={styles.achievementCircle}/>
                <Text style={styles.descriptionText}>Друг Достоевского</Text>
              </View>
            </View>
            <Text style={styles.descriptionTitleText}>Коллекционные карточки</Text>
            <View style={styles.cardView} />
            <View style={styles.cardView}>
              <View style={styles.card}>
                <Dostoevsky
                  width={Dimensions.get('screen').width * 0.448}
                  height={224 * Dimensions.get('screen').width * 0.448 / 168}
                />
                <Text style={styles.cardText}>Федор{'\n'}Достоевский</Text>
              </View>
              <View style={styles.card}>
                <Belinsky
                  width={Dimensions.get('screen').width * 0.448}
                  height={224 * Dimensions.get('screen').width * 0.448 / 168}
                />
                <Text style={styles.cardText}>Виссарион{'\n'}Белинский</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.startButton}
              activeOpacity={0.5}
              onPress={(): void => navigation.navigate('Map', {
                questId: route.params.id,
              })
              }>
              <Text style={styles.buttonText}>{t('quests.startQuest')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
