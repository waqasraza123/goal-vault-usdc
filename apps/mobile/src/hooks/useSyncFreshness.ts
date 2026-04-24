import { useMemo } from "react";

import type { SyncFreshnessSnapshot } from "@goal-vault/shared";

import { useI18n } from "../lib/i18n";
import { getVaultDegradedState } from "../lib/sync/freshness";

export const useSyncFreshness = ({
  freshness,
  metadataStatus,
  notFound,
  hasPartialData,
}: {
  freshness?: SyncFreshnessSnapshot | null;
  metadataStatus?: "pending" | "saved" | "failed";
  notFound?: boolean;
  hasPartialData?: boolean;
}) => {
  const { messages } = useI18n();

  return useMemo(() => {
    const state = getVaultDegradedState({
      freshness,
      metadataStatus,
      notFound,
      hasPartialData,
    });

    switch (state) {
      case "missing_metadata":
        return {
          state,
          title: messages.feedback.metadataLiveTitle,
          description: messages.feedback.metadataFailedDescription,
        };
      case "syncing":
        return {
          state,
          title: messages.feedback.syncingTitle,
          description:
            metadataStatus === "pending"
              ? messages.feedback.metadataPendingDescription
              : freshness?.freshness === "lagging"
                ? messages.feedback.activityUpdatingDescription
                : messages.feedback.vaultSyncingDescription,
        };
      case "partial":
        return {
          state,
          title: messages.feedback.partialStateTitle,
          description: messages.feedback.partialStateDescription,
        };
      case "not_found":
        return {
          state,
          title: messages.pages.vaultDetail.notAvailableTitle,
          description: messages.pages.vaultDetail.notAvailableDescription,
        };
      case "error":
        return {
          state,
          title: messages.feedback.dataUnavailableTitle,
          description: messages.feedback.dataUnavailableDescription,
        };
      default:
        return {
          state,
          title: null,
          description: null,
        };
    }
  }, [freshness, hasPartialData, messages, metadataStatus, notFound]);
};
