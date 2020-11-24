import React, { ReactElement } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import Colors from '../styles/colors';
import textStyles from '../styles/textStyles';
import CustomButton from './CustomButton';
import UnderlinedButton from './UnderlinedButton';

/**
 * Styles for login view
 */
const styles = StyleSheet.create({
  /**
   * Styles for container
   */
  body: {
    backgroundColor: Colors.BACKGROUND,
    height: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 15,
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
   * Welcome text block
   */
  welcomeTextContainer: {
    marginBottom: 30,
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
  },
  recoverPasswordButton: {
    opacity: 0.5,
    marginBottom: 10,
  },

  /**
   * Login with socials block
   */
  socials: {
    width: 180,
    marginBottom: 50,
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
  socialItem: {
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#C4C4C4',
  },

  /**
   * Class-helper for making margin bottom 30
   */
  mb30: {
    marginBottom: 30,
  },
});

/**
 * Login view
 */
export default function Login(): ReactElement {
  return (
    <SafeAreaView style={styles.body}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.logo}>Logo</Text>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTextMedium}>
              Войдите в приложение
            </Text>
            <Text style={styles.welcomeText}>
              чтобы открыть все возможности Que.St
            </Text>
          </View>
          <Input
            autoCompleteType="email"
            placeholder="Email"
            style={styles.input}
          />
          <Input
            autoCompleteType="password"
            placeholder="Пароль"
            style={styles.input}
          />
          <CustomButton
            title="Войти"
            onPress={() => {}}
            style={styles.mb30}
          />
          <UnderlinedButton
            title="Регистрация"
            onPress={() => {}}
            style={styles.mb30}
          />
          <View style={styles.socials}>
            <Text style={styles.socialsText}>
              Войти с помощью
            </Text>
            <View style={styles.socialsContainer}>
              <Text style={styles.socialItem}>VK</Text>
              <Text style={styles.socialItem}>FB</Text>
              <Text style={styles.socialItem}>Google</Text>
            </View>
          </View>
          <UnderlinedButton
            title="Забыли пароль?"
            onPress={() => {}}
            style={styles.recoverPasswordButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}