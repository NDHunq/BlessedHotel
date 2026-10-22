/**
 * Dữ liệu cho trình soạn bài trong trang quản trị: một bài gồm thiết lập chung (chuyên mục, ngày, ảnh…)
 * và nội dung riêng cho từng ngôn ngữ. Hiện đọc từ site.ts + dictionary; sau này thay bằng database.
 */
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/server";
import { news, type NewsCategory } from "@/lib/site";

export type DraftContent = {
  title: string;
  excerpt: string;
  keyPoints: string[];
  /** Mỗi mục: tiêu đề (có thể trống) + các đoạn văn cách nhau bằng một dòng trống */
  sections: { heading: string; text: string }[];
};

export type PostDraft = {
  category: NewsCategory;
  date: string;
  featured: boolean;
  image: string;
  content: Record<Locale, DraftContent>;
};

const emptyContent = (): DraftContent => ({ title: "", excerpt: "", keyPoints: ["", "", ""], sections: [{ heading: "", text: "" }] });

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
        sections: text.body.map((s) => ({ heading: s.heading ?? "", text: s.paragraphs.join("\n\n") })),
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
