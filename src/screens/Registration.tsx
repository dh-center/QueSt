import React, { ReactElement } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Input from '../components/ui/Input';
import Colors from '../styles/colors';
import textStyles from '../styles/textStyles';
import Button from '../components/ui/Button';
import { useTranslation } from 'react-i18next';

/**
 * Styles for registration screen component
 */
const styles = StyleSheet.create({
  /**
   * Styles for container
   */
  body: {
    backgroundColor: Colors.BACKGROUND,
    flex: 1,
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 15,
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
    marginVertical: 30,
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
});

/**
 * Registration screen component
 */
export default function RegistrationScreen(): ReactElement {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView contentContainerStyle={styles.container}>
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
          textContentType="username"
          style={styles.input}
        />
        <Input
          autoCompleteType="password"
          placeholder={t('signUp.password')}
          textContentType="newPassword"
          secureTextEntry={true}
          style={styles.input}
        />
        <Input
          autoCompleteType="password"
          placeholder={t('signUp.repeatPassword')}
          textContentType="newPassword"
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          title={t('signUp.registration')}
          onPress={(): void => console.log('Registration')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
