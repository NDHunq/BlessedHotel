/**
 * Cấu trúc database (PostgreSQL, Drizzle ORM). Sửa file này xong chạy `npm run db:generate` để tạo migration
 * trong thư mục drizzle/, rồi `npm run db:migrate` để áp dụng.
 * Nội dung theo ngôn ngữ nằm ở bảng *_translations (khoá chính = id + locale).
 */
import { sql } from "drizzle-orm";
import { boolean, check, date, integer, jsonb, pgTable, primaryKey, serial, text, timestamp } from "drizzle-orm/pg-core";

/** Chuyên mục tin tức; `id` là mã chữ (VD "offer"), không đổi sau khi tạo */
export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const categoryTranslations = pgTable(
  "category_translations",
  {
    categoryId: text("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade", onUpdate: "cascade" }),
    locale: text("locale").notNull(),
    name: text("name").notNull(),
  },
  (t) => [primaryKey({ columns: [t.categoryId, t.locale] })],
);

/**
 * Bài viết. `id` dùng trên URL /news/<id> (không đổi). `date` = ngày đăng hiển thị.
 * `legacySlug`: khoá chữ của bài cũ (URL /tin-tuc/<slug> trước đây), chỉ để tham khảo.
 */
export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    categoryId: text("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict", onUpdate: "cascade" }),
    status: text("status", { enum: ["draft", "published"] }).notNull().default("draft"),
    date: date("date", { mode: "string" }),
    featured: boolean("featured").notNull().default(false),
    coverImage: text("cover_image").notNull().default(""),
    legacySlug: text("legacy_slug"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [check("posts_status_check", sql`${t.status} in ('draft', 'published')`)],
);

/** Nội dung bài theo ngôn ngữ; `body` là Markdown (lib/markdown.ts); 3 trường SEO dùng cho bộ chấm SEO và thẻ meta */
export const postTranslations = pgTable(
  "post_translations",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    title: text("title").notNull().default(""),
    excerpt: text("excerpt").notNull().default(""),
    keyPoints: jsonb("key_points").$type<string[]>().notNull().default([]),
    body: text("body").notNull().default(""),
    focusKeyword: text("focus_keyword").notNull().default(""),
    seoTitle: text("seo_title").notNull().default(""),
    metaDescription: text("meta_description").notNull().default(""),
  },
  (t) => [primaryKey({ columns: [t.postId, t.locale] })],
);

/** Ảnh tải lên từ trang quản trị (lưu ở thư mục uploads/ hoặc Cloudflare R2, xem lib/storage.ts) */
export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  url: text("url").notNull(),
  filename: text("filename").notNull(),
  contentType: text("content_type").notNull(),
  size: integer("size").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
