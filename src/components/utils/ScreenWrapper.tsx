import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components/native';
import Colors from '../../styles/colors';
import { SafeAreaView, ScrollView } from 'react-native';

/**
 * Styled SafeAreaView component
 */
const SafeArea = styled(SafeAreaView)`
  background-color: ${Colors.BACKGROUND};
  flex: 1;
`;

/**
 * SafeAreaView component for using without ScrollView
 */
const SafeAreaWithoutScrollView = styled(SafeArea)`
  padding: 40px 15px 75px;
  align-items: center;
`;

/**
 * Styled ScrollView component
 */
const CustomScrollView = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40,
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
  withScrollView?: boolean;

  /**
   * Children components in wrapper
   */
  children?: ReactNode;
}

/**
 * Wrapper for screens with SafeAreaView and ScrollView components and styles for them
 *
 * @param props - props of component
 */
export default function ScreenWrapper(props: ScreenWrapperProps): ReactElement {
  if (props.withScrollView) {
    return (
      <SafeArea>
        <CustomScrollView>
          { props.children }
        </CustomScrollView>
      </SafeArea>
    );
  } else {
    return (
      <SafeAreaWithoutScrollView>
        { props.children }
      </SafeAreaWithoutScrollView>
    );
  }
}
