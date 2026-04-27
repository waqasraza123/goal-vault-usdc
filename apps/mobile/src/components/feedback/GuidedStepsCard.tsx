import type { PropsWithChildren } from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useI18n } from "../../lib/i18n";
import { colors, createShadowStyle, radii, spacing } from "../../theme";
import { AppHeading, AppText, MotionView, SurfaceCard } from "../primitives";

export interface GuidedStepsCardProps {
  title: string;
  description: string;
  steps: string[];
  eyebrow?: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
}

export const GuidedStepsCard = ({
  children,
  title,
  description,
  steps,
  eyebrow,
  icon = "compass-outline",
}: PropsWithChildren<GuidedStepsCardProps>) => {
  const { inlineDirection } = useI18n();

  return (
    <SurfaceCard tone="muted" style={{ backgroundColor: colors.backgroundElevated, padding: spacing[5] }}>
      <View style={{ gap: spacing[4] }}>
        <View style={{ flexDirection: inlineDirection(), alignItems: "flex-start", gap: spacing[3] }}>
          <MotionView preset="scale" intensity="emphasis">
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: radii.md,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.accentSoft,
                borderWidth: 1,
                borderColor: colors.borderStrong,
                ...createShadowStyle({
                  color: colors.accentGlow,
                  opacity: 0.24,
                  radius: 18,
                  offsetY: 10,
                  elevation: 3,
                }),
                elevation: 3,
              }}
            >
              <MaterialCommunityIcons color={colors.accentStrong} name={icon} size={25} />
            </View>
          </MotionView>
          <MotionView delay={70} style={{ flex: 1, gap: spacing[2] }}>
            {eyebrow ? (
              <AppText size="sm" tone="accent" weight="semibold">
                {eyebrow}
              </AppText>
            ) : null}
            <AppHeading size="md">{title}</AppHeading>
            <AppText tone="secondary">{description}</AppText>
          </MotionView>
        </View>
        <View style={{ gap: spacing[3] }}>
          {steps.map((step, index) => (
            <MotionView
              key={step}
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
                <MaterialCommunityIcons color={colors.accentStrong} name={index === 0 ? "play" : "check"} size={15} />
              </View>
              <AppText style={{ flex: 1 }} tone="secondary">
                {step}
              </AppText>
            </MotionView>
          ))}
        </View>
        {children}
      </View>
    </SurfaceCard>
  );
};
