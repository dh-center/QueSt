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
import { graphql } from 'react-relay';
import { useMutation } from 'react-relay/hooks';
import Tip from '../images/tip.svg';
import { ProfileStackParamList } from '../navigation/profileStack';
import { StackScreenProps } from '@react-navigation/stack';
import BlueTextButton from '../components/BlueTextButton';
import TextualBackButton from '../components/TextualBackButton';
import { InputCodeMutation } from './__generated__/InputCodeMutation.graphql';

type Props = StackScreenProps<ProfileStackParamList, 'InputCode'>;

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

/**
 * View with code input
 *
 * @param props - props for component rendering
 */
export default function InputCodeScreen({ route, navigation }: Props): ReactElement {
  const { t } = useTranslation();
  const [code, setCode] = useState('');

  const [ sendEmail ] = useMutation<InputCodeMutation>(
    graphql`
      mutation InputCodeMutation($email: String!) {
        user {
          sendCodeForPasswordReset(email: $email)
        }
      }
    `
  );

  return (
    <ScreenWrapper scrollable withoutTabBar>
      <Logo style={styles.logo} height={80} width={144}/>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeTextMedium}>
          {t('signIn.recoveryPass')}
        </Text>
      </View>
      <TipView>
        <TipIcon/>
        <TipText>{t(`signIn.tips.1`)}</TipText>
      </TipView>
      <InputWithMargin
        placeholder={t('signIn.placeholderCode')}
        value={code}
        onChangeText={val => setCode(val)}
      />
      <TextualButton isRight
        onPress={() => {
          sendEmail({
            variables: { email: route.params.email },
            onError: err => console.error(err),
          });
        }}
        text={t('signIn.sendCodeAgain')}/>
      <StyledButton
        title={t('signUp.next')}
        onPress={() => {
          code.length === 6
            ? navigation.navigate('SetNewPassword', {
              email: route.params.email,
              code,
            })
            : Alert.alert(t('signIn.codeLengthMismatch'));
        }}
      />
      <TextualBackButton onPress={(): void => navigation.goBack()}/>
    </ScreenWrapper>
  );
}
