import PostEditor from "@/components/admin/PostEditor";
import { getI18n } from "@/i18n/server";
import { newPostDraft } from "@/lib/admin";
import { newsCategories } from "@/lib/site";

/** Viết bài mới (bản demo, chưa lưu) */
export default async function AdminNewPostPage() {
  const { t, locale, href } = await getI18n();

  return (
    <PostEditor
      initial={newPostDraft()}
      uiLocale={locale}
      categories={newsCategories.map((id) => ({ id, label: t.newsCategories[id] }))}
      backHref={href("/admin")}
      labels={t.admin.editor}
    />
  );
}
