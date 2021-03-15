import React from 'react';
import VkLogo from '../../images/vk.svg';
import { Alert, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../contexts/AuthProvider';

/**
 * Button for performing authorization via Vk
 */
export default function VkAuth(): React.ReactElement {
  const authContext = useAuthContext();
  const { t } = useTranslation();
  const signInWithVk = async (): Promise<void> => {
    try {
      await authContext.actions.authWithVK();
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
