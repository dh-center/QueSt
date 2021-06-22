import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../navigation/profileStack';
import { useAuthContext } from '../contexts/AuthProvider';
import styled from 'styled-components/native';
import ListButton from '../components/ListButton';
import Colors from '../styles/colors';
import BlueCircle15 from '../images/blueCircle15.svg';
import { StyledFonts } from '../styles/textStyles';
import Avatar from '../components/Avatar';
import BackArrow from '../components/BackArrow';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { Alert, Modal, Platform } from 'react-native';
import { API_ENDPOINT } from '@env';
import { useMutation } from 'react-relay/hooks';
import { graphql } from 'react-relay';
import { SettingsMutation } from './__generated__/SettingsMutation.graphql';
import Button from '../components/ui/Button';
import { SettingsSendCodeMutation } from './__generated__/SettingsSendCodeMutation.graphql';

/**
 * Type with props of screen 'Settings' in ProfileStackScreen
 */
type Props = StackScreenProps<ProfileStackParamList, 'Settings'>;

const Wrapper = styled.View`
  flex: 1;
  background-color: ${Colors.Background};
`;

const Header = styled.View`
  background-color: ${Colors.White};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding-top: 74px;
  margin-bottom: 15px;
  elevation: ${4};
  box-shadow: 0 2px 5px rgba(0,0,0,0.24);
`;

const BlueCircle = styled(BlueCircle15)`
  position: absolute;
  top: -376px;
  right: -169px;
`;

const Body = styled.View`
  padding: 0 15px;
`;

const Row = styled.View<{margined?: boolean}>`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  margin-left: ${props => props.margined ? 25 : 0}px;
`;

const BackButton = styled.TouchableOpacity`
  padding: 11px 15px;
`;

const Title = styled.Text`
  ${StyledFonts.roboto};
  font-size: 28px;
  line-height: 34px;
  color: ${Colors.Black};
`;

const NameView = styled.View`
  margin-left: 20px;
`;

const Name = styled.Text`
  ${StyledFonts.uiWebMedium};
  font-size: 22px;
  line-height: 22px;
  color: ${Colors.Black};
  margin-bottom: 5px;
`;

const DefaultText = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
`;

const LogoutButton = styled.TouchableOpacity`
  background-color: ${Colors.Red};
  border-radius: 50px;
  padding: 11px 28px;
  align-self: flex-end;
  align-items: center;
  elevation: ${2};
  box-shadow: 0 2px 3px rgba(0,0,0,0.2);
`;

const LogoutText = styled.Text`
  ${StyledFonts.uiWebMedium};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.White};
`;

const ModalView = styled.TouchableOpacity`
  background-color: rgba(85,85,107,0.8);
  flex: 1;
  padding: 74px 15px;
  align-items: center;
`;

const ModalImageView = styled.TouchableOpacity`
  background-color: ${Colors.Background};
  border-radius: 15px;
  elevation: ${8};
  box-shadow: 0 4px 4.65px rgba(0,0,0,0.2);
  margin-bottom: 30px;
`;

const ModalImage = styled.Image`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 15px;
`;

/**
 * Displays settings screen
 *
 * @param props - props for component rendering
 */
export default function SettingsScreen({ route, navigation }: Props): React.ReactElement {
  const { t } = useTranslation();
  const authContext = useAuthContext();
  const [newAvatar, setNewAvatar] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [ updateAvatar ] = useMutation<SettingsMutation>(
    graphql`
      mutation SettingsMutation($avatar: String!) {
        user {
          update(input: {photo: $avatar}) {
            record {
              id
              username
              photo
            }
          }
        }
      }
    `
  );

  /**
   * Image uploader
   *
   * @param response - image from user device
   */
  const imageUpload = async (response: Asset): Promise<void> => {
    try {
      const formData = new FormData();

      if (!response.uri) {
        return;
      }

      formData.append('image', {
        name: response.fileName,
        filename: response.fileName,
        type: response.type,
        uri:
          Platform.OS === 'android' ? response.uri : response.uri.replace('file://', ''),
      });

      const res = await fetch(
        `${API_ENDPOINT}/upload/user`,
        {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const responseJson = await res.json();

      if (responseJson.success === 1) {
        setNewAvatar(responseJson.file.url);
        setModalVisible(true);
      }
    } catch (e) {
      Alert.alert(t([`errors.${e.message}`, 'errors.unspecific']));
    }
  };

  const [ sendEmail ] = useMutation<SettingsSendCodeMutation>(
    graphql`
      mutation SettingsSendCodeMutation($email: String!) {
        user {
          sendCodeForPasswordReset(email: $email)
        }
      }
    `
  );

  return (
    <Wrapper>
      <Header>
        <BlueCircle/>
        <Row>
          <BackButton onPress={(): void => navigation.goBack()}>
            <BackArrow/>
          </BackButton>
          <Title>{t('settings.title')}</Title>
        </Row>
        <Row margined>
          <Avatar size={90} source={route.params.avatar}/>
          <NameView>
            <Name>{route.params.name}</Name>
            <DefaultText>@{route.params.username}</DefaultText>
          </NameView>
        </Row>
      </Header>

      <Body>
        {route.params.email &&
        <ListButton
          buttonText={t('settings.password')}
          type={'settings'}
          onPress={() => {
            if (route.params.email) {
              sendEmail({
                variables: { email: route.params.email },
                onError: err => console.error(err),
              });
              navigation.navigate('ChangePassword', { email: route.params.email });
            }
          }}
        />
        }
        <ListButton
          buttonText={t('settings.avatar')}
          type={'settings'}
          onPress={() => launchImageLibrary({ mediaType: 'photo' }, resp => {
            const fileSize = resp.assets[0].fileSize;
            const fileSizeInMb = fileSize && fileSize / (1024) / 1024;

            if (fileSizeInMb && fileSizeInMb > 4) {
              Alert.alert('Size is too large');

              return;
            }
            resp.didCancel ? console.log('cancelled') : imageUpload(resp.assets[0]);
          })}/>
        <ListButton buttonText={t('settings.about')} type={'info'} onPress={() => navigation.navigate('About')}/>
        <LogoutButton onPress={(): Promise<void> => authContext.actions.logout()}>
          <LogoutText>{t('settings.logout')}</LogoutText>
        </LogoutButton>
      </Body>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={(): void => setModalVisible(false)}
        statusBarTranslucent={true}
      >
        <ModalView activeOpacity={1} onPress={() => setModalVisible(false)}>
          <ModalImageView activeOpacity={1}>
            <ModalImage source={{ uri: newAvatar }}/>
          </ModalImageView>
          <Button title={t('settings.confirm')} onPress={() => {
            updateAvatar({
              variables: { avatar: newAvatar },
              onError: () => Alert.alert(t('errors.unspecific')),
            });
            setModalVisible(false);
            navigation.navigate('Main');
          }}/>
        </ModalView>
      </Modal>
    </Wrapper>
  );
}
