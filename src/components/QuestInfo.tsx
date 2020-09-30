import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { QuestsStackParamList } from './AppNavigator';
import { useNavigation } from '@react-navigation/native';

/**
 * Type with props of screen 'Description' in QuestsStackScreen
 */
type DescriptionScreenNavigationProp = StackNavigationProp<QuestsStackParamList,
    'Description'>;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  header: {
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderStyle: 'solid',
    borderTopColor: 'white',
    borderColor: 'rgba(0, 46, 66, 0.5)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 15,
    paddingRight: 16,
    paddingBottom: 16,
    flexDirection: 'row',
  },
  section: {
    paddingRight: 41,
    paddingLeft: 41,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    borderWidth: 0.3,
    borderStyle: 'solid',
    borderColor: 'rgba(33, 68, 104, 0.4)',
  },
  title: {
    fontSize: 28,
    color: 'rgba(0, 0, 0, 0.8)',
  },
  description: {
    fontSize: 17,
    lineHeight: 20,
    color: 'rgba(0, 0, 0, 0.8)',
  },
  backButton: {
    // flex: 1,
    // flexGrow: 0,
    // justifyContent: 'center',
    // alignItems: 'center',
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
    marginTop: 11,
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
    <View style={styles.body}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity style={styles.backButton}
          onPress={(): void => navigation.goBack()}
        >
          <Image source={require('../images/back.png')} style={styles.iconBack}/>
        </TouchableOpacity>
        <Text style={styles.title}>
                    Помоги Достоевскому опубликовать роман «Бедные люди»
        </Text>
      </SafeAreaView>

      <ScrollView style={{ flexGrow: 1 }}>
        <View style={{
          ...styles.section,
          flexGrow: 1,
          paddingTop: 15,
          paddingBottom: 15,
        }}>
          <Text style={styles.description}>
                        Пройди квест вместе с интеллектуальной элитой Петербурга, встреться с другом и уговори его
                        показать свой роман Белинскому!
          </Text>
        </View>
        <View style={styles.line}/>

        <View style={{
          ...styles.section,
          minHeight: 100,
        }}>
          <Image source={require('../images/footprint.png')} style={styles.icon}/>
          <Text style={styles.description}>45 мин</Text>
        </View>
        <View style={styles.line}/>

        <View style={{
          ...styles.section,
          paddingTop: 22,
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
        <View style={styles.line}/>

        <View style={{
          ...styles.section,
          paddingTop: 30,
          paddingRight: 0,
          paddingLeft: 0,
          justifyContent: 'space-around',
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
        }}>
          <Text style={{
            ...styles.description,
            width: 163,
            textAlign: 'center',
            color: '#000',
          }}>Федор Достоевский</Text>
          <Text style={{
            ...styles.description,
            width: 163,
            textAlign: 'center',
            color: '#000',
          }}>Виссарион Белинский</Text>
        </View>
        <View style={{
          ...styles.section,
          justifyContent: 'center',
        }}>
          <TouchableOpacity style={styles.startButton}>
            <Text style={{
              ...styles.description,
              color: '#fff',
            }}>Начать квест</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
