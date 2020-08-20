import React from 'react';
import {Container, Content, Text} from 'native-base';

/**
 * functional component of the map
 */
export default function MapList(): React.ReactElement {
  return (
    <Container>
      <Content padder>
        <Text>Карта</Text>
      </Content>
    </Container>
  );
}
