import type { ComponentProps } from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useAdaptiveLayout } from "../../hooks/useAdaptiveLayout";
import { getStaggerDelay } from "../../lib/motion/list-motion";
import { useI18n } from "../../lib/i18n";
import { colors, radii, spacing } from "../../theme";
import { AppHeading, AppText, MotionView, SectionContainer, SurfaceCard } from "../primitives";

export const HowItWorksSection = () => {
  const adaptiveLayout = useAdaptiveLayout();
  const { messages } = useI18n();
  const stepIcons: Array<ComponentProps<typeof MaterialCommunityIcons>["name"]> = [
    "bullseye-arrow",
    "shield-lock-outline",
    "cash-plus",
    "check-decagram-outline",
  ];

  return (
    <SectionContainer
      header={
        <MotionView style={{ gap: spacing[2] }}>
          <AppText size="sm" tone="accent" weight="semibold">
            {messages.landing.howItWorksEyebrow}
          </AppText>
          <AppHeading size="xl">{messages.landing.howItWorksTitle}</AppHeading>
          <AppText tone="secondary">{messages.landing.howItWorksDescription}</AppText>
        </MotionView>
      }
    >
      <View
        style={{
          flexDirection: adaptiveLayout.useSplitLayout ? "row" : "column",
          gap: spacing[4],
        }}
      >
        {messages.landing.howItWorksSteps.map((step, index) => (
          <MotionView key={step.title} delay={getStaggerDelay(index)} style={{ flex: 1 }}>
            <SurfaceCard style={{ flex: 1, backgroundColor: index % 2 === 0 ? colors.surfaceGlass : colors.backgroundElevated }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing[3] }}>
                <View
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.accentSoft,
                  }}
                >
                  <MaterialCommunityIcons color={colors.accentStrong} name={stepIcons[index] ?? "check-circle-outline"} size={20} />
                </View>
                <View
                  style={{
                    borderRadius: radii.pill,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingHorizontal: spacing[3],
                    paddingVertical: spacing[2],
                  }}
                >
                  <AppText size="sm" tone="muted" weight="semibold">
                    {messages.landing.howItWorksSupport[index]}
                  </AppText>
                </View>
              </View>
              <View style={{ gap: spacing[2] }}>
                <AppText size="sm" tone="accent" weight="semibold">
                  {index + 1}
                </AppText>
                <AppHeading size="md">{step.title}</AppHeading>
                <AppText tone="secondary">{step.description}</AppText>
              </View>
            </SurfaceCard>
          </MotionView>
        ))}
      </View>
    </SectionContainer>
  );
};
