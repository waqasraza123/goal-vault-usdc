import type { ComponentProps } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { formatLongDate, formatUsdc } from "../../lib/format";
import { getVaultAccentThemeLabel, getVaultAccentTone } from "../../lib/contracts/mappers";
import { interpolate, useI18n } from "../../lib/i18n";
import { colors, createShadowStyle, radii, spacing } from "../../theme";
import type { CreateVaultInput } from "../../types";
import { AnimatedNumberText, AppHeading, AppText, MotionView, ProgressBar, SurfaceCard } from "../primitives";

export interface CreateVaultPreviewCardProps {
  values: CreateVaultInput;
  targetAmount: number;
}

export const CreateVaultPreviewCard = ({ values, targetAmount }: CreateVaultPreviewCardProps) => {
  const { inlineDirection, messages } = useI18n();
  const accentTone = getVaultAccentTone(values.accentTheme);
  const protectionLabel =
    values.ruleType === "timeLock"
      ? values.unlockDate
        ? interpolate(messages.vaults.protectionRuleUnlocksOn, { date: formatLongDate(values.unlockDate) })
        : messages.pages.createVault.preview.chooseUnlockDate
      : values.ruleType === "cooldownUnlock"
        ? `${values.cooldownDays || "7"} day cooldown`
        : values.guardianAddress || "Guardian approval";
  const ruleIcon = (
    values.ruleType === "timeLock"
      ? "calendar-lock-outline"
      : values.ruleType === "cooldownUnlock"
        ? "timer-sand"
        : "account-supervisor-circle-outline"
  ) satisfies ComponentProps<typeof MaterialCommunityIcons>["name"];
  const metrics = [
    {
      label: messages.common.labels.targetAmount,
      value: formatUsdc(targetAmount || 0),
      icon: "flag-checkered",
      backgroundColor: colors.accentSoft,
      iconColor: colors.accentStrong,
    },
    {
      label: messages.common.labels.protectionRule,
      value: protectionLabel,
      icon: ruleIcon,
      backgroundColor: colors.warningSoft,
      iconColor: colors.warning,
    },
  ] satisfies Array<{
    label: string;
    value: string;
    icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
    backgroundColor: string;
    iconColor: string;
  }>;

  return (
    <SurfaceCard
      accentColor={accentTone}
      tone="accent"
      level="floating"
      style={{ borderColor: accentTone, backgroundColor: colors.backgroundElevated, padding: spacing[5] }}
    >
      <View style={{ gap: spacing[4] }}>
        <MotionView style={{ flexDirection: inlineDirection(), alignItems: "flex-start", gap: spacing[3] }}>
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
            <MaterialCommunityIcons color={accentTone} name="shield-lock-outline" size={24} />
          </View>
          <View style={{ flex: 1, gap: spacing[1] }}>
            <AppText size="sm" tone="accent" weight="semibold">
              {messages.common.labels.livePreview}
            </AppText>
            <AppHeading size="lg">{values.goalName || messages.pages.createVault.preview.emptyGoal}</AppHeading>
            <AppText tone="secondary">{values.note || messages.pages.createVault.preview.emptyNote}</AppText>
            {values.category ? <AppText tone="secondary">{values.category}</AppText> : null}
          </View>
        </MotionView>

        <View
          style={{
            borderRadius: radii.lg,
            borderWidth: 1,
            borderColor: accentTone,
            backgroundColor: colors.textPrimary,
            padding: spacing[5],
            gap: spacing[4],
            overflow: "hidden",
            ...createShadowStyle({
              color: accentTone,
              opacity: 0.18,
              radius: 26,
              offsetY: 14,
              elevation: 5,
            }),
            elevation: 5,
          }}
        >
          <View pointerEvents="none" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: accentTone }} />
          <View style={{ gap: spacing[1] }}>
            <AppText size="sm" style={{ color: "#bfdbfe" }} weight="semibold">
              {messages.common.labels.targetAmount}
            </AppText>
            <AnimatedNumberText formatValue={formatUsdc} size="xl" style={{ color: colors.white }} value={targetAmount || 0} weight="semibold" />
            <AppText style={{ color: "#cbd5e1" }}>{protectionLabel}</AppText>
          </View>
          <ProgressBar progress={targetAmount > 0 ? 0.18 : 0} height={12} />
        </View>

        <View style={{ flexDirection: inlineDirection(), flexWrap: "wrap", gap: spacing[3] }}>
          {metrics.map((metric) => (
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
                <MaterialCommunityIcons color={metric.iconColor} name={metric.icon} size={18} />
              </View>
              <View style={{ gap: spacing[1] }}>
                <AppText size="sm" tone="secondary">
                  {metric.label}
                </AppText>
                <AppText weight="semibold">{metric.value}</AppText>
              </View>
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
          <View style={{ flexDirection: inlineDirection(), alignItems: "center", gap: spacing[2] }}>
            <MaterialCommunityIcons color={colors.accentStrong} name="cube-send" size={18} />
            <AppText tone="secondary">{messages.pages.createVault.preview.networkSummary}</AppText>
          </View>
          {values.accentTheme ? (
            <View style={{ flexDirection: inlineDirection(), alignItems: "center", gap: spacing[2] }}>
              <MaterialCommunityIcons color={accentTone} name="palette-outline" size={18} />
              <AppText tone="secondary">{getVaultAccentThemeLabel(values.accentTheme)}</AppText>
            </View>
          ) : null}
        </View>

        <View
          style={{
            borderRadius: radii.lg,
            borderWidth: 1,
            borderColor: colors.borderStrong,
            backgroundColor: colors.accentSoft,
            padding: spacing[4],
            gap: spacing[2],
          }}
        >
          <AppText size="sm" tone="accent" weight="semibold">
            {messages.pages.createVault.reviewWalkthroughTitle}
          </AppText>
          <AppText tone="secondary">{messages.pages.createVault.reviewWalkthroughDescription}</AppText>
        </View>
      </View>
    </SurfaceCard>
  );
};
