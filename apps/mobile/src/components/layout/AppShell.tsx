import type { PropsWithChildren } from "react";
import { View } from "react-native";

import { useAppReadiness } from "../../hooks/useAppReadiness";
import { useTransactionRecovery } from "../../hooks/useTransactionRecovery";
import { useWalletConnection } from "../../hooks/useWalletConnection";
import { spacing } from "../../theme";
import { PageContainer } from "../primitives";
import { AppFooter } from "./AppFooter";
import { AppStatusBanner } from "./AppStatusBanner";
import { TopNavigation } from "./TopNavigation";
import { WalletStatusCard } from "./WalletStatusCard";
import { TransactionRecoveryNotice } from "../feedback";

export const AppShell = ({ children }: PropsWithChildren) => {
  const { connectionState } = useWalletConnection();
  const { readiness } = useAppReadiness();
  const { items, dismiss } = useTransactionRecovery({
    ownerAddress: connectionState.session?.address ?? null,
  });
  const activeRecovery = items[0] ?? null;

  return (
    <View style={{ flex: 1 }}>
      <TopNavigation area="app" />
      <PageContainer width="dashboard" style={{ gap: spacing[4], paddingTop: spacing[4] }}>
        <AppStatusBanner readiness={readiness} />
        <WalletStatusCard />
        {activeRecovery ? <TransactionRecoveryNotice item={activeRecovery} onDismiss={() => void dismiss(activeRecovery.id)} /> : null}
      </PageContainer>
      <View style={{ flex: 1 }}>{children}</View>
      <AppFooter />
    </View>
  );
};
