import { View } from "react-native";

import { formatProgress } from "../../lib/format";
import { interpolate, useI18n } from "../../lib/i18n";
import { colors, radii, spacing } from "../../theme";
import type { VaultDetail } from "../../types";
import { FeedbackStatusCard } from "../feedback";
import { AppText, ProgressBar, SecondaryButton } from "../primitives";

export const DepositSuccessCard = ({
  vault,
  onDismiss,
}: {
  vault: VaultDetail;
  onDismiss: () => void;
}) => {
  const { messages } = useI18n();

  return (
    <FeedbackStatusCard
      description={messages.deposit.successDescription}
      icon="check-circle-outline"
      title={messages.deposit.successTitle}
      tone="positive"
    >
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
        <AppText weight="semibold">
          {interpolate(messages.deposit.successProgress, {
            progress: formatProgress(vault.progressRatio),
          })}
        </AppText>
        <ProgressBar progress={vault.progressRatio} tone={vault.progressRatio >= 1 ? "positive" : "accent"} height={12} />
      </View>
      <SecondaryButton icon="plus-circle-outline" label={messages.common.buttons.fundAgain} onPress={onDismiss} />
    </FeedbackStatusCard>
  );
};
