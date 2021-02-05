import React, { PropsWithChildren } from 'react';
import styled from 'styled-components/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ViewStyle } from 'react-native';
import WithStyles from '../../types/withStyles';

const Body = styled.View<{tabBarHeight: number}>`
  flex: 1;
  padding-bottom: ${p => p.tabBarHeight}px;
`;

/**
 * Common wrapper for all quest blocks
 *
 * @param props - props for component rendering
 */
export default function BlockBody(props: PropsWithChildren<WithStyles<ViewStyle>>): React.ReactElement {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <Body
      tabBarHeight={tabBarHeight}
      style={props.style}
    >
      {props.children}
    </Body>
  );
}