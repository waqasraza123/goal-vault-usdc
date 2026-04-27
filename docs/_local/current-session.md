# Current Session

## Date
2026-04-27

## Current Objective
Commit current work, then implement the next real-audience beta readiness step with code and documentation only.

## Last Completed Step
Added beta support intake across the app and API, with durable persistence and managed database artifact coverage.

## Files Touched
- `.github/workflows/api-preflight.yml`
- `apps/api/src/modules/support/support.routes.ts`
- `apps/api/src/modules/support/support-store.ts`
- `apps/api/src/modules/persistence/*`
- `apps/api/src/app.ts`
- `apps/api/src/env.ts`
- `apps/api/src/jobs/runtime-preflight.ts`
- `apps/mobile/src/app/(app)/support.tsx`
- `apps/mobile/src/lib/api/support.ts`
- `apps/mobile/src/lib/i18n/messages.ts`
- `apps/mobile/src/lib/routing/routes.ts`
- `packages/shared/src/domain/support.ts`
- `packages/api-client/src/support.ts`
- managed database scripts under `scripts/write-api-managed-database-*.mjs`
- deployment and plan docs for beta support, preflight, persistence, schema, export, import, parity, launch, and project state

## Durable Decisions Captured
- Real-user beta now has an in-app `/support` route and `POST /support/requests` backend intake.
- Support records are private operational data and must not be committed as artifacts.
- Support requests persist through SQLite and PostgreSQL behind the API persistence boundary.
- PostgreSQL runtime mode now requires `support_requests` in the managed database schema.
- Beta readiness rejects `/support` as the support reference when local API preflight does not show support enabled.

## Scope Boundaries
- No production build, Expo export, deployment, database provisioning, schema application, import, parity comparison, traffic movement, beta invitations, contract work, live chain interaction, or real test suite was run.
- This step adds product/API code plus operator documentation only.

## Verification Commands
- `node --check scripts/write-api-managed-database-schema.mjs`
- `node --check scripts/write-api-managed-database-export.mjs`
- `node --check scripts/write-api-managed-database-import-plan.mjs`
- `node --check scripts/write-api-managed-database-plan.mjs`
- `node --check scripts/write-api-managed-database-parity-plan.mjs`
- `node --check scripts/write-beta-readiness-plan.mjs`
- `git diff --check`

## Handoff Note
Next code-focused step can add provider-specific backend promotion and rollback automation, or add an operator-only support review/export surface for triage.
