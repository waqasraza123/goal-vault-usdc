import type { TransactionRecoveryRecord } from "@goal-vault/shared";

import { TransactionRecoveryNotice } from "../feedback";

export const VaultRecoveryCard = ({
  item,
  onDismiss,
}: {
  item: TransactionRecoveryRecord;
  onDismiss?: () => void;
}) => <TransactionRecoveryNotice item={item} onDismiss={onDismiss} />;
