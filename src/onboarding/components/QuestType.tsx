import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../styles/colors';
import { StyledFonts } from '../../styles/textStyles';

const Row = styled.View`
  flex-direction: row;
  align-self: stretch;
  margin-bottom: 40px;
  align-items: center;
`;

const IconView = styled.View`
  background-color: ${Colors.Blue};
  width: 60px;
  aspect-ratio: 1;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const TextView = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  ${StyledFonts.uiWebMedium};
  font-size: 22px;
  line-height: 22px;
  color: ${Colors.Black};
`;

const Description = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 16px;
  line-height: 19px;
  color: ${Colors.Black};
`;

interface QuestTypeProps {
  /**
   * Icon of current type
   */
  icon: React.ReactElement,

  /**
   * Name of current type
   */
  title: string,

  /**
   * Information about current type
   */
  description: string,
}

/**
 * Block with information about specific type of quests
 *
 * @param props - props for component rendering
 */
export default function QuestType({ icon, title, description }: QuestTypeProps): React.ReactElement {
  return (
    <Row>
      <IconView>{icon}</IconView>
      <TextView>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextView>
    </Row>
  );
}
