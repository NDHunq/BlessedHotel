import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale, localizeHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/vi";

// Mỗi ngôn ngữ một file; kiểu `Dictionary` bắt buộc đủ key như vi.ts
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  vi: () => import("@/i18n/dictionaries/vi").then((m) => m.vi),
  en: () => import("@/i18n/dictionaries/en").then((m) => m.en),
  ko: () => import("@/i18n/dictionaries/ko").then((m) => m.ko),
  zh: () => import("@/i18n/dictionaries/zh").then((m) => m.zh),
};

/** Từ điển của một ngôn ngữ bất kỳ (VD trang admin cần nội dung bài ở cả 4 ngôn ngữ) */
export const getDictionary = (locale: Locale) => dictionaries[locale]();

/** Ngôn ngữ của request hiện tại (đọc từ segment [lang]); mã lạ → 404 */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

export type I18n = {
  locale: Locale;
  t: Dictionary;
  /** Gắn tiền tố ngôn ngữ cho đường dẫn nội bộ */
  href: (path: string) => string;
};

/** Dùng trong Server Component: `const { t, locale, href } = await getI18n()` */
export async function getI18n(): Promise<I18n> {
  const locale = await getLocale();
  const t = await dictionaries[locale]();
  return { locale, t, href: (path) => localizeHref(locale, path) };
}
