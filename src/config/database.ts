import { open } from "sqlite";
import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";

export async function connectDatabase() {
  const dbPath = process.env.DATABASE_PATH ?? "";

  if (!fs.existsSync(dbPath)) {
    console.error("Banco de dados não encontrado em:", dbPath);

    throw new Error("Banco de dados não encontrado");
  }

  console.log("Conectando ao banco de dados em:", dbPath);

  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}
