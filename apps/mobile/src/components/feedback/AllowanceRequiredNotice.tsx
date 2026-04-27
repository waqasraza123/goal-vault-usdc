import { useI18n } from "../../lib/i18n";
import { FeedbackStatusCard } from "./FeedbackStatusCard";

export const AllowanceRequiredNotice = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  const { messages } = useI18n();

  return (
    <FeedbackStatusCard
      description={description ?? messages.deposit.approvalRequiredDescription}
      icon="shield-key-outline"
      title={title ?? messages.deposit.approvalRequiredTitle}
      tone="accent"
    />
  );
};
