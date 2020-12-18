import React from 'react';
import VkLogo from '../../images/vk.svg';
import { Alert, TouchableOpacity } from 'react-native';
import authController from '../../controllers/authController';
import { useTranslation } from 'react-i18next';

/**
 * Button for performing authorization via Vk
 */
export default function VkAuth(): React.ReactElement {
  const { t } = useTranslation();
  const signInWithVk = async (): Promise<void> => {
    try {
      await authController.authWithVK();
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
