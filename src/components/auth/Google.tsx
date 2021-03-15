import React from 'react';
import GoogleLogo from '../../images/google.svg';
import { GoogleSignin } from '@react-native-community/google-signin';
import { OAUTH_WEB_CLIENT_ID } from '@env';
import { Alert, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../contexts/AuthProvider';

GoogleSignin.configure({
  webClientId: OAUTH_WEB_CLIENT_ID,
  offlineAccess: true,
});

/**
 * Button for performing authorization via Google
 */
export default function GoogleAuth(): React.ReactElement {
  const authContext = useAuthContext();

  const { t } = useTranslation();
  const signInWithGoogle = async (): Promise<void> => {
    try {
      await authContext.actions.authWithGoogle();
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
