import { useMemo, type PropsWithChildren } from "react";

import { walletRuntimeConfig } from "../config";
import { createConnectionState } from "./helpers";
import { WalletContext } from "./state";
import type { WalletContextValue } from "./types";

export const UnconfiguredWalletProvider = ({ children }: PropsWithChildren) => {
  const value = useMemo<WalletContextValue>(
    () => ({
      session: null,
      runtimeStatus: {
        isEnabled: false,
        projectId: walletRuntimeConfig.projectId ?? undefined,
        metadataUrl: walletRuntimeConfig.metadataUrl ?? undefined,
      },
      connectionState: createConnectionState({
        isWalletEnabled: false,
        walletStatus: "unconfigured",
        session: null,
      }),
      connect: async () => undefined,
      disconnect: async () => undefined,
      switchNetwork: async () => undefined,
    }),
    [],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};
