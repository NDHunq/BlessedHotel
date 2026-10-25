"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import MarkdownEditor from "@/components/admin/MarkdownEditor";
import SeoPanel from "@/components/admin/SeoPanel";
import SerpPreview from "@/components/admin/SerpPreview";
import { fill, localeMeta, locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { formatDate } from "@/i18n/format";
import type { DraftContent, KeywordIndex, PostDraft } from "@/lib/admin";
import { analyzeSeo, ratingColor, type SeoResult } from "@/lib/seo";
import type { NewsCategory } from "@/lib/site";

type Labels = Dictionary["admin"]["editor"];
type SeoLabels = Dictionary["admin"]["seo"];
type Message = { tone: "ok" | "error"; text: string };

const field =
  "w-full rounded-xl bg-white px-4 py-2.5 text-[15px] text-ink outline-none ring-1 ring-line placeholder:text-muted focus:ring-2 focus:ring-brand-500";

/** Bài đủ để đăng ở một ngôn ngữ khi có tiêu đề và tóm tắt */
const isComplete = (c: DraftContent) => c.title.trim() !== "" && c.excerpt.trim() !== "";

/**
 * Trình soạn bài (bản demo, không lưu): tab nội dung theo 4 ngôn ngữ (nội dung soạn bằng Markdown), thiết lập chung, xem trước thẻ bài.
 * SEO: chấm điểm ngay khi gõ cho từng ngôn ngữ (`analyzeSeo`, điểm hiện cạnh tab), khung `SeoPanel` dính bên phải, `SerpPreview` dưới nội dung.
 * "Đăng bài" kiểm tra đủ 4 ngôn ngữ + ngày + ảnh bìa rồi báo kết quả; chưa gửi lên máy chủ.
 */
export default function PostEditor({
  initial,
  postId,
  uiLocale,
  categories,
  backHref,
  keywordIndex,
  labels,
  seoLabels,
}: {
  initial: PostDraft;
  /** Có id → đang sửa bài cũ */
  postId?: number;
  /** Ngôn ngữ giao diện admin (tab nội dung mở sẵn theo ngôn ngữ này) */
  uiLocale: Locale;
  categories: { id: NewsCategory; label: string }[];
  backHref: string;
  /** Từ khoá chính của các bài khác (kiểm tra trùng) */
  keywordIndex: KeywordIndex;
  labels: Labels;
  seoLabels: SeoLabels;
}) {
  const [draft, setDraft] = useState(initial);
  const [tab, setTab] = useState<Locale>(uiLocale);
  const [message, setMessage] = useState<Message | null>(null);
  const content = draft.content[tab];

  // Chấm lại cả 4 ngôn ngữ mỗi khi bài thay đổi (chỉ là xử lý chuỗi, đủ nhanh để chạy theo từng phím gõ)
  const seo = useMemo(
    () =>
      Object.fromEntries(
        locales.map((l) => {
          const c = draft.content[l];
          return [
            l,
            analyzeSeo({
              locale: l,
              keyword: c.focusKeyword,
              title: c.title,
              excerpt: c.excerpt,
              seoTitle: c.seoTitle,
              metaDescription: c.metaDescription,
              body: c.body,
              hasCover: draft.image !== "",
              otherKeywords: keywordIndex[l],
            }),
          ];
        }),
      ) as Record<Locale, SeoResult>,
    [draft, keywordIndex],
  );

  const update = (patch: Partial<PostDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setMessage(null);
  };
  const updateContent = (patch: Partial<DraftContent>) =>
    update({ content: { ...draft.content, [tab]: { ...content, ...patch } } });

  const pickFile = (file: File | undefined) => {
    if (file) update({ image: URL.createObjectURL(file) });
  };

  const publish = () => {
    const missing = locales.filter((l) => !isComplete(draft.content[l]));
    if (missing.length > 0) {
      setTab(missing[0]);
      setMessage({ tone: "error", text: fill(labels.missingLanguages, { langs: missing.map((l) => localeMeta[l].label).join(labels.listSeparator) }) });
    } else if (!draft.date || !draft.image) {
      setMessage({ tone: "error", text: labels.missingSettings });
    } else {
      setMessage({ tone: "ok", text: labels.published });
    }
  };

  const categoryLabel = categories.find((c) => c.id === draft.category)?.label;

  return (
    <div>
      <Link href={backHref} className="text-sm font-medium text-ink-soft hover:text-brand-600">
        ← {labels.back}
      </Link>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold tracking-[-0.01em] text-ink">
          {postId ? fill(labels.editTitle, { id: postId }) : labels.newTitle}
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setMessage({ tone: "ok", text: labels.draftSaved })}
            className="h-10 rounded-full px-5 text-sm font-medium text-ink ring-1 ring-line hover:bg-white"
          >
            {labels.saveDraft}
          </button>
          <button type="button" onClick={publish} className="h-10 rounded-full bg-brand-600 px-5 text-sm font-medium text-white hover:bg-brand-700">
            {postId ? labels.update : labels.publish}
          </button>
        </div>
      </div>

      <div role="status" aria-live="polite">
        {message && (
          <p
            className={`mt-5 rounded-xl px-4 py-3 text-sm ${
              message.tone === "ok" ? "bg-brand-50 text-brand-700 ring-1 ring-brand-100" : "bg-red-50 text-red-700 ring-1 ring-red-100"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Nội dung theo ngôn ngữ */}
        <section className="rounded-2xl bg-white p-5 ring-1 ring-line md:p-7">
          <p className="text-sm font-semibold text-ink">{labels.contentLanguage}</p>
          <p className="mt-0.5 text-sm text-muted">{labels.languageHint}</p>
          <div role="tablist" aria-label={labels.contentLanguage} className="mt-4 flex flex-wrap gap-2">
            {locales.map((l) => {
              const done = isComplete(draft.content[l]);
              return (
                <button
                  key={l}
                  type="button"
                  role="tab"
                  aria-selected={tab === l}
                  onClick={() => setTab(l)}
                  className={`inline-flex items-center gap-2 rounded-full py-1.5 pr-3.5 pl-1.5 text-sm font-medium transition-colors ${
                    tab === l ? "bg-ink text-white" : "bg-surface text-ink-soft ring-1 ring-line hover:bg-white"
                  }`}
                >
                  <Image src={`/flags/${localeMeta[l].flag}.svg`} alt="" width={20} height={20} className="size-5 rounded-full" />
                  {localeMeta[l].label}
                  <span
                    title={done ? labels.complete : labels.incomplete}
                    className={`size-2 rounded-full ${done ? "bg-emerald-500" : "bg-line"}`}
                  />
                  <span className="sr-only">{done ? labels.complete : labels.incomplete}</span>
                  <span
                    title={fill(seoLabels.tabScore, { score: seo[l].score })}
                    className={`rounded-full px-1.5 text-xs font-semibold tabular-nums ${
                      tab === l ? "bg-white/15 text-white" : `bg-white ring-1 ring-line ${ratingColor[seo[l].rating].text}`
                    }`}
                  >
                    <span className="sr-only">{fill(seoLabels.tabScore, { score: seo[l].score })}</span>
                    <span aria-hidden>{seo[l].score}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* lang: để trình duyệt dùng đúng font / kiểm tra chính tả theo ngôn ngữ đang soạn */}
          <div lang={localeMeta[tab].htmlLang} className="mt-7 space-y-6">
            <label className="block">
              <span className="text-sm font-medium text-ink">{labels.title}</span>
              <input value={content.title} onChange={(e) => updateContent({ title: e.target.value })} className={`${field} mt-2 text-lg font-semibold`} />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-ink">{labels.excerpt}</span>
              <span className="mt-0.5 block text-xs text-muted">{labels.excerptHint}</span>
              <textarea rows={2} value={content.excerpt} onChange={(e) => updateContent({ excerpt: e.target.value })} className={`${field} mt-2 resize-y`} />
            </label>

            <fieldset>
              <legend className="text-sm font-medium text-ink">{labels.keyPoints}</legend>
              <p className="mt-0.5 text-xs text-muted">{labels.keyPointsHint}</p>
              <div className="mt-2 space-y-2">
                {content.keyPoints.map((point, i) => (
                  <input
                    key={i}
                    value={point}
                    aria-label={fill(labels.keyPoint, { n: i + 1 })}
                    placeholder={fill(labels.keyPoint, { n: i + 1 })}
                    onChange={(e) => updateContent({ keyPoints: content.keyPoints.map((p, j) => (j === i ? e.target.value : p)) })}
                    className={field}
                  />
                ))}
              </div>
            </fieldset>

            <MarkdownEditor
              id="seo-field-body"
              value={content.body}
              onChange={(body) => updateContent({ body })}
              lang={localeMeta[tab].htmlLang}
              labels={labels}
            />

            <SerpPreview
              locale={tab}
              lang={localeMeta[tab].htmlLang}
              postId={postId}
              date={draft.date}
              title={content.title}
              excerpt={content.excerpt}
              seoTitle={content.seoTitle}
              metaDescription={content.metaDescription}
              onChange={updateContent}
              untitled={labels.untitled}
              labels={seoLabels}
            />
          </div>
        </section>

        <aside className="flex flex-col gap-6">
          {/* Thiết lập chung cho mọi ngôn ngữ */}
          <section className="space-y-5 rounded-2xl bg-white p-5 ring-1 ring-line">
            <p className="text-sm font-semibold text-ink">{labels.settings}</p>
            <label className="block">
              <span className="text-sm text-ink-soft">{labels.category}</span>
              <select
                value={draft.category}
                onChange={(e) => update({ category: e.target.value as NewsCategory })}
                className={`${field} mt-1.5 appearance-none`}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm text-ink-soft">{labels.date}</span>
              <input type="date" value={draft.date} onChange={(e) => update({ date: e.target.value })} className={`${field} mt-1.5`} />
            </label>
            <label className="flex items-center gap-3 text-sm text-ink">
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={(e) => update({ featured: e.target.checked })}
                className="size-4 accent-brand-600"
              />
              {labels.featured}
            </label>
            <div>
              <p className="text-sm text-ink-soft">{labels.cover}</p>
              <input
                id="seo-field-cover"
                value={draft.image.startsWith("blob:") ? "" : draft.image}
                onChange={(e) => update({ image: e.target.value })}
                placeholder={labels.coverUrl}
                aria-label={labels.coverUrl}
                className={`${field} mt-1.5 text-sm`}
              />
              <label className="mt-2 inline-flex cursor-pointer items-center rounded-full px-4 py-2 text-sm font-medium text-ink ring-1 ring-line hover:bg-surface">
                {labels.coverUpload}
                <input type="file" accept="image/*" className="sr-only" onChange={(e) => pickFile(e.target.files?.[0])} />
              </label>
            </div>
          </section>

          {/* Xem trước thẻ bài (giống thẻ tin trên website) theo ngôn ngữ đang soạn */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-line">
            <p className="text-sm font-semibold text-ink">
              {labels.preview} · {localeMeta[tab].label}
            </p>
            <div lang={localeMeta[tab].htmlLang} className="mt-4 overflow-hidden rounded-2xl bg-sand">
              <div className="relative grid aspect-[16/10] place-items-center bg-line text-sm text-muted">
                {draft.image ? (
                  // Ảnh xem trước có thể là link bất kỳ hoặc ảnh chọn từ máy (blob:), next/image không tối ưu được
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={draft.image} alt="" className="absolute inset-0 size-full object-cover" />
                ) : (
                  labels.noCover
                )}
              </div>
              <div className="p-5">
                <p className="text-xs font-medium text-muted uppercase">
                  {categoryLabel}
                  {draft.date && ` · ${formatDate(draft.date, tab)}`}
                </p>
                <p className="mt-2 text-lg leading-snug font-semibold text-ink">{content.title || labels.untitled}</p>
                {content.excerpt && <p className="mt-2 line-clamp-3 text-sm text-ink-soft">{content.excerpt}</p>}
              </div>
            </div>
          </section>

          {/* Dính khi cuộn để vừa soạn nội dung vừa thấy điểm SEO */}
          <SeoPanel
            result={seo[tab]}
            keyword={content.focusKeyword}
            onKeywordChange={(focusKeyword) => updateContent({ focusKeyword })}
            lang={localeMeta[tab].htmlLang}
            languageLabel={localeMeta[tab].label}
            labels={seoLabels}
            className="lg:sticky lg:top-24 lg:max-h-[calc(100svh-7rem)] lg:overflow-y-auto"
          />
        </aside>
      </div>
    </div>
  );
}
