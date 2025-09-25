import { connectDatabase, DatabaseConnection } from "../../config/database";
import { CartRepository } from "../cart.repository";

export class CartSqliteRepository implements CartRepository {
  private connection!: DatabaseConnection;

  async init(): Promise<void> {
    this.connection = await connectDatabase();
  }

  add = async (productId: number, userId: number) => {
    await this.connection.run(
      `INSERT INTO cart (product_id, user_id) VALUES (?, ?)`,
      productId,
      userId
    );
  };
}
