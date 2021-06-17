import React, { ReactElement, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Input from '../components/ui/Input';
import textStyles, { StyledFonts } from '../styles/textStyles';
import Button from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import ScreenWrapper from '../components/utils/ScreenWrapper';
import Logo from '../images/fullLogo.svg';
import Colors from '../styles/colors';
import styled from 'styled-components/native';
import { commitMutation, graphql } from 'react-relay';
import { useRelayEnvironment } from 'react-relay/hooks';
import Tip from '../images/tip.svg';
import { ProfileStackParamList } from '../navigation/profileStack';
import { StackScreenProps } from '@react-navigation/stack';
import TextualBackButton from '../components/TextualBackButton';
import BlueTextButton from '../components/BlueTextButton';

type Props = StackScreenProps<ProfileStackParamList, 'ResetPassword'>;

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
  welcomeTextMedium: {
    ...textStyles.robotoMedium,
    textAlign: 'center',
  },
});

const TipView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const TipIcon = styled(Tip)`
  margin: 3px 19px 3px 10px;
`;

const TipText = styled.Text`
  ${StyledFonts.uiWebRegular};
  color: ${Colors.Black};
  font-size: 14px;
  flex: 1;
`;

const InputWithMargin = styled(Input)`
  margin-top: 10px;
`;

const TextualButton = styled(BlueTextButton)`
  margin: 15px 0 -15px;
`;

const StyledButton = styled(Button)`
  margin: 30px 0;
`;

const sendCodeMutation = graphql`
  mutation ResetPasswordCodeMutation($email: String!) {
    user {
      sendCodeForPasswordReset(email: $email)
    }
  }
`;

const setNewPasswordMutation = graphql`
  mutation ResetPasswordMutation($email: String!, $code: String!, $password: String!) {
    user {
      resetPassword(input: {email: $email, code: $code, newPassword: $password}) {
        record {
          id
        }
      }
    }
  }
`;

/**
 * Login view
 *
 * @param props - props for component rendering
 */
export default function ResetPasswordScreen({ navigation }: Props): ReactElement {
  const { t } = useTranslation();
  const environment = useRelayEnvironment();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  let input;
  let action = (): void => setStep(step + 1);

  switch (step) {
    case 1:
      input =
        <InputWithMargin
          autoCompleteType="username"
          keyboardType="email-address"
          placeholder="E-mail"
          textContentType="emailAddress"
          value={email}
          onChangeText={val => setEmail(val)}
        />;
      action = () => {
        commitMutation(
          environment,
          {
            mutation: sendCodeMutation,
            variables: { email },
            onError: err => console.error(err),
          }
        );
        setStep(step + 1);
      };
      break;
    case 2:
      input =
        <InputWithMargin
          placeholder={t('signIn.placeholderCode')}
          value={code}
          onChangeText={val => setCode(val)}
        />;
      break;
    case 3:
      input =
        <>
          <InputWithMargin
            autoCompleteType="password"
            placeholder={t('signUp.password')}
            textContentType="newPassword"
            secureTextEntry={true}
            value={password}
            onChangeText={val => setPassword(val)}
          />
          <InputWithMargin
            autoCompleteType="password"
            placeholder={t('signUp.repeatPassword')}
            textContentType="newPassword"
            secureTextEntry={true}
            value={repeatedPassword}
            onChangeText={val => setRepeatedPassword(val)}
          />
        </>;
      action = () => {
        if (repeatedPassword !== password) {
          Alert.alert(t('signUp.passwordsDontMatch'));

          return;
        }
        commitMutation(
          environment,
          {
            mutation: setNewPasswordMutation,
            variables: {
              email,
              code,
              password,
            },
            onCompleted: () => {
              Alert.alert(t('signIn.successful'));
              navigation.navigate('Login');
            },
            onError: err => err.source.errors[0].extensions.code === 'WRONG_RESET_CODE'
              ? Alert.alert(t('errors.WRONG_RESET_CODE'))
              : Alert.alert(t('errors.unspecific')),
          }
        );
      };
  }

  return (
    <ScreenWrapper scrollable>
      <Logo style={styles.logo} height={80} width={144}/>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeTextMedium}>
          {t('signIn.recoveryPass')}
        </Text>
      </View>
      <TipView>
        <TipIcon/>
        <TipText>{t(`signIn.tip${step}`)}</TipText>
      </TipView>
      {input}
      {step === 2 &&
        <TextualButton right
          onPress={() => {
            commitMutation(
              environment,
              {
                mutation: sendCodeMutation,
                variables: { email },
                onError: err => console.error(err),
              }
            );
          }}
          text={t('signIn.sendCodeAgain')}/>
      }
      <StyledButton
        title={t(step === 1 ? 'signIn.sendCode' : 'signUp.next')}
        onPress={action}
      />
      {step !== 3 && <TextualBackButton onPress={(): void => navigation.goBack()}/>}
    </ScreenWrapper>
  );
}
