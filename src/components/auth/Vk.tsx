import React from 'react';
import VkLogo from '../../images/vk.svg';
import { TouchableOpacity } from 'react-native';
import authController from '../../controllers/authController';

/**
 * Button for performing authorization via Vk
 */
export default function VkAuth(): React.ReactElement {
  const signInWithVk = async (): Promise<void> => {
    await authController.authWithVK();
  };

  return (
    <TouchableOpacity onPress={signInWithVk}>
      <VkLogo/>
    </TouchableOpacity>
  );
}
