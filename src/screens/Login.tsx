import React, { ReactElement, useState } from 'react';
import { Alert, Linking, Platform, StyleSheet, Text, View } from 'react-native';
import Input from '../components/ui/Input';
import textStyles, { StyledFonts } from '../styles/textStyles';
import Button from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../navigation/profileStack';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/utils/ScreenWrapper';
import FacebookAuth from '../components/auth/Facebook';
import VkAuth from '../components/auth/Vk';
import GoogleAuth from '../components/auth/Google';
import Logo from '../images/fullLogo.svg';
import Colors from '../styles/colors';
import { useAuthContext } from '../contexts/AuthProvider';
import AppleAuth from '../components/auth/Apple';
import styled from 'styled-components/native';
import BlueTextButton from '../components/BlueTextButton';

/**
 * Styles for login view
 */
const styles = StyleSheet.create({
  /**
   * Logo placeholder styles
   */
  logo: {
    marginTop: -15,
    marginBottom: 15,
  },

  /**
   * Welcome text block
   */
  welcomeTextContainer: {
    marginVertical: 30,
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
    shadowColor: Colors.Background,
    elevation: 0,
    borderColor: 'transparent',
  },

  /**
   * Login with socials block
   */
  socials: {
    width: 230,
    marginBottom: 60,
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

const LoginButton = styled(Button)`
  margin: 15px 0;
`;

const Delimiter = styled.View`
  width: 227px;
  height: 1px;
  background-color: ${Colors.Black};
  margin: 15px 0;
  opacity: 0.3;
`;

const GrayText = styled.Text`
  ${StyledFonts.uiWebRegular};
  color: #828282;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
`;

/**
 * Type with props of screen 'Login' in ProfileStackScreen
 */
export type LoginScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Login'>;

/**
 * Login view
 */
export default function LoginScreen(): ReactElement {
  const authContext = useAuthContext();
  const { t } = useTranslation();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Performs login via email and password
   */
  const login = async (): Promise<void> => {
    try {
      await authContext.actions.loginWithEmailAndPassword(email, password);
    } catch (e) {
      Alert.alert(t([`errors.${e.message}`, 'errors.unspecific']));
    }
  };

  return (
    <ScreenWrapper scrollable>
      <Logo style={styles.logo} height={80} width={144}/>
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
      <BlueTextButton isRight
        onPress={() => navigation.navigate('SendEmail')}
        text={t('signIn.forgotPassword')}
      />
      <LoginButton
        title={t('signIn.logIn')}
        onPress={login}
      />
      <BlueTextButton
        onPress={() => navigation.navigate('Registration')}
        text={t('signIn.signUp')}
      />
      <Delimiter/>
      <View style={styles.socials}>
        <Text style={styles.socialsText}>
          {t('signIn.logInWith')}
        </Text>
        <View style={styles.socialsContainer}>
          <FacebookAuth nav={navigation}/>
          <VkAuth nav={navigation}/>
          <GoogleAuth nav={navigation}/>
          {
            Platform.OS === 'ios' && <AppleAuth/>
          }
        </View>
      </View>
      <GrayText>{t('settings.agree')}</GrayText>
      <BlueTextButton
        onPress={() => Linking.openURL('https://quest.dh-center.ru/privacy-policy.pdf')
          .catch(() => Alert.alert(`${t('settings.https_alert')} https://quest.dh-center.ru/privacy-policy.pdf`))}
        text={t('settings.privacyPolicyDeclension')}
      />
      <BlueTextButton isLast
        onPress={() => Linking.openURL('https://quest.dh-center.ru/eula.pdf')
          .catch(() => Alert.alert(`${t('settings.https_alert')} https://quest.dh-center.ru/eula.pdf`))}
        text={t('settings.eulaDeclension')}
      />
    </ScreenWrapper>
  );
}
