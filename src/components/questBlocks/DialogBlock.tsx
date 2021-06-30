import React from 'react';
import styled from 'styled-components/native';
import BlockBody from './BlockBody';
import Colors from '../../styles/colors';
import { DialogBlock } from '../../types/questData';

const Body = styled(BlockBody)`
  background-color: ${Colors.Background};
`;

/**
 * Props for DialogBlock
 */
interface DialogBlockProps {
  /**
   * Data for rendering dialog
   */
  data: DialogBlock;

  /**
   * Function to go to the next block
   */
  nextCallback: () => void;
}

/**
 * @param props
 */
export default function DialogBlockView(props: DialogBlockProps): React.ReactElement {
  return (
    <Body/>
  );
}
