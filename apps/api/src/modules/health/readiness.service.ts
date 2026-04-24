import type {
  ApiChainReadiness,
  ApiHealthSummary,
  EnvironmentCheckStatus,
  ReadinessCheck,
  StagingReadinessSummary,
  SupportedChainId,
} from "@goal-vault/shared";

import type { ApiRuntimeEnv } from "../../env";

const createCheck = ({
  key,
  label,
  status,
  message,
}: {
  key: string;
  label: string;
  status: EnvironmentCheckStatus;
  message: string;
}): ReadinessCheck => ({
  key,
  label,
  status,
  message,
});

const getApiChainReadiness = (env: ApiRuntimeEnv, chainId: SupportedChainId): ApiChainReadiness => {
  const chain = env.chains[chainId];
  const rpcConfigured = Boolean(chain.rpcUrl);
  const factoryConfigured = Boolean(chain.factoryAddress);
  const checks = [
    createCheck({
      key: `rpc:${chainId}`,
      label: `RPC ${chainId}`,
      status: rpcConfigured ? "ready" : "blocked",
      message: rpcConfigured ? "RPC URL is configured." : "RPC URL is missing.",
    }),
    createCheck({
      key: `factory:${chainId}`,
      label: `Factory ${chainId}`,
      status: factoryConfigured ? "ready" : "blocked",
      message: factoryConfigured ? "Factory address is configured." : "Factory address is missing.",
    }),
  ];

  return {
    chainId,
    rpcConfigured,
    factoryConfigured,
    readsReady: rpcConfigured,
    writesReady: rpcConfigured && factoryConfigured,
    checks,
  };
};

const getSummaryStatus = (checks: ReadinessCheck[]): ApiHealthSummary["status"] => {
  if (checks.some((check) => check.status === "blocked")) {
    return "unavailable";
  }

  if (checks.some((check) => check.status === "warning")) {
    return "degraded";
  }

  return "healthy";
};

const getStagingStatus = (checks: ReadinessCheck[]): StagingReadinessSummary["status"] => {
  if (checks.some((check) => check.status === "blocked")) {
    return "blocked";
  }

  if (checks.some((check) => check.status === "warning")) {
    return "degraded";
  }

  return "ready";
};

export const buildApiHealthSummary = (env: ApiRuntimeEnv): ApiHealthSummary => {
  const chains = ([8453, 84532] as const).map((chainId) => getApiChainReadiness(env, chainId));
  const hasValidationErrors = env.validationErrors.length > 0;
  const checks = [
    createCheck({
      key: "env-validation",
      label: "Environment validation",
      status: hasValidationErrors ? "warning" : "ready",
      message: hasValidationErrors ? env.validationErrors.join(" ") : "Environment values passed validation.",
    }),
    createCheck({
      key: "data-dir",
      label: "Data directory",
      status: "ready",
      message: `Indexer data will persist under ${env.dataDir}.`,
    }),
    ...chains.flatMap((chain) => chain.checks),
  ];
  const status = getSummaryStatus(checks);

  return {
    status,
    checkedAt: new Date().toISOString(),
    message:
      status === "healthy"
        ? "API configuration is ready."
        : status === "degraded"
          ? "API configuration is usable with warnings."
          : "API configuration is missing required values.",
    checks,
    chains,
  };
};

export const buildStagingReadinessSummary = (env: ApiRuntimeEnv): StagingReadinessSummary => {
  const sepolia = getApiChainReadiness(env, 84532);
  const checks = [
    createCheck({
      key: "staging-rpc",
      label: "Base Sepolia RPC",
      status: sepolia.rpcConfigured ? "ready" : "blocked",
      message: sepolia.rpcConfigured ? "Base Sepolia RPC is configured." : "Set EXPO_PUBLIC_BASE_SEPOLIA_RPC_URL for staging.",
    }),
    createCheck({
      key: "staging-factory",
      label: "Base Sepolia factory",
      status: sepolia.factoryConfigured ? "ready" : "blocked",
      message:
        sepolia.factoryConfigured
          ? "Base Sepolia factory is configured."
          : "Set EXPO_PUBLIC_BASE_SEPOLIA_FACTORY_ADDRESS for create, deposit, and withdraw smoke tests.",
    }),
    createCheck({
      key: "sync-interval",
      label: "Indexer sync loop",
      status: env.syncIntervalMs > 0 ? "ready" : "warning",
      message:
        env.syncIntervalMs > 0
          ? `Indexer sync loop is enabled every ${env.syncIntervalMs}ms.`
          : "Indexer sync loop is disabled. Manual syncs are required during staging.",
    }),
  ];
  const status = getStagingStatus(checks);

  return {
    status,
    message:
      status === "ready"
        ? "Base Sepolia smoke testing is ready."
        : status === "degraded"
          ? "Base Sepolia smoke testing is usable with manual steps."
          : "Base Sepolia smoke testing is blocked by missing configuration.",
    checks,
  };
};
