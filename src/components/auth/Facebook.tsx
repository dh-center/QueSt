import React from 'react';
import FacebookLogo from '../../images/facebook.svg';
import { Alert, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../contexts/AuthProvider';

/**
 * Button for performing authorization via Facebook
 */
export default function FacebookAuth(): React.ReactElement {
  const authContext = useAuthContext();
  const { t } = useTranslation();

  const signInWithFacebook = async (): Promise<void> => {
    try {
      await authContext.actions.authWithFacebook();
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
