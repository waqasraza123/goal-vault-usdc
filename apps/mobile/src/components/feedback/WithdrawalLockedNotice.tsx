import { useI18n } from "../../lib/i18n";
import { FeedbackStatusCard } from "./FeedbackStatusCard";

export const WithdrawalLockedNotice = ({ description }: { description?: string | null }) => {
  const { messages } = useI18n();

  return (
    <FeedbackStatusCard
      description={description ?? messages.withdraw.lockedDescription}
      icon="lock-clock"
      title={messages.withdraw.flow.lockedTitle}
      tone="warning"
    />
  );
};
