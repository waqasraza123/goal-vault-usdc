import type { SupportedChainId } from "./chain";

export type UserFacingRecoveryAction =
  | "connect_wallet"
  | "switch_network"
  | "retry"
  | "wait"
  | "reconnect_wallet"
  | "return_to_vaults"
  | "open_vault"
  | "review_status";

export type WalletAvailabilityState = "ready" | "disconnected" | "connecting" | "unavailable";
export type NetworkSupportState = "supported" | "unsupported" | "unknown";
export type ApiHealthState = "healthy" | "degraded" | "unavailable";
export type AppReadinessStatus = "ready" | "degraded" | "blocked";
export type StagingReadinessState = "ready" | "degraded" | "blocked";
export type EnvironmentCheckStatus = "ready" | "warning" | "blocked";
export type VaultDegradedState = "healthy" | "syncing" | "partial" | "missing_metadata" | "not_found" | "error";

export interface ReadinessCheck {
  key: string;
  label: string;
  status: EnvironmentCheckStatus;
  message: string;
}

export interface AppReadinessIssue {
  code:
    | "wallet_unavailable"
    | "wallet_disconnected"
    | "wallet_connecting"
    | "unsupported_network"
    | "missing_rpc"
    | "missing_factory_address"
    | "invalid_configuration"
    | "backend_unavailable"
    | "backend_degraded";
  severity: "info" | "warning" | "blocking";
  title: string;
  description: string;
  action: UserFacingRecoveryAction | null;
}

export interface ApiChainReadiness {
  chainId: SupportedChainId;
  rpcConfigured: boolean;
  factoryConfigured: boolean;
  readsReady: boolean;
  writesReady: boolean;
  checks: ReadinessCheck[];
}

export interface ApiHealthSummary {
  status: ApiHealthState;
  checkedAt: string | null;
  message: string | null;
  checks: ReadinessCheck[];
  chains: ApiChainReadiness[];
}

export interface StagingReadinessSummary {
  status: StagingReadinessState;
  message: string | null;
  checks: ReadinessCheck[];
}

export interface AppReadinessState {
  status: AppReadinessStatus;
  wallet: WalletAvailabilityState;
  network: NetworkSupportState;
  configurationStatus: "valid" | "invalid";
  api: ApiHealthSummary;
  staging: StagingReadinessSummary;
  issues: AppReadinessIssue[];
}

