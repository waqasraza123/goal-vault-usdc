import type { ComponentProps } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { interpolate, useI18n } from "../../lib/i18n";
import { colors, radii, spacing } from "../../theme";
import type { CreateVaultResult } from "../../types";
import { FeedbackStatusCard } from "../feedback";
import { AppText, MotionView, PrimaryButton, SecondaryButton } from "../primitives";

export const CreateVaultSuccessCard = ({
  result,
  onViewVault,
  onBackToVaults,
}: {
  result: CreateVaultResult;
  onViewVault: () => void;
  onBackToVaults: () => void;
}) => {
  const { inlineDirection, messages } = useI18n();
  const protectionLabel =
    result.review.ruleType === "timeLock"
      ? interpolate(messages.vaults.protectionRuleUnlocksOn, { date: result.review.unlockDateLabel ?? "" })
      : result.review.ruleType === "cooldownUnlock"
        ? `${result.review.cooldownDurationLabel} cooldown`
        : result.review.guardianAddress ?? "Guardian approval required";
  const metrics = [
    {
      label: messages.common.labels.targetAmount,
      value: result.review.targetAmountDisplay,
      icon: "flag-checkered",
      backgroundColor: colors.accentSoft,
      iconColor: colors.accentStrong,
    },
    {
      label: messages.common.labels.protectionRule,
      value: protectionLabel,
      icon: "shield-check-outline",
      backgroundColor: colors.warningSoft,
      iconColor: colors.warning,
    },
    {
      label: messages.common.labels.networkAndAsset,
      value: `${result.review.networkLabel} • ${result.review.assetSymbol}`,
      icon: "cube-send",
      backgroundColor: colors.positiveSoft,
      iconColor: colors.positive,
    },
  ] satisfies Array<{
    label: string;
    value: string;
    icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
    backgroundColor: string;
    iconColor: string;
  }>;

  return (
    <FeedbackStatusCard
      description={messages.pages.createVault.success.description}
      eyebrow={messages.pages.createVault.success.eyebrow}
      icon="shield-check-outline"
      title={result.review.goalName}
      tone="positive"
    >
      <View style={{ flexDirection: inlineDirection(), flexWrap: "wrap", gap: spacing[3] }}>
        {metrics.map((metric) => (
          <View
            key={metric.label}
            style={{
              flex: 1,
              minWidth: 180,
              gap: spacing[3],
              borderRadius: radii.lg,
              borderWidth: 1,
              borderColor: colors.borderStrong,
              backgroundColor: colors.surfaceGlass,
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

      <View style={{ gap: spacing[3] }}>
        {messages.pages.createVault.success.nextSteps.map((step, index) => (
          <MotionView
            key={step}
            delay={80 + index * 45}
            style={{
              flexDirection: inlineDirection(),
              alignItems: "flex-start",
              gap: spacing[3],
              borderRadius: radii.lg,
              borderWidth: 1,
              borderColor: colors.borderStrong,
              backgroundColor: colors.surfaceGlass,
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
                backgroundColor: colors.positiveSoft,
              }}
            >
              <MaterialCommunityIcons color={colors.positive} name="check" size={16} />
            </View>
            <AppText style={{ flex: 1 }} tone="secondary">
              {step}
            </AppText>
          </MotionView>
        ))}
      </View>

      <View style={{ flexDirection: inlineDirection(), flexWrap: "wrap", gap: spacing[3] }}>
        <PrimaryButton icon="shield-check-outline" label={messages.common.buttons.viewVault} onPress={onViewVault} />
        <SecondaryButton icon="view-grid-outline" label={messages.common.buttons.backToVaults} onPress={onBackToVaults} />
      </View>
    </FeedbackStatusCard>
  );
};
