import { parseHealthResponse, type HealthResponse } from "@goal-vault/api-client";
import type { HealthStatus } from "@goal-vault/shared";

import { fetchBackendJson } from "./client";

export const fetchApiHealth = async (): Promise<{
  status: "success" | "unavailable" | "error" | "not_found";
  data: HealthStatus | null;
  message: string | null;
}> => {
  const response = await fetchBackendJson<HealthResponse>({
    path: "/health",
    fallbackMessage: "Goal Vault services are not available right now.",
  });

  if (response.status !== "success" || !response.data) {
    return {
      status: response.status,
      data: null,
      message: response.message,
    };
  }

  return {
    status: "success",
    data: parseHealthResponse(response.data),
    message: null,
  };
};
