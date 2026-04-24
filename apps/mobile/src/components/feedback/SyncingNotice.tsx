import { StateBanner } from "./StateBanner";

export const SyncingNotice = ({
  label,
}: {
  label: string;
}) => <StateBanner icon="sync" label={label} tone="neutral" />;
