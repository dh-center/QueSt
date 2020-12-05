import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StackScreenProps } from '@react-navigation/stack';
import { QuestsStackParamList, TabParamList } from './AppNavigator';
import Achievement from './Achievement';
import Button from './Button';
import Colors from '../styles/colors';
import textStyles from '../styles/textStyles';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import BackArrow from '../images/back.svg';
import Walker from '../images/walker.svg';
import BlueCircle from '../images/blueCircle5.svg';

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
    fontFamily: 'PTRootUIWeb-Medium',
    fontSize: 22,
    lineHeight: 22,
    color: Colors.BLACK,
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
  card: {
    flex: 1,
    marginHorizontal: 4.5,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#414366',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  cardText: {
    ...textStyles.default,
    textAlign: 'center',
    paddingVertical: 10,
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
export default function QuestInfo({ route }: Props): React.ReactElement {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.body}>
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
      <ScrollView>
        <View style={styles.questInfo}>
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
            <View style={styles.card}>
              <Image source={require('../images/Dostoevsky.png')} style={styles.cardImage}/>
              <Text style={styles.cardText}>Федор{'\n'}Достоевский</Text>
            </View>
            <View style={styles.card}>
              <Image source={require('../images/Belinsky.png')} style={styles.cardImage}/>
              <Text style={styles.cardText}>Виссарион{'\n'}Белинский</Text>
            </View>
          </View>
          <Button title={t('quests.startQuest')} style={styles.startButton} onPress={(): void => navigation.navigate('Map', {
            questId: route.params.id,
          })}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
