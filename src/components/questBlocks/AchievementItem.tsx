import React from 'react';
import { StyledFonts } from '../../styles/textStyles';
import styled from 'styled-components/native';
import StarsRow from '../../images/stars.svg';
import Colors from '../../styles/colors';

const Stars = styled(StarsRow)`
  margin: 30px 0 10px;
`;

const AchievementText = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 22px;
  color: ${Colors.White};
`;

/**
 * Props for AchievementItem component
 */
export interface AchievementProps {
  /**
   * Text for display
   */
  text: string;
}

/**
 * Component of the achievement
 *
 * @param props - component props
 */
export default function AchievementItem(props: AchievementProps): React.ReactElement {
  return (
    <>
      <Stars/>
      <AchievementText>{props.text}</AchievementText>
    </>
  );
}
