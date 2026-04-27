import type { DepositFlowState } from "../../types";
import { useI18n } from "../../lib/i18n";
import { PrimaryButton, SecondaryButton } from "../primitives";
import { FeedbackStatusCard } from "./FeedbackStatusCard";

export const DepositErrorState = ({
  state,
  onRetry,
  onReset,
}: {
  state: DepositFlowState;
  onRetry: () => void;
  onReset: () => void;
}) => {
  const { messages } = useI18n();

  const title = state.approvalCompleted ? messages.deposit.approvalErrorReadyTitle : messages.deposit.approvalErrorTitle;
  const description =
    state.errorMessage ??
    (state.approvalCompleted ? messages.deposit.approvalErrorDescription : messages.deposit.errorDescription);

  return (
    <FeedbackStatusCard description={description} icon="alert-circle-outline" title={title} tone="danger">
      <PrimaryButton
        icon="refresh"
        label={state.approvalCompleted ? messages.common.buttons.retryDeposit : messages.common.buttons.tryAgain}
        onPress={onRetry}
      />
      <SecondaryButton icon="restart" label={messages.common.buttons.reset} onPress={onReset} />
    </FeedbackStatusCard>
  );
};
