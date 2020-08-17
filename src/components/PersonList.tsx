import React from 'react';
import {Container, Content, Text} from 'native-base';

/**
 * function to display person's page
 */
export default function PersonList(): React.ReactElement {
  return (
    <Container>
      <Content padder>
        <Text>Страничка пользователя</Text>
      </Content>
    </Container>
  );
}
