import React, {useState} from 'react';
import Quests from './Quests';
import MapList from './MapList';
import PersonList from './PersonList';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Icon,
  Text,
  Title,
} from 'native-base';

/**
 * functional component of the FooterTab and the selected screen
 */
export default function AppScreens(): React.ReactElement {
  const [index, setIndex] = useState(1);

  let ScreenContent: React.ComponentType | null = null;
  let header = null;

  if (index === 0) {
    header = 'Квесты';
    ScreenContent = Quests;
  }

  if (index === 1) {
    header = 'Карта';
    ScreenContent = MapList;
  }

  if (index === 2) {
    header = 'Профиль';
    ScreenContent = PersonList;
  }

  return (
    <Container>
      <Header>
        <Title> {header} </Title>
      </Header>
      <Content>{ScreenContent && <ScreenContent />}</Content>
      <Footer>
        <FooterTab>
          <Button vertical active={index === 0} onPress={() => setIndex(0)}>
            <Icon type="FontAwesome5" name="route" />
            <Text>Квесты</Text>
          </Button>
          <Button vertical active={index === 1} onPress={() => setIndex(1)}>
            <Icon type="FontAwesome5" name="map-marked-alt" />
            <Text>Карта</Text>
          </Button>
          <Button vertical active={index === 2} onPress={() => setIndex(2)}>
            <Icon type="FontAwesome5" name="user" />
            <Text>Профиль</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}
