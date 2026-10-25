"use client";

import { fill } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { ratingColor, type SeoCheck, type SeoField, type SeoResult, type SeoStatus } from "@/lib/seo";

type Labels = Dictionary["admin"]["seo"];

/** Mở tới ô cần sửa (id `seo-field-<field>`); nội dung đang ở tab Xem trước thì cuộn tới khung soạn */
export function goToField(field: SeoField) {
  const el = document.getElementById(`seo-field-${field}`) ?? document.getElementById(`seo-field-${field}-wrap`);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.focus({ preventScroll: true });
}

function StatusIcon({ status }: { status: SeoStatus }) {
  const common = { viewBox: "0 0 24 24", className: `mt-0.5 size-4 shrink-0 ${ratingColor[status].text}`, fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", "aria-hidden": true } as const;
  if (status === "good")
    return (
      <svg {...common}>
        <path d="m5 12 5 5L20 7" />
      </svg>
    );
  if (status === "warn")
    return (
      <svg {...common}>
        <path d="M12 5v9M12 19h.01" strokeWidth={3} />
      </svg>
    );
  if (status === "tip")
    return (
      <svg {...common} strokeWidth={2}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" strokeWidth={2.5} />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function CheckList({ checks, labels }: { checks: SeoCheck[]; labels: Labels }) {
  return (
    <ul className="mt-2 space-y-2">
      {checks.map((c) => {
        const text = fill(labels.messages[c.message], c.params ?? {});
        return (
          <li key={c.message} className="flex gap-2 text-sm leading-snug text-ink-soft">
            <StatusIcon status={c.status} />
            <span>
              {c.field && c.status !== "good" ? (
                <button type="button" onClick={() => goToField(c.field!)} title={labels.goTo} className="text-left hover:text-ink hover:underline">
                  {text}
                </button>
              ) : (
                text
              )}{" "}
              {c.url ? (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={labels.sourceGoogleTitle}
                  className="inline-flex items-center rounded bg-surface px-1.5 text-[11px] font-medium whitespace-nowrap text-ink-soft ring-1 ring-line hover:text-brand-600"
                >
                  {labels.sourceGoogle} ↗
                </a>
              ) : (
                <span
                  title={labels.sourceConventionTitle}
                  className="inline-flex cursor-help items-center rounded px-1.5 text-[11px] font-medium whitespace-nowrap text-muted ring-1 ring-line"
                >
                  {labels.sourceConvention}
                </span>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Khung SEO ở cột phải trình soạn bài: điểm 0–100, ô từ khoá chính, danh sách kiểm tra chia nhóm
 * Cần sửa / Nên cải thiện / Gợi ý thêm (thông lệ, không trừ điểm) / Đạt (thu gọn). Bấm vào mục chưa đạt thì nhảy tới ô cần sửa.
 * Mỗi mục có nhãn nguồn: "Google ↗" (link tài liệu chính thức) hoặc "Thông lệ" (Yoast / Rank Math).
 */
export default function SeoPanel({
  result,
  keyword,
  onKeywordChange,
  lang,
  languageLabel,
  labels,
  className = "",
}: {
  result: SeoResult;
  keyword: string;
  onKeywordChange: (value: string) => void;
  /** Mã ngôn ngữ HTML của bản đang soạn */
  lang: string;
  languageLabel: string;
  labels: Labels;
  className?: string;
}) {
  const color = ratingColor[result.rating];
  const rating = { good: labels.ratingGood, warn: labels.ratingWarn, bad: labels.ratingBad }[result.rating];
  const groups = (["bad", "warn", "tip", "good"] as const).map((status) => ({ status, checks: result.checks.filter((c) => c.status === status) }));
  const titles = { bad: labels.problems, warn: labels.improvements, tip: labels.tips, good: labels.passed };

  return (
    <section className={`rounded-2xl bg-white p-5 ring-1 ring-line ${className}`} aria-label={labels.title}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-ink">
          {labels.title} · {languageLabel}
        </p>
        <p className="text-sm text-muted">
          <span className={`text-2xl font-semibold tabular-nums ${color.text}`}>{result.score}</span>/100
        </p>
      </div>
      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-surface ring-1 ring-line"
        role="meter"
        aria-label={labels.score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={result.score}
      >
        <div className={`h-full rounded-full transition-[width] duration-300 ${color.bg}`} style={{ width: `${result.score}%` }} />
      </div>
      <p className={`mt-1.5 text-xs font-medium ${color.text}`}>{rating}</p>

      <label className="mt-5 block">
        <span className="text-sm font-medium text-ink">{labels.keyword}</span>
        <input
          id="seo-field-keyword"
          lang={lang}
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          className="mt-1.5 w-full rounded-xl bg-white px-4 py-2.5 text-[15px] text-ink outline-none ring-1 ring-line placeholder:text-muted focus:ring-2 focus:ring-brand-500"
        />
        <span className="mt-1 block text-xs text-muted">{labels.keywordHint}</span>
      </label>

      <div className="mt-5 space-y-4 border-t border-line pt-4" aria-live="polite">
        {groups.map(({ status, checks }) => {
          if (checks.length === 0) return null;
          const heading = (
            <span className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span className={`size-2 rounded-full ${ratingColor[status].dot}`} aria-hidden />
              {titles[status]} ({checks.length})
            </span>
          );
          return status === "good" ? (
            <details key={status} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
                {heading}
                <svg viewBox="0 0 24 24" className="size-4 text-muted transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <CheckList checks={checks} labels={labels} />
            </details>
          ) : (
            <div key={status}>
              {heading}
              <CheckList checks={checks} labels={labels} />
            </div>
          );
        })}
      </div>

      <p className="mt-5 border-t border-line pt-3 text-xs leading-relaxed text-muted">{labels.disclaimer}</p>
    </section>
  );
}
