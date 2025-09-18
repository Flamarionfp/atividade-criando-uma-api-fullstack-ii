import "dotenv/config";
import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import { connectDB } from "./connect";
import { createUserAdmin } from "./seeds/admin";

export async function execute(db: Database) {
  await createUserAdmin(db);
}

(async () => {
  try {
    const db = await connectDB();

    await execute(db);

    await db.close();
  } catch (error) {
    console.error("Erro ao executar o seed:", error);
  }
})();
