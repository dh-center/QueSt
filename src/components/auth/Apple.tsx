import React, { ReactElement } from 'react';
import AppleLogo from '../../images/apple.svg';
import { Alert, TouchableOpacity } from 'react-native';
import { useAuthContext } from '../../contexts/AuthProvider';
import { useTranslation } from 'react-i18next';
import AuthButtonProps from './AuthButtonProps';

/**
 * Button for performing authorization via Apple ID
 *
 * @param props - navigation props
 */
export default function AppleAuth(props: AuthButtonProps): ReactElement {
  const authContext = useAuthContext();

  const { t } = useTranslation();
  const signInWithApple = async (): Promise<void> => {
    try {
      const response = await authContext.actions.authWithApple();

      if (response.isFirstRegistration) {
        props.onFirstLogin();
      }
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
