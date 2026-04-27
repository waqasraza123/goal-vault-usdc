import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { useAdaptiveLayout } from "../../hooks/useAdaptiveLayout";
import { useI18n } from "../../lib/i18n";
import { getSecurityPageModel } from "../../lib/public/marketing-content";
import { colors, radii, spacing } from "../../theme";
import { AppHeading, AppText, MotionView, SectionContainer, SurfaceCard } from "../primitives";

export const SecurityDisclosureSection = () => {
  const adaptiveLayout = useAdaptiveLayout();
  const { inlineDirection, locale, messages } = useI18n();
  const model = getSecurityPageModel(locale);

  return (
    <SectionContainer
      header={
        <MotionView style={{ gap: spacing[2] }}>
          <AppText size="sm" tone="accent" weight="semibold">
            {messages.landing.securityEyebrow}
          </AppText>
          <AppHeading size="xl">{messages.pages.security.title}</AppHeading>
          <AppText tone="secondary">{messages.pages.security.description}</AppText>
        </MotionView>
      }
    >
      <View style={{ flexDirection: adaptiveLayout.useSplitLayout ? "row" : "column", gap: spacing[4] }}>
        {model.insightPoints.slice(0, 2).map((item, index) => (
          <SurfaceCard
            key={item}
            accentColor={index === 0 ? colors.positive : colors.accentStrong}
            tone={index === 0 ? "accent" : "default"}
            level="floating"
            style={{ flex: 1, backgroundColor: index === 0 ? colors.backgroundElevated : colors.surfaceGlass, padding: spacing[5] }}
          >
            <View style={{ flexDirection: inlineDirection(), alignItems: "flex-start", gap: spacing[3] }}>
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: radii.md,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: index === 0 ? colors.positiveSoft : colors.accentSoft,
                  borderWidth: 1,
                  borderColor: index === 0 ? colors.positive : colors.borderStrong,
                }}
              >
                <MaterialCommunityIcons
                  color={index === 0 ? colors.positive : colors.accentStrong}
                  name={index === 0 ? "shield-check-outline" : "database-lock-outline"}
                  size={22}
                />
              </View>
              <AppText style={{ flex: 1 }} tone="secondary">{item}</AppText>
            </View>
          </SurfaceCard>
        ))}
      </View>
      <SurfaceCard accentColor={colors.warning} tone="muted" style={{ backgroundColor: colors.surfaceMuted, padding: spacing[5] }}>
        <View style={{ gap: spacing[3] }}>
          <View style={{ flexDirection: inlineDirection(), alignItems: "flex-start", gap: spacing[3] }}>
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: radii.md,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.warningSoft,
                borderWidth: 1,
                borderColor: colors.warning,
              }}
            >
              <MaterialCommunityIcons color={colors.warning} name="alert-circle-outline" size={22} />
            </View>
            <View style={{ flex: 1, gap: spacing[1] }}>
              <AppText size="sm" tone="accent" weight="semibold">
                {messages.landing.securitySummaryTitle}
              </AppText>
              <AppText tone="secondary">{messages.landing.securitySummaryDescription}</AppText>
            </View>
          </View>
          <View style={{ gap: spacing[3] }}>
            {model.insightPoints.slice(2).map((item) => (
              <View key={item} style={{ flexDirection: inlineDirection(), alignItems: "flex-start", gap: spacing[3] }}>
                <MaterialCommunityIcons color={colors.warning} name="minus-circle-outline" size={18} />
                <AppText style={{ flex: 1 }} tone="secondary">
                  {item}
                </AppText>
              </View>
            ))}
          </View>
        </View>
      </SurfaceCard>
    </SectionContainer>
  );
};
