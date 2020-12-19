import React from 'react';
import Colors from '../styles/colors';
import styled from 'styled-components/native';
import { StyledFonts } from '../styles/textStyles';

const LevelView = styled.View`
  margin: 0 60px 30px;
  align-self: stretch;
  align-items: center;
`;

const Level = styled.Text`
  ${StyledFonts.uiWebMedium};
  font-size: 22px;
  line-height: 22px;
  color: ${Colors.Black};
  position: absolute;
  left: 0;
  top: 0;
`;

const Progress = styled.Text`
  ${StyledFonts.uiWebMedium};
  font-size: 12px;
  line-height: 18px;
  color: ${Colors.Black};
`;

const ProgressBar = styled.View`
  width: 100%;
  height: 10px;
  margin-top: 3px;
  border-radius: 6px;
  background-color: ${Colors.Blue};
  opacity: 0.15;
`;

const ProgressFill = styled.View<{ customWidth: number }>`
  width: ${(props): number => props.customWidth}%;
  height: 10px;
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 6px;
  background-color: ${Colors.Yellow};
  elevation: ${4};
  box-shadow: 0 2px 2.62px rgba(0,0,0,0.23);
`;

/**
 * Props for ProgressBlock component
 */
export interface ProgressProps {
  /**
   * Maximum level experience
   */
  totalExp: number;

  /**
   * Current user experience
   */
  currentExp: number;
}

/**
 * Component with level and progressbar
 *
 * @param props - props for component
 */
export default function ProgressBlock({ totalExp, currentExp }: ProgressProps): React.ReactElement {
  const progress = currentExp * 100 / totalExp;

  return (
    <LevelView>
      <Progress>{currentExp}/{totalExp}</Progress>
      <Level>LV. 5</Level>
      <ProgressBar/>
      <ProgressFill customWidth={progress}/>
    </LevelView>
  );
}
