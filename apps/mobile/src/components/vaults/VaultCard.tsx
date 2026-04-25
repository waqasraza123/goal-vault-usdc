import { useRouter } from "expo-router";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import type { VaultSummary } from "../../types";
import { useI18n } from "../../lib/i18n";
import { routes } from "../../lib/routing";
import { colors, radii, spacing } from "../../theme";
import { AppHeading, AppText, MotionView, SecondaryButton, SurfaceCard } from "../primitives";
import { VaultCardAmount } from "./VaultCardAmount";
import { VaultCardProgress } from "./VaultCardProgress";
import { VaultCardRule } from "./VaultCardRule";
import { VaultCardStatus } from "./VaultCardStatus";

export interface VaultCardProps {
  vault: VaultSummary;
}

export const VaultCard = ({ vault }: VaultCardProps) => {
  const router = useRouter();
  const { messages } = useI18n();
  const ruleLabel =
    vault.ruleType === "guardianApproval"
      ? "Guardian approval"
      : vault.ruleType === "cooldownUnlock"
        ? "Cooldown unlock"
        : messages.common.labels.timeLock;

  return (
    <SurfaceCard
      level="floating"
      style={{
        flex: 1,
        minWidth: 280,
        backgroundColor: vault.savedAmount > 0 ? colors.backgroundElevated : colors.surfaceGlass,
        borderColor: vault.progressRatio >= 1 ? colors.positive : colors.borderStrong,
      }}
    >
      <MotionView style={{ gap: spacing[3] }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: spacing[3] }}>
          <VaultCardStatus status={vault.status} />
          <View
            style={{
              borderRadius: radii.pill,
              borderWidth: 1,
              borderColor: colors.borderStrong,
              backgroundColor: colors.surfaceMuted,
              paddingHorizontal: spacing[3],
              paddingVertical: spacing[2],
            }}
          >
            <AppText size="sm" tone="secondary" weight="semibold">
              Base • USDC
            </AppText>
          </View>
        </View>
        <View style={{ gap: spacing[1] }}>
          <AppHeading size="md">{vault.goalName}</AppHeading>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing[2] }}>
            <MaterialCommunityIcons
              color={vault.ruleType === "guardianApproval" ? colors.warning : colors.accentStrong}
              name={
                vault.ruleType === "guardianApproval"
                  ? "account-supervisor-circle-outline"
                  : vault.ruleType === "cooldownUnlock"
                    ? "timer-sand"
                    : "calendar-lock-outline"
              }
              size={18}
            />
            <AppText size="sm" tone="accent" weight="semibold">
              {ruleLabel}
            </AppText>
          </View>
          {vault.note ? (
            <View
              style={{
                borderRadius: radii.md,
                borderWidth: 1,
                borderColor: colors.borderStrong,
                backgroundColor: colors.surfaceMuted,
                padding: spacing[4],
              }}
            >
              <AppText tone="secondary">{vault.note}</AppText>
            </View>
          ) : null}
        </View>
      </MotionView>
      <VaultCardAmount savedAmount={vault.savedAmount} targetAmount={vault.targetAmount} />
      <VaultCardProgress progressRatio={vault.progressRatio} />
      <VaultCardRule
        description={
          vault.ruleType === "cooldownUnlock"
            ? vault.ruleSummary.type === "cooldownUnlock"
              ? `${vault.ruleSummary.cooldownDurationLabel} cooldown`
              : "Cooldown unlock"
            : vault.ruleType === "guardianApproval"
              ? "Guardian approval required"
              : undefined
        }
        ruleType={vault.ruleType}
        unlockDate={vault.unlockDate}
      />
      <View
        style={{
          borderRadius: radii.md,
          borderWidth: 1,
          borderColor: colors.borderStrong,
          backgroundColor: colors.surfaceMuted,
          padding: spacing[4],
        }}
      >
        <AppText tone="secondary">{messages.vaults.ruleTruthDescription}</AppText>
      </View>
      <SecondaryButton
        icon="arrow-right"
        label={messages.common.buttons.openVault}
        onPress={() => router.push(routes.vaultDetail(vault.address))}
      />
    </SurfaceCard>
  );
};
