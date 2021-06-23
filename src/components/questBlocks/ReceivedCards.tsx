import React from 'react';
import CollectionCard from '../CollectionCard';
import styled from 'styled-components/native';
import { StyledFonts } from '../../styles/textStyles';
import Colors from '../../styles/colors';
import { useTranslation } from 'react-i18next';
import { useFragment } from 'react-relay/hooks';
import { graphql } from 'react-relay';
import { ReceivedCardsData$key } from './__generated__/ReceivedCardsData.graphql';

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
 * Props for received cards
 */
interface Props {
  /**
   * Data to render
   */
  data: ReceivedCardsData$key
}

/**
 * Component for displaying received collection cards
 *
 * @param props - props for component rendering
 */
export default function ReceivedCards(props: Props): React.ReactElement {
  const { t } = useTranslation();
  const data = useFragment(graphql`
    fragment ReceivedCardsData on Person @relay(plural: true) {
      id
      ...CollectionCardData
    }
  `, props.data);

  return (
    <>
      <Title>{t('quests.received')}</Title>
      <CardsView>
        {data.map(item => {
          return <CollectionCard key={item.id} data={item} isReceived/>;
        })}
      </CardsView>
    </>
  );
}
