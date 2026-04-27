import { useI18n } from "../../lib/i18n";
import { FeedbackStatusCard } from "./FeedbackStatusCard";

export const OwnerOnlyNotice = ({ description }: { description?: string | null }) => {
  const { messages } = useI18n();

  return (
    <FeedbackStatusCard
      description={description ?? messages.withdraw.ownerOnlyDescription}
      icon="account-lock-outline"
      title={messages.withdraw.ownerOnlyTitle}
      tone="warning"
    />
  );
};
