import PostEditor from "@/components/admin/PostEditor";
import { getI18n } from "@/i18n/server";
import { newPostDraft } from "@/lib/admin";
import { adminKeywordIndex, adminListCategories } from "@/lib/news";

/** Viết bài mới (lưu vào database khi bấm Lưu nháp / Đăng bài) */
export default async function AdminNewPostPage() {
  const { t, locale, href } = await getI18n();
  const [categories, keywordIndex] = await Promise.all([adminListCategories(), adminKeywordIndex()]);

  return (
    <PostEditor
      initial={newPostDraft(categories[0]?.id ?? "")}
      locale={locale}
      categories={categories.map((c) => ({ id: c.id, label: c.names[locale] || c.id }))}
      listHref={href("/admin")}
      keywordIndex={keywordIndex}
      labels={t.admin.editor}
      seoLabels={t.admin.seo}
    />
  );
}
