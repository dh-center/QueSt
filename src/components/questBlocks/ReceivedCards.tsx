import React from 'react';
import CollectionCard from '../CollectionCard';
import styled from 'styled-components/native';
import { StyledFonts } from '../../styles/textStyles';
import Colors from '../../styles/colors';
import { useTranslation } from 'react-i18next';

const Title = styled.Text`
  ${StyledFonts.roboto};
  font-size: 28px;
  line-height: 28px;
  margin-top: 30px;
  color: ${Colors.White};
`;

const CardsView = styled.View`
  margin: 30px -4.5px 0;
  flex-direction: row;
  justify-content: space-between;
`;

/**
 * Component for displaying received collection cards
 */
export default function ReceivedCards(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <>
      <Title>{t('quests.received')}</Title>
      <CardsView>
        <CollectionCard imgSource={require('../../images/Dostoevsky.png')} text={'Федор\nДостоевский'} isReceived/>
        <CollectionCard imgSource={require('../../images/Belinsky.png')} text={'Виссарион\nБелинский'} isReceived/>
      </CardsView>
    </>
  );
}
