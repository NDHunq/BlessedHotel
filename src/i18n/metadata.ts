import type { Metadata } from "next";
import { defaultLocale, localeMeta, locales, localizeHref, type Locale } from "@/i18n/config";

/**
 * Metadata cho một trang theo ngôn ngữ, kèm hreflang tới các bản dịch khác.
 * `path` là đường dẫn KHÔNG có tiền tố ngôn ngữ, VD "/rooms".
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
}: {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
  image?: string;
}): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: localizeHref(locale, path),
      languages: {
        ...Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, localizeHref(l, path)])),
        "x-default": localizeHref(defaultLocale, path),
      },
    },
    openGraph: {
      ...(title ? { title } : {}),
      description,
      locale: localeMeta[locale].ogLocale,
      ...(image ? { images: [image] } : {}),
    },
  };
}
