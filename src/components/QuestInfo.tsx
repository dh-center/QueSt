import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RouteProp } from '@react-navigation/native';
import { QuestsStackParamList } from './AppNavigator';
import { useTranslation } from 'react-i18next';
import { StackScreenProps } from '@react-navigation/stack';

/**
 * Type with props of screen 'Description' in QuestsStackScreen
 */
type Props = StackScreenProps<QuestsStackParamList, 'Description'>;

const basis = StyleSheet.create({
  section: {
    paddingRight: 41,
    paddingLeft: 41,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.6,
    borderStyle: 'solid',
    borderBottomColor: 'rgba(33, 68, 104, 0.4)',
  },
  description: {
    fontSize: 17,
    lineHeight: 20,
    color: 'rgba(0, 0, 0, 0.8)',
  },
});

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  header: {
    backgroundColor: '#FFFFFF',
    marginRight: -1,
    marginLeft: -1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderTopColor: 'white',
    borderColor: 'rgba(0, 46, 66, 0.5)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 15,
    paddingRight: 16,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'stretch',
    maxHeight: '25%',
  },
  descriptionSection: {
    ...basis.section,
    paddingTop: 15,
    paddingBottom: 15,
  },
  footerSection: {
    ...basis.section,
    minHeight: 100,
  },
  starSectionTop: {
    ...basis.section,
    paddingTop: 22,
    borderBottomColor: '#fff',
  },
  starSectionBottom: {
    ...basis.section,
    paddingBottom: 22,
  },
  cardSection: {
    ...basis.section,
    paddingTop: 30,
    paddingRight: 0,
    paddingLeft: 0,
    justifyContent: 'space-around',
    borderBottomColor: '#fff',
  },
  cardTitleSection: {
    ...basis.section,
    paddingRight: 0,
    paddingLeft: 0,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    borderBottomColor: '#fff',
  },
  buttonSection: {
    ...basis.section,
    justifyContent: 'center',
    borderBottomColor: '#fff',
  },
  title: {
    fontSize: 28,
    lineHeight: 28,
    color: 'rgba(0, 0, 0, 0.8)',
  },
  cardTitle: {
    ...basis.description,
    textAlign: 'center',
    color: '#000',
  },
  buttonText: {
    ...basis.description,
    color: '#fff',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    width: 162,
    height: 44,
    backgroundColor: '#00A743',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 5,
    height: 40,
    width: 40,
  },
  iconBack: {
    marginLeft: 15,
    marginRight: 15,
    width: 8,
    height: 14,
  },
  card: {
    width: 163,
    height: 263,
  },
});

/**
 * Functional component of the screen with quest info
 */
export default function QuestInfo({ route, navigation }: Props): React.ReactElement {
  const { t } = useTranslation();

  // console.log(route.params);

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
          onPress={(): void => navigation.goBack()}
        >
          <Image source={require('../images/back.png')} style={styles.iconBack}/>
        </TouchableOpacity>
        <ScrollView>
          <Text style={styles.title}>
            {route.params.title}
          </Text>
        </ScrollView>
      </View>

      <ScrollView>
        <View style={styles.descriptionSection}>
          <Text style={basis.description}>
            {route.params.description}
          </Text>
        </View>

        <View style={styles.footerSection}>
          <Image source={require('../images/footprint.png')} style={styles.icon}/>
          <Text style={basis.description}>45 мин</Text>
        </View>

        <View style={styles.starSectionTop}>
          <Image source={require('../images/star.png')} style={styles.icon}/>
          <Text style={basis.description}>Друг Достоевского</Text>
        </View>
        <View style={styles.starSectionBottom}>
          <Image source={require('../images/star.png')} style={styles.icon}/>
          <Text style={basis.description}>Петербургская интеллигенция</Text>
        </View>

        <View style={styles.cardSection}>
          <Image source={require('../images/Dostoevsky.png')} style={styles.card}/>
          <Image source={require('../images/Belinsky.png')} style={styles.card}/>
        </View>
        <View style={styles.cardTitleSection}>
          <Text style={styles.cardTitle}>Федор Достоевский</Text>
          <Text style={styles.cardTitle}>Виссарион Белинский</Text>
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.buttonText}>{t('quests.startQuest')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
