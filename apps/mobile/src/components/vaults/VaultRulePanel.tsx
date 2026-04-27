import type { ComponentProps } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { formatLongDate } from "../../lib/format";
import { interpolate, useI18n } from "../../lib/i18n";
import { colors, radii, spacing } from "../../theme";
import type { VaultDetail, WithdrawEligibility } from "../../types";
import { AppHeading, AppText, MotionView, SurfaceCard } from "../primitives";

export interface VaultRulePanelProps {
  vault: VaultDetail;
  eligibility?: WithdrawEligibility | null;
}

export const VaultRulePanel = ({ vault, eligibility }: VaultRulePanelProps) => {
  const { inlineDirection, messages } = useI18n();
  const ruleMessage = eligibility?.message ?? vault.withdrawEligibility.message;
  const ruleLabel =
    vault.ruleType === "timeLock"
      ? messages.common.labels.timeLock
      : vault.ruleType === "cooldownUnlock"
        ? "Cooldown unlock"
        : "Guardian approval";
  const ruleIcon = (
    vault.ruleType === "timeLock"
      ? "calendar-lock-outline"
      : vault.ruleType === "cooldownUnlock"
        ? "timer-sand"
        : "account-supervisor-circle-outline"
  ) satisfies ComponentProps<typeof MaterialCommunityIcons>["name"];
  const ruleDescription =
    vault.ruleType === "timeLock"
      ? interpolate(messages.vaults.protectionRuleUnlocksOn, { date: formatLongDate(vault.unlockDate ?? new Date().toISOString()) })
      : vault.ruleType === "cooldownUnlock"
        ? `Funds become withdrawable ${vault.ruleSummary.type === "cooldownUnlock" ? `after a ${vault.ruleSummary.cooldownDurationLabel} cooldown.` : "after the cooldown ends."}`
        : "Guardian approval is required before withdrawal becomes eligible.";

  return (
    <SurfaceCard accentColor={colors.warning} tone="muted" style={{ backgroundColor: colors.surfaceMuted, padding: spacing[5] }}>
      <MotionView style={{ flexDirection: inlineDirection(), alignItems: "flex-start", gap: spacing[3] }}>
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
          <MaterialCommunityIcons color={colors.warning} name={ruleIcon} size={22} />
        </View>
        <View style={{ flex: 1, gap: spacing[1] }}>
          <AppText size="sm" tone="secondary" weight="semibold">
            {ruleLabel}
          </AppText>
          <AppHeading size="md">{messages.common.labels.protectionRule}</AppHeading>
          <AppText>{ruleDescription}</AppText>
        </View>
      </MotionView>

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
        {[ruleMessage, messages.vaults.ruleTruthDescription].map((line) => (
          <View key={line} style={{ flexDirection: inlineDirection(), alignItems: "flex-start", gap: spacing[2] }}>
            <MaterialCommunityIcons color={colors.accentStrong} name="shield-check-outline" size={18} />
            <AppText style={{ flex: 1 }} tone="secondary">
              {line}
            </AppText>
          </View>
        ))}
      </View>
    </SurfaceCard>
  );
};
