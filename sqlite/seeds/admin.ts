import bycript from "bcrypt";
import { DatabaseConnection } from "../../src/config/database";

export async function createUserAdmin(db: DatabaseConnection) {
  const password = "admin1";

  const hashedPassword = await bycript.hash(password, 10);

  await db.exec(`
    INSERT INTO users (name, email, password, role) VALUES ('Administrador', 'administrador@example.com', '${hashedPassword}', 'admin');
  `);

  console.log(`Usuário administrador criado com sucesso.`);
}
