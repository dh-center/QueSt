import React from 'react';
import VkLogo from '../../images/vk.svg';
import { TouchableOpacity } from 'react-native';

/**
 * Button for performing authorization via Vk
 */
export default function VkAuth(): React.ReactElement {
  return (
    <TouchableOpacity>
      <VkLogo/>
    </TouchableOpacity>
  );
}
