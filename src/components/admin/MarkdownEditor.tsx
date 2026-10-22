"use client";

import { useRef, useState } from "react";
import Markdown from "@/components/ui/Markdown";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { parseMarkdown } from "@/lib/markdown";

type Labels = Pick<Dictionary["admin"]["editor"], "body" | "bodyHint" | "write" | "previewTab" | "emptyPreview" | "toolbar">;

/**
 * Ô soạn Markdown: thanh công cụ (tiêu đề, đậm, nghiêng, danh sách, trích dẫn, link, ảnh từ link, tải ảnh lên)
 * chèn cú pháp vào vị trí con trỏ; tab "Xem trước" hiển thị đúng như trang bài viết (component `Markdown`).
 * Ảnh tải lên chỉ là blob: tạm trên trình duyệt (bản demo); làm thật cần API tải ảnh lên máy chủ.
 */
export default function MarkdownEditor({
  value,
  onChange,
  lang,
  labels,
}: {
  value: string;
  onChange: (value: string) => void;
  /** Mã ngôn ngữ HTML của nội dung đang soạn */
  lang: string;
  labels: Labels;
}) {
  const area = useRef<HTMLTextAreaElement>(null);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const tb = labels.toolbar;

  /** Thay đoạn đang chọn bằng `before + (đoạn chọn | mẫu) + after`, rồi chọn lại phần chữ mẫu để gõ đè */
  const wrap = (before: string, after = "", sample = tb.text) => {
    const el = area.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end } = el;
    const selected = value.slice(start, end) || sample;
    onChange(value.slice(0, start) + before + selected + after + value.slice(end));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  };

  /** Thêm tiền tố (## , - , > ) ở đầu dòng chứa con trỏ */
  const prefixLine = (prefix: string) => {
    const el = area.current;
    if (!el) return;
    const lineStart = value.lastIndexOf("\n", el.selectionStart - 1) + 1;
    onChange(value.slice(0, lineStart) + prefix + value.slice(lineStart));
    const caret = el.selectionStart + prefix.length;
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(caret, caret);
    });
  };

  /** Chèn ảnh thành một đoạn riêng (ảnh lớn có chú thích) */
  const insertImage = (src: string, alt: string) => {
    const el = area.current;
    const at = el ? el.selectionEnd : value.length;
    const before = value.slice(0, at).replace(/\s*$/, "");
    const after = value.slice(at).replace(/^\s*/, "");
    onChange(`${before}${before ? "\n\n" : ""}![${alt}](${src})${after ? "\n\n" : ""}${after}`);
  };

  const pickFile = (file: File | undefined) => {
    if (file) insertImage(URL.createObjectURL(file), file.name.replace(/\.[^.]+$/, ""));
  };

  const tool = "grid h-8 min-w-8 place-items-center rounded-md px-1.5 text-ink-soft hover:bg-white hover:text-ink";
  const icon = { viewBox: "0 0 24 24", className: "size-4", fill: "none", stroke: "currentColor", strokeWidth: 1.8, "aria-hidden": true } as const;
  const tabCls = (active: boolean) =>
    `h-8 rounded-md px-3 text-sm font-medium ${active ? "bg-white text-ink ring-1 ring-line" : "text-ink-soft hover:text-ink"}`;

  return (
    <div>
      <p className="text-sm font-medium text-ink">{labels.body}</p>
      <p className="mt-0.5 text-xs leading-relaxed text-muted">{labels.bodyHint}</p>

      <div className="mt-2 overflow-hidden rounded-xl ring-1 ring-line focus-within:ring-2 focus-within:ring-brand-500">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface px-2 py-1.5">
          <div className="flex gap-1">
            <button type="button" className={tabCls(tab === "write")} onClick={() => setTab("write")} aria-pressed={tab === "write"}>
              {labels.write}
            </button>
            <button type="button" className={tabCls(tab === "preview")} onClick={() => setTab("preview")} aria-pressed={tab === "preview"}>
              {labels.previewTab}
            </button>
          </div>
          {tab === "write" && (
            <div role="toolbar" aria-label={tb.label} className="flex flex-wrap items-center gap-0.5">
              <button type="button" className={`${tool} font-semibold`} title={tb.heading} aria-label={tb.heading} onClick={() => prefixLine("## ")}>
                H
              </button>
              <button type="button" className={`${tool} font-bold`} title={tb.bold} aria-label={tb.bold} onClick={() => wrap("**", "**")}>
                B
              </button>
              <button type="button" className={`${tool} font-serif italic`} title={tb.italic} aria-label={tb.italic} onClick={() => wrap("*", "*")}>
                I
              </button>
              <button type="button" className={tool} title={tb.list} aria-label={tb.list} onClick={() => prefixLine("- ")}>
                <svg {...icon}>
                  <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />
                </svg>
              </button>
              <button type="button" className={tool} title={tb.quote} aria-label={tb.quote} onClick={() => prefixLine("> ")}>
                <svg {...icon}>
                  <path d="M10 8H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h3v1a3 3 0 0 1-3 3M20 8h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h3v1a3 3 0 0 1-3 3" />
                </svg>
              </button>
              <button type="button" className={tool} title={tb.link} aria-label={tb.link} onClick={() => wrap("[", "](https://)", tb.linkText)}>
                <svg {...icon}>
                  <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
                </svg>
              </button>
              <button type="button" className={tool} title={tb.image} aria-label={tb.image} onClick={() => insertImage("https://", tb.imageAlt)}>
                <svg {...icon}>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <circle cx="8.5" cy="10" r="1.5" />
                  <path d="m21 15-5-5-9 9" />
                </svg>
              </button>
              <label className={`${tool} cursor-pointer`} title={tb.upload}>
                <span className="sr-only">{tb.upload}</span>
                <svg {...icon}>
                  <path d="M12 16V4M7 9l5-5 5 5M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                </svg>
                <input type="file" accept="image/*" className="sr-only" onChange={(e) => pickFile(e.target.files?.[0])} />
              </label>
            </div>
          )}
        </div>

        {tab === "write" ? (
          <textarea
            ref={area}
            lang={lang}
            rows={16}
            value={value}
            aria-label={labels.body}
            onChange={(e) => onChange(e.target.value)}
            className="block w-full resize-y bg-white px-4 py-3 font-mono text-sm leading-relaxed text-ink outline-none"
          />
        ) : (
          <div lang={lang} className="min-h-[300px] bg-white px-5 py-5">
            {value.trim() ? <Markdown blocks={parseMarkdown(value)} numbered /> : <p className="text-sm text-muted">{labels.emptyPreview}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
