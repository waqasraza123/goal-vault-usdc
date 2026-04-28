# Pocket Vault Contract Security Audit

## Scope
Audited contracts:
- `GoalVault`
- `GoalVaultFactory`
- `DeployGoalVaultFactoryScript`
- contract SDK write/read assumptions that call the current public ABI

Out of scope:
- yield, swaps, multichain support, social recovery, admin dashboards, and upgrade systems
- production key custody and RPC provider operations
- external legal, tax, or compliance review

## Security Assumptions
- Pocket Vault is Base-native and USDC-only.
- Each vault has one immutable owner and one immutable ERC20 asset.
- Factory-created vaults are the intended production path.
- Metadata is display-only and cannot change onchain withdrawal rights.
- Guardian approval is a trust workflow, not cryptographic account recovery.
- There is no admin withdrawal, pausing, rescue function, proxy upgrade, or privileged operator role.

## Hardening Checklist
- ERC20 movement uses `SafeERC20` for false-returning and reverting token behavior.
- Token-moving vault actions are protected against reentrancy.
- Direct vault construction rejects zero owner, zero asset, zero target, invalid rule shapes, and invalid guardian configuration.
- Factory construction rejects zero USDC.
- Factory vault creation rejects zero target and invalid rule-specific parameters.
- Withdrawals reject zero recipients.
- Existing public function names, existing events, and contract names remain stable.

## Accepted Risks
- Vaults are immutable. A contract bug cannot be patched in place.
- There is no emergency pause. Broken production deployments require traffic/app rollback and no further user deposits.
- There is no token rescue function. Accidental unsupported token transfers to a vault are not recoverable through the contract.
- Guardian rejection and re-request behavior is intentionally supported because the app already models that lifecycle.
- Existing deployed contracts are not upgraded by this audit. New hardening applies only to deployments from the updated source.

## Required Verification
- `pnpm test:contracts`
- `pnpm test:ts`
- `pnpm typecheck`
- `pnpm verify:ci`

## Launch Gate
Before any new mainnet factory deployment:
- confirm the deployed factory bytecode was built from the audited source
- confirm `USDC_ADDRESS` matches Base USDC for the selected network
- run the guarded deployment simulation
- capture the deployment manifest
- run protected production smoke with a small controlled value
