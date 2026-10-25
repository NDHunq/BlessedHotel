import CategoryManager from "@/components/admin/CategoryManager";
import { getI18n } from "@/i18n/server";
import { adminListCategories } from "@/lib/news";

/** Quản lý chuyên mục tin tức: tên ở cả 4 ngôn ngữ + số bài mỗi chuyên mục (lưu vào database) */
export default async function AdminCategoriesPage() {
  const { t, locale } = await getI18n();
  return <CategoryManager initial={await adminListCategories()} uiLocale={locale} labels={t.admin.categories} />;
}
