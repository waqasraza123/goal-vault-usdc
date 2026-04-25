import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { useAdaptiveLayout } from "../../hooks/useAdaptiveLayout";
import { useI18n } from "../../lib/i18n";
import { getSecurityPageModel } from "../../lib/public/marketing-content";
import { colors, radii, spacing } from "../../theme";
import { AppHeading, AppText, MotionView, SectionContainer, SurfaceCard } from "../primitives";

export const SecurityDisclosureSection = () => {
  const adaptiveLayout = useAdaptiveLayout();
  const { locale, messages } = useI18n();
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
            tone={index === 0 ? "accent" : "default"}
            style={{ flex: 1, backgroundColor: index === 0 ? colors.backgroundElevated : colors.surfaceGlass }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.accentSoft,
              }}
            >
              <MaterialCommunityIcons
                color={colors.accentStrong}
                name={index === 0 ? "shield-check-outline" : "database-lock-outline"}
                size={20}
              />
            </View>
            <AppText tone="secondary">{item}</AppText>
          </SurfaceCard>
        ))}
      </View>
      <SurfaceCard tone="muted" style={{ backgroundColor: colors.surfaceMuted }}>
        <View style={{ gap: spacing[3] }}>
          <AppText size="sm" tone="accent" weight="semibold">
            {messages.landing.securitySummaryTitle}
          </AppText>
          <AppText tone="secondary">{messages.landing.securitySummaryDescription}</AppText>
          <View style={{ gap: spacing[3] }}>
            {model.insightPoints.slice(2).map((item) => (
              <View key={item} style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing[3] }}>
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
