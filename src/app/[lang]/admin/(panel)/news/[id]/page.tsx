import { notFound } from "next/navigation";
import PostEditor from "@/components/admin/PostEditor";
import { getI18n } from "@/i18n/server";
import { adminGetPost, adminKeywordIndex, adminListCategories } from "@/lib/news";

// Bài nằm trong database nên không tạo sẵn lúc build; Cache Components cần ít nhất 1 id để kiểm tra route
export function generateStaticParams() {
  return [{ id: "1" }];
}

/** Sửa bài: nạp bài (đủ 4 ngôn ngữ) từ database vào trình soạn */
export default async function AdminEditPostPage({ params }: PageProps<"/[lang]/admin/news/[id]">) {
  const { id } = await params;
  const { t, locale, href } = await getI18n();
  const post = await adminGetPost(Number(id));
  if (!post) notFound();
  const [categories, keywordIndex] = await Promise.all([adminListCategories(), adminKeywordIndex(post.id)]);
  const { id: postId, ...draft } = post;

  return (
    <PostEditor
      // key: chuyển sang bài khác thì làm mới trạng thái trình soạn
      key={postId}
      initial={draft}
      postId={postId}
      locale={locale}
      categories={categories.map((c) => ({ id: c.id, label: c.names[locale] || c.id }))}
      listHref={href("/admin")}
      keywordIndex={keywordIndex}
      labels={t.admin.editor}
      seoLabels={t.admin.seo}
    />
  );
}
