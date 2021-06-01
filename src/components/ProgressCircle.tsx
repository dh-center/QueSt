import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Colors from '../styles/colors';
import styled from 'styled-components/native';
import { StyledFonts } from '../styles/textStyles';

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

const PercentCircle = styled(AnimatedCircularProgress)`
  margin: 0 17px 0 -12px;
`;

/**
 * Displays circle with percent of progress
 *
 * @param props - props for component rendering
 */
export default function ProgressCircle({ percent }: ProgressCircleProps): React.ReactElement {
  return (
    <PercentCircle
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
    </PercentCircle>
  );
}
