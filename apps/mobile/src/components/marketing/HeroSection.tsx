import { View } from "react-native";
import type { ComponentProps } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useAdaptiveLayout } from "../../hooks/useAdaptiveLayout";
import { useI18n } from "../../lib/i18n";
import { getLandingPageModel } from "../../lib/public/marketing-content";
import { colors, createShadowStyle, radii, spacing } from "../../theme";
import { AppHeading, AppText, MotionView, PrimaryButton, SecondaryButton, SectionContainer } from "../primitives";
import { HeroVaultPreviewCard } from "./HeroVaultPreviewCard";

export const HeroSection = ({
  onCreateVault,
  onEnterVaults,
  onReviewSecurity,
}: {
  onCreateVault: () => void;
  onEnterVaults: () => void;
  onReviewSecurity: () => void;
}) => {
  const adaptiveLayout = useAdaptiveLayout();
  const { inlineDirection, locale, messages } = useI18n();
  const model = getLandingPageModel(locale);

  return (
    <SectionContainer
      style={{
        flexDirection: adaptiveLayout.useSplitLayout ? "row" : "column",
        alignItems: adaptiveLayout.useSplitLayout ? "stretch" : "flex-start",
        justifyContent: "space-between",
        gap: spacing[8],
      }}
    >
      <MotionView style={{ flex: 1, gap: spacing[5], paddingVertical: spacing[8] }} preset="hero" intensity="emphasis">
        <View
          style={{
            alignSelf: "flex-start",
            borderRadius: radii.pill,
            backgroundColor: colors.accentSoft,
            borderWidth: 1,
            borderColor: colors.borderStrong,
            paddingHorizontal: spacing[3],
            paddingVertical: spacing[2],
          }}
        >
          <AppText size="sm" tone="accent" weight="semibold">
            {messages.landing.heroBadge}
          </AppText>
        </View>
        <MotionView delay={70} style={{ gap: spacing[3] }}>
          <AppHeading size={adaptiveLayout.isCompact ? "xl" : "display"}>{messages.landing.heroTitle}</AppHeading>
          <AppText size="lg" tone="secondary">
            {messages.landing.heroSubtitle}
          </AppText>
        </MotionView>
        <MotionView delay={130} style={{ flexDirection: inlineDirection(), flexWrap: "wrap", gap: spacing[2] }}>
          {messages.landing.heroHighlights.map((item, index) => (
            <View
              key={item}
              style={{
                borderRadius: radii.pill,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                paddingHorizontal: spacing[3],
                paddingVertical: spacing[2],
              }}
            >
              <View style={{ flexDirection: inlineDirection(), alignItems: "center", gap: spacing[2] }}>
                <MaterialCommunityIcons
                  color={colors.accentStrong}
                  name={(model.ruleCards[index]?.icon ?? "check-circle-outline") as ComponentProps<typeof MaterialCommunityIcons>["name"]}
                  size={16}
                />
                <AppText size="sm" tone="secondary" weight="semibold">
                  {item}
                </AppText>
              </View>
            </View>
          ))}
        </MotionView>
        <MotionView
          delay={190}
          style={{
            gap: spacing[2],
            borderRadius: radii.xl,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surfaceGlass,
            padding: spacing[4],
            ...createShadowStyle({
              color: colors.overlayStrong,
              opacity: 0.08,
              radius: 18,
              offsetY: 12,
              elevation: 2,
            }),
            elevation: 2,
          }}
        >
          <AppText size="sm" tone="accent" weight="semibold">
            {messages.landing.storyEyebrow}
          </AppText>
          <AppText tone="secondary">
            {messages.landing.storyDescription}
          </AppText>
        </MotionView>
        <MotionView delay={250} style={{ flexDirection: inlineDirection(), flexWrap: "wrap", gap: spacing[3], alignItems: "center" }}>
          <PrimaryButton icon="plus" label={model.heroActions[0].label} onPress={onCreateVault} />
          <SecondaryButton icon="arrow-right" label={model.heroActions[1].label} onPress={onEnterVaults} />
          <SecondaryButton
            icon="arrow-top-right"
            label={messages.common.buttons.reviewSecurity}
            onPress={onReviewSecurity}
          />
        </MotionView>
        <MotionView delay={310} style={{ gap: spacing[3] }}>
          <AppText size="sm" tone="accent" weight="semibold">
            {messages.landing.demoPathTitle}
          </AppText>
          <View style={{ gap: spacing[2] }}>
            {messages.landing.demoPathSteps.map((step, index) => (
              <View key={step} style={{ flexDirection: inlineDirection(), alignItems: "flex-start", gap: spacing[3] }}>
                <View
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.accentSoft,
                  }}
                >
                  <AppText size="sm" tone="accent" weight="semibold">
                    {index + 1}
                  </AppText>
                </View>
                <AppText style={{ flex: 1 }} tone="secondary">
                  {step}
                </AppText>
              </View>
            ))}
          </View>
        </MotionView>
      </MotionView>
      <MotionView delay={180} intensity="emphasis" style={{ flex: 1, justifyContent: "center", paddingBottom: spacing[8] }}>
        <HeroVaultPreviewCard />
      </MotionView>
    </SectionContainer>
  );
};
