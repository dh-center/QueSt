import React from 'react';
import { useTranslation } from 'react-i18next';
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../navigation/profileStack';
import { useAuthContext } from '../contexts/AuthProvider';
import styled from 'styled-components/native';
import ListButton from '../components/ListButton';
import Colors from '../styles/colors';
import BlueCircle15 from '../images/blueCircle15.svg';
import Back from '../images/back.svg';
import { StyledFonts } from '../styles/textStyles';
import Avatar from '../components/Avatar';

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

/**
 * Displays settings screen
 *
 * @param props - props for component rendering
 */
export default function SettingsScreen({ route, navigation }: Props): React.ReactElement {
  const { t } = useTranslation();
  const authContext = useAuthContext();

  return (
    <Wrapper>
      <Header>
        <BlueCircle/>
        <Row>
          <BackButton onPress={(): void => navigation.goBack()}>
            <Back/>
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
        <ListButton buttonText={t('settings.password')} type={'settings'}/>
        <ListButton buttonText={t('settings.avatar')} type={'settings'}/>
        <ListButton buttonText={t('settings.about')} type={'info'} onPress={() => navigation.navigate('About')}/>
        <LogoutButton onPress={(): Promise<void> => authContext.actions.logout()}>
          <LogoutText>{t('settings.logout')}</LogoutText>
        </LogoutButton>
      </Body>
    </Wrapper>
  );
}
