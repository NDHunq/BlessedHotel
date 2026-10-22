import CategoryManager from "@/components/admin/CategoryManager";
import { locales } from "@/i18n/config";
import { getDictionary, getI18n } from "@/i18n/server";
import { news, newsCategories } from "@/lib/site";

/** Quản lý chuyên mục tin tức: tên ở cả 4 ngôn ngữ + số bài mỗi chuyên mục (bản demo, chưa lưu) */
export default async function AdminCategoriesPage() {
  const { t, locale } = await getI18n();
  const dictionaries = await Promise.all(locales.map(getDictionary));

  const categories = newsCategories.map((id) => ({
    id,
    names: Object.fromEntries(locales.map((l, i) => [l, dictionaries[i].newsCategories[id]])) as Record<(typeof locales)[number], string>,
    posts: news.filter((p) => p.category === id).length,
  }));

  return <CategoryManager initial={categories} uiLocale={locale} labels={t.admin.categories} />;
}
