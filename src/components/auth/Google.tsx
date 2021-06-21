import React from 'react';
import GoogleLogo from '../../images/google.svg';
import { GoogleSignin } from '@react-native-community/google-signin';
import { OAUTH_WEB_CLIENT_ID } from '@env';
import { Alert, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../contexts/AuthProvider';
import AuthButtonProps from './AuthButtonProps';

GoogleSignin.configure({
  webClientId: OAUTH_WEB_CLIENT_ID,
  offlineAccess: true,
});

/**
 * Button for performing authorization via Google
 *
 * @param props - navigation props
 */
export default function GoogleAuth(props: AuthButtonProps): React.ReactElement {
  const authContext = useAuthContext();
  const { t } = useTranslation();

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const response = await authContext.actions.authWithGoogle();

      if (response.isFirstRegistration) {
        props.onFirstLogin();
      }
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
