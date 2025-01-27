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
import { ChangeUsernameMutation } from './__generated__/ChangeUsernameMutation.graphql';
import { useAuthContext } from '../contexts/AuthProvider';

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

/**
 * Screen with changing username
 */
export default function ChangeUsernameScreen(): ReactElement {
  const { t } = useTranslation();
  const authContext = useAuthContext();
  const [username, setUsername] = useState('');

  const [ updateUsername ] = useMutation<ChangeUsernameMutation>(
    graphql`
      mutation ChangeUsernameMutation($username: String!) {
        user {
          update(input: {username: $username}) {
            record {
              id
              username
            }
          }
        }
      }
    `
  );

  return (
    <ScreenWrapper scrollable>
      <Logo style={styles.logo} height={80} width={144}/>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeTextMedium}>
          {t('signUp.registration')}
        </Text>
      </View>
      <TipView>
        <TipIcon/>
        <TipText>{t(`signIn.tips.3`)}</TipText>
      </TipView>
      <InputWithMargin
        placeholder={t('signUp.username')}
        value={username}
        onChangeText={val => setUsername(val)}
      />
      <StyledButton
        title={t('signUp.register')}
        onPress={() => updateUsername({
          variables: { username },
          onError: error => Alert.alert(t([`errors.${error.source.errors[0].extensions.code}`, 'errors.unspecific'])),
          onCompleted: () => {
            Alert.alert(t('signUp.successful'));
            authContext.actions.setFirstRegistrationFalse();
          },
        })}
      />
    </ScreenWrapper>
  );
}
