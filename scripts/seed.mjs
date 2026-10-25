// Nạp dữ liệu ban đầu từ db/seed.json (5 chuyên mục, 6 bài viết đủ 4 ngôn ngữ) vào database TRỐNG.
// Database đã có bài viết thì bỏ qua (không ghi đè). Dùng: npm run db:seed
import { readFileSync } from "node:fs";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("Thiếu biến môi trường DATABASE_URL");
const sql = postgres(url, { max: 1 });
const seed = JSON.parse(readFileSync(new URL("../db/seed.json", import.meta.url), "utf8"));

const [{ count }] = await sql`select count(*)::int as count from posts`;
if (count > 0) {
  console.log(`Database đã có ${count} bài viết, bỏ qua seed.`);
} else {
  await sql.begin(async (tx) => {
    for (const c of seed.categories) {
      await tx`insert into categories (id, position) values (${c.id}, ${c.position}) on conflict (id) do nothing`;
      for (const [locale, name] of Object.entries(c.names)) {
        await tx`insert into category_translations (category_id, locale, name) values (${c.id}, ${locale}, ${name}) on conflict do nothing`;
      }
    }
    for (const p of seed.posts) {
      await tx`insert into posts (id, category_id, status, date, featured, cover_image, legacy_slug)
               values (${p.id}, ${p.category}, ${p.status}, ${p.date}, ${p.featured}, ${p.image}, ${p.legacySlug})`;
      for (const [locale, t] of Object.entries(p.translations)) {
        await tx`insert into post_translations (post_id, locale, title, excerpt, key_points, body, focus_keyword, seo_title, meta_description)
                 values (${p.id}, ${locale}, ${t.title}, ${t.excerpt}, ${tx.json(t.keyPoints)}, ${t.body}, ${t.focusKeyword}, ${t.seoTitle}, ${t.metaDescription})`;
      }
    }
    // Bài mới tạo sau sẽ có id tiếp theo
    await tx`select setval(pg_get_serial_sequence('posts', 'id'), (select max(id) from posts))`;
  });
  console.log(`Đã nạp ${seed.categories.length} chuyên mục và ${seed.posts.length} bài viết.`);
}
await sql.end();
