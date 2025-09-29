import { connectDatabase, DatabaseConnection } from "../../config/database";
import {
  CreateProductDTO,
  FilterProductsDTO,
  ProductDTO,
  UpdateProductDTO,
} from "../../dtos/product.dto";
import { ProductRepository } from "../product.repository";

export class ProductSqliteRepository implements ProductRepository {
  private connection!: DatabaseConnection;

  async init(): Promise<void> {
    this.connection = await connectDatabase();
  }

  findByName = async (name: string) => {
    const row = await this.connection.get<any>(
      `SELECT * FROM products WHERE name = ?`,
      name
    );

    if (row) {
      return {
        ...row,
        specifications: JSON.parse(row.specifications || "[]"),
      } as ProductDTO;
    }

    return row;
  };

  findById = async (id: number) => {
    const row = await this.connection.get<any>(
      `SELECT * FROM products WHERE id = ?`,
      id
    );

    if (row) {
      return {
        ...row,
        specifications: JSON.parse(row.specifications || "[]"),
      } as ProductDTO;
    }

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

    const whereClause =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const rows = await this.connection.all<any[]>(
      `SELECT * FROM products ${whereClause}`,
      params
    );

    return rows.map((row) => ({
      ...row,
      specifications: JSON.parse(row.specifications || "[]"),
    })) as ProductDTO[];
  };

  update = async (id: number, product: UpdateProductDTO) => {
    const setClauses: string[] = [];
    const params: any[] = [];

    const allowedFields: (keyof UpdateProductDTO)[] = [
      "name",
      "price",
      "trade",
      "model",
      "year",
      "specifications",
      "thumb",
    ];

    for (const [key, value] of Object.entries(product)) {
      if (
        value !== undefined &&
        allowedFields.includes(key as keyof UpdateProductDTO)
      ) {
        setClauses.push(`${key} = ?`);
        if (key === "specifications") {
          params.push(JSON.stringify(value));
        } else {
          params.push(value);
        }
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
      `INSERT INTO products (name, price, trade, model, year, specifications, thumb) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      product.name,
      product.price,
      product.trade,
      product.model,
      product.year,
      JSON.stringify(product.specifications),
      product.thumb
    );

    const id =
      typeof result.lastID === "bigint"
        ? result.lastID.toString()
        : result.lastID;

    return {
      id,
      name: product.name,
      price: product.price,
      trade: product.trade,
      model: product.model,
      year: product.year,
      specifications: product.specifications,
      thumb: product.thumb,
    };
  };
}
