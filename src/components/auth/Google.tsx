import React from 'react';
import GoogleLogo from '../../images/google.svg';
import { GoogleSignin } from '@react-native-community/google-signin';
import { OAUTH_WEB_CLIENT_ID } from '@env';
import { Alert, TouchableOpacity } from 'react-native';
import authController from '../../controllers/authController';
import { useTranslation } from 'react-i18next';

GoogleSignin.configure({
  webClientId: OAUTH_WEB_CLIENT_ID,
  offlineAccess: true,
});

/**
 * Button for performing authorization via Google
 */
export default function GoogleAuth(): React.ReactElement {
  const { t } = useTranslation();
  const signInWithGoogle = async (): Promise<void> => {
    try {
      await authController.authWithGoogle();
    } catch (e) {
      Alert.alert(t([`errors.${e.message}`, 'errors.unspecific']));
    }
  };

  return (
    <TouchableOpacity onPress={signInWithGoogle}>
      <GoogleLogo/>
    </TouchableOpacity>
  );
}
