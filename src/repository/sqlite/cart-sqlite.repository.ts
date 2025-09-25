import { connectDatabase, DatabaseConnection } from "../../config/database";
import { CartDTO } from "../../dtos/cart.dto";
import { CartRepository } from "../cart.repository";

export class CartSqliteRepository implements CartRepository {
  private connection!: DatabaseConnection;

  async init(): Promise<void> {
    this.connection = await connectDatabase();
  }

  find = async (id: number) => {
    const query = `
      ${this.getCartQueryBuilder()}
      WHERE
         c.id = ?`;

    const row = await this.connection.get<CartDTO>(query, id);

    return row;
  };

  findByUserId = async (userId: number) => {
    const query = `
      ${this.getCartQueryBuilder()}
      WHERE
        c.user_id = ?
    `;

    const rows = await this.connection.all<CartDTO[]>(query, userId);

    return rows;
  };

  findItemByProductAndUser = async (productId: number, userId: number) => {
    const query = `
      ${this.getCartQueryBuilder()}
      WHERE
        c.product_id = ? AND c.user_id = ?
    `;

    const rows = await this.connection.all<CartDTO[]>(query, productId, userId);

    return rows;
  };

  private getCartQueryBuilder() {
    return `SELECT
        c.id AS cartId,
        c.product_id AS productId,
        c.user_id AS userId,
        p.name AS productName,
        p.price AS productPrice
      FROM
        cart c
      JOIN
        products p ON c.product_id = p.id
    `;
  }

  add = async (productId: number, userId: number) => {
    await this.connection.run(
      `INSERT INTO cart (product_id, user_id) VALUES (?, ?)`,
      productId,
      userId
    );
  };

  remove = async (id: number, userId: number) => {
    await this.connection.run(
      `DELETE FROM cart WHERE id = ? AND user_id = ?`,
      id,
      userId
    );
  };

  clear = async (userId: number) => {
    await this.connection.run(`DELETE FROM cart WHERE user_id = ?`, userId);
  };
}
