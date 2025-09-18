import { Database } from "sqlite";
import bycript from "bcrypt";

export async function createUserAdmin(db: Database) {
  const password = "admin1";

  const hashedPassword = await bycript.hash(password, 10);

  await db.exec(`
    INSERT INTO users (name, email, password, role) VALUES ('Administrador', 'administrador@example.com', '${hashedPassword}', 'admin');
  `);

  console.log(`Usuário administrador criado com sucesso.`);
}
