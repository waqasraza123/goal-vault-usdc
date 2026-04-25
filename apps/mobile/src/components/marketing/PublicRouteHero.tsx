import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { useAdaptiveLayout } from "../../hooks/useAdaptiveLayout";
import { useI18n } from "../../lib/i18n";
import { colors, createShadowStyle, radii, spacing } from "../../theme";
import { AppHeading, AppText, MotionView, PrimaryButton, SecondaryButton, SurfaceCard } from "../primitives";

export interface PublicRouteHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  primaryActionLabel: string;
  onPrimaryAction: () => void;
  secondaryActionLabel: string;
  onSecondaryAction: () => void;
  insightEyebrow: string;
  insightTitle: string;
  insightPoints: string[];
}

export const PublicRouteHero = ({
  eyebrow,
  title,
  description,
  highlights,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  insightEyebrow,
  insightTitle,
  insightPoints,
}: PublicRouteHeroProps) => {
  const adaptiveLayout = useAdaptiveLayout();
  const { inlineDirection } = useI18n();

  return (
    <View
      style={{
        flexDirection: adaptiveLayout.useSplitLayout ? "row" : "column",
        alignItems: "stretch",
        gap: spacing[6],
      }}
    >
      <MotionView intensity="emphasis" preset="hero" style={{ flex: 1, gap: spacing[5] }}>
        <View
          style={{
            alignSelf: "flex-start",
            borderRadius: radii.pill,
            borderWidth: 1,
            borderColor: colors.borderStrong,
            backgroundColor: colors.accentSoft,
            paddingHorizontal: spacing[3],
            paddingVertical: spacing[2],
          }}
        >
          <AppText size="sm" tone="accent" weight="semibold">
            {eyebrow}
          </AppText>
        </View>
        <View style={{ gap: spacing[3] }}>
          <AppHeading size={adaptiveLayout.isCompact ? "xl" : "display"}>{title}</AppHeading>
          <AppText size="lg" tone="secondary">
            {description}
          </AppText>
        </View>
        <View style={{ flexDirection: inlineDirection(), flexWrap: "wrap", gap: spacing[2] }}>
          {highlights.map((item) => (
            <View
              key={item}
              style={{
                borderRadius: radii.pill,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surfaceGlass,
                paddingHorizontal: spacing[3],
                paddingVertical: spacing[2],
              }}
            >
              <AppText size="sm" tone="secondary" weight="semibold">
                {item}
              </AppText>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: inlineDirection(), flexWrap: "wrap", gap: spacing[3] }}>
          <PrimaryButton icon="plus" label={primaryActionLabel} onPress={onPrimaryAction} />
          <SecondaryButton icon="arrow-top-right" label={secondaryActionLabel} onPress={onSecondaryAction} />
        </View>
      </MotionView>

      <MotionView delay={160} intensity="emphasis" style={{ flex: 1 }}>
        <SurfaceCard tone="accent" style={{ backgroundColor: colors.backgroundElevated, minHeight: 420 }}>
          <View
            style={{
              alignSelf: "flex-start",
              borderRadius: radii.pill,
              backgroundColor: colors.accentSoft,
              paddingHorizontal: spacing[3],
              paddingVertical: spacing[2],
            }}
          >
            <AppText size="sm" tone="accent" weight="semibold">
              {insightEyebrow}
            </AppText>
          </View>
          <AppHeading size="lg">{insightTitle}</AppHeading>
          <View style={{ gap: spacing[3] }}>
            {insightPoints.map((item, index) => (
              <View
                key={item}
                style={{
                  flexDirection: inlineDirection(),
                  alignItems: "flex-start",
                  gap: spacing[3],
                  borderRadius: radii.lg,
                  borderWidth: 1,
                  borderColor: colors.borderStrong,
                  backgroundColor: index % 2 === 0 ? colors.surfaceGlass : colors.surfaceMuted,
                  padding: spacing[4],
                  ...createShadowStyle({
                    color: colors.overlayStrong,
                    opacity: 0.1,
                    radius: 18,
                    offsetY: 10,
                    elevation: 2,
                  }),
                  elevation: 2,
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.accentSoft,
                  }}
                >
                  <MaterialCommunityIcons color={colors.accentStrong} name="check-bold" size={16} />
                </View>
                <View style={{ flex: 1, gap: spacing[1] }}>
                  <AppText size="sm" tone="muted" weight="semibold">
                    {index + 1}
                  </AppText>
                  <AppText tone="secondary">{item}</AppText>
                </View>
              </View>
            ))}
          </View>
        </SurfaceCard>
      </MotionView>
    </View>
  );
};
