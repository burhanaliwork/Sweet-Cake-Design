import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool() {
  if (!pool) {
    const dbUrl = process.env.DATABASE_URL || "";
    const needsSsl =
      dbUrl.includes("neon.tech") ||
      dbUrl.includes("sslmode=require") ||
      process.env.NODE_ENV === "production";

    pool = new Pool({
      connectionString: dbUrl,
      ssl: needsSsl ? { rejectUnauthorized: false } : false,
    });
  }
  return pool;
}

export async function query(sql: string, params?: unknown[]) {
  return getPool().query(sql, params);
}
