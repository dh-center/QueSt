import React from 'react';
import GoogleLogo from '../../images/google.svg';
import { GoogleSignin } from '@react-native-community/google-signin';
import { OAUTH_WEB_CLIENT_ID } from '@env';
import { TouchableOpacity } from 'react-native';
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
    await authController.authWithGoogle();
  };

  return (
    <TouchableOpacity onPress={signInWithGoogle}>
      <GoogleLogo/>
    </TouchableOpacity>
  );
}
