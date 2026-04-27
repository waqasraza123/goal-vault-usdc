import { interpolate, useI18n } from "../../lib/i18n";
import { SecondaryButton } from "../primitives";
import { FeedbackStatusCard } from "./FeedbackStatusCard";

export interface UnsupportedNetworkNoticeProps {
  onSwitch: () => void;
  label?: string | null;
}

export const UnsupportedNetworkNotice = ({ onSwitch, label }: UnsupportedNetworkNoticeProps) => {
  const { messages } = useI18n();
  const description = label
    ? interpolate(messages.feedback.unsupportedNetworkDescriptionWithLabel, { label })
    : messages.feedback.unsupportedNetworkDescription;

  return (
    <FeedbackStatusCard
      description={description}
      icon="swap-horizontal-circle-outline"
      title={messages.feedback.unsupportedNetworkTitle}
      tone="warning"
    >
      <SecondaryButton icon="swap-horizontal" label={messages.common.buttons.switchNetwork} onPress={onSwitch} />
    </FeedbackStatusCard>
  );
};
