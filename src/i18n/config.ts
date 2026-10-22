/**
 * Cấu hình đa ngôn ngữ. Dùng được ở mọi nơi (server, client, proxy).
 * Thêm ngôn ngữ mới: thêm mã vào `locales` + `localeMeta`, tạo dictionaries/<mã>.ts
 * (kiểu `Dictionary`) và khai báo trong i18n/server.ts.
 */
export const locales = ["vi", "en", "ko", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "vi";

/** Cookie lưu ngôn ngữ người dùng đã chọn (proxy đọc khi URL chưa có tiền tố ngôn ngữ) */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** `flag`: file quốc kỳ vuông trong public/flags/<flag>.svg (bộ flag-icons, MIT), hiển thị cắt tròn */
export const localeMeta: Record<
  Locale,
  { label: string; short: string; flag: string; htmlLang: string; intl: string; ogLocale: string; mapLang: string }
> = {
  vi: { label: "Tiếng Việt", short: "VI", flag: "vn", htmlLang: "vi", intl: "vi-VN", ogLocale: "vi_VN", mapLang: "vi" },
  en: { label: "English", short: "EN", flag: "gb", htmlLang: "en", intl: "en-US", ogLocale: "en_US", mapLang: "en" },
  ko: { label: "한국어", short: "KO", flag: "kr", htmlLang: "ko", intl: "ko-KR", ogLocale: "ko_KR", mapLang: "ko" },
  zh: { label: "简体中文", short: "中文", flag: "cn", htmlLang: "zh-CN", intl: "zh-CN", ogLocale: "zh_CN", mapLang: "zh-CN" },
};

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Gắn tiền tố ngôn ngữ cho đường dẫn nội bộ: ("en", "/hang-phong#deluxe") → "/en/hang-phong#deluxe" */
export function localizeHref(locale: Locale, href: string) {
  if (!href.startsWith("/")) return href; // link ngoài, tel:, mailto:, #...
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

/** Đổi ngôn ngữ của đường dẫn hiện tại: ("/vi/tin-tuc/abc", "en") → "/en/tin-tuc/abc" */
export function switchLocalePath(pathname: string, locale: Locale) {
  const parts = pathname.split("/");
  if (hasLocale(parts[1] ?? "")) parts[1] = locale;
  else parts.splice(1, 0, locale);
  return parts.join("/") || `/${locale}`;
}

/** Thay {key} trong chuỗi dịch: fill("{n} khách", { n: 2 }) → "2 khách" */
export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));
}
