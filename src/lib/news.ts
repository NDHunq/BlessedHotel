/**
 * Đọc / ghi tin tức và chuyên mục trong database.
 *
 * Trang công khai: hàm `get*` gọi `connection()` trước (để `next build` không truy cập database, nội dung luôn lấy
 * từ database thật trên server), rồi đọc qua hàm `"use cache"` gắn thẻ `NEWS_TAG`: kết quả được giữ trong bộ nhớ
 * server cho tới khi trang quản trị lưu thay đổi và gọi `updateTag(NEWS_TAG)`. Chỉ lấy bài `published` có ngày
 * và có tiêu đề ở ngôn ngữ đang xem. Nơi gọi phải nằm trong `<Suspense>`.
 *
 * Trang quản trị: hàm `admin*` luôn đọc trực tiếp (không cache).
 */
import "server-only";
import { and, asc, count, desc, eq, inArray, isNotNull, ne } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { connection } from "next/server";
import { locales, type Locale } from "@/i18n/config";
import { getDb } from "@/lib/db";
import { categories, categoryTranslations, posts, postTranslations } from "@/lib/db/schema";

export const NEWS_TAG = "news";

export type PostStatus = "draft" | "published";

export type PostContent = {
  title: string;
  excerpt: string;
  keyPoints: string[];
  /** Markdown (lib/markdown.ts) */
  body: string;
  focusKeyword: string;
  seoTitle: string;
  metaDescription: string;
};

export type PublicPost = PostContent & {
  id: number;
  category: string;
  categoryLabel: string;
  date: string;
  featured: boolean;
  image: string;
};

export type PublicCategory = { id: string; label: string; image: string | null };

/* ------------------------------------------------------------------ Trang công khai */

async function cachedPublishedPosts(locale: Locale): Promise<PublicPost[]> {
  "use cache";
  cacheTag(NEWS_TAG);
  cacheLife("max");

  const rows = await getDb()
    .select({
      id: posts.id,
      category: posts.categoryId,
      categoryLabel: categoryTranslations.name,
      date: posts.date,
      featured: posts.featured,
      image: posts.coverImage,
      title: postTranslations.title,
      excerpt: postTranslations.excerpt,
      keyPoints: postTranslations.keyPoints,
      body: postTranslations.body,
      focusKeyword: postTranslations.focusKeyword,
      seoTitle: postTranslations.seoTitle,
      metaDescription: postTranslations.metaDescription,
    })
    .from(posts)
    .innerJoin(postTranslations, and(eq(postTranslations.postId, posts.id), eq(postTranslations.locale, locale)))
    .leftJoin(categoryTranslations, and(eq(categoryTranslations.categoryId, posts.categoryId), eq(categoryTranslations.locale, locale)))
    .where(and(eq(posts.status, "published"), isNotNull(posts.date), ne(postTranslations.title, "")))
    .orderBy(desc(posts.date), desc(posts.id));

  return rows.map((r) => ({ ...r, date: r.date ?? "", categoryLabel: r.categoryLabel ?? r.category }));
}

async function cachedCategories(locale: Locale): Promise<PublicCategory[]> {
  "use cache";
  cacheTag(NEWS_TAG);
  cacheLife("max");

  const [rows, published] = await Promise.all([
    getDb()
      .select({ id: categories.id, label: categoryTranslations.name })
      .from(categories)
      .leftJoin(categoryTranslations, and(eq(categoryTranslations.categoryId, categories.id), eq(categoryTranslations.locale, locale)))
      .orderBy(asc(categories.position), asc(categories.createdAt)),
    cachedPublishedPosts(locale),
  ]);
  // Ảnh đại diện chuyên mục = ảnh bài mới nhất của chuyên mục
  return rows.map((c) => ({ id: c.id, label: c.label ?? c.id, image: published.find((p) => p.category === c.id)?.image ?? null }));
}

/** Bài đã đăng ở một ngôn ngữ, mới nhất trước */
export async function getPublishedPosts(locale: Locale) {
  await connection();
  return cachedPublishedPosts(locale);
}

/** Chuyên mục theo thứ tự hiển thị, kèm tên theo ngôn ngữ và ảnh đại diện */
export async function getCategories(locale: Locale) {
  await connection();
  return cachedCategories(locale);
}

/* ------------------------------------------------------------------ Trang quản trị (không cache) */

export type AdminPost = {
  id: number;
  category: string;
  status: PostStatus;
  date: string;
  featured: boolean;
  image: string;
  content: Record<Locale, PostContent>;
};

export type AdminCategory = { id: string; names: Record<Locale, string>; posts: number };

const emptyContent = (): PostContent => ({ title: "", excerpt: "", keyPoints: ["", "", ""], body: "", focusKeyword: "", seoTitle: "", metaDescription: "" });

async function translationsOf(ids: number[]) {
  if (ids.length === 0) return new Map<number, Record<Locale, PostContent>>();
  const rows = await getDb().select().from(postTranslations).where(inArray(postTranslations.postId, ids));
  const byPost = new Map<number, Record<Locale, PostContent>>();
  for (const id of ids) byPost.set(id, Object.fromEntries(locales.map((l) => [l, emptyContent()])) as Record<Locale, PostContent>);
  for (const r of rows) {
    if (!(locales as readonly string[]).includes(r.locale)) continue;
    const keyPoints = [...r.keyPoints, "", "", ""].slice(0, Math.max(3, r.keyPoints.length));
    byPost.get(r.postId)![r.locale as Locale] = {
      title: r.title,
      excerpt: r.excerpt,
      keyPoints,
      body: r.body,
      focusKeyword: r.focusKeyword,
      seoTitle: r.seoTitle,
      metaDescription: r.metaDescription,
    };
  }
  return byPost;
}

