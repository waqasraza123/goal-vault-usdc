import type { WithdrawFlowState } from "../../types";
import { useI18n } from "../../lib/i18n";
import { PrimaryButton, SecondaryButton } from "../primitives";
import { FeedbackStatusCard } from "./FeedbackStatusCard";

export const WithdrawErrorState = ({
  state,
  onRetry,
  onReset,
}: {
  state: WithdrawFlowState;
  onRetry: () => void;
  onReset: () => void;
}) => {
  const { messages } = useI18n();

  return (
    <FeedbackStatusCard
      description={state.errorMessage ?? messages.withdraw.flow.failedDescription}
      icon="alert-circle-outline"
      title={messages.withdraw.flow.failedTitle}
      tone="danger"
    >
      <PrimaryButton icon="refresh" label={messages.withdraw.actions.retry} onPress={onRetry} />
      <SecondaryButton icon="restart" label={messages.common.buttons.reset} onPress={onReset} />
    </FeedbackStatusCard>
  );
};
