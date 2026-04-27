import type { PropsWithChildren } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

import type { ThemeSurfaceLevel } from "../../theme";
import { colors, radii, shadows, spacing } from "../../theme";

export interface SurfaceCardProps {
  style?: StyleProp<ViewStyle>;
  tone?: "default" | "muted" | "accent";
  level?: ThemeSurfaceLevel;
  accent?: "none" | "top" | "left";
  accentColor?: string;
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
  accent = "top",
  accentColor,
  tone = "default",
  level = tone === "accent" ? "floating" : "elevated",
}: PropsWithChildren<SurfaceCardProps>) => {
  const resolvedAccentColor = accentColor ?? (tone === "accent" ? colors.accent : colors.borderStrong);

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
      {accent !== "none" ? (
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: accent === "top" ? 0 : undefined,
            bottom: accent === "left" ? 0 : undefined,
            width: accent === "left" ? 4 : undefined,
            height: accent === "top" ? 3 : undefined,
            backgroundColor: resolvedAccentColor,
            opacity: tone === "muted" ? 0.46 : 0.72,
          }}
        />
      ) : null}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 1,
          left: 1,
          right: 1,
          height: 1,
          backgroundColor: colors.white,
          opacity: 0.72,
        }}
      />
      <View style={{ gap: spacing[4] }}>{children}</View>
    </View>
  );
};
