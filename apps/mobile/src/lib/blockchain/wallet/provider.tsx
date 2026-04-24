import type { PropsWithChildren } from "react";
import { Platform } from "react-native";

import { WalletProvider as NativeWalletProvider } from "./provider.native";
import { WalletProvider as WebWalletProvider } from "./provider.web";

export const WalletProvider = ({ children }: PropsWithChildren) => {
  const ProviderComponent = Platform.OS === "web" ? WebWalletProvider : NativeWalletProvider;

  return <ProviderComponent>{children}</ProviderComponent>;
};
