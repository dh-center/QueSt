import styled from 'styled-components/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Animated, Pressable } from 'react-native';
import React, { useRef } from 'react';
import Colors from '../styles/colors';
import { StyledFonts } from '../styles/textStyles';

const TabButton = styled(Pressable)`
  flex: 1;
  padding-bottom: 3px;
`;

const RouteCaption = styled.Text`
  margin-top: 3px;
  ${StyledFonts.uiWebRegular};
  line-height: 18px;
  font-size: 12px;
`;

const AnimatedView = styled.View`
  align-items: center;
`;

/**
 * Props for Tab bar item
 */
interface TabBarItemProps {
  /**
   * Main tab bar props
   */
  tabBarProps: BottomTabBarProps;

  /**
   * Tab bar item index
   */
  index: number;
}

/**
 * Tab bar item for main navigation bar
 *
 * @param props - props for component rendering
 */
export default function TabBarItem({ tabBarProps, index }: TabBarItemProps): React.ReactElement {
  const route = tabBarProps.state.routes[index];
  const { options } = tabBarProps.descriptors[route.key];
  const isFocused = tabBarProps.state.index === index;

  const translateYAnim = useRef(new Animated.Value(0)).current;

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
      color: isFocused ? Colors.Blue : Colors.Gray,
      size: defaultIconSize,
    });
  };

  /**
   * On press event handler
   */
  const onPress = (): void => {
    const event = tabBarProps.navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      tabBarProps.navigation.navigate(route.name);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      Animated.timing(
        translateYAnim,
        {
          toValue: -5,
          useNativeDriver: false,
          duration: 100,
        }
      ).start();
    } else {
      Animated.timing(
        translateYAnim,
        {
          toValue: 0,
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
    >
      <AnimatedView
        as={Animated.View}
        style={{
          transform: [ {
            translateY: translateYAnim,
          } ],
        }}>
        {renderIcon()}
        <RouteCaption
          as={Animated.Text}
          style={{
            color: translateYAnim.interpolate({
              inputRange: [-5, -0],
              outputRange: [Colors.Black, Colors.Gray],
            }),
          }}
        >
          {options.title}
        </RouteCaption>
      </AnimatedView>
    </TabButton>
  );
}
