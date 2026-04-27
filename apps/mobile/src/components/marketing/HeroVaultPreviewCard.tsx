import type { ComponentProps } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { formatProgress, formatUsdc } from "../../lib/format";
import { useI18n } from "../../lib/i18n";
import { colors, createShadowStyle, radii, spacing } from "../../theme";
import { AnimatedNumberText, AppHeading, AppText, MotionView, ProgressBar, StatusChip, SurfaceCard } from "../primitives";

export const HeroVaultPreviewCard = () => {
  const { inlineDirection, messages } = useI18n();
  const savedAmount = 7450;
  const targetAmount = 12000;
  const progress = 0.62;
  const metricCards = [
    {
      label: messages.common.labels.totalSaved,
      value: savedAmount,
      formatValue: formatUsdc,
      icon: "wallet-outline",
      tone: colors.accentStrong,
      backgroundColor: colors.accentSoft,
    },
    {
      label: messages.common.labels.targetAmount,
      value: targetAmount,
      formatValue: formatUsdc,
      icon: "flag-checkered",
      tone: colors.positive,
      backgroundColor: colors.positiveSoft,
    },
  ] satisfies Array<{
    label: string;
    value: number;
    formatValue: (value: number) => string;
    icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
    tone: string;
    backgroundColor: string;
  }>;
  const guardrailCards = [
    {
      label: messages.landing.heroPreviewRuleLabel,
      value: messages.landing.heroPreviewRuleValue,
      icon: "calendar-lock-outline",
      backgroundColor: colors.accentSoft,
    },
    {
      label: messages.landing.heroPreviewStateLabel,
      value: messages.landing.heroPreviewStateValue,
      icon: "shield-check-outline",
      backgroundColor: colors.warningSoft,
    },
  ] satisfies Array<{
    label: string;
    value: string;
    icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
    backgroundColor: string;
  }>;

  return (
    <SurfaceCard
      tone="accent"
      level="floating"
      style={{ backgroundColor: colors.backgroundElevated, borderColor: colors.borderStrong, gap: spacing[5], padding: spacing[5] }}
    >
      <View style={{ flexDirection: inlineDirection(), justifyContent: "space-between", alignItems: "flex-start", gap: spacing[3] }}>
        <MotionView style={{ flex: 1, flexDirection: inlineDirection(), alignItems: "flex-start", gap: spacing[3] }} preset="rise" intensity="emphasis">
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: radii.md,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.accentSoft,
              borderWidth: 1,
              borderColor: colors.borderStrong,
            }}
          >
            <MaterialCommunityIcons color={colors.accentStrong} name="shield-lock-outline" size={24} />
          </View>
          <View style={{ flex: 1, gap: spacing[1] }}>
            <AppText size="sm" tone="accent" weight="semibold">
              {messages.landing.heroPreviewLabel}
            </AppText>
            <AppHeading size="lg">{messages.landing.heroPreviewGoal}</AppHeading>
            <AppText tone="secondary">{messages.landing.heroPreviewDescription}</AppText>
          </View>
        </MotionView>
        <StatusChip label={messages.vaults.status.active} />
      </View>

      <View
        style={{
          borderRadius: radii.lg,
          borderWidth: 1,
          borderColor: colors.accentStrong,
          backgroundColor: colors.textPrimary,
          padding: spacing[5],
          gap: spacing[4],
          overflow: "hidden",
          ...createShadowStyle({
            color: colors.accentStrong,
            opacity: 0.2,
            radius: 28,
            offsetY: 16,
            elevation: 5,
          }),
          elevation: 5,
        }}
      >
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            backgroundColor: colors.positive,
            opacity: 0.9,
          }}
        />
        <View style={{ flexDirection: inlineDirection(), justifyContent: "space-between", gap: spacing[3] }}>
          <View style={{ flex: 1, gap: spacing[1] }}>
            <AppText size="sm" style={{ color: "#bfdbfe" }} weight="semibold">
              {messages.common.labels.totalSaved}
            </AppText>
            <AppHeading size="xl" style={{ color: colors.white }}>
              {formatUsdc(savedAmount)}
            </AppHeading>
          </View>
          <View
            style={{
              alignSelf: "flex-start",
              borderRadius: radii.pill,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.2)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              paddingHorizontal: spacing[3],
              paddingVertical: spacing[2],
            }}
          >
            <AppText size="sm" style={{ color: "#d1fae5" }} weight="semibold">
              {formatProgress(progress)}
            </AppText>
          </View>
        </View>
        <View style={{ gap: spacing[2] }}>
          <ProgressBar progress={progress} height={12} />
          <AppText size="sm" style={{ color: "#cbd5e1" }}>
            {messages.common.labels.of} {formatUsdc(targetAmount)}
          </AppText>
        </View>
      </View>

      <View style={{ flexDirection: inlineDirection(), flexWrap: "wrap", gap: spacing[3] }}>
        {metricCards.map((metric) => (
          <View
            key={metric.label}
            style={{
              flex: 1,
              minWidth: 150,
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
                width: 34,
                height: 34,
                borderRadius: radii.sm,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: metric.backgroundColor,
              }}
            >
              <MaterialCommunityIcons color={metric.tone} name={metric.icon} size={18} />
            </View>
            <View style={{ gap: spacing[1] }}>
              <AppText size="sm" tone="secondary">
                {metric.label}
              </AppText>
              <AnimatedNumberText formatValue={metric.formatValue} size="xl" value={metric.value} weight="semibold" />
            </View>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: inlineDirection(), flexWrap: "wrap", gap: spacing[3] }}>
        {guardrailCards.map((guardrail) => (
          <View
            key={guardrail.label}
            style={{
              flex: 1,
              minWidth: 150,
              gap: spacing[2],
              borderRadius: radii.lg,
              borderWidth: 1,
              borderColor: colors.borderStrong,
              backgroundColor: guardrail.backgroundColor,
              padding: spacing[4],
            }}
          >
            <View style={{ flexDirection: inlineDirection(), alignItems: "center", gap: spacing[2] }}>
              <MaterialCommunityIcons color={colors.accentStrong} name={guardrail.icon} size={18} />
              <AppText size="sm" tone="secondary">
                {guardrail.label}
              </AppText>
            </View>
            <AppText weight="semibold">{guardrail.value}</AppText>
          </View>
        ))}
      </View>

      <View
        style={{
          borderRadius: radii.lg,
          borderWidth: 1,
          borderColor: colors.borderStrong,
          backgroundColor: colors.surfaceGlass,
          padding: spacing[4],
          gap: spacing[3],
        }}
      >
        <AppText size="sm" tone="accent" weight="semibold">
          {messages.landing.heroPreviewTimelineTitle}
        </AppText>
        <View style={{ gap: spacing[3] }}>
          {messages.landing.heroPreviewTimelineItems.map((item) => (
            <View key={item} style={{ flexDirection: inlineDirection(), alignItems: "flex-start", gap: spacing[3] }}>
              <MaterialCommunityIcons color={colors.positive} name="check-circle-outline" size={18} />
              <AppText style={{ flex: 1 }} tone="secondary">
                {item}
              </AppText>
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          borderRadius: radii.lg,
          borderWidth: 1,
          borderColor: colors.borderStrong,
          backgroundColor: colors.accentSoft,
          padding: spacing[4],
          gap: spacing[3],
        }}
      >
        <View style={{ flexDirection: inlineDirection(), alignItems: "center", gap: spacing[2] }}>
          <MaterialCommunityIcons color={colors.accentStrong} name="cash-lock" size={18} />
          <AppText tone="secondary">{messages.landing.heroPreviewFooter}</AppText>
        </View>
        <View style={{ flexDirection: inlineDirection(), alignItems: "center", gap: spacing[2] }}>
          <MaterialCommunityIcons color={colors.accentStrong} name="timeline-check-outline" size={18} />
          <AppText tone="secondary">{messages.landing.heroPreviewActivityFunded}</AppText>
        </View>
      </View>
    </SurfaceCard>
  );
};
