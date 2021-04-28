import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Returns bottom tabbar height
 */
export default function useTabBarHeight(): number {
  const insets = useSafeAreaInsets();
  const TAB_BAR_OWN_HEIGHT = 78;

  return insets.bottom + TAB_BAR_OWN_HEIGHT;
}
