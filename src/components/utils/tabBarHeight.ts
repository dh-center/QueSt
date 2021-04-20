import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 *
 */
export default function TabBarHeight(): number {
  const insets = useSafeAreaInsets();
  const TAB_BAR_OWM_HEIGHT = 78;

  return insets.bottom + TAB_BAR_OWM_HEIGHT;
}
