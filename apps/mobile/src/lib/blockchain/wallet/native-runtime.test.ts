import assert from "node:assert/strict";
import test from "node:test";

import { isNativeWalletRuntimeSupported } from "./native-runtime";

test("native wallet runtime is disabled in Expo Go", () => {
  assert.equal(isNativeWalletRuntimeSupported("expo"), false);
});

test("native wallet runtime stays enabled outside Expo Go", () => {
  assert.equal(isNativeWalletRuntimeSupported(null), true);
  assert.equal(isNativeWalletRuntimeSupported(undefined), true);
});
