import { useI18n } from "../../lib/i18n";
import { PrimaryButton, SecondaryButton } from "../primitives";
import { FeedbackStatusCard } from "./FeedbackStatusCard";

export const MetadataRecoveryNotice = ({
  title,
  description,
  onRetry,
  onViewVault,
}: {
  title?: string;
  description: string;
  onRetry?: () => void;
  onViewVault?: () => void;
}) => {
  const { messages } = useI18n();

  return (
    <FeedbackStatusCard
      description={description}
      icon={onRetry ? "database-sync-outline" : "database-clock-outline"}
      pulse={!onRetry}
      title={title ?? messages.feedback.metadataLiveTitle}
      tone="warning"
    >
      {onRetry ? <PrimaryButton icon="refresh" label={messages.common.buttons.retryDetailsSave} onPress={onRetry} /> : null}
      {onViewVault ? <SecondaryButton icon="shield-check-outline" label={messages.common.buttons.viewVault} onPress={onViewVault} /> : null}
    </FeedbackStatusCard>
  );
};
