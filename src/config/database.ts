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
      async run(sql, ...params) {
        await client.execute({ sql, args: params });
      },
      async get(sql, ...params) {
        const result = await client.execute({ sql, args: params });
        return result.rows[0] as any;
      },
      async all(sql, ...params) {
        const result = await client.execute({ sql, args: params });
        return result.rows as any;
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
