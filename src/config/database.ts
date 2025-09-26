import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { createClient } from "@libsql/client";

export interface DatabaseConnection {
  run(sql: string, ...params: any[]): Promise<any>;
  get<T = any>(sql: string, ...params: any[]): Promise<T | undefined>;
  all<T = any>(sql: string, ...params: any[]): Promise<T>;
  exec(sql: string): Promise<void>;
  close(): Promise<void>;
}

export async function connectDatabase(): Promise<DatabaseConnection> {
  if (process.env.NODE_ENV === "production") {
    const client = createClient({
      url: process.env.DATABASE_URL!,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    });

    return {
      async all(sql, ...params) {
        const flatParams = params.flat(); // garante que não vai virar array dentro de array
        const result = await client.execute({ sql, args: flatParams });
        return result.rows as any;
      },

      async get(sql, ...params) {
        const flatParams = params.flat();
        const result = await client.execute({ sql, args: flatParams });
        return result.rows[0] as any;
      },

      async run(sql, ...params) {
        const flatParams = params.flat();
        const result = await client.execute({ sql, args: flatParams });

        return {
          lastID: result.lastInsertRowid,
          changes: result.rowsAffected,
        };
      },

      async exec(sql: string) {
        await client.execute(sql);
      },
      async close() {
        if (typeof (client as any).close === "function") {
          await (client as any).close();
        }
      },
    };
  }

  const db = await open({
    filename: process.env.DATABASE_PATH || "./dev.db",
    driver: sqlite3.Database,
  });

  return {
    run: (sql, ...params) => db.run(sql, ...params),
    get: (sql, ...params) => db.get(sql, ...params),
    all: (sql, ...params) => db.all(sql, ...params),
    exec: (sql) => db.exec(sql),
    close: () => db.close(),
  };
}
