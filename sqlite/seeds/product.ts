import { DatabaseConnection } from "../../src/config/database";
import { products } from "./fixtures/products";

export async function createProducts(db: DatabaseConnection) {
  for (const product of products) {
    await db.run(
      `INSERT INTO products (name, price, trade, model, year, specifications, thumb) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      product.name,
      product.price,
      product.trade,
      product.model,
      product.year,
      JSON.stringify(product.specifications),
      product.thumb
    );
  }

  console.log(`Produtos criados com sucesso.`);
}
