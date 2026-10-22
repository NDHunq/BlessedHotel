"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LOCALE_COOKIE, localeMeta, locales, switchLocalePath, type Locale } from "@/i18n/config";

/** Ghi nhớ ngôn ngữ đã chọn (proxy dùng khi URL chưa có tiền tố ngôn ngữ) */
const rememberLocale = (locale: Locale) => {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
};

/** Quốc kỳ hình tròn (ảnh trang trí, tên ngôn ngữ luôn có chữ đi kèm) */
const Flag = ({ locale, className = "size-5" }: { locale: Locale; className?: string }) => (
  <Image
    src={`/flags/${localeMeta[locale].flag}.svg`}
    alt=""
    width={20}
    height={20}
    className={`shrink-0 rounded-full object-cover ring-1 ring-black/10 ${className}`}
  />
);

/** Nút chọn ngôn ngữ dạng menu thả (desktop, trên header) */
export function LanguageMenu({ locale, label, light }: { locale: Locale; label: string; light: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => !rootRef.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`${label}: ${localeMeta[locale].label}`}
        className={`flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium transition-colors ${
          light ? "text-white hover:bg-white/10" : "text-ink-soft hover:bg-surface"
        }`}
      >
        <Flag locale={locale} />
        {localeMeta[locale].short}
      </button>

      {open && (
        <ul className="absolute top-full right-0 mt-2 w-44 overflow-hidden rounded-xl bg-white py-1.5 shadow-card ring-1 ring-line">
          {locales.map((l) => (
            <li key={l}>
              <Link
                href={switchLocalePath(pathname, l)}
                hrefLang={localeMeta[l].htmlLang}
                lang={localeMeta[l].htmlLang}
                aria-current={l === locale ? "true" : undefined}
                onClick={() => {
                  rememberLocale(l);
                  setOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-sand ${
                  l === locale ? "font-semibold text-brand-600" : "text-ink"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Flag locale={l} />
                  {localeMeta[l].label}
                </span>
                {l === locale && (
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Hàng nút chọn ngôn ngữ (menu mobile) */
export function LanguagePills({ locale, label, onSelect }: { locale: Locale; label: string; onSelect?: () => void }) {
  const pathname = usePathname();
  return (
    <div>
      <p className="mb-2 text-xs font-semibold tracking-wider text-muted uppercase">{label}</p>
      <ul className="flex flex-wrap gap-2">
        {locales.map((l) => (
          <li key={l}>
            <Link
              href={switchLocalePath(pathname, l)}
              hrefLang={localeMeta[l].htmlLang}
              lang={localeMeta[l].htmlLang}
              aria-current={l === locale ? "true" : undefined}
              onClick={() => {
                rememberLocale(l);
                onSelect?.();
              }}
              className={`inline-flex h-9 items-center gap-2 rounded-full pr-4 pl-2 text-sm font-medium ring-1 transition-colors ${
                l === locale ? "bg-ink text-white ring-ink" : "text-ink ring-line hover:bg-sand"
              }`}
            >
              <Flag locale={l} />
              {localeMeta[l].label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
