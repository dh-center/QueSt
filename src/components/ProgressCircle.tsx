import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Colors from '../styles/colors';
import styled from 'styled-components/native';
import { StyledFonts } from '../styles/textStyles';
import { StyleSheet } from 'react-native';

interface ProgressCircleProps {
  /**
   * Completion percentage
   */
  percent: number;
}

const PercentText = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 14px;
  line-height: 21px;
  color: ${Colors.Black};
`;

const styles = StyleSheet.create({
  percentCircle: {
    marginRight: 17,
    marginLeft: -12,
  },
});

/**
 * Displays circle with percent of progress
 *
 * @param props - props for component rendering
 */
export default function ProgressCircle({ percent }: ProgressCircleProps): React.ReactElement {
  return (
    <AnimatedCircularProgress
      style={styles.percentCircle}
      size={35}
      width={3}
      fill={percent}
      tintColor={percent === 100 ? Colors.Green : Colors.Yellow}
      backgroundColor={'rgba(246,232,100,0.3)'}
      rotation={0}
      lineCap={'round'}
    >
      {
        (fill) => (
          <PercentText>
            {Math.round(fill)}
          </PercentText>
        )
      }
    </AnimatedCircularProgress>
  );
}
