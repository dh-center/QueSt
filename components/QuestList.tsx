import React, {Component} from 'react';
import {Container, Content, Text} from 'native-base';

export default class QuestList extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <Text>Список квестов</Text>
        </Content>
      </Container>
    );
  }
}
