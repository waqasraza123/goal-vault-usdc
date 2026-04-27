import type { CreateVaultTransactionState } from "../../types";
import { useI18n } from "../../lib/i18n";
import { PrimaryButton, SecondaryButton } from "../primitives";
import { FeedbackStatusCard } from "./FeedbackStatusCard";

export const CreateVaultErrorState = ({
  state,
  onRetry,
  onReset,
}: {
  state: CreateVaultTransactionState;
  onRetry?: () => void;
  onReset?: () => void;
}) => {
  const { messages } = useI18n();

  const title = state.didOnchainSucceed ? messages.pages.createVault.error.activeTitle : messages.pages.createVault.error.failedTitle;
  const description =
    state.errorMessage ??
    (state.didOnchainSucceed
      ? messages.pages.createVault.error.activeDescription
      : messages.pages.createVault.error.failedDescription);

  return (
    <FeedbackStatusCard
      description={description}
      icon={state.didOnchainSucceed ? "database-alert-outline" : "alert-circle-outline"}
      title={title}
      tone={state.didOnchainSucceed ? "warning" : "danger"}
    >
      {onRetry ? <PrimaryButton icon="refresh" label={messages.common.buttons.retry} onPress={onRetry} /> : null}
      {onReset ? <SecondaryButton icon="restart" label={messages.common.buttons.startOver} onPress={onReset} /> : null}
    </FeedbackStatusCard>
  );
};
