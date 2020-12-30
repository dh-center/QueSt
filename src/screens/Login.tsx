import React, { ReactElement, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Input from '../components/ui/Input';
import textStyles from '../styles/textStyles';
import Button from '../components/ui/Button';
import UnderlinedButton from '../components/ui/UnderlinedButton';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../navigation/profileStack';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/utils/ScreenWrapper';
import FacebookAuth from '../components/auth/Facebook';
import VkAuth from '../components/auth/Vk';
import GoogleAuth from '../components/auth/Google';
import authController from '../controllers/authController';

/**
 * Styles for login view
 */
const styles = StyleSheet.create({
  /**
   * Logo placeholder styles
   */
  logo: {
    ...textStyles.default,
    backgroundColor: '#C4C4C4',
    width: 110,
    height: 110,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderRadius: 55,
    marginBottom: 30,
  },

  /**
   * Welcome text block
   */
  welcomeTextContainer: {
    marginBottom: 30,
  },
  welcomeText: {
    ...textStyles.default,
    textAlign: 'center',
  },
  welcomeTextMedium: {
    ...textStyles.robotoMedium,
    textAlign: 'center',
  },

  /**
   * Inputs styles
   */
  input: {
    marginBottom: 15,
  },
  recoverPasswordButton: {
    opacity: 0.5,
    marginBottom: 15,
  },

  /**
   * Login with socials block
   */
  socials: {
    width: 180,
    marginBottom: 50,
  },
  socialsText: {
    ...textStyles.default,
    marginBottom: 15,
    textAlign: 'center',
  },
  socialsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  /**
   * Class-helper for making margin bottom 30
   */
  mb30: {
    marginBottom: 30,
  },
});

/**
 * Type with props of screen 'Login' in ProfileStackScreen
 */
type LoginScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Login'>;

/**
 * Login view
 */
export default function LoginScreen(): ReactElement {
  const { t } = useTranslation();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Performs login via email and password
   */
  const login = async (): Promise<void> => {
    try {
      await authController.loginWithEmailAndPassword(email, password);
    } catch (e) {
      Alert.alert(t([`errors.${e.message}`, 'errors.unspecific']));
    }
  };

  return (
    <ScreenWrapper scrollable>
      <Text style={styles.logo}>Logo</Text>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeTextMedium}>
          {t('signIn.welcomeHeader')}
        </Text>
        <Text style={styles.welcomeText}>
          {t('signIn.welcomeText')}
        </Text>
      </View>
      <Input
        autoCompleteType="username"
        keyboardType="email-address"
        placeholder="E-mail"
        textContentType="emailAddress"
        style={styles.input}
        value={email}
        onChangeText={val => setEmail(val)}
      />
      <Input
        autoCompleteType="password"
        placeholder={t('signIn.password')}
        textContentType="password"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={val => setPassword(val)}
      />
      <Button
        title={t('signIn.logIn')}
        onPress={login}
        style={styles.mb30}
      />
      <UnderlinedButton
        title={t('signIn.signUp')}
        onPress={(): void => navigation.navigate('Registration')}
        style={styles.mb30}
      />
      <View style={styles.socials}>
        <Text style={styles.socialsText}>
          {t('signIn.logInWith')}
        </Text>
        <View style={styles.socialsContainer}>
          <FacebookAuth/>
          <VkAuth/>
          <GoogleAuth/>
        </View>
      </View>
      <UnderlinedButton
        title={t('signIn.forgotPassword')}
        onPress={(): void => console.log('Recover password')}
        style={styles.recoverPasswordButton}
      />
    </ScreenWrapper>
  );
}
