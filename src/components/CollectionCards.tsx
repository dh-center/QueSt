import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React from 'react';
import textStyles from '../styles/textStyles';
import Colors from '../styles/colors';

/**
 * Card props
 */
export interface CollectionCardProps {
  /**
   * Text on card
   */
  text: string;

  /**
   * Path to image
   */
  imgSource: ImageSourcePropType;
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 4.5,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#414366',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  cardText: {
    ...textStyles.default,
    textAlign: 'center',
    padding: 10,
  },
});

/**
 * Component of the card
 *
 * @param props - component props
 */
export default function CollectionCards(props: CollectionCardProps): React.ReactElement {
  return (
    <View style={styles.card}>
      <Image source={props.imgSource} style={styles.cardImage}/>
      <Text style={styles.cardText}>{props.text}</Text>
    </View>
  );
}
