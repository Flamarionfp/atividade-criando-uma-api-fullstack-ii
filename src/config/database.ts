import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function connectDatabase() {
  return open({
    filename: `${process.env.DATABASE_PATH}`,
    driver: sqlite3.Database,
  });
}
