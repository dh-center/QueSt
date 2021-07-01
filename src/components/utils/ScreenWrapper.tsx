import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components/native';
import Colors from '../../styles/colors';
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import useTabBarHeight from './useTabBarHeight';

/**
 * Styled SafeAreaView component
 */
const Body = styled(View)`
  background-color: ${Colors.Background};
  flex: 1;
`;

/**
 * SafeAreaView component for using without ScrollView
 *
 * @param props
 */
const BodyWithoutScrollView = styled(Body)<{tabBarHeight: number}>`
  padding: 74px 15px ${props => props.tabBarHeight}px;
  align-items: center;
`;

/**
 * Styled ScrollView component
 *
 * @param props
 */
const CustomScrollView = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
    paddingTop: 74,
    paddingHorizontal: 15,
  },
}))<{tabBarHeight: number}>`
  margin-bottom: ${props => props.tabBarHeight}px;
`;

/**
 * Props of ScreenWrapper component
 */
interface ScreenWrapperProps {
  /**
   * Is screen wrapper with scroll
   */
  scrollable?: boolean;

  /**
   * Children components in wrapper
   */
  children?: ReactNode;

  /**
   * Custom styles
   */
  style?: StyleProp<ViewStyle>

  /**
   * Add margins for tab bar or no
   */
  noTabBar?: boolean;
}

/**
 * Wrapper for screens with SafeAreaView and ScrollView components and styles for them
 *
 * @param props - props of component
 */
export default function ScreenWrapper(props: ScreenWrapperProps): ReactElement {
  const tabBarHeight = useTabBarHeight();

  if (props.scrollable) {
    return (
      <Body style={props.style}>
        <CustomScrollView tabBarHeight={props.noTabBar ? 0 : tabBarHeight }>
          { props.children }
        </CustomScrollView>
      </Body>
    );
  } else {
    return (
      <BodyWithoutScrollView style={props.style} tabBarHeight={tabBarHeight}>
        { props.children }
      </BodyWithoutScrollView>
    );
  }
}
