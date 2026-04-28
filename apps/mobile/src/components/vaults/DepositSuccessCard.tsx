import { formatProgress } from "../../lib/format";
import { interpolate, useI18n } from "../../lib/i18n";
import { colors, radii, spacing } from "../../theme";
import type { VaultDetail } from "../../types";
import { FeedbackStatusCard } from "../feedback";
import { AppText, MotionView, ProgressBar, SecondaryButton } from "../primitives";

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
      <MotionView
        intensity="emphasis"
        preset="scale"
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
        <ProgressBar
          emphasizeCompletion
          progress={vault.progressRatio}
          tone={vault.progressRatio >= 1 ? "positive" : "accent"}
          height={12}
        />
      </MotionView>
      <SecondaryButton icon="plus-circle-outline" label={messages.common.buttons.fundAgain} onPress={onDismiss} />
    </FeedbackStatusCard>
  );
};
