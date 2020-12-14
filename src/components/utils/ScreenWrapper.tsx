import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components/native';
import Colors from '../../styles/colors';
import { ScrollView, View } from 'react-native';

/**
 * Styled SafeAreaView component
 */
const Body = styled(View)`
  background-color: ${Colors.BACKGROUND};
  flex: 1;
`;

/**
 * SafeAreaView component for using without ScrollView
 */
const BodyWithoutScrollView = styled(Body)`
  padding: 0 15px 75px;
  align-items: center;
`;

/**
 * Styled ScrollView component
 */
const CustomScrollView = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
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
}

/**
 * Wrapper for screens with SafeAreaView and ScrollView components and styles for them
 *
 * @param props - props of component
 */
export default function ScreenWrapper(props: ScreenWrapperProps): ReactElement {
  if (props.scrollable) {
    return (
      <Body>
        <CustomScrollView>
          { props.children }
        </CustomScrollView>
      </Body>
    );
  } else {
    return (
      <BodyWithoutScrollView>
        { props.children }
      </BodyWithoutScrollView>
    );
  }
}
