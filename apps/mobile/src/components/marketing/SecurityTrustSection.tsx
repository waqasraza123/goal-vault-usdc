import type { ComponentProps } from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useAdaptiveLayout } from "../../hooks/useAdaptiveLayout";
import { getStaggerDelay } from "../../lib/motion/list-motion";
import { useI18n } from "../../lib/i18n";
import { colors, radii, spacing } from "../../theme";
import { AppHeading, AppText, MotionView, SectionContainer, SurfaceCard } from "../primitives";

export const SecurityTrustSection = () => {
  const adaptiveLayout = useAdaptiveLayout();
  const { messages } = useI18n();
  const principleIcons: Array<ComponentProps<typeof MaterialCommunityIcons>["name"]> = [
    "wallet-outline",
    "bank-check",
    "card-text-outline",
    "compass-outline",
  ];

  return (
    <SectionContainer
      header={
        <MotionView style={{ gap: spacing[2] }}>
          <AppText size="sm" tone="accent" weight="semibold">
            {messages.landing.securityEyebrow}
          </AppText>
          <AppHeading size="xl">{messages.landing.securityTitle}</AppHeading>
          <AppText tone="secondary">{messages.landing.securityDescription}</AppText>
        </MotionView>
      }
    >
      <MotionView
        style={{
          borderRadius: radii.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.backgroundElevated,
          padding: spacing[5],
          gap: spacing[2],
        }}
      >
        <AppText size="sm" tone="accent" weight="semibold">
          {messages.landing.securitySummaryTitle}
        </AppText>
        <AppText tone="secondary">
          {messages.landing.securitySummaryDescription}
        </AppText>
      </MotionView>
      <View style={{ flexDirection: adaptiveLayout.useSplitLayout ? "row" : "column", gap: spacing[4] }}>
        {messages.landing.securityPrinciples.map((item, index) => (
          <MotionView key={item.title} delay={getStaggerDelay(index)} style={{ flex: 1 }}>
            <SurfaceCard style={{ flex: 1, backgroundColor: index === 1 ? colors.backgroundElevated : colors.surfaceGlass }}>
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
                <MaterialCommunityIcons color={colors.accentStrong} name={principleIcons[index] ?? "shield-check-outline"} size={20} />
              </View>
              <AppHeading size="md">{item.title}</AppHeading>
              <AppText tone="secondary">{item.description}</AppText>
            </SurfaceCard>
          </MotionView>
        ))}
      </View>
    </SectionContainer>
  );
};
