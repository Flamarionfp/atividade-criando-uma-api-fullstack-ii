import "dotenv/config";

import { createUserAdmin } from "./seeds/admin";
import { connectDatabase, DatabaseConnection } from "../src/config/database";

export async function execute(db: DatabaseConnection) {
  await createUserAdmin(db);
}

(async () => {
  try {
    const db = await connectDatabase();

    await execute(db);

    await db.close();
  } catch (error) {
    console.error("Erro ao executar o seed:", error);
  }
})();
