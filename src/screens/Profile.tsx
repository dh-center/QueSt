import React from 'react';
import styled, { css } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from '../navigation/profileStack';
import Colors from '../styles/colors';

/**
 * Type with props of screen 'Main' in QuestsStackScreen
 */
type MainScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Main'>;

const Body = styled.SafeAreaView`
  background-color: ${Colors.BACKGROUND};
  height: 100%;
`;

const Scroll = styled.ScrollView.attrs(() => ({
  contentContainerStyle: css`
    align-items: center;
    justify-content: center;
    padding: 74px 15px 0;
  `,
}))``;

const Avatar = styled.Image`
  height: 109px;
  width: 109px;
  border-radius: 60px;
`;

/**
 * Displays user's profile
 */
export default function ProfileScreen(): React.ReactElement {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <Body>
      <Scroll>
        <Avatar source={require('../images/avatar.jpg')}/>
        <Avatar source={require('../images/avatar.jpg')}/>
        {/* <View style={styles.header}>*/}
        {/*  <Image source={require('../images/avatar.jpg')} style={styles.avatar} />*/}
        {/*  <View style={styles.userInfo}>*/}
        {/*    <Text style={styles.name}>Соня</Text>*/}
        {/*    <Text style={styles.caption}>@sonincaption</Text>*/}
        {/*    <View style={styles.progress}>*/}
        {/*      <View style={styles.progressBar} />*/}
        {/*      <View style={styles.progressFill} />*/}
        {/*      <Text style={styles.level}>LV. 5</Text>*/}
        {/*      <Text style={styles.caption}>153/200</Text>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*  <TouchableOpacity onPress={(): void => navigation.navigate('Settings')}>*/}
        {/*    <Image source={require('../images/settings.png')} style={styles.settingsButton} />*/}
        {/*  </TouchableOpacity>*/}
        {/* </View>*/}
        {/* <TouchableOpacity style={styles.button}>*/}
        {/*  <Text style={styles.buttonText}>{t('profile.friends')}</Text>*/}
        {/* </TouchableOpacity>*/}
        {/* <TouchableOpacity style={styles.button}>*/}
        {/*  <Text style={styles.buttonText}>{t('profile.rating')}</Text>*/}
        {/* </TouchableOpacity>*/}
        {/* <TouchableOpacity style={styles.button}>*/}
        {/*  <Text style={styles.buttonText}>{t('profile.achievements')}</Text>*/}
        {/* </TouchableOpacity>*/}
        {/* <TouchableOpacity style={styles.button}>*/}
        {/*  <Text style={styles.buttonText}>{t('profile.cards')}</Text>*/}
        {/* </TouchableOpacity>*/}
      </Scroll>
    </Body>
  );
}
