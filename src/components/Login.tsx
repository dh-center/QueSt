import React, { ReactElement } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import Colors from '../styles/colors';
import textStyles from '../styles/textStyles';
import CustomButton from './CustomButton';
import UnderlinedButton from "./UnderlinedButton";

const styles = StyleSheet.create({
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
  input: {
    marginBottom: 15,
  },
});

/**
 *
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
          />
          <UnderlinedButton
            title="Регистрация"
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
