import React, { useState } from 'react';
import { Image, StyleSheet, Text, ScrollView, View, TouchableOpacity, Switch, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../navigation/profileStack';
import { useAuthContext } from '../contexts/AuthProvider';

/**
 * Type with props of screen 'Settings' in ProfileStackScreen
 */
type SettingsScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Settings'>;

const styles = StyleSheet.create({
  body: {
    height: '100%',
  },
  headerBlock: {
    paddingRight: 16,
    paddingLeft: 16,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  block: {
    paddingRight: 16,
    paddingLeft: 16,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: 'rgba(33, 68, 104, 0.4)',
  },
  logoutBlock: {
    paddingRight: 16,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerText: {
    fontSize: 32,
    lineHeight: 38,
    color: 'rgba(0, 0, 0, 0.8)',
  },
  text: {
    fontSize: 17,
    lineHeight: 20,
    color: 'rgba(0, 0, 0, 0.8)',
  },
  logoutText: {
    fontSize: 17,
    lineHeight: 20,
    color: 'rgba(255, 0, 0, 0.8)',
  },
  arrow: {
    height: 14,
    width: 8,
    marginRight: 16,
  },
});

/**
 * Displays settings screen
 */
export default function SettingsScreen(): React.ReactElement {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { t } = useTranslation();
  const authContext = useAuthContext();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = (): void => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView>
        <View style={styles.headerBlock}>
          <TouchableOpacity onPress={(): void => navigation.goBack()}>
            <Image source={require('../images/back.png')} style={styles.arrow} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{t('settings.title')}</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.text}>{t('settings.password')}</Text>
          <TouchableOpacity>
            <Image source={require('../images/next.png')} style={styles.arrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.block}>
          <Text style={styles.text}>{t('settings.avatar')}</Text>
          <TouchableOpacity>
            <Image source={require('../images/next.png')} style={styles.arrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.block}>
          <Text style={styles.text}>{t('settings.theme')}</Text>
          <Switch
            trackColor={{
              false: '#C4C4C4',
              true: '#76f0ff',
            }}
            thumbColor={isEnabled ? '#7700ff' : '#f4f3f4'}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.logoutBlock}>
          <TouchableOpacity onPress={(): Promise<void> => authContext.actions.logout()}>
            <Text style={styles.logoutText}>{t('settings.logout')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
