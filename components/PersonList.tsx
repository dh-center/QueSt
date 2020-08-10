import React, {Component} from 'react';
import {Container, Content, Text} from 'native-base';

export default class PersonList extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <Text>Страничка пользователя</Text>
        </Content>
      </Container>
    );
  }
}
