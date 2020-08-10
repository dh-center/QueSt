import React, {Component} from 'react';
import QuestList from './QuestList';
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

export default class AppScreens extends Component {
  state = {
    index: 1,
  };

  switchScreen(index: number) {
    this.setState({index: index});
  }

  render() {
    let ScreenContent: React.ComponentType | null = null;
    let header = null;

    if (this.state.index === 0) {
      header = 'Квесты';
      ScreenContent = QuestList;
    }

    if (this.state.index === 1) {
      header = 'Карта';
      ScreenContent = MapList;
    }

    if (this.state.index === 2) {
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
            <Button
              vertical
              active={this.state.index === 0}
              onPress={() => {
                this.switchScreen(0);
              }}>
              <Icon type="FontAwesome5" name="route" />
              <Text>Квесты</Text>
            </Button>
            <Button
              vertical
              active={this.state.index === 1}
              onPress={() => {
                this.switchScreen(1);
              }}>
              <Icon type="FontAwesome5" name="map-marked-alt" />
              <Text>Карта</Text>
            </Button>
            <Button
              vertical
              active={this.state.index === 2}
              onPress={() => {
                this.switchScreen(2);
              }}>
              <Icon type="FontAwesome5" name="user" />
              <Text>Профиль</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
