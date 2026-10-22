import { notFound } from "next/navigation";
import PostEditor from "@/components/admin/PostEditor";
import { getI18n } from "@/i18n/server";
import { getPostDraft } from "@/lib/admin";
import { news, newsCategories } from "@/lib/site";

// Cache Components: tạo sẵn trang sửa cho mọi bài; id lạ → notFound()
export function generateStaticParams() {
  return news.map((post) => ({ id: String(post.id) }));
}

/** Sửa bài có sẵn: nạp nội dung đủ 4 ngôn ngữ vào trình soạn (bản demo, chưa lưu) */
export default async function AdminEditPostPage({ params }: PageProps<"/[lang]/admin/news/[id]">) {
  const { id } = await params;
  const { t, locale, href } = await getI18n();
  const draft = await getPostDraft(Number(id));
  if (!draft) notFound();

  return (
    <PostEditor
      // key: chuyển sang bài khác thì làm mới trạng thái trình soạn
      key={id}
      initial={draft}
      postId={Number(id)}
      uiLocale={locale}
      categories={newsCategories.map((c) => ({ id: c, label: t.newsCategories[c] }))}
      backHref={href("/admin")}
      labels={t.admin.editor}
    />
  );
}
