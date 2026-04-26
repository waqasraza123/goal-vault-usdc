import type { PropsWithChildren } from "react";
import { Platform, View, type StyleProp, type ViewStyle } from "react-native";

import { useAdaptiveLayout } from "../../hooks/useAdaptiveLayout";
import { tokens } from "../../theme";

export interface PageContainerProps {
  style?: StyleProp<ViewStyle>;
  width?: "page" | "reading" | "dashboard";
}

export const PageContainer = ({
  children,
  style,
  width = "page",
}: PropsWithChildren<PageContainerProps>) => {
  const adaptiveLayout = useAdaptiveLayout();
  const horizontalPadding = adaptiveLayout.contentPadding;
  const useNaturalWebWidth = Platform.OS === "web" && adaptiveLayout.isCompact;
  const compactWebWidth = `calc(100vw - ${horizontalPadding * 2}px)` as unknown as ViewStyle["width"];

  return (
    <View
      style={[
        {
          width: useNaturalWebWidth ? compactWebWidth : "100%",
          maxWidth: tokens.maxWidth[width],
          alignSelf: "center",
          paddingHorizontal: useNaturalWebWidth ? 0 : horizontalPadding,
          ...({ boxSizing: "border-box" } as ViewStyle),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
