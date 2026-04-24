import type { AppEnvironment } from "@goal-vault/shared";

export interface GoalVaultAppIdentity {
  name: string;
  shortName: string;
  slug: string;
  scheme: string;
  iosBundleIdentifier: string;
  androidPackage: string;
  webTitle: string;
}

const appIdentityByEnvironment: Record<AppEnvironment, GoalVaultAppIdentity> = {
  development: {
    name: "Goal Vault Dev",
    shortName: "Goal Vault Dev",
    slug: "goal-vault-dev",
    scheme: "goal-vault-dev",
    iosBundleIdentifier: "com.goalvault.app.dev",
    androidPackage: "com.goalvault.app.dev",
    webTitle: "Goal Vault Dev",
  },
  staging: {
    name: "Goal Vault Staging",
    shortName: "Goal Vault Staging",
    slug: "goal-vault-staging",
    scheme: "goal-vault-staging",
    iosBundleIdentifier: "com.goalvault.app.staging",
    androidPackage: "com.goalvault.app.staging",
    webTitle: "Goal Vault Staging",
  },
  production: {
    name: "Goal Vault",
    shortName: "Goal Vault",
    slug: "goal-vault",
    scheme: "goal-vault",
    iosBundleIdentifier: "com.goalvault.app",
    androidPackage: "com.goalvault.app",
    webTitle: "Goal Vault",
  },
};

export const getGoalVaultAppIdentity = (environment: AppEnvironment): GoalVaultAppIdentity =>
  appIdentityByEnvironment[environment];
