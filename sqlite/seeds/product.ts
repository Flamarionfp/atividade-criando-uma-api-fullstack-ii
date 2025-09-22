import { DatabaseConnection } from "../../src/config/database";
import { products } from "./fixtures/products";

export async function createProducts(db: DatabaseConnection) {
  for (const product of products) {
    await db.exec(
      `INSERT INTO products (name, price, quantity) VALUES ('${product.name}', ${product.price}, ${product.quantity});`
    );
  }

  console.log(`Produtos criados com sucesso.`);
}
