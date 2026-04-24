import { SyncingNotice } from "../feedback";

export const VaultSyncNotice = ({
  description,
}: {
  description: string;
}) => <SyncingNotice label={description} />;