/** Mọi bài (nháp + đã đăng) kèm nội dung 4 ngôn ngữ; bài chưa có ngày lên đầu, rồi theo ngày mới nhất */
export async function adminListPosts(): Promise<AdminPost[]> {
  await connection();
  const rows = await getDb().select().from(posts).orderBy(desc(posts.date), desc(posts.id));
  const content = await translationsOf(rows.map((r) => r.id));
  const list = rows.map((r) => ({
    id: r.id,
    category: r.categoryId,
    status: r.status,
    date: r.date ?? "",
    featured: r.featured,
    image: r.coverImage,
    content: content.get(r.id)!,
  }));
  return [...list.filter((p) => !p.date), ...list.filter((p) => p.date)];
}

export async function adminGetPost(id: number): Promise<AdminPost | undefined> {
  await connection();
  if (!Number.isSafeInteger(id) || id <= 0) return undefined;
  const [row] = await getDb().select().from(posts).where(eq(posts.id, id));
  if (!row) return undefined;
  const content = await translationsOf([id]);
  return { id, category: row.categoryId, status: row.status, date: row.date ?? "", featured: row.featured, image: row.coverImage, content: content.get(id)! };
}

export async function adminListCategories(): Promise<AdminCategory[]> {
  await connection();
  const db = getDb();
  const [rows, names, counts] = await Promise.all([
    db.select().from(categories).orderBy(asc(categories.position), asc(categories.createdAt)),
    db.select().from(categoryTranslations),
    db.select({ id: posts.categoryId, n: count() }).from(posts).groupBy(posts.categoryId),
  ]);
  return rows.map((c) => ({
    id: c.id,
    names: Object.fromEntries(locales.map((l) => [l, names.find((n) => n.categoryId === c.id && n.locale === l)?.name ?? ""])) as Record<Locale, string>,
    posts: counts.find((x) => x.id === c.id)?.n ?? 0,
  }));
}

/** Từ khoá chính của các bài (trừ `excludeId`) theo ngôn ngữ, để bộ chấm SEO cảnh báo trùng */
export async function adminKeywordIndex(excludeId?: number) {
  await connection();
  const rows = await getDb()
    .select({ id: postTranslations.postId, locale: postTranslations.locale, keyword: postTranslations.focusKeyword, title: postTranslations.title })
    .from(postTranslations)
    .where(ne(postTranslations.focusKeyword, ""));
  return Object.fromEntries(
    locales.map((l) => [l, rows.filter((r) => r.locale === l && r.id !== excludeId).map(({ id, keyword, title }) => ({ id, keyword, title }))]),
  ) as Record<Locale, { id: number; keyword: string; title: string }[]>;
}

/* ------------------------------------------------------------------ Ghi (gọi từ Server Action đã kiểm tra đăng nhập) */

export type PostInput = Omit<AdminPost, "id">;

/** Tạo bài mới (`id` không có) hoặc cập nhật bài; trả về id */
export async function writePost(input: PostInput, id?: number) {
  return getDb().transaction(async (tx) => {
    const values = {
      categoryId: input.category,
      status: input.status,
      date: input.date || null,
      featured: input.featured,
      coverImage: input.image,
      updatedAt: new Date(),
    };
    let postId = id;
    if (postId) {
      const updated = await tx.update(posts).set(values).where(eq(posts.id, postId)).returning({ id: posts.id });
      if (updated.length === 0) throw new Error("NOT_FOUND");
    } else {
      [{ id: postId }] = await tx.insert(posts).values(values).returning({ id: posts.id });
    }
    for (const locale of locales) {
      const c = input.content[locale];
      const row = { ...c, keyPoints: c.keyPoints.map((p) => p.trim()).filter(Boolean) };
      await tx
        .insert(postTranslations)
        .values({ postId: postId!, locale, ...row })
        .onConflictDoUpdate({ target: [postTranslations.postId, postTranslations.locale], set: row });
    }
    return postId!;
  });
}

export async function removePost(id: number) {
  await getDb().delete(posts).where(eq(posts.id, id));
}

export async function writeCategory(id: string, names: Record<Locale, string>, isNew: boolean) {
  await getDb().transaction(async (tx) => {
    if (isNew) {
      const [{ max }] = await tx.select({ max: count() }).from(categories);
      await tx.insert(categories).values({ id, position: max });
    }
    for (const locale of locales) {
      await tx
        .insert(categoryTranslations)
        .values({ categoryId: id, locale, name: names[locale] })
        .onConflictDoUpdate({ target: [categoryTranslations.categoryId, categoryTranslations.locale], set: { name: names[locale] } });
    }
  });
}

/** Xoá chuyên mục; còn bài thì trả về số bài và không xoá */
export async function removeCategory(id: string) {
  const db = getDb();
  const [{ n }] = await db.select({ n: count() }).from(posts).where(eq(posts.categoryId, id));
  if (n > 0) return n;
  await db.delete(categories).where(eq(categories.id, id));
  return 0;
}

export async function categoryExists(id: string) {
  const [row] = await getDb().select({ id: categories.id }).from(categories).where(eq(categories.id, id));
  return Boolean(row);
}
