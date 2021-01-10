import React, { PropsWithChildren } from 'react';
import styled from 'styled-components/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StyleProp, ViewStyle } from 'react-native';

const Body = styled.View<{tabBarHeight: number}>`
  flex: 1;
  padding-bottom: ${p => p.tabBarHeight}px;
`;

/**
 * @param props
 */
export default function BlockBody(props: PropsWithChildren<{style?: StyleProp<ViewStyle>}>): React.ReactElement {
  const tabBarHeight = useBottomTabBarHeight();

  return <Body tabBarHeight={tabBarHeight} style={props.style}>{props.children}</Body>;
}
