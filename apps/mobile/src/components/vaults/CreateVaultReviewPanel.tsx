import type { ComponentProps } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { useI18n } from "../../lib/i18n";
import { colors, radii, spacing } from "../../theme";
import type { CreateVaultReviewModel } from "../../types";
import { AppHeading, AppText, MotionView, SurfaceCard } from "../primitives";

export const CreateVaultReviewPanel = ({ review }: { review: CreateVaultReviewModel }) => {
  const { inlineDirection, messages } = useI18n();
  const ruleValue =
    review.ruleType === "timeLock"
      ? review.unlockDateLabel ?? "Time lock"
      : review.ruleType === "cooldownUnlock"
        ? review.cooldownDurationLabel ?? "Cooldown unlock"
        : review.guardianAddress ?? "Guardian approval";
  const reviewMetrics = [
    {
      label: messages.common.labels.targetAmount,
      value: review.targetAmountDisplay,
      icon: "flag-checkered",
      backgroundColor: colors.accentSoft,
      iconColor: colors.accentStrong,
    },
    {
      label: messages.common.labels.protectionRule,
      value: ruleValue,
      icon: "shield-check-outline",
      backgroundColor: colors.warningSoft,
      iconColor: colors.warning,
    },
    {
      label: messages.common.labels.networkAndAsset,
      value: `${review.networkLabel} • ${review.assetSymbol}`,
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
    <SurfaceCard tone="accent" style={{ padding: spacing[5] }}>
      <MotionView style={{ gap: spacing[4] }}>
        <View style={{ flexDirection: inlineDirection(), alignItems: "flex-start", gap: spacing[3] }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: radii.md,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.accentSoft,
              borderWidth: 1,
              borderColor: colors.borderStrong,
            }}
          >
            <MaterialCommunityIcons color={colors.accentStrong} name="clipboard-check-outline" size={23} />
          </View>
          <View style={{ flex: 1, gap: spacing[1] }}>
            <AppText size="sm" tone="secondary">
              {messages.common.labels.goal}
            </AppText>
            <AppHeading size="md">{review.goalName}</AppHeading>
            {review.category ? <AppText tone="secondary">{review.category}</AppText> : null}
          </View>
        </View>

        <View style={{ flexDirection: inlineDirection(), flexWrap: "wrap", gap: spacing[3] }}>
          {reviewMetrics.map((metric) => (
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

        <View
          style={{
            borderRadius: radii.lg,
            borderWidth: 1,
            borderColor: colors.borderStrong,
            backgroundColor: colors.surfaceMuted,
            padding: spacing[4],
            gap: spacing[3],
          }}
        >
          {review.protectionCopy.map((line) => (
            <View key={line} style={{ flexDirection: inlineDirection(), alignItems: "flex-start", gap: spacing[2] }}>
              <MaterialCommunityIcons color={colors.accentStrong} name="shield-check-outline" size={18} />
              <AppText style={{ flex: 1 }} tone="secondary">
                {line}
              </AppText>
            </View>
          ))}
        </View>

        <View
          style={{
            gap: spacing[3],
            borderRadius: radii.lg,
            borderWidth: 1,
            borderColor: colors.borderStrong,
            backgroundColor: colors.surfaceGlass,
            padding: spacing[4],
          }}
        >
          <AppHeading size="sm">{messages.pages.createVault.reviewWalkthroughTitle}</AppHeading>
          <AppText tone="secondary">{messages.pages.createVault.reviewWalkthroughDescription}</AppText>
          <View style={{ gap: spacing[2] }}>
            {messages.pages.createVault.reviewWalkthroughSteps.map((step, index) => (
              <View key={step} style={{ flexDirection: inlineDirection(), alignItems: "flex-start", gap: spacing[3] }}>
                <View
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: radii.pill,
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
        </View>
      </MotionView>
    </SurfaceCard>
  );
};
