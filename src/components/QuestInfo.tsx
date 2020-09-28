import React from 'react';
import { View, ScrollView, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Container, Content, Spinner } from 'native-base';

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  header: {
    height: 135,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderStyle: 'solid',
    borderTopColor: 'white',
    borderColor: 'rgba(0, 46, 66, 0.5)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingRight: 16,
    paddingBottom: 15,
    paddingLeft: 41,
    // box-shadow: 1px 1px 3px rgba(0, 46, 66, 0.5);
  },
  section: {
    height: 'auto',
    paddingRight: 41,
    paddingLeft: 41,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    borderWidth: 0.3,
    borderStyle: 'solid',
    borderColor: 'rgba(33, 68, 104, 0.4)',
    // box-shadow: 0px 1px 2px rgba(33, 68, 104, 0.4);
  },
  title: {
    fontFamily: 'SF UI Display',
    fontSize: 28,
    lineHeight: 33,
    color: 'rgba(0,0,0,0.8)',
    marginTop: 14,
    marginBottom: 25,
  },
  description: {
    fontFamily: 'SF UI Display',
    fontSize: 17,
    lineHeight: 20,
    color: 'rgba(0,0,0,0.8)',
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
    // box-shadow: 1px 1px 3px rgba(0, 46, 66, 0.5);
  },
});

/**
 * Functional component of the screen with quest info
 */
export default function QuestInfo(): React.ReactElement {
  return (
    <View style={styles.body}>
      <View style={styles.header}>
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
            Пройди квест вместе с интеллектуальной элитой Петербурга, встреться с другом и уговори его показать свой роман Белинскому!
          </Text>
        </View>
        <View style={styles.line}/>

        <View style={{
          ...styles.section,
          minHeight: 100,
        }}>
          <Image source={require('../images/footprint.png')} style={{ marginRight: 5 }}/>
          <Text style={styles.description}>45 мин</Text>
        </View>
        <View style={styles.line}/>

        <View style={{
          ...styles.section,
          paddingTop: 22,
        }}>
          <Image source={require('../images/star.png')} style={{ marginRight: 5 }}/>
          <Text style={styles.description}>Друг Достоевского</Text>
        </View>
        <View style={{
          ...styles.section,
          paddingBottom: 22,
        }}>
          <Image source={require('../images/star.png')} style={{ marginRight: 5 }}/>
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
          <Image source={require('../images/Dostoevsky.png')}/>
          <Image source={require('../images/Belinsky.png')}/>
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
