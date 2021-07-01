import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components/native';
import Colors from '../../styles/colors';
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import useTabBarHeight from './useTabBarHeight';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
const BodyWithoutScrollView = styled(Body)<{bottomOffset: number}>`
  padding: 74px 15px ${props => props.bottomOffset}px;
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
}))<{bottomOffset: number}>`
  margin-bottom: ${props => props.bottomOffset}px;
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
   * If screen renders without tab bar menu
   */
  withoutTabBar?: boolean
}

/**
 * Wrapper for screens with SafeAreaView and ScrollView components and styles for them
 *
 * @param props - props of component
 */
export default function ScreenWrapper(props: ScreenWrapperProps): ReactElement {
  const tabBarHeight = useTabBarHeight();
  const insets = useSafeAreaInsets();

  const bottomOffset = props.withoutTabBar ? insets.bottom : tabBarHeight;

  if (props.scrollable) {
    return (
      <Body style={props.style}>
        <CustomScrollView bottomOffset={bottomOffset}>
          { props.children }
        </CustomScrollView>
      </Body>
    );
  } else {
    return (
      <BodyWithoutScrollView style={props.style} bottomOffset={bottomOffset}>
        { props.children }
      </BodyWithoutScrollView>
    );
  }
}
