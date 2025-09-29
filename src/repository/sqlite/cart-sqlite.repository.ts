import { connectDatabase, DatabaseConnection } from "../../config/database";
import { CartDTO } from "../../dtos/cart.dto";
import { CartRepository } from "../cart.repository";

export class CartSqliteRepository implements CartRepository {
  private connection!: DatabaseConnection;

  async init(): Promise<void> {
    this.connection = await connectDatabase();
  }

  findById = async (id: number) => {
    const query = `
      ${this.getFullCartQueryBuilder()}
      WHERE
         c.id = ?`;

    const row = await this.connection.get<any>(query, id);

    if (row) {
      return {
        ...row,
        productSpecifications: JSON.parse(row.productSpecifications || "[]"),
      } as CartDTO;
    }

    return row;
  };

  findByUserId = async (userId: number) => {
    const query = `
      ${this.getCartQueryBuilder()}
      WHERE
        c.user_id = ?
    `;

    const rows = await this.connection.all<any[]>(query, userId);

    return rows.map((row) => ({
      id: row.cartId,
      userId: row.userId,
      productId: row.productId,
      productName: row.productName,
      productPrice: row.productPrice,
      productThumb: row.productThumb,
    })) as CartDTO[];
  };

  findByUserIdForCheckout = async (userId: number) => {
    const query = `
      ${this.getFullCartQueryBuilder()}
      WHERE
        c.user_id = ?
    `;

    const rows = await this.connection.all<any[]>(query, userId);

    return rows.map((row) => ({
      ...row,
      productSpecifications: JSON.parse(row.productSpecifications || "[]"),
    })) as CartDTO[];
  };

  findItemByProductAndUser = async (productId: number, userId: number) => {
    const query = `
      ${this.getFullCartQueryBuilder()}
      WHERE
        c.product_id = ? AND c.user_id = ?
    `;

    const rows = await this.connection.all<any[]>(query, productId, userId);

    return rows.map((row) => ({
      ...row,
      productSpecifications: JSON.parse(row.productSpecifications || "[]"),
    })) as CartDTO[];
  };

  private getCartQueryBuilder() {
    return `SELECT
        c.id AS cartId,
        c.product_id AS productId,
        c.user_id AS userId,
        p.name AS productName,
        p.price AS productPrice,
        p.thumb AS productThumb
      FROM
        cart c
      JOIN
        products p ON c.product_id = p.id
    `;
  }

  private getFullCartQueryBuilder() {
    return `SELECT
        c.id AS cartId,
        c.product_id AS productId,
        c.user_id AS userId,
        p.name AS productName,
        p.price AS productPrice,
        p.trade AS productTrade,
        p.model AS productModel,
        p.year AS productYear,
        p.specifications AS productSpecifications,
        p.thumb AS productThumb
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
