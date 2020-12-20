import styled from 'styled-components/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Animated, Pressable, Text } from 'react-native';
import React, { useRef } from 'react';

const TabButton = styled(Pressable)`
  align-items: center;
  flex: 1;
`;

interface TabBarItemProps {
  tabBarOptions: BottomTabBarProps;
  index: number;
}

/**
 * Tab bar item for main navigation bar
 *
 * @param props - props for component rendering
 */
export default function TabBarItem({ tabBarOptions, index }: TabBarItemProps): React.ReactElement {
  const route = tabBarOptions.state.routes[index];
  const { options } = tabBarOptions.descriptors[route.key];
  const isFocused = tabBarOptions.state.index === index;

  const translateYAnim = useRef(new Animated.Value(-5)).current;

  /**
   * Helper function to render the icon
   */
  const renderIcon = (): React.ReactNode => {
    const icon = options.tabBarIcon;

    if (icon === undefined) {
      return null;
    }

    const defaultIconSize = 20;

    return icon({
      focused: true,
      color: 'red',
      size: defaultIconSize,
    });
  };

  const onPress = (): void => {
    const event = tabBarOptions.navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      tabBarOptions.navigation.navigate(route.name);
    }
  };

  const onLongPress = (): void => {
    tabBarOptions.navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  React.useEffect(() => {
    if (isFocused) {
      Animated.timing(
        translateYAnim,
        {
          toValue: -10,
          useNativeDriver: false,
          duration: 100,
        }
      ).start();
    } else {
      Animated.timing(
        translateYAnim,
        {
          toValue: -5,
          useNativeDriver: false,
          duration: 100,
        }
      ).start();
    }
  }, [isFocused, translateYAnim]);

  return (
    <TabButton
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ flex: 1 }}
    >
      <Animated.View style={{
        transform: [ {
          translateY: translateYAnim,
        } ],
      }}>
        {renderIcon()}
      </Animated.View>
      <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
        {options.title}
      </Text>
    </TabButton>
  );
}
