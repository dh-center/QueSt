import React from 'react';
import CollectionCard, { CollectionCardProps } from './CollectionCard';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

/**
 * Returns empty card
 */
export function getEmptyCard():EmptyCardData {
  return {
    data: null,
    isReceived: null,
  };
}

/**
 * Empty collection card
 */
export interface EmptyCardData {
  readonly data: null;
  readonly isReceived: null;
}

/**
 * Props for AchievementsList
 */
interface AchievementsListProps {
  /**
   * Items to render
   */
  items: (CollectionCardProps | EmptyCardData)[];

  /**
   * Ref for calling FlatList methods
   */
  ref?: React.LegacyRef<FlatList>;
}

const flatContentStyle = {
  paddingBottom: 15,
};

const flatColumnStyle = {
  paddingTop: 9,
  paddingHorizontal: 10.5,
};

const EmptyCard = styled.View`
  flex: 1;
  margin: 0 4.5px;
`;

/**
 * Displays list of collection cards
 *
 * @param props - props for component rendering
 */
export default function CollectionCardsList(props: AchievementsListProps): React.ReactElement {
  return (
    <FlatList
      scrollEnabled={false}
      ref={props.ref}
      contentContainerStyle={flatContentStyle}
      data={props.items}
      horizontal={false}
      numColumns={2}
      columnWrapperStyle={flatColumnStyle}
      renderItem={({ item }): React.ReactElement => (
        item.data === null
          ? <EmptyCard/>
          : <CollectionCard
            data={item.data}
            isReceived={item.isReceived}
          />
      )}
      keyExtractor={(item, index): string => index.toString()}
    />
  );
}
