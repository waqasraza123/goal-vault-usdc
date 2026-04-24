import { useI18n } from "../../lib/i18n";
import { AppErrorState } from "./AppErrorState";

export const ConfigurationNotice = ({
  description,
  onRetry,
}: {
  description?: string | null;
  onRetry?: () => void;
}) => {
  const { messages } = useI18n();

  return (
    <AppErrorState
      description={description ?? messages.feedback.configurationDescription}
      primaryAction={
        onRetry
          ? {
              label: messages.common.buttons.tryAgain,
              onPress: onRetry,
              icon: "refresh",
            }
          : undefined
      }
      title={messages.feedback.configurationTitle}
    />
  );
};
