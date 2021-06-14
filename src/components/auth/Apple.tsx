import React, { ReactElement } from 'react';
import AppleLogo from '../../images/apple.svg';
import { Alert, TouchableOpacity } from 'react-native';
import { useAuthContext } from '../../contexts/AuthProvider';
import { useTranslation } from 'react-i18next';


/**
 * Button for performing authorization via Apple ID
 */
export default function AppleAuth(): ReactElement {
  const authContext = useAuthContext();

  const { t } = useTranslation();
  const signInWithApple = async (): Promise<void> => {
    try {
      await authContext.actions.authWithApple();
    } catch (e) {
      Alert.alert(t([`errors.${e.message}`, 'errors.unspecific']));
    }
  };

  return (
    <TouchableOpacity onPress={signInWithApple}>
      <AppleLogo/>
    </TouchableOpacity>
  );
}
