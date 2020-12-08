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
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#E0E0E0',
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#414366',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  cardImage: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
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
export default function CollectionCard(props: CollectionCardProps): React.ReactElement {
  return (
    <View style={styles.card}>
      <Image source={props.imgSource} style={styles.cardImage}/>
      <Text style={styles.cardText}>{props.text}</Text>
    </View>
  );
}