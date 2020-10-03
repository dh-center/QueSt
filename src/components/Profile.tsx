import React from 'react';
import { Image, StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    paddingRight: 16,
    paddingLeft: 16,
    height: '100%',
  },
  header: {
    marginTop: 44,
    flexDirection: 'row',
    marginBottom: 33,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  info: {
    marginLeft: 15,
    marginRight: 5,
    paddingTop: 13,
    paddingBottom: 13,
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 22,
    lineHeight: 26,
    color: 'rgba(0, 0, 0, 0.8)',
  },
  login: {
    fontSize: 11,
    lineHeight: 13,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  progress: {
    height: 33,
    paddingTop: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  progressBar: {
    position: 'absolute',
    height: 8,
    width: '100%',
    top: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20,
  },
  fill: {
    position: 'absolute',
    height: 8,
    width: '76.5%',
    top: 15,
    alignSelf: 'flex-start',
    backgroundColor: '#F0FF95',
    borderRadius: 20,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#FFE2B6',
  },
  level: {
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 20,
    color: 'black',
  },
  settings: {
    height: 33,
    width: 33,
    marginTop: -3,
    marginRight: -2,
  },
  button: {
    height: 60,
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 17,
    lineHeight: 20,
    color: 'rgba(0, 0, 0, 0.8)',
  },
});

/**
 * Functional component of the person's page
 */
export default function Profile(): React.ReactElement {
  return (
    <ScrollView style={styles.body}>
      <View style={styles.header}>
        <Image source={require('./images/avatar.jpg')} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>Соня</Text>
          <Text style={styles.login}>@soninlogin</Text>
          <View style={styles.progress}>
            <View style={styles.progressBar} />
            <View style={styles.fill} />
            <Text style={styles.level}>LV. 5</Text>
            <Text style={styles.login}>153/200</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image source={require('./images/settings.png')} style={styles.settings} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Друзья</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Рейтинг</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Достижения</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Коллекция карточек</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
