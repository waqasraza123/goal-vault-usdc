import { FeedbackStatusCard } from "./FeedbackStatusCard";

export const AppLoadingState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <FeedbackStatusCard description={description} icon="sync" pulse title={title} tone="neutral" />
  );
};
