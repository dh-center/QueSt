import React from 'react';
import { StyledFonts } from '../../styles/textStyles';
import Colors from '../../styles/colors';
import styled from 'styled-components/native';
import { View } from 'react-native';

const Title = styled.Text`
  ${StyledFonts.roboto};
  font-size: 28px;
  line-height: 28px;
  color: ${Colors.Black};
  margin: 20px 0 15px;
  align-self: stretch;
`;

const Description = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 22px;
  line-height: 22px;
  color: ${Colors.Black};
  align-self: stretch;
`;

interface ScreenInfoProps {
  /**
   * Title
   */
  title: string,

  /**
   * Information
   */
  description: string,
}

/**
 * Block with main information on screen
 *
 * @param props - props for component rendering
 */
export default function ScreenInfo({ title, description }: ScreenInfoProps): React.ReactElement {
  return (
    <View>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </View>
  );
}
