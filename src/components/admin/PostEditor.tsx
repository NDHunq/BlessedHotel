"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { deletePost, savePost, uploadImage, type SavePostResult } from "@/app/[lang]/admin/actions";
import MarkdownEditor from "@/components/admin/MarkdownEditor";
import SeoPanel from "@/components/admin/SeoPanel";
import SerpPreview from "@/components/admin/SerpPreview";
import { fill, localeMeta, locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { formatDate } from "@/i18n/format";
import { isContentComplete, type DraftContent, type KeywordIndex, type PostDraft } from "@/lib/admin";
import type { PostStatus } from "@/lib/news";
import { analyzeSeo, ratingColor, type SeoResult } from "@/lib/seo";

type Labels = Dictionary["admin"]["editor"];
type SeoLabels = Dictionary["admin"]["seo"];
type Message = { tone: "ok" | "error"; text: string };

const field =
  "w-full rounded-xl bg-white px-4 py-2.5 text-[15px] text-ink outline-none ring-1 ring-line placeholder:text-muted focus:ring-2 focus:ring-brand-500";

/**
 * Trình soạn bài: tab nội dung theo 4 ngôn ngữ (nội dung soạn bằng Markdown), thiết lập chung, xem trước thẻ bài.
 * SEO: chấm điểm ngay khi gõ cho từng ngôn ngữ (`analyzeSeo`, điểm hiện cạnh tab), khung `SeoPanel` dính bên phải, `SerpPreview` dưới nội dung.
 * Lưu qua Server Action `savePost`: bài nháp lưu được khi còn thiếu; "Đăng bài" cần đủ tiêu đề + tóm tắt 4 ngôn ngữ, ngày và ảnh bìa
 * (kiểm tra lại ở server). Ảnh bìa / ảnh trong bài tải lên qua `uploadImage`. Rời trang khi chưa lưu thì trình duyệt hỏi lại.
 */
export default function PostEditor({
  initial,
  postId,
  locale,
  categories,
  listHref,
  keywordIndex,
  labels,
  seoLabels,
}: {
  initial: PostDraft;
  /** Có id → đang sửa bài đã lưu */
  postId?: number;
  /** Ngôn ngữ giao diện admin (tab nội dung mở sẵn theo ngôn ngữ này) */
  locale: Locale;
  categories: { id: string; label: string }[];
  /** Trang danh sách bài (/<lang>/admin) */
  listHref: string;
  /** Từ khoá chính của các bài khác (kiểm tra trùng) */
  keywordIndex: KeywordIndex;
  labels: Labels;
  seoLabels: SeoLabels;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState(initial);
  /** Trạng thái đã lưu trong database (khác `draft.status` khi chưa bấm lưu) */
  const [savedStatus, setSavedStatus] = useState<PostStatus | null>(postId ? initial.status : null);
  const [dirty, setDirty] = useState(false);
  const [tab, setTab] = useState<Locale>(locale);
  const [message, setMessage] = useState<Message | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const content = draft.content[tab];

  // Cảnh báo khi đóng tab / tải lại trang lúc còn thay đổi chưa lưu
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

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
    setDirty(true);
    setMessage(null);
  };
  const updateContent = (patch: Partial<DraftContent>) =>
    update({ content: { ...draft.content, [tab]: { ...content, ...patch } } });

  const errorText = (error: string) =>
    error === "unauthorized" ? labels.sessionExpired : error === "type" ? labels.uploadType : error === "size" ? labels.uploadSize : labels.serverError;

  /** Tải ảnh lên máy chủ, trả về URL (lỗi thì báo và trả về null) */
  const upload = async (file: File) => {
    setUploading(true);
    setMessage({ tone: "ok", text: labels.uploading });
    const form = new FormData();
    form.set("file", file);
    try {
      const result = await uploadImage(form);
      if (result.ok) {
        setMessage(null);
        return result.url;
      }
      setMessage({ tone: "error", text: errorText(result.error) });
    } catch {
      setMessage({ tone: "error", text: labels.serverError });
    } finally {
      setUploading(false);
    }
    return null;
  };

  const pickCover = async (file: File | undefined) => {
    if (!file) return;
    const url = await upload(file);
    if (url) update({ image: url });
  };

  const save = (status: PostStatus) =>
    startTransition(async () => {
      let result: SavePostResult;
      try {
        result = await savePost(postId ?? null, { ...draft, status });
      } catch {
        result = { ok: false, error: "server" };
      }
      if (!result.ok) {
        if (result.error === "missingLanguages") {
          setTab(result.locales[0]);
          setMessage({ tone: "error", text: fill(labels.missingLanguages, { langs: result.locales.map((l) => localeMeta[l].label).join(labels.listSeparator) }) });
        } else {
          const text = { missingSettings: labels.missingSettings, invalid: labels.invalid, notFound: labels.notFound }[result.error as string];
          setMessage({ tone: "error", text: text ?? errorText(result.error) });
        }
        return;
      }
      setDraft((d) => ({ ...d, status }));
      setSavedStatus(status);
      setDirty(false);
      setMessage({ tone: "ok", text: status === "draft" ? (savedStatus === "published" ? labels.unpublished : labels.draftSaved) : labels.published });
      // Bài mới: chuyển sang trang sửa của bài vừa tạo
      if (!postId) router.replace(`${listHref}/news/${result.id}`);
    });

  const remove = () =>
    startTransition(async () => {
      const result = await deletePost(postId!).catch(() => ({ ok: false as const, error: "server" as const }));
      if (!result.ok) {
        setConfirmDelete(false);
        return setMessage({ tone: "error", text: errorText(result.error) });
      }
      setDirty(false);
      router.push(listHref);
    });

  const categoryLabel = categories.find((c) => c.id === draft.category)?.label;
  const isPublished = savedStatus === "published";
  const busy = pending || uploading;
  const secondary = "h-10 rounded-full px-5 text-sm font-medium text-ink ring-1 ring-line hover:bg-white disabled:opacity-60";

  return (
    <div>
      <Link href={listHref} className="text-sm font-medium text-ink-soft hover:text-brand-600">
        ← {labels.back}
      </Link>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-semibold tracking-[-0.01em] text-ink">
            {postId ? fill(labels.editTitle, { id: postId }) : labels.newTitle}
          </h1>
          {savedStatus && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${
                isPublished ? "bg-emerald-50 text-emerald-700 ring-emerald-100" : "bg-surface text-ink-soft ring-line"
              }`}
            >
              {isPublished ? labels.statusPublished : labels.statusDraft}
            </span>
          )}
          {dirty && <span className="text-xs text-muted">{labels.unsaved}</span>}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {postId &&
            (confirmDelete ? (
              <span className="inline-flex items-center gap-2 text-sm">
                <span className="text-ink">{labels.confirmDelete}</span>
                <button type="button" onClick={remove} disabled={busy} className="h-10 rounded-full bg-red-600 px-5 font-medium text-white hover:bg-red-700 disabled:opacity-60">
                  {labels.delete}
                </button>
                <button type="button" onClick={() => setConfirmDelete(false)} className={secondary}>
                  {labels.cancel}
                </button>
              </span>
            ) : (
              <button type="button" onClick={() => setConfirmDelete(true)} disabled={busy} className="h-10 rounded-full px-4 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60">
                {labels.delete}
              </button>
            ))}
          <button type="button" onClick={() => save("draft")} disabled={busy} className={secondary}>
            {isPublished ? labels.unpublish : labels.saveDraft}
          </button>
          <button
            type="button"
            onClick={() => save("published")}
            disabled={busy}
            className="h-10 rounded-full bg-brand-600 px-5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {pending ? labels.saving : isPublished ? labels.update : labels.publish}
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
              const done = isContentComplete(draft.content[l]);
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
              onUpload={upload}
              uploading={uploading}
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
                onChange={(e) => update({ category: e.target.value })}
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
                value={draft.image}
                onChange={(e) => update({ image: e.target.value })}
                placeholder={labels.coverUrl}
                aria-label={labels.coverUrl}
                className={`${field} mt-1.5 text-sm`}
              />
              <label
                className={`mt-2 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-ink ring-1 ring-line hover:bg-surface ${
                  uploading ? "pointer-events-none opacity-60" : "cursor-pointer"
                }`}
              >
                {uploading ? labels.uploading : labels.coverUpload}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                  className="sr-only"
                  disabled={uploading}
                  onChange={(e) => {
                    pickCover(e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
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
                  // Ảnh bìa có thể là link bất kỳ admin dán vào, next/image không tối ưu được mọi nguồn
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
