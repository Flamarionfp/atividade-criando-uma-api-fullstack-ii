import { DatabaseConnection } from "../../src/config/database";
import { products } from "./fixtures/products";

export async function createProducts(db: DatabaseConnection) {
  for (const product of products) {
    await db.exec(
      `INSERT INTO products (name, price) VALUES ('${product.name}', ${product.price});`
    );
  }

  console.log(`Produtos criados com sucesso.`);
}
