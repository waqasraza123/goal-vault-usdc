import { formatUsdc } from "../../lib/format";
import { interpolate, useI18n } from "../../lib/i18n";
import { colors, radii, spacing } from "../../theme";
import type { VaultDetail } from "../../types";
import { FeedbackStatusCard } from "../feedback";
import { AppText, MotionView, SecondaryButton } from "../primitives";

export const WithdrawSuccessCard = ({
  vault,
  onDismiss,
}: {
  vault: VaultDetail;
  onDismiss: () => void;
}) => {
  const { messages } = useI18n();

  return (
    <FeedbackStatusCard
      description={messages.withdraw.successDescription}
      icon="check-circle-outline"
      title={messages.withdraw.successTitle}
      tone="positive"
    >
      <MotionView
        intensity="emphasis"
        preset="scale"
        style={{
          borderRadius: radii.lg,
          borderWidth: 1,
          borderColor: colors.borderStrong,
          backgroundColor: colors.surfaceGlass,
          padding: spacing[4],
        }}
      >
        <AppText weight="semibold">
          {interpolate(messages.withdraw.successProgress, {
            amount: formatUsdc(vault.savedAmount),
          })}
        </AppText>
      </MotionView>
      <SecondaryButton icon="arrow-up-right" label={messages.common.buttons.withdrawAgain} onPress={onDismiss} />
    </FeedbackStatusCard>
  );
};
