import React from 'react';
import FacebookLogo from '../../images/facebook.svg';
import { Alert, TouchableOpacity } from 'react-native';
import authController from '../../controllers/authController';
import { useTranslation } from 'react-i18next';

/**
 * Button for performing authorization via Facebook
 */
export default function FacebookAuth(): React.ReactElement {
  const { t } = useTranslation();
  const signInWithFacebook = async (): Promise<void> => {
    try {
      await authController.authWithFacebook();
    } catch (e) {
      Alert.alert(t([`errors.${e.message}`, 'errors.unspecific']));
    }
  };

  return (
    <TouchableOpacity onPress={signInWithFacebook}>
      <FacebookLogo/>
    </TouchableOpacity>
  );
}
