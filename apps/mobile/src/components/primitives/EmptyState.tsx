import type { PropsWithChildren } from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useI18n } from "../../lib/i18n";
import { colors, createShadowStyle, radii, spacing } from "../../theme";
import { AppHeading } from "./AppHeading";
import { AppText } from "./AppText";
import { MotionView } from "./MotionView";
import { SurfaceCard } from "./SurfaceCard";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  eyebrow?: string;
  highlights?: string[];
}

export const EmptyState = ({
  children,
  title,
  description,
  icon = "bullseye-arrow",
  eyebrow,
  highlights = [],
}: PropsWithChildren<EmptyStateProps>) => {
  const { inlineDirection } = useI18n();

  return (
    <SurfaceCard tone="muted" style={{ alignItems: "flex-start", backgroundColor: colors.backgroundElevated, padding: spacing[5] }}>
      <View style={{ gap: spacing[4], width: "100%" }}>
        <MotionView preset="hero" intensity="emphasis" style={{ flexDirection: inlineDirection(), alignItems: "flex-start", gap: spacing[3] }}>
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: radii.md,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.accentSoft,
              borderWidth: 1,
              borderColor: colors.borderStrong,
              ...createShadowStyle({
                color: colors.accentGlow,
                opacity: 0.28,
                radius: 24,
                offsetY: 12,
                elevation: 4,
              }),
              elevation: 4,
            }}
          >
            <MaterialCommunityIcons color={colors.accentStrong} name={icon} size={26} />
          </View>
          <View style={{ flex: 1, gap: spacing[2] }}>
            {eyebrow ? (
              <AppText size="sm" tone="accent" weight="semibold">
                {eyebrow}
              </AppText>
            ) : null}
            <AppHeading size="md">{title}</AppHeading>
            <AppText tone="secondary">{description}</AppText>
          </View>
        </MotionView>
        {highlights.length > 0 ? (
          <View style={{ gap: spacing[3], width: "100%" }}>
            {highlights.map((highlight, index) => (
              <MotionView
                key={highlight}
                delay={120 + index * 55}
                style={{
                  flexDirection: inlineDirection(),
                  alignItems: "flex-start",
                  gap: spacing[3],
                  borderRadius: radii.lg,
                  borderWidth: 1,
                  borderColor: colors.borderStrong,
                  backgroundColor: colors.surface,
                  padding: spacing[4],
                }}
              >
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: radii.pill,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.accentSoft,
                  }}
                >
                  <MaterialCommunityIcons color={colors.accentStrong} name={index === 0 ? "plus" : "check"} size={16} />
                </View>
                <AppText size="sm" style={{ flex: 1 }} tone="secondary">
                  {highlight}
                </AppText>
              </MotionView>
            ))}
          </View>
        ) : null}
        {children}
      </View>
    </SurfaceCard>
  );
};
