import { StyleSheet, Text, View } from 'react-native';
import YellowCircle from '../images/yellowCircle.svg';
import React from 'react';
import textStyles from '../styles/textStyles';
import { useFragment } from 'react-relay/hooks';
import { graphql } from 'react-relay';
import { AchievementData$key } from './__generated__/AchievementData.graphql';

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
 * Props for Achievement component
 */
interface Props {
  /**
   * Data for rendering
   */
  data: AchievementData$key
}

/**
 * Component of the achievement
 *
 * @param props - component props
 */
export default function Achievement(props: Props): React.ReactElement {
  const data = useFragment(graphql`
    fragment  AchievementData on Achievement {
      id
      name
    }
  `, props.data);

  return (
    <View style={styles.achievement}>
      <YellowCircle style={styles.achievementCircle}/>
      <Text style={textStyles.default}>{data.name}</Text>
    </View>
  );
}
