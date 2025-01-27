import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import TabBarItem from './TabBarItem';

const TabBarContainer = styled.SafeAreaView<{height: string | number}>`
  position: absolute;
  flex-direction: row;
  align-items: flex-end;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: white;
  bottom: 0;
  right: 0;
  left: 0;
  height: ${p => p.height}px;
  elevation: ${8};
  box-shadow: 0 4px 4.65px rgba(0,0,0,0.2);
`;

/**
 * Main navigation tab bar
 *
 * @param props - props for component rendering
 */
export default function TabBar({ state, descriptors, navigation, style }: BottomTabBarProps): React.ReactElement | null {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  let height = '78';

  if (style && 'height' in style && style.height) {
    height = style.height.toString();
  }

  return (
    <TabBarContainer height={height}>
      {state.routes.map((route, index) => {
        return (
          <TabBarItem
            tabBarProps={{
              state,
              descriptors,
              navigation,
            }}
            index={index}
            key={index}
          />
        );
      })}
    </TabBarContainer>
  );
}
