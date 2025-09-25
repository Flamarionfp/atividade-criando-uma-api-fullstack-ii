import { connectDatabase, DatabaseConnection } from "../../config/database";
import { CartDTO } from "../../dtos/cart.dto";
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

  findByUserId = async (userId: number) => {
    const query = `
      SELECT
        c.id AS cartId,
        c.product_id AS productId,
        c.user_id AS userId,
        p.name AS productName,
        p.price AS productPrice
      FROM
        cart c
      JOIN
        products p ON c.product_id = p.id
      WHERE
        c.user_id = ?
    `;

    const rows = await this.connection.all<CartDTO[]>(query, userId);

    return rows;
  };
}
