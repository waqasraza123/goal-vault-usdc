import type { ComponentProps } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { useAdaptiveLayout } from "../../hooks/useAdaptiveLayout";
import { useI18n } from "../../lib/i18n";
import { getLandingPageModel } from "../../lib/public/marketing-content";
import { getStaggerDelay } from "../../lib/motion/list-motion";
import { colors, radii, spacing } from "../../theme";
import { AppHeading, AppText, MotionView, SectionContainer, SurfaceCard } from "../primitives";

export const RuleProtectionSection = () => {
  const adaptiveLayout = useAdaptiveLayout();
  const { locale, messages } = useI18n();
  const model = getLandingPageModel(locale);

  return (
    <SectionContainer
      header={
        <MotionView style={{ gap: spacing[2] }}>
          <AppText size="sm" tone="accent" weight="semibold">
            {messages.landing.rulesEyebrow}
          </AppText>
          <AppHeading size="xl">{messages.landing.rulesTitle}</AppHeading>
          <AppText tone="secondary">{messages.landing.rulesDescription}</AppText>
        </MotionView>
      }
    >
      <View style={{ flexDirection: adaptiveLayout.useSplitLayout ? "row" : "column", gap: spacing[4] }}>
        {model.ruleCards.map((card, index) => (
          <MotionView key={card.title} delay={getStaggerDelay(index)} style={{ flex: 1 }}>
            <SurfaceCard style={{ flex: 1, backgroundColor: index === 2 ? colors.backgroundElevated : colors.surfaceGlass }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: spacing[3],
                }}
              >
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
                    {card.eyebrow}
                  </AppText>
                </View>
                <MaterialCommunityIcons
                  color={colors.accentStrong}
                  name={card.icon as ComponentProps<typeof MaterialCommunityIcons>["name"]}
                  size={22}
                />
              </View>
              <View style={{ gap: spacing[2] }}>
                <AppHeading size="md">{card.title}</AppHeading>
                <AppText tone="secondary">{card.description}</AppText>
              </View>
            </SurfaceCard>
          </MotionView>
        ))}
      </View>
    </SectionContainer>
  );
};
