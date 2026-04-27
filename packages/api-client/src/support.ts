import { SupportRequestResponseSchema } from "./schemas";

export const parseSupportRequestResponsePayload = (payload: unknown) => SupportRequestResponseSchema.parse(payload);
