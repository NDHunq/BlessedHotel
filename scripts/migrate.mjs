// Áp dụng các migration trong thư mục drizzle/ (chạy ở máy dev và khi khởi động trên server, không cần drizzle-kit).
// Dùng: npm run db:migrate
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("Thiếu biến môi trường DATABASE_URL");
const client = postgres(url, { max: 1 });
await migrate(drizzle(client), { migrationsFolder: new URL("../drizzle", import.meta.url).pathname });
await client.end();
console.log("Đã áp dụng migration.");
