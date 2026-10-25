/**
 * Dữ liệu cho trình soạn bài trong trang quản trị: một bài gồm thiết lập chung (chuyên mục, ngày, ảnh…)
 * và nội dung riêng cho từng ngôn ngữ. Hiện đọc từ site.ts + dictionary; sau này thay bằng database.
 */
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/server";
import { bodyToMarkdown } from "@/lib/markdown";
import { news, type NewsCategory } from "@/lib/site";

export type DraftContent = {
  title: string;
  excerpt: string;
  keyPoints: string[];
  /** Nội dung bài dạng Markdown (xem lib/markdown.ts) */
  body: string;
  /** SEO (lib/seo.ts): từ khoá chính; tiêu đề SEO và mô tả meta để trống thì dùng `title` / `excerpt` */
  focusKeyword: string;
  seoTitle: string;
  metaDescription: string;
};

export type PostDraft = {
  category: NewsCategory;
  date: string;
  featured: boolean;
  image: string;
  content: Record<Locale, DraftContent>;
};

const emptyContent = (): DraftContent => ({
  title: "",
  excerpt: "",
  keyPoints: ["", "", ""],
  body: "",
  focusKeyword: "",
  seoTitle: "",
  metaDescription: "",
});

/** Bài trống cho "Viết bài mới" */
export const newPostDraft = (): PostDraft => ({
  category: "offer",
  date: "",
  featured: false,
  image: "",
  content: Object.fromEntries(locales.map((l) => [l, emptyContent()])) as Record<Locale, DraftContent>,
});

/** Bài có sẵn theo `id`, kèm nội dung đủ 4 ngôn ngữ; không có → undefined */
export async function getPostDraft(id: number): Promise<PostDraft | undefined> {
  const post = news.find((p) => p.id === id);
  if (!post) return undefined;
  const entries = await Promise.all(
    locales.map(async (l) => {
      const text = (await getDictionary(l)).news[post.slug];
      const content: DraftContent = {
        title: text.title,
        excerpt: text.excerpt,
        keyPoints: [...text.keyPoints],
        body: bodyToMarkdown(text.body),
        focusKeyword: text.focusKeyword,
        seoTitle: "",
        metaDescription: "",
      };
      return [l, content] as const;
    }),
  );
  return {
    category: post.category,
    date: post.date,
    featured: post.featured,
    image: post.image,
    content: Object.fromEntries(entries) as Record<Locale, DraftContent>,
  };
}

export type KeywordIndex = Record<Locale, { id: number; keyword: string; title: string }[]>;

/** Từ khoá chính của mọi bài theo từng ngôn ngữ (bỏ bài `excludeId`), để trình soạn cảnh báo trùng từ khoá */
export async function getKeywordIndex(excludeId?: number): Promise<KeywordIndex> {
  const entries = await Promise.all(
    locales.map(async (l) => {
      const dict = await getDictionary(l);
      const list = news.filter((p) => p.id !== excludeId).map((p) => ({ id: p.id, keyword: dict.news[p.slug].focusKeyword, title: dict.news[p.slug].title }));
      return [l, list] as const;
    }),
  );
  return Object.fromEntries(entries) as KeywordIndex;
}
