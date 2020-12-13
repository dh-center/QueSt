import React from 'react';
import GoogleLogo from '../../images/google.svg';
import { GoogleSignin } from '@react-native-community/google-signin';
import { OAUTH_WEB_CLIENT_ID } from '@env';
import { Alert, TouchableOpacity } from 'react-native';
import authController from '../../controllers/authController';

GoogleSignin.configure({
  webClientId: OAUTH_WEB_CLIENT_ID,
  offlineAccess: true,
});

/**
 * Button for performing authorization via Google
 */
export default function GoogleAuth(): React.ReactElement {
  const signInWithGoogle = async (): Promise<void> => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.serverAuthCode) {
        await authController.authWithGoogle(userInfo.serverAuthCode);
      } else {
        console.error('Can\'t perform auth due to missing server auth code');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ошибка', error.message);
    }
  };

  return (
    <TouchableOpacity onPress={signInWithGoogle}>
      <GoogleLogo/>
    </TouchableOpacity>
  );
}
