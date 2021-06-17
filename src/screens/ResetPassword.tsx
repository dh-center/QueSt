import React, { ReactElement, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  welcomeText: {
    ...textStyles.default,
    textAlign: 'center',
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
  margin-bottom: 10px;
`;

const TipIcon = styled(Tip)`
  margin: 0 19px 0 10px;
`;

const TipText = styled.Text`
  ${StyledFonts.uiWebRegular};
  color: ${Colors.Black};
  font-size: 14px;
  flex: 1;
`;

const SendingButton = styled(Button)`
  margin: 30px 0;
`;

const sendCodeMutation = graphql`
  mutation ResetPasswordMutation($email: String!) {
    user {
      sendCodeForPasswordReset(email: $email)
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
  const [email, setEmail] = useState('');

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
        <TipText>Введите адрес почты, к которой привязан Ваш аккаунт</TipText>
      </TipView>
      <Input
        autoCompleteType="username"
        keyboardType="email-address"
        placeholder="E-mail"
        textContentType="emailAddress"
        value={email}
        onChangeText={val => setEmail(val)}
      />
      <SendingButton
        title={t('signIn.sendCode')}
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
      />
      <TextualBackButton onPress={(): void => navigation.goBack()}/>
    </ScreenWrapper>
  );
}
