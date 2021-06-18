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

type Props = StackScreenProps<ProfileStackParamList, 'SendEmail'>;

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

const StyledButton = styled(Button)`
  margin: 30px 0;
`;

const sendCodeMutation = graphql`
  mutation SendEmailMutation($email: String!) {
    user {
      sendCodeForPasswordReset(email: $email)
    }
  }
`;

/**
 * Sending email view
 *
 * @param props - props for component rendering
 */
export default function SendEmailScreen({ navigation }: Props): ReactElement {
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
        <TipText>{t(`signIn.tips.0`)}</TipText>
      </TipView>
      <InputWithMargin
        autoCompleteType="username"
        keyboardType="email-address"
        placeholder="E-mail"
        textContentType="emailAddress"
        value={email}
        onChangeText={val => setEmail(val)}
      />
      <StyledButton
        title={t('signIn.sendCode')}
        onPress={() => {
          email.includes('@') && email.length > 4
            ? commitMutation(
              environment,
              {
                mutation: sendCodeMutation,
                variables: { email },
                onError: () => Alert.alert(t('signIn.invalidEmail')),
                onCompleted: () => navigation.navigate('InputCode', { email }),
              }
            )
            : Alert.alert(t('signIn.invalidEmail'));
        }}
      />
      <TextualBackButton onPress={(): void => navigation.goBack()}/>
    </ScreenWrapper>
  );
}
