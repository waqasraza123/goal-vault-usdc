import { buildApp } from "./app";
import { readApiRuntimeEnv } from "./env";
import { createIndexerContext } from "./modules/indexer/context";
import { runFullIndexerSync } from "./modules/indexer/indexer.routes";

const start = async () => {
  const env = readApiRuntimeEnv();
  const context = await createIndexerContext(env);
  const app = buildApp({ context, env });
  const runSync = async () => {
    try {
      await runFullIndexerSync(context);
    } catch (error) {
      app.log.error(error, "Goal Vault indexer sync failed.");
    }
  };

  if (env.syncIntervalMs > 0) {
    void runSync();
    setInterval(() => {
      void runSync();
    }, env.syncIntervalMs).unref();
  }

  await app.listen({
    host: env.host,
    port: env.port,
  });
};

void start();
