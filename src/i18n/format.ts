import { localeMeta, type Locale } from "@/i18n/config";

/** Giá VND theo định dạng từng ngôn ngữ (vi: 1.450.000 ₫ · en: ₫1,450,000 · …) */
export const formatPrice = (value: number, locale: Locale) =>
  new Intl.NumberFormat(localeMeta[locale].intl, { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);

/** Ngày đăng bài theo từng ngôn ngữ (vi: 10/10/2026 · en: Oct 10, 2026 · ko: 2026. 10. 10. · zh: 2026年10月10日) */
export const formatDate = (iso: string, locale: Locale) =>
  new Intl.DateTimeFormat(
    localeMeta[locale].intl,
    locale === "vi" ? { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" } : { dateStyle: "medium", timeZone: "UTC" },
  ).format(new Date(iso));

/** Thời gian đọc ước tính: tiếng Trung đếm theo ký tự (~350 ký tự/phút), còn lại theo từ (~200 từ/phút) */
export function readingMinutes(texts: string[], locale: Locale) {
  const text = texts.join(" ");
  const minutes = locale === "zh" ? text.replace(/\s/g, "").length / 350 : text.split(/\s+/).filter(Boolean).length / 200;
  return Math.max(1, Math.round(minutes));
}
