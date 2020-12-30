import React, { ReactElement, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Input from '../components/ui/Input';
import textStyles from '../styles/textStyles';
import Button from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import BackArrow from '../images/back.svg';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../navigation/profileStack';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/utils/ScreenWrapper';
import authController from '../controllers/authController';

/**
 * Styles for registration screen component
 */
const styles = StyleSheet.create({
  /**
   * Back button
   */
  backButton: {
    /**
     * Positions button in the left top corner
     */
    position: 'absolute',
    top: 45,
    left: 15,

    /**
     * Makes back button bigger
     */
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

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
   * Registration text block
   */
  registrationTitleContainer: {
    marginBottom: 30,
  },
  registrationTitle: {
    ...textStyles.robotoMedium,
    textAlign: 'center',
  },

  /**
   * Inputs styles
   */
  input: {
    marginBottom: 15,
  },
  registrationButton: {
    marginVertical: 15,
  },
});

/**
 * Type with props of screen 'Registration' in ProfileStackScreen
 */
type RegistrationScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Registration'>;

/**
 * Registration screen component
 */
export default function RegistrationScreen(): ReactElement {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const navigation = useNavigation<RegistrationScreenNavigationProp>();

  /**
   * Performs registration via email and password
   */
  const register = async (): Promise<void> => {
    if (repeatedPassword !== password) {
      Alert.alert(t('signUp.passwordsDontMatch'));

      return;
    }

    try {
      await authController.registerWithEmailAndPassword(email, password);
      Alert.alert(t('signUp.successful'));
      navigation.navigate('Login');
    } catch (e) {
      Alert.alert(t([`errors.${e.message}`, 'errors.unspecific']));
    }
  };

  return (
    <ScreenWrapper scrollable>
      <TouchableOpacity style={styles.backButton}
        onPress={(): void => navigation.goBack()}
      >
        <BackArrow/>
      </TouchableOpacity>
      <Text style={styles.logo}>Logo</Text>
      <View style={styles.registrationTitleContainer}>
        <Text style={styles.registrationTitle}>
          {t('signUp.registration')}
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
        placeholder={t('signUp.password')}
        textContentType="newPassword"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={val => setPassword(val)}
      />
      <Input
        autoCompleteType="password"
        placeholder={t('signUp.repeatPassword')}
        textContentType="newPassword"
        secureTextEntry={true}
        style={styles.input}
        value={repeatedPassword}
        onChangeText={val => setRepeatedPassword(val)}
      />
      <Button
        title={t('signUp.registration')}
        onPress={register}
        style={styles.registrationButton}
      />
    </ScreenWrapper>
  );
}
