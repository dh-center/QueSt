import React from 'react';
import VkLogo from '../../images/vk.svg';
import { Alert, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../contexts/AuthProvider';
import AuthButtonProps from './AuthButtonProps';

/**
 * Button for performing authorization via Vk
 *
 * @param props - navigation props
 */
export default function VkAuth(props: AuthButtonProps): React.ReactElement {
  const authContext = useAuthContext();
  const { t } = useTranslation();
  const signInWithVk = async (): Promise<void> => {
    try {
      const response = await authContext.actions.authWithVK();

      if (response.isFirstRegistration) {
        props.onFirstLogin && props.onFirstLogin();
      }
    } catch (e) {
      Alert.alert(t([`errors.${e.message}`, 'errors.unspecific']));
    }
  };

  return (
    <TouchableOpacity onPress={signInWithVk}>
      <VkLogo/>
    </TouchableOpacity>
  );
}
