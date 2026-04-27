import type { ComponentProps } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { formatProgress, formatUsdc } from "../../lib/format";
import { useI18n } from "../../lib/i18n";
import { colors, radii, spacing } from "../../theme";
import type { VaultDetail } from "../../types";
import { AnimatedNumberText, AppHeading, AppText, MotionView, ProgressBar, SurfaceCard } from "../primitives";

export interface VaultProgressPanelProps {
  vault: VaultDetail;
}

export const VaultProgressPanel = ({ vault }: VaultProgressPanelProps) => {
  const { inlineDirection, messages } = useI18n();
  const remainingAmount = Math.max(vault.targetAmount - vault.savedAmount, 0);
  const metrics = [
    {
      label: messages.common.labels.targetAmount,
      value: vault.targetAmount,
      icon: "flag-checkered",
      backgroundColor: colors.accentSoft,
      iconColor: colors.accentStrong,
    },
    {
      label: messages.common.labels.remainingToTarget,
      value: remainingAmount,
      icon: remainingAmount <= 0 ? "check-circle-outline" : "progress-clock",
      backgroundColor: remainingAmount <= 0 ? colors.positiveSoft : colors.warningSoft,
      iconColor: remainingAmount <= 0 ? colors.positive : colors.warning,
    },
  ] satisfies Array<{
    label: string;
    value: number;
    icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
    backgroundColor: string;
    iconColor: string;
  }>;

  return (
    <SurfaceCard tone="accent" style={{ padding: spacing[5] }}>
      <MotionView style={{ flexDirection: inlineDirection(), alignItems: "flex-start", gap: spacing[3] }}>
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: radii.md,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: vault.progressRatio >= 1 ? colors.positiveSoft : colors.accentSoft,
            borderWidth: 1,
            borderColor: vault.progressRatio >= 1 ? colors.positive : colors.borderStrong,
          }}
        >
          <MaterialCommunityIcons
            color={vault.progressRatio >= 1 ? colors.positive : colors.accentStrong}
            name="chart-line"
            size={22}
          />
        </View>
        <View style={{ flex: 1, gap: spacing[1] }}>
          <AppHeading size="md">{messages.common.labels.progress}</AppHeading>
          <AnimatedNumberText formatValue={formatUsdc} size="xl" value={vault.savedAmount} weight="semibold" />
          <AppText tone="secondary">
            {formatProgress(vault.progressRatio)} {messages.common.labels.of} {formatUsdc(vault.targetAmount)}
          </AppText>
        </View>
      </MotionView>

      <ProgressBar progress={vault.progressRatio} tone={vault.progressRatio >= 1 ? "positive" : "accent"} height={12} />

      <View style={{ flexDirection: inlineDirection(), flexWrap: "wrap", gap: spacing[3] }}>
        {metrics.map((metric) => (
          <View
            key={metric.label}
            style={{
              flex: 1,
              minWidth: 160,
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
              <AnimatedNumberText formatValue={formatUsdc} value={metric.value} weight="semibold" />
            </View>
          </View>
        ))}
      </View>
    </SurfaceCard>
  );
};
