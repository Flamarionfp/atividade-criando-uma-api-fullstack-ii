export async function up(db: import("sqlite").Database) {
  await db.exec(`
    ALTER TABLE products ADD COLUMN trade TEXT NOT NULL DEFAULT '';
    ALTER TABLE products ADD COLUMN model TEXT NOT NULL DEFAULT '';
    ALTER TABLE products ADD COLUMN year DATE NOT NULL DEFAULT '1900-01-01';
    ALTER TABLE products ADD COLUMN specifications TEXT NOT NULL DEFAULT '[]';
    ALTER TABLE products ADD COLUMN thumb TEXT NOT NULL DEFAULT '';
  `);
}

export async function down(db: import("sqlite").Database) {
  await db.exec(`
    ALTER TABLE products DROP COLUMN trade;
    ALTER TABLE products DROP COLUMN model;
    ALTER TABLE products DROP COLUMN year;
    ALTER TABLE products DROP COLUMN specifications;
    ALTER TABLE products DROP COLUMN thumb;
  `);
}
