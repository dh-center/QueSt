import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components/native';
import Colors from '../../styles/colors';
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';

/**
 * Styled SafeAreaView component
 */
const Body = styled(View)`
  background-color: ${Colors.Background};
  flex: 1;
`;

/**
 * SafeAreaView component for using without ScrollView
 */
const BodyWithoutScrollView = styled(Body)`
  padding: 74px 15px 75px;
  align-items: center;
`;

/**
 * Styled ScrollView component
 */
const CustomScrollView = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
    paddingTop: 74,
    paddingHorizontal: 15,
    paddingBottom: 75,
  },
}))``;

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
}

/**
 * Wrapper for screens with SafeAreaView and ScrollView components and styles for them
 *
 * @param props - props of component
 */
export default function ScreenWrapper(props: ScreenWrapperProps): ReactElement {
  if (props.scrollable) {
    return (
      <Body style={props.style}>
        <CustomScrollView>
          { props.children }
        </CustomScrollView>
      </Body>
    );
  } else {
    return (
      <BodyWithoutScrollView style={props.style}>
        { props.children }
      </BodyWithoutScrollView>
    );
  }
}
