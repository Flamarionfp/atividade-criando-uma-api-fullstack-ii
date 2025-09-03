import { Database } from "sqlite";
import { connectDatabase } from "../../config/database";
import {
  CreateProductDTO,
  FilterProductsDTO,
  ProductDTO,
  UpdateProductDTO,
} from "../../dtos/product.dto";
import { ProductRepository } from "../product.repository";

export class ProductSqliteRepository implements ProductRepository {
  private connection!: Database;

  async init(): Promise<void> {
    this.connection = await connectDatabase();
  }

  findByName = async (name: string) => {
    const row = await this.connection.get<ProductDTO>(
      `SELECT * FROM products WHERE name = ?`,
      name
    );

    return row;
  };

  findById = async (id: number) => {
    const row = await this.connection.get<ProductDTO>(
      `SELECT * FROM products WHERE id = ?`,
      id
    );

    return row;
  };

  findAll = async (filters?: FilterProductsDTO) => {
    const whereClauses: string[] = [];
    const params: any[] = [];

    if (filters?.name) {
      whereClauses.push("name LIKE ?");
      params.push(`%${filters.name}%`);
    }

    if (filters?.price !== undefined) {
      whereClauses.push("price = ?");
      params.push(filters.price);
    }

    if (filters?.quantity !== undefined) {
      whereClauses.push("quantity = ?");
      params.push(filters.quantity);
    }

    const whereClause =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const rows = await this.connection.all<ProductDTO[]>(
      `SELECT * FROM products ${whereClause}`,
      params
    );

    return rows;
  };

  update = async (id: number, product: UpdateProductDTO) => {
    const setClauses: string[] = [];
    const params: any[] = [];

    const allowedFields: (keyof UpdateProductDTO)[] = [
      "name",
      "price",
      "quantity",
    ];

    for (const [key, value] of Object.entries(product)) {
      if (
        value !== undefined &&
        allowedFields.includes(key as keyof UpdateProductDTO)
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
      `UPDATE products SET ${setClauses.join(", ")} WHERE id = ?`,
      params
    );

    const updatedProduct = await this.findById(id);

    return updatedProduct!;
  };

  delete = async (id: number) => {
    await this.connection.run(`DELETE FROM products WHERE id = ?`, id);
  };

  create = async (product: CreateProductDTO) => {
    const result = await this.connection.run(
      `INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)`,
      product.name,
      product.price,
      product.quantity
    );

    return {
      id: result.lastID!,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };
  };
}
