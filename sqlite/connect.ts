import "dotenv/config";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

export async function connectDB() {
  const db = await open({
    filename: `${process.env.DATABASE_PATH}`,
    driver: sqlite3.Database,
  });

  return db;
}
