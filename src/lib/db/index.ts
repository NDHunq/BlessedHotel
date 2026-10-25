import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/lib/db/schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

// Giữ một kết nối duy nhất khi dev (hot reload tạo lại module nhiều lần)
const globalForDb = globalThis as unknown as { db?: Db };

/**
 * Kết nối PostgreSQL (biến môi trường DATABASE_URL). Tạo khi dùng lần đầu, nên `next build` không cần database
 * miễn là mọi chỗ đọc dữ liệu đều chạy lúc có request (xem lib/news.ts).
 */
export function getDb(): Db {
  if (!globalForDb.db) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("Thiếu biến môi trường DATABASE_URL");
    globalForDb.db = drizzle(postgres(url, { max: 10 }), { schema });
  }
  return globalForDb.db;
}
