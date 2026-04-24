import { View } from "react-native";

import type { VaultSummary } from "../../types";
import { useAdaptiveLayout } from "../../hooks/useAdaptiveLayout";
import { useI18n } from "../../lib/i18n";
import { spacing } from "../../theme";
import { EmptyState } from "../primitives";
import { VaultCard } from "./VaultCard";

export interface VaultGridProps {
  vaults: VaultSummary[];
}

export const VaultGrid = ({ vaults }: VaultGridProps) => {
  const adaptiveLayout = useAdaptiveLayout();
  const { messages } = useI18n();

  if (vaults.length === 0) {
    return (
      <EmptyState
        description={messages.pages.myVaults.emptyDescription}
        eyebrow={messages.pages.myVaults.emptyEyebrow}
        highlights={messages.pages.myVaults.emptyHighlights}
        title={messages.pages.myVaults.emptyTitle}
      />
    );
  }

  return (
    <View
      style={{
        flexDirection: adaptiveLayout.useSplitLayout ? "row" : "column",
        flexWrap: "wrap",
        gap: spacing[4],
      }}
    >
      {vaults.map((vault) => (
        <View key={vault.address} style={{ flexBasis: adaptiveLayout.useSplitLayout ? "48%" : "100%", flexGrow: 1 }}>
          <VaultCard vault={vault} />
        </View>
      ))}
    </View>
  );
};
