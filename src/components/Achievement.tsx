import { StyleSheet, Text, View } from 'react-native';
import YellowCircle from '../images/yellowCircle.svg';
import React from 'react';
import textStyles from '../styles/textStyles';

const styles = StyleSheet.create({
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  achievementCircle: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});

/**
 * Component of the achievement
 *
 * @param Props
 */
export default function Achievement(Props: Record<string, string>): React.ReactElement {
  return (
    <View style={styles.achievement}>
      <YellowCircle style={styles.achievementCircle}/>
      <Text style={textStyles.default}>{Props.text}</Text>
    </View>
  );
}
