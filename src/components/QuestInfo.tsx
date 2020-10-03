import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { QuestsStackParamList } from './AppNavigator';
import { useNavigation } from '@react-navigation/native';

/**
 * Type with props of screen 'Description' in QuestsStackScreen
 */
type DescriptionScreenNavigationProp = StackNavigationProp<QuestsStackParamList, 'Description'>;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  header: {
    backgroundColor: '#FFFFFF',
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
  },
  section: {
    paddingRight: 41,
    paddingLeft: 41,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.6,
    borderStyle: 'solid',
    borderBottomColor: 'rgba(33, 68, 104, 0.4)',
  },
  title: {
    fontSize: 28,
    lineHeight: 28,
    color: 'rgba(0, 0, 0, 0.8)',
  },
  description: {
    fontSize: 17,
    lineHeight: 20,
    color: 'rgba(0, 0, 0, 0.8)',
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
export default function QuestInfo(): React.ReactElement {
  const navigation = useNavigation<DescriptionScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
          onPress={(): void => navigation.goBack()}
        >
          <Image source={require('../images/back.png')} style={styles.iconBack}/>
        </TouchableOpacity>
        <Text style={styles.title}>
          Помоги Достоевскому опубликовать роман «Бедные люди»
        </Text>
      </View>

      <ScrollView>
        <View style={{
          ...styles.section,
          paddingTop: 15,
          paddingBottom: 15,
        }}>
          <Text style={styles.description}>
                        Пройди квест вместе с интеллектуальной элитой Петербурга, встреться с другом и уговори его
                        показать свой роман Белинскому!
          </Text>
        </View>

        <View style={{
          ...styles.section,
          minHeight: 100,
        }}>
          <Image source={require('../images/footprint.png')} style={styles.icon}/>
          <Text style={styles.description}>45 мин</Text>
        </View>

        <View style={{
          ...styles.section,
          paddingTop: 22,
          borderBottomColor: '#fff',
        }}>
          <Image source={require('../images/star.png')} style={styles.icon}/>
          <Text style={styles.description}>Друг Достоевского</Text>
        </View>
        <View style={{
          ...styles.section,
          paddingBottom: 22,
        }}>
          <Image source={require('../images/star.png')} style={styles.icon}/>
          <Text style={styles.description}>Петербургская интеллигенция</Text>
        </View>

        <View style={{
          ...styles.section,
          paddingTop: 30,
          paddingRight: 0,
          paddingLeft: 0,
          justifyContent: 'space-around',
          borderBottomColor: '#fff',
        }}>
          <Image source={require('../images/Dostoevsky.png')} style={styles.card}/>
          <Image source={require('../images/Belinsky.png')} style={styles.card}/>
        </View>
        <View style={{
          ...styles.section,
          paddingRight: 0,
          paddingLeft: 0,
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          borderBottomColor: '#fff',
        }}>
          <Text style={{
            ...styles.description,
            textAlign: 'center',
            color: '#000',
          }}>Федор Достоевский</Text>
          <Text style={{
            ...styles.description,
            textAlign: 'center',
            color: '#000',
          }}>Виссарион Белинский</Text>
        </View>
        <View style={{
          ...styles.section,
          justifyContent: 'center',
          borderBottomColor: '#fff',
        }}>
          <TouchableOpacity style={styles.startButton}>
            <Text style={{
              ...styles.description,
              color: '#fff',
            }}>Начать квест</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
