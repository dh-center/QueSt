import React from 'react';
import VkLogo from '../../images/vk.svg';
import { TouchableOpacity } from 'react-native';
import VKLogin from 'react-native-vkontakte-login';
import authController from '../../controllers/authController';

/**
 * Button for performing authorization via Vk
 */
export default function VkAuth(): React.ReactElement {
  const signInWithVk = async (): Promise<void> => {
    const auth = await VKLogin.login(['friends', 'photos', 'email']);

    await authController.authWithVK(auth);
  };

  return (
    <TouchableOpacity onPress={signInWithVk}>
      <VkLogo/>
    </TouchableOpacity>
  );
}
