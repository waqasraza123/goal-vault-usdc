import type { FastifyInstance } from "fastify";

import type { HealthResponse } from "@goal-vault/api-client";

import type { ApiRuntimeEnv } from "../../env";
import type { IndexerContext } from "../indexer/context";
import { getHealthStatus } from "./health.service";

export const registerHealthRoutes = (app: FastifyInstance, context: IndexerContext, env: ApiRuntimeEnv) => {
  app.get("/health", async (): Promise<HealthResponse> => getHealthStatus({ context, env }));
  app.get("/ready", async (): Promise<HealthResponse> => getHealthStatus({ context, env }));
};
