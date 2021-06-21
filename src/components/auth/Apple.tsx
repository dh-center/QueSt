import React, { ReactElement } from 'react';
import AppleLogo from '../../images/apple.svg';
import { Alert, TouchableOpacity } from 'react-native';
import { useAuthContext } from '../../contexts/AuthProvider';
import { useTranslation } from 'react-i18next';
import { LoginScreenNavigationProp } from '../../screens/Login';

interface AppleAuthProps {
  nav: LoginScreenNavigationProp
}

/**
 * Button for performing authorization via Apple ID
 *
 * @param props - navigation props
 */
export default function AppleAuth(props: AppleAuthProps): ReactElement {
  const authContext = useAuthContext();

  const { t } = useTranslation();
  const signInWithApple = async (): Promise<void> => {
    try {
      const response = await authContext.actions.authWithApple();

      if (response.isFirstRegistration) {
        props.nav.navigate('ChangeUsername');
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
