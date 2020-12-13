import React from 'react';
import FacebookLogo from '../../images/facebook.svg';
import { TouchableOpacity } from 'react-native';

/**
 * Button for performing authorization via Facebook
 */
export default function FacebookAuth(): React.ReactElement {
  return (
    <TouchableOpacity>
      <FacebookLogo/>
    </TouchableOpacity>
  );
}
