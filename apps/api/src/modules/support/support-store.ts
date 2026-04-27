import fs from "node:fs/promises";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

import type { SupportRequestRecord } from "@goal-vault/shared";

import type { ApiSupportStore } from "../persistence/ports";

export class SupportStore implements ApiSupportStore {
  private readonly dbPath: string;
  private database: DatabaseSync | null = null;

  constructor(dataDir: string) {
    this.dbPath = path.join(dataDir, "goal-vault-analytics.sqlite");
  }

  async create(record: SupportRequestRecord) {
    const database = await this.initialize();
    const statement = database.prepare(
      `INSERT INTO support_requests (
        id,
        status,
        category,
        priority,
        subject,
        message,
        reporter_wallet,
        contact_email,
        route,
        environment,
        deployment_target,
        chain_id,
        wallet_status,
        vault_address,
        user_agent,
        requester_ip_hash,
        created_at
      ) VALUES (
        @id,
        @status,
        @category,
        @priority,
        @subject,
        @message,
        @reporterWallet,
        @contactEmail,
        @route,
        @environment,
        @deploymentTarget,
        @chainId,
        @walletStatus,
        @vaultAddress,
        @userAgent,
        @requesterIpHash,
        @createdAt
      )`,
    );

    statement.run({
      id: record.id,
      status: record.status,
      category: record.category,
      priority: record.priority,
      subject: record.subject,
      message: record.message,
      reporterWallet: record.reporterWallet ?? null,
      contactEmail: record.contactEmail ?? null,
      route: record.context.route,
      environment: record.context.environment,
      deploymentTarget: record.context.deploymentTarget,
      chainId: record.context.chainId ?? null,
      walletStatus: record.context.walletStatus ?? null,
      vaultAddress: record.context.vaultAddress ?? null,
      userAgent: record.userAgent,
      requesterIpHash: record.requesterIpHash,
      createdAt: record.createdAt,
    });
  }

  async initialize() {
    if (this.database) {
      return this.database;
    }

    await fs.mkdir(path.dirname(this.dbPath), { recursive: true });

    const database = new DatabaseSync(this.dbPath);
    database.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA synchronous = NORMAL;
      CREATE TABLE IF NOT EXISTS support_requests (
        id TEXT PRIMARY KEY,
        status TEXT NOT NULL,
        category TEXT NOT NULL,
        priority TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        reporter_wallet TEXT,
        contact_email TEXT,
        route TEXT,
        environment TEXT NOT NULL,
        deployment_target TEXT NOT NULL,
        chain_id INTEGER,
        wallet_status TEXT,
        vault_address TEXT,
        user_agent TEXT,
        requester_ip_hash TEXT,
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS support_requests_status_created_idx ON support_requests (status, created_at);
      CREATE INDEX IF NOT EXISTS support_requests_priority_created_idx ON support_requests (priority, created_at);
      CREATE INDEX IF NOT EXISTS support_requests_wallet_idx ON support_requests (reporter_wallet, created_at);
      CREATE INDEX IF NOT EXISTS support_requests_vault_idx ON support_requests (vault_address, created_at);
    `);

    this.database = database;
    return database;
  }

  async close() {
    if (!this.database) {
      return;
    }

    this.database.close();
    this.database = null;
  }
}
