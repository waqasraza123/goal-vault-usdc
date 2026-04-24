# Goal Vault Env Reference

## Shared App Variables
- `APP_ENV`
  - `development`, `staging`, or `production`
- `EXPO_PUBLIC_APP_ENV`
  - should match `APP_ENV`
- `EXPO_PUBLIC_APP_URL`
  - public web/app URL used for staging or production packaging
- `EXPO_PUBLIC_API_BASE_URL`
  - public API base URL used by the app
- `EXPO_PUBLIC_API_TIMEOUT_MS`
  - app-side backend timeout in milliseconds
- `EXPO_PUBLIC_REOWN_PROJECT_ID`
  - wallet project ID for real wallet flows
- `EXPO_PUBLIC_WALLETCONNECT_METADATA_URL`
  - wallet metadata URL; defaults to `EXPO_PUBLIC_APP_URL` when available

## Chain Variables
- `EXPO_PUBLIC_BASE_RPC_URL`
  - Base mainnet RPC URL
- `EXPO_PUBLIC_BASE_FACTORY_ADDRESS`
  - Base mainnet Goal Vault factory address
- `EXPO_PUBLIC_BASE_SEPOLIA_RPC_URL`
  - Base Sepolia RPC URL
- `EXPO_PUBLIC_BASE_SEPOLIA_FACTORY_ADDRESS`
  - Base Sepolia Goal Vault factory address

## API Variables
- `API_HOST`
  - bind host, defaults to `127.0.0.1`
- `API_PORT`
  - API port, defaults to `3001`
- `API_PUBLIC_BASE_URL`
  - public API URL for deployment readiness and operator checks
- `API_DATA_DIR`
  - file-backed indexer data directory
- `API_SYNC_INTERVAL_MS`
  - background sync interval in milliseconds
- `API_ENABLE_INDEXER`
  - `true` or `false`
- `API_LOG_LEVEL`
  - one of `fatal`, `error`, `warn`, `info`, `debug`, `trace`
- `API_BASE_START_BLOCK`
  - optional Base sync starting block
- `API_BASE_SEPOLIA_START_BLOCK`
  - optional Base Sepolia sync starting block

## Build Variables
- `IOS_BUILD_NUMBER`
  - iOS build number used by Expo config
- `ANDROID_VERSION_CODE`
  - Android version code used by Expo config

## Environment Expectations
- Development:
  - local URLs are acceptable
  - API base URL and wallet project ID can remain optional for UI work
- Staging:
  - expect Base Sepolia RPC and factory address
  - require public app and API URLs
- Production:
  - expect Base mainnet RPC and factory address
  - do not use localhost URLs
  - require public HTTPS app and API URLs
