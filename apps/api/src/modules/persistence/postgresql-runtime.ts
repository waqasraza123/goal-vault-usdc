import type { PostgresqlQueryExecutor, PostgresqlQueryResult, PostgresqlQueryValue } from "./postgresql-store";

export interface PostgresqlPoolQueryTarget {
  query<Row>(sql: string, values?: readonly PostgresqlQueryValue[]): Promise<PostgresqlQueryResult<Row>>;
}

export interface PostgresqlPoolClient extends PostgresqlPoolQueryTarget {
  release(): void;
}

export interface PostgresqlPool extends PostgresqlPoolQueryTarget {
  connect(): Promise<PostgresqlPoolClient>;
  end(): Promise<void>;
}

export interface PostgresqlPooledQueryExecutorOptions {
  pool: PostgresqlPool;
}

export class PostgresqlTransactionRollbackError extends Error {
  readonly operationCause: unknown;
  readonly rollbackCause: unknown;

  constructor(operationCause: unknown, rollbackCause: unknown) {
    super("PostgreSQL transaction failed and rollback failed.");
    this.name = "PostgresqlTransactionRollbackError";
    this.operationCause = operationCause;
    this.rollbackCause = rollbackCause;
  }
}

class PostgresqlTransactionClientExecutor implements PostgresqlQueryExecutor {
  private readonly client: PostgresqlPoolQueryTarget;

  constructor(client: PostgresqlPoolQueryTarget) {
    this.client = client;
  }

  async query<Row>(sql: string, values?: readonly PostgresqlQueryValue[]): Promise<PostgresqlQueryResult<Row>> {
    return this.client.query<Row>(sql, values);
  }

  async transaction<Result>(operation: (executor: PostgresqlQueryExecutor) => Promise<Result>): Promise<Result> {
    return operation(this);
  }
}

export class PostgresqlPooledQueryExecutor implements PostgresqlQueryExecutor {
  private readonly pool: PostgresqlPool;

  constructor(options: PostgresqlPooledQueryExecutorOptions) {
    this.pool = options.pool;
  }

  async query<Row>(sql: string, values?: readonly PostgresqlQueryValue[]): Promise<PostgresqlQueryResult<Row>> {
    return this.pool.query<Row>(sql, values);
  }

  async transaction<Result>(operation: (executor: PostgresqlQueryExecutor) => Promise<Result>): Promise<Result> {
    const client = await this.pool.connect();
    const executor = new PostgresqlTransactionClientExecutor(client);
    let transactionStarted = false;

    try {
      await client.query("BEGIN");
      transactionStarted = true;

      const result = await operation(executor);

      await client.query("COMMIT");
      transactionStarted = false;

      return result;
    } catch (error) {
      if (transactionStarted) {
        try {
          await client.query("ROLLBACK");
        } catch (rollbackError) {
          throw new PostgresqlTransactionRollbackError(error, rollbackError);
        }
      }

      throw error;
    } finally {
      client.release();
    }
  }

  async close() {
    await this.pool.end();
  }
}
