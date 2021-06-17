import React, { ReactElement, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Input from '../components/ui/Input';
import textStyles, { StyledFonts } from '../styles/textStyles';
import Button from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import Back from '../images/back.svg';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../navigation/profileStack';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/utils/ScreenWrapper';
import Colors from '../styles/colors';
import Logo from '../images/fullLogo.svg';
import { useAuthContext } from '../contexts/AuthProvider';
import styled from 'styled-components/native';

/**
 * Styles for registration screen component
 */
const styles = StyleSheet.create({
  /**
   * Back button
   */
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  /**
   * Logo placeholder styles
   */
  logo: {
    marginTop: -15,
  },

  /**
   * Registration text block
   */
  registrationTitleContainer: {
    marginTop: 45,
    marginBottom: 15,
  },
  registrationTitle: {
    ...textStyles.robotoMedium,
    textAlign: 'center',
  },

  /**
   * Inputs styles
   */
  input: {
    marginTop: 15,
    shadowColor: Colors.Background,
    elevation: 0,
    borderColor: 'transparent',
  },
  registrationButton: {
    marginVertical: 30,
  },
});

const BackArrow = styled(Back)`
  padding: 0 10px;
  color: ${Colors.DarkBlue};
`;

const DefaultText = styled.Text`
  ${StyledFonts.uiWebRegular};
  color: ${Colors.DarkBlue};
  font-size: 18px;
  line-height: 22px;
`;

/**
 * Type with props of screen 'Registration' in ProfileStackScreen
 */
type RegistrationScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Registration'>;

/**
 * Registration screen component
 */
export default function RegistrationScreen(): ReactElement {
  const authContext = useAuthContext();
  const { t } = useTranslation();
  const [name, setName] = useState('');
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
      await authContext.actions.registerWithEmailAndPassword(email, password);
      Alert.alert(t('signUp.successful'));
      navigation.navigate('Login');
    } catch (e) {
      Alert.alert(t([`errors.${e.message}`, 'errors.unspecific']));
    }
  };

  return (
    <ScreenWrapper scrollable>
      <Logo style={styles.logo} height={80} width={144}/>
      <View style={styles.registrationTitleContainer}>
        <Text style={styles.registrationTitle}>
          {t('signUp.registration')}
        </Text>
      </View>
      <Input
        autoCompleteType="name"
        placeholder={t('signUp.name')}
        textContentType="emailAddress"
        style={styles.input}
        value={name}
        onChangeText={val => setName(val)}
      />
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
      <TouchableOpacity style={styles.backButton}
        onPress={(): void => navigation.goBack()}
      >
        <BackArrow/>
        <DefaultText>Назад</DefaultText>
      </TouchableOpacity>
    </ScreenWrapper>
  );
}
