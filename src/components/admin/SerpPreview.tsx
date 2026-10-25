"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { formatDate } from "@/i18n/format";
import { LIMITS, TITLE_SUFFIX, textWidth } from "@/lib/seo";

type Labels = Dictionary["admin"]["seo"];

const field =
  "w-full rounded-xl bg-white px-4 py-2.5 text-[15px] text-ink outline-none ring-1 ring-line placeholder:text-muted focus:ring-2 focus:ring-brand-500";

/** Bộ đếm độ dài hiển thị: xanh lá khi trong ngưỡng, xanh dương khi ngắn (chỉ là gợi ý), vàng khi dài hơn chỗ Google hiển thị */
function Counter({ value, min, max, label }: { value: number; min: number; max: number; label: string }) {
  const tone = value > max ? "text-amber-700" : value < min ? "text-sky-700" : "text-emerald-700";
  return (
    <span className={`text-xs font-medium tabular-nums ${tone}`} title={label}>
      {value}/{max}
    </span>
  );
}

/**
 * Ô tiêu đề SEO + mô tả meta và khung xem trước kết quả tìm kiếm Google (máy tính 600px / điện thoại).
 * Tiêu đề và mô tả bị cắt "…" bằng CSS theo đúng độ rộng Google dùng, nên thấy ngay chữ nào bị mất.
 */
export default function SerpPreview({
  locale,
  lang,
  postId,
  date,
  title,
  excerpt,
  seoTitle,
  metaDescription,
  onChange,
  untitled,
  labels,
}: {
  locale: Locale;
  lang: string;
  postId?: number;
  date: string;
  title: string;
  excerpt: string;
  seoTitle: string;
  metaDescription: string;
  onChange: (patch: { seoTitle?: string; metaDescription?: string }) => void;
  untitled: string;
  labels: Labels;
}) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const fullTitle = (seoTitle.trim() || title.trim() || untitled) + TITLE_SUFFIX;
  const description = metaDescription.trim() || excerpt.trim();
  const host = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").host;
  const crumbs = [host, locale, "news", postId].filter(Boolean).join(" › ");
  const mobile = device === "mobile";
  const tab = (active: boolean) =>
    `h-8 rounded-md px-3 text-sm font-medium ${active ? "bg-white text-ink ring-1 ring-line" : "text-ink-soft hover:text-ink"}`;

  return (
    <fieldset className="border-t border-line pt-6">
      <legend className="sr-only">{labels.snippet}</legend>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-ink">{labels.snippet}</p>
          <p className="mt-0.5 text-xs text-muted">{labels.snippetHint}</p>
        </div>
        <div className="flex gap-1 rounded-lg bg-surface p-1 ring-1 ring-line">
          <button type="button" className={tab(!mobile)} onClick={() => setDevice("desktop")} aria-pressed={!mobile}>
            {labels.desktop}
          </button>
          <button type="button" className={tab(mobile)} onClick={() => setDevice("mobile")} aria-pressed={mobile}>
            {labels.mobile}
          </button>
        </div>
      </div>

      {/* Khung kết quả tìm kiếm: font Arial và màu như trang kết quả Google */}
      <div className={`mt-4 rounded-xl bg-white font-[Arial,sans-serif] ring-1 ring-line ${mobile ? "w-[360px] max-w-full p-4" : "p-5"}`} aria-hidden>
        <div className={mobile ? "" : "w-[600px] max-w-full"}>
          <div className="flex items-center gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface font-serif text-sm font-semibold text-ink ring-1 ring-line">B</span>
            <span className="min-w-0 leading-tight">
              <span className="block text-sm text-ink">Blessed Hotel</span>
              <span className="block truncate text-xs text-serp-text">{crumbs}</span>
            </span>
          </div>
          <p className={`mt-2 text-serp-title ${mobile ? "line-clamp-2 text-lg leading-snug" : "truncate text-xl leading-snug"}`}>{fullTitle}</p>
          <p className={`mt-1 text-sm leading-[1.58] text-serp-text ${mobile ? "line-clamp-3" : "line-clamp-2"}`}>
            {date && <span className="text-muted">{formatDate(date, locale)} · </span>}
            {description}
          </p>
        </div>
      </div>

      <div lang={lang} className="mt-5 space-y-4">
        <label className="block">
          <span className="flex items-center justify-between gap-3">
            <span className="text-sm text-ink-soft">{labels.seoTitle}</span>
            <Counter value={textWidth(fullTitle)} {...LIMITS.title} label={labels.width} />
          </span>
          <input
            id="seo-field-seoTitle"
            value={seoTitle}
            placeholder={title}
            onChange={(e) => onChange({ seoTitle: e.target.value })}
            className={`${field} mt-1.5`}
          />
        </label>
        <label className="block">
          <span className="flex items-center justify-between gap-3">
            <span className="text-sm text-ink-soft">{labels.metaDescription}</span>
            <Counter value={textWidth(description)} {...LIMITS.meta} label={labels.width} />
          </span>
          <textarea
            id="seo-field-metaDescription"
            rows={3}
            value={metaDescription}
            placeholder={excerpt}
            onChange={(e) => onChange({ metaDescription: e.target.value })}
            className={`${field} mt-1.5 resize-y`}
          />
        </label>
      </div>
    </fieldset>
  );
}
