import type { FastifyInstance } from "fastify";
import { isAddress } from "viem";
import { z } from "zod";

import type { VaultMetadataPayload } from "@goal-vault/shared";

import { serializeVaultDetail, serializeVaultDetailResponse, serializeVaultListResponse, serializeVaultSummary } from "./vaults.serializers";
import { getVaultDetailByAddress, getVaultsByOwner, saveVaultMetadata } from "./vaults.service";

const vaultListQuerySchema = z.object({
  chainId: z.union([z.literal(8453), z.literal(84532)]),
  ownerWallet: z.string().trim(),
});

const vaultMetadataSchema = z.object({
  contractAddress: z.string().trim(),
  chainId: z.union([z.literal(8453), z.literal(84532)]),
  ownerWallet: z.string().trim(),
  displayName: z.string().trim().min(1),
  category: z.string().trim().optional().nullable(),
  note: z.string().trim().optional().nullable(),
  accentTheme: z.enum(["sand", "sage", "sky", "terracotta"]).optional().nullable(),
  targetAmount: z.string().trim().min(1),
  unlockDate: z.string().trim().min(1),
});

export const registerVaultRoutes = (app: FastifyInstance) => {
  app.get("/vaults", async (request, reply) => {
    const parsed = vaultListQuerySchema.safeParse(request.query);

    if (!parsed.success || !isAddress(parsed.data.ownerWallet)) {
      return reply.status(400).send({
        message: "Expected a valid owner wallet and chain id.",
      });
    }

    try {
      const result = getVaultsByOwner({
        context: app.goalVaultContext,
        chainId: parsed.data.chainId,
        ownerWallet: parsed.data.ownerWallet as `0x${string}`,
      });

      return serializeVaultListResponse({
        items: result.items.map((item) =>
          serializeVaultSummary({
            vault: item.vault,
            events: item.events,
            freshness: item.freshness,
          }),
        ),
      });
    } catch {
      return reply.status(503).send({
        message: "Vault list is temporarily unavailable.",
      });
    }
  });

  app.get("/vaults/:vaultAddress", async (request, reply) => {
    const params = request.params as { vaultAddress?: string };
    const parsed = z
      .object({
        chainId: z.union([z.literal(8453), z.literal(84532)]),
      })
      .safeParse(request.query);

    if (!params.vaultAddress || !isAddress(params.vaultAddress) || !parsed.success) {
      return reply.status(400).send({
        message: "Expected a valid vault address and chain id.",
      });
    }

    try {
      const detail = getVaultDetailByAddress({
        context: app.goalVaultContext,
        chainId: parsed.data.chainId,
        vaultAddress: params.vaultAddress as `0x${string}`,
      });

      if (!detail) {
        return reply.status(404).send({
          message: "Vault was not found.",
        });
      }

      return serializeVaultDetailResponse({
        item: serializeVaultDetail({
          vault: detail.vault,
          events: detail.events,
          freshness: detail.freshness,
        }),
      });
    } catch {
      return reply.status(503).send({
        message: "Vault details are temporarily unavailable.",
      });
    }
  });

  app.post("/vaults", async (request, reply) => {
    const parsed = vaultMetadataSchema.safeParse(request.body);

    if (!parsed.success || !isAddress(parsed.data.contractAddress) || !isAddress(parsed.data.ownerWallet)) {
      return reply.status(400).send({
        message: "Vault metadata payload is invalid.",
      });
    }

    try {
      const metadata = await saveVaultMetadata(app.goalVaultContext, parsed.data as VaultMetadataPayload);
      return reply.status(201).send({
        contractAddress: metadata.contractAddress,
        chainId: metadata.chainId,
        metadataStatus: metadata.metadataStatus,
        reconciliationStatus: metadata.reconciliationStatus,
      });
    } catch {
      return reply.status(503).send({
        message: "Vault details could not be saved yet.",
      });
    }
  });
};
