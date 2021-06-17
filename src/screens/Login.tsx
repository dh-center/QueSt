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

const BlueTextButton = styled.TouchableOpacity<{right?: boolean, last?: boolean}>`
  ${props => props.right && 'align-self: flex-end;'}
  ${props => props.last && 'margin-bottom: 15px;'}
`;

const BlueTextButtonText = styled.Text`
  ${StyledFonts.uiWebRegular};
  color: ${Colors.Blue};
  font-size: 18px;
  line-height: 22px;
`;

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
type LoginScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Login'>;

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
      <BlueTextButton right
        onPress={(): void => console.log('Recover password')}
      >
        <BlueTextButtonText>{t('signIn.forgotPassword')}</BlueTextButtonText>
      </BlueTextButton>
      <LoginButton
        title={t('signIn.logIn')}
        onPress={login}
      />
      <BlueTextButton
        onPress={(): void => navigation.navigate('Registration')}
      >
        <BlueTextButtonText>{t('signIn.signUp')}</BlueTextButtonText>
      </BlueTextButton>
      <Delimiter/>
      <View style={styles.socials}>
        <Text style={styles.socialsText}>
          {t('signIn.logInWith')}
        </Text>
        <View style={styles.socialsContainer}>
          <FacebookAuth/>
          <VkAuth/>
          <GoogleAuth/>
          {
            Platform.OS === 'ios' && <AppleAuth/>
          }
        </View>
      </View>
      <GrayText>{t('settings.agree')}</GrayText>
      <BlueTextButton
        onPress={() => Linking.openURL('https://quest.dh-center.ru/privacy-policy.pdf')
          .catch(() => Alert.alert(`${t('settings.https_alert')} https://quest.dh-center.ru/privacy-policy.pdf`))}
      >
        <BlueTextButtonText>{t('settings.privacyPolicyDeclension')}</BlueTextButtonText>
      </BlueTextButton>
      <BlueTextButton last
        onPress={() => Linking.openURL('https://quest.dh-center.ru/eula.pdf')
          .catch(() => Alert.alert(`${t('settings.https_alert')} https://quest.dh-center.ru/eula.pdf`))}
      >
        <BlueTextButtonText>{t('settings.eulaDeclension')}</BlueTextButtonText>
      </BlueTextButton>
    </ScreenWrapper>
  );
}
