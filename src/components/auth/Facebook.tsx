import React from 'react';
import FacebookLogo from '../../images/facebook.svg';
import { TouchableOpacity } from 'react-native';
import authController from '../../controllers/authController';

/**
 * Button for performing authorization via Facebook
 */
export default function FacebookAuth(): React.ReactElement {
  const signInWithFacebook = async (): Promise<void> => {
    await authController.authWithFacebook();
  };

  return (
    <TouchableOpacity onPress={signInWithFacebook}>
      <FacebookLogo/>
    </TouchableOpacity>
  );
}
