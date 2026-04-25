import type { PropsWithChildren } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

import type { ThemeSurfaceLevel } from "../../theme";
import { colors, radii, shadows, spacing } from "../../theme";

export interface SurfaceCardProps {
  style?: StyleProp<ViewStyle>;
  tone?: "default" | "muted" | "accent";
  level?: ThemeSurfaceLevel;
}

const toneStyles: Record<NonNullable<SurfaceCardProps["tone"]>, ViewStyle> = {
  default: {
    backgroundColor: colors.surfaceGlass,
    borderColor: colors.border,
  },
  muted: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
  },
  accent: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.borderStrong,
  },
};

const levelStyles: Record<ThemeSurfaceLevel, ViewStyle> = {
  canvas: {},
  muted: shadows.soft,
  elevated: shadows.medium,
  floating: shadows.floating,
};

export const SurfaceCard = ({
  children,
  style,
  tone = "default",
  level = tone === "accent" ? "floating" : "elevated",
}: PropsWithChildren<SurfaceCardProps>) => {
  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderRadius: radii.xl,
          padding: spacing[6],
          gap: spacing[4],
          overflow: "hidden",
          position: "relative",
        },
        levelStyles[level],
        toneStyles[tone],
        style,
      ]}
    >
      <View
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: -40,
          right: -24,
          width: 164,
          height: 164,
          borderRadius: 82,
          backgroundColor: tone === "accent" ? colors.heroGlowPrimary : colors.canvasGlow,
          opacity: tone === "muted" ? 0.72 : 0.92,
        }}
      />
      <View
        style={{
          pointerEvents: "none",
          position: "absolute",
          bottom: -54,
          left: -24,
          width: 152,
          height: 152,
          borderRadius: 76,
          backgroundColor: tone === "accent" ? colors.heroGlowSecondary : colors.accentSoft,
          opacity: tone === "muted" ? 0.42 : 0.54,
        }}
      />
      <View
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: colors.white,
          opacity: 0.8,
        }}
      />
      <View
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          borderRadius: radii.xl,
          borderWidth: 1,
          borderColor: colors.white,
          opacity: 0.24,
        }}
      />
      <View style={{ gap: spacing[4] }}>{children}</View>
    </View>
  );
};
