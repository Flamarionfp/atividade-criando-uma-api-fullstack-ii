import { connectDatabase, DatabaseConnection } from "../../config/database";
import { UserRepository } from "../user.repository";
import {
  CreateUserDTO,
  PresentationUserDTO,
  UpdateUserDTO,
  UserDTO,
} from "../../dtos/user.dto";

export class UserSqliteRepository implements UserRepository {
  private connection!: DatabaseConnection;

  async init(): Promise<void> {
    this.connection = await connectDatabase();
  }

  findByEmail = async (email: string) => {
    const row = await this.connection.get(
      `SELECT * FROM users WHERE email = ?`,
      email
    );

    return row;
  };

  findById = async (id: number): Promise<UserDTO> => {
    const row = await this.connection.get(
      `SELECT * FROM users WHERE id = ?`,
      id
    );

    return row;
  };

  findAll = async () => {
    const rows = await this.connection.all<PresentationUserDTO[]>(
      `SELECT id, name, email, role FROM users`
    );

    return rows;
  };

  update = async (id: number, user: UpdateUserDTO) => {
    const setClauses: string[] = [];
    const params: any[] = [];

    const allowedFields: (keyof CreateUserDTO)[] = ["name", "email", "role"];

    for (const [key, value] of Object.entries(user)) {
      if (
        value !== undefined &&
        allowedFields.includes(key as keyof CreateUserDTO)
      ) {
        setClauses.push(`${key} = ?`);
        params.push(value);
      }
    }

    if (setClauses.length === 0) {
      throw new Error("Nenhum campo fornecido para atualização.");
    }

    params.push(id);

    await this.connection.run(
      `UPDATE users SET ${setClauses.join(", ")} WHERE id = ?`,
      params
    );

    const updatedUser = await this.findById(id);

    const { password, ...rest } = updatedUser;

    return rest!;
  };

  delete = async (id: number) => {
    await this.connection.run(`DELETE FROM users WHERE id = ?`, id);
  };

  create = async (user: CreateUserDTO) => {
    const result = await this.connection.run(
      `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
      user.name,
      user.email,
      user.password,
      user.role
    );

    return {
      id: result.lastID!,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  };
}
