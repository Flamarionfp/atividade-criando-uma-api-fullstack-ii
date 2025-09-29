export async function up(db: import("sqlite").Database) {
  await db.exec(`ALTER TABLE products DROP COLUMN quantity;`);
}
