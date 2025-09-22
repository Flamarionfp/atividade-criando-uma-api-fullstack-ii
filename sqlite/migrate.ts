import "dotenv/config";

import { readdir } from "fs/promises";
import path from "path";
import { connectDatabase } from "../src/config/database";

async function runMigrations() {
  const db = await connectDatabase();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      name TEXT PRIMARY KEY,
      run_on DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const migrationsDir = path.join(__dirname, "migrations");
  const files = (await readdir(migrationsDir))
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"))
    .sort();

  for (const file of files) {
    const migrationName = file;

    const alreadyRun = await db.get(
      `SELECT name FROM migrations WHERE name = ?`,
      migrationName
    );

    if (alreadyRun) {
      console.log(`${migrationName} já foi executada.`);
      continue;
    }

    const { up } = await import(path.join(migrationsDir, file));

    console.log(`Executando ${migrationName}...`);

    await up(db);

    await db.run(`INSERT INTO migrations (name) VALUES (?)`, migrationName);

    console.log(`${migrationName} executada com sucesso.`);
  }

  await db.close();
}

runMigrations().catch((err) => {
  console.error("Erro ao rodar migrations:", err);
});
