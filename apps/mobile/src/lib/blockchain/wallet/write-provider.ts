import { Platform } from "react-native";
import type { EIP1193Provider } from "viem";

import { useWalletWriteProvider as useNativeWalletWriteProvider } from "./write-provider.native";
import { useWalletWriteProvider as useWebWalletWriteProvider } from "./write-provider.web";

export const useWalletWriteProvider = (): EIP1193Provider | null => {
  if (Platform.OS === "web") {
    return useWebWalletWriteProvider();
  }

  return useNativeWalletWriteProvider();
};
