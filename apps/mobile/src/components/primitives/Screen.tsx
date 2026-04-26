import type { PropsWithChildren, ReactNode } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useBreakpoint } from "../../hooks/useBreakpoint";
import { colors } from "../../theme";

export interface ScreenProps {
  scroll?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  edges?: ("top" | "right" | "bottom" | "left")[];
  keyboardShouldPersistTaps?: ScrollViewProps["keyboardShouldPersistTaps"];
}

export const Screen = ({
  children,
  scroll = true,
  header,
  footer,
  contentContainerStyle,
  edges = ["top", "left", "right"],
  keyboardShouldPersistTaps = "handled",
}: PropsWithChildren<ScreenProps>) => {
  const breakpoint = useBreakpoint();
  const content = scroll ? (
    <ScrollView
      contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[{ flex: 1 }, contentContainerStyle]}>{children}</View>
  );

  return (
    <SafeAreaView edges={edges} style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1 }}>
        <View style={[StyleSheet.absoluteFillObject, { pointerEvents: "none" }]}>
          {breakpoint.isCompact ? null : (
            <>
              <View
                style={{
                  position: "absolute",
                  top: -112,
                  right: -64,
                  width: 320,
                  height: 320,
                  borderRadius: 160,
                  backgroundColor: colors.heroGlowPrimary,
                  opacity: 0.34,
                }}
              />
              <View
                style={{
                  position: "absolute",
                  top: 180,
                  left: -96,
                  width: 220,
                  height: 220,
                  borderRadius: 110,
                  backgroundColor: colors.heroGlowSecondary,
                  opacity: 0.26,
                }}
              />
              <View
                style={{
                  position: "absolute",
                  top: "42%",
                  right: "10%",
                  width: 168,
                  height: 168,
                  borderRadius: 84,
                  backgroundColor: colors.accentGlow,
                  opacity: 0.2,
                }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: -64,
                  right: 8,
                  width: 260,
                  height: 260,
                  borderRadius: 130,
                  backgroundColor: colors.canvasGlow,
                  opacity: 0.48,
                }}
              />
            </>
          )}
        </View>
        {header}
        {content}
        {footer}
      </View>
    </SafeAreaView>
  );
};
