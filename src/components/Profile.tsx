import React from 'react';
import { Image, StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from './AppNavigator';
import { useNavigation } from '@react-navigation/native';
import AuthController from '../controllers/authController';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '@react-native-community/google-signin';
import { OAUTH_ANDROID_CLIENT_ID } from '@env';

GoogleSignin.configure({
  webClientId: OAUTH_ANDROID_CLIENT_ID,
  offlineAccess: true,
});

/**
 * Type with props of screen 'Main' in QuestsStackScreen
 */
type MainScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Main'>;

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
  userInfo: {
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
  caption: {
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
  progressFill: {
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
  settingsButton: {
    height: 33,
    width: 33,
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
 * Displays user's profile
 */
export default function Profile(): React.ReactElement {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.body}>
      <View style={styles.header}>
        <Image source={require('../images/avatar.jpg')} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>Соня</Text>
          <Text style={styles.caption}>@sonincaption</Text>
          <View style={styles.progress}>
            <View style={styles.progressBar} />
            <View style={styles.progressFill} />
            <Text style={styles.level}>LV. 5</Text>
            <Text style={styles.caption}>153/200</Text>
          </View>
        </View>
        <TouchableOpacity onPress={(): void => navigation.navigate('Settings')}>
          <Image source={require('../images/settings.png')} style={styles.settingsButton} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{t('profile.friends')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{t('profile.rating')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{t('profile.achievements')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{t('profile.cards')}</Text>
      </TouchableOpacity>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={async (): Promise<void> => {
          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            if (userInfo.serverAuthCode) {
              await AuthController.authWithGoogle(userInfo.serverAuthCode);
            } else {
              console.error('Can\'t perform auth due to missing server auth code');
            }
          } catch (error) {
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              // some other error happened
            }
          }
        }}
      />
    </ScrollView>
  );
}
