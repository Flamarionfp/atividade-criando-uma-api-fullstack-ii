export async function up(db: import("sqlite").Database) {
  if (process.env.NODE_ENV !== "production") return Promise.resolve();

  await db.exec(`ALTER TABLE products DROP COLUMN quantity;`);
}
