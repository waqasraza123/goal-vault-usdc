import { UnsupportedNetworkNotice } from "../feedback";

export const NetworkStatusBanner = ({
  label,
  onSwitch,
}: {
  label?: string | null;
  onSwitch?: () => void;
}) => <UnsupportedNetworkNotice label={label} onSwitch={onSwitch ?? (() => undefined)} />;
