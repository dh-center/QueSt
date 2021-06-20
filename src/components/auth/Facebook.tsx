import React from 'react';
import FacebookLogo from '../../images/facebook.svg';
import { Alert, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../contexts/AuthProvider';
import { LoginScreenNavigationProp } from '../../screens/Login';

interface FacebookAuthProps {
  nav: LoginScreenNavigationProp
}

/**
 * Button for performing authorization via Facebook
 *
 * @param props - navigation props
 */
export default function FacebookAuth(props: FacebookAuthProps): React.ReactElement {
  const authContext = useAuthContext();
  const { t } = useTranslation();

  const signInWithFacebook = async (): Promise<void> => {
    try {
      const response = await authContext.actions.authWithFacebook();

      if (response.isFirstRegistration) {
        props.nav.navigate('ChangeUsername');
      }
    } catch (e) {
      Alert.alert(t([`errors.${e.message}`, 'errors.unspecific']));
    }
  };

  return (
    <TouchableOpacity onPress={signInWithFacebook}>
      <FacebookLogo/>
    </TouchableOpacity>
  );
}
