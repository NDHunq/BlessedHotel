/**
 * Kiểu dữ liệu và kiểm tra dữ liệu cho trình soạn bài ở trang quản trị (dùng chung cho client và Server Action).
 * Đọc / ghi database nằm ở lib/news.ts.
 */
import { locales, type Locale } from "@/i18n/config";
import type { PostContent, PostStatus } from "@/lib/news";

export type DraftContent = PostContent;

export type PostDraft = {
  category: string;
  status: PostStatus;
  date: string;
  featured: boolean;
  image: string;
  content: Record<Locale, DraftContent>;
};

export type KeywordIndex = Record<Locale, { id: number; keyword: string; title: string }[]>;

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
export const newPostDraft = (category: string): PostDraft => ({
  category,
  status: "draft",
  date: "",
  featured: false,
  image: "",
  content: Object.fromEntries(locales.map((l) => [l, emptyContent()])) as Record<Locale, DraftContent>,
});

/** Bản ngôn ngữ đủ để đăng khi có tiêu đề và tóm tắt */
export const isContentComplete = (c: DraftContent) => c.title.trim() !== "" && c.excerpt.trim() !== "";

/** Ngôn ngữ còn thiếu tiêu đề hoặc tóm tắt */
export const missingLocales = (draft: PostDraft) => locales.filter((l) => !isContentComplete(draft.content[l]));

const LIMITS = { title: 200, excerpt: 600, body: 200_000, keyPoint: 300, keyPoints: 10, seo: 400, image: 2000 };

/** Link ảnh hợp lệ để lưu: đường dẫn trong site hoặc http(s); không nhận blob:/data:/javascript: */
export const isStorableImage = (src: string) => src === "" || /^(https?:\/\/|\/(?!\/))/i.test(src);

/**
 * Chuẩn hoá + kiểm tra dữ liệu gửi lên Server Action (không tin dữ liệu từ trình duyệt).
 * Trả về bản đã làm sạch, hoặc `null` nếu sai cấu trúc / quá dài.
 */
export function sanitizeDraft(input: unknown): PostDraft | null {
  if (!input || typeof input !== "object") return null;
  const d = input as Record<string, unknown>;
  const str = (v: unknown, max: number) => (typeof v === "string" && v.length <= max ? v : null);

  const category = str(d.category, 64);
  const date = str(d.date, 10);
  const image = str(d.image, LIMITS.image)?.trim() ?? null;
  if (!category || date === null || image === null || !isStorableImage(image)) return null;
  if (date !== "" && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)))) return null;
  if (d.status !== "draft" && d.status !== "published") return null;
  if (typeof d.featured !== "boolean" || !d.content || typeof d.content !== "object") return null;

  const content = {} as Record<Locale, DraftContent>;
  for (const l of locales) {
    const c = (d.content as Record<string, unknown>)[l] as Record<string, unknown> | undefined;
    if (!c) return null;
    const title = str(c.title, LIMITS.title);
    const excerpt = str(c.excerpt, LIMITS.excerpt);
    const body = str(c.body, LIMITS.body);
    const focusKeyword = str(c.focusKeyword, LIMITS.seo);
    const seoTitle = str(c.seoTitle, LIMITS.seo);
    const metaDescription = str(c.metaDescription, LIMITS.seo);
    const keyPoints = Array.isArray(c.keyPoints) && c.keyPoints.length <= LIMITS.keyPoints ? c.keyPoints.map((p) => str(p, LIMITS.keyPoint)) : null;
    if ([title, excerpt, body, focusKeyword, seoTitle, metaDescription].some((v) => v === null) || !keyPoints || keyPoints.some((p) => p === null)) return null;
    content[l] = {
      title: title!.trim(),
      excerpt: excerpt!.trim(),
      body: body!,
      focusKeyword: focusKeyword!.trim(),
      seoTitle: seoTitle!.trim(),
      metaDescription: metaDescription!.trim(),
      keyPoints: keyPoints as string[],
    };
  }
  return { category, status: d.status, date, featured: d.featured, image, content };
}
