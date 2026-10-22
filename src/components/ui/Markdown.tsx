import { Fragment } from "react";
import { parseInline, type Block, type Inline } from "@/lib/markdown";

/** Phần trong dòng (đậm, nghiêng, link, ảnh nhỏ) */
function InlineContent({ nodes }: { nodes: Inline[] }) {
  return nodes.map((n, i) => {
    switch (n.type) {
      case "text":
        return <Fragment key={i}>{n.text}</Fragment>;
      case "strong":
        return (
          <strong key={i} className="font-semibold text-ink">
            <InlineContent nodes={n.children} />
          </strong>
        );
      case "em":
        return (
          <em key={i}>
            <InlineContent nodes={n.children} />
          </em>
        );
      case "link": {
        const external = /^https?:\/\//.test(n.href);
        return (
          <a
            key={i}
            href={n.href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700"
          >
            <InlineContent nodes={n.children} />
          </a>
        );
      }
      case "image":
        // Ảnh trong nội dung bài có thể từ host bất kỳ / ảnh tải lên (blob:), next/image không tối ưu được
        // eslint-disable-next-line @next/next/no-img-element
        return <img key={i} src={n.src} alt={n.alt} loading="lazy" className="inline-block max-h-40 rounded-lg align-middle" />;
    }
  });
}

const text = (s: string) => <InlineContent nodes={parseInline(s)} />;

/**
 * Hiển thị nội dung bài viết Markdown (đã tách khối bằng `parseMarkdown`).
 * `headingId(i)`: id neo cho tiêu đề `##` thứ i (cho mục lục); `numbered`: đánh số "1. " trước tiêu đề `##`.
 */
export default function Markdown({
  blocks,
  headingId,
  numbered = false,
  className = "",
}: {
  blocks: Block[];
  headingId?: (index: number) => string;
  numbered?: boolean;
  className?: string;
}) {
  let h2 = -1;

  return (
    <div className={`space-y-5 text-[17px] leading-[1.8] text-ink-soft ${className}`}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "heading":
            if (b.level === 3) {
              return (
                <h3 key={i} className="pt-3 text-xl font-semibold text-ink">
                  {text(b.text)}
                </h3>
              );
            }
            h2++;
            return (
              <h2 key={i} id={headingId?.(h2)} className="scroll-mt-24 pt-5 font-display text-2xl leading-snug font-semibold tracking-[-0.01em] text-ink first:pt-0">
                {numbered && `${h2 + 1}. `}
                {text(b.text)}
              </h2>
            );
          case "paragraph":
            return <p key={i}>{text(b.text)}</p>;
          case "image":
            return (
              <figure key={i} className="py-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.src} alt={b.alt} loading="lazy" className="w-full rounded-2xl" />
                {b.alt && <figcaption className="mt-3 text-center text-sm text-muted italic">{b.alt}</figcaption>}
              </figure>
            );
          case "list": {
            const List = b.ordered ? "ol" : "ul";
            return (
              <List key={i} className={`space-y-2 pl-6 ${b.ordered ? "list-decimal" : "list-disc"} marker:text-brand-500`}>
                {b.items.map((item, j) => (
                  <li key={j}>{text(item)}</li>
                ))}
              </List>
            );
          }
          case "quote":
            return (
              <blockquote key={i} className="border-l-4 border-brand-500 py-1 pl-5 font-serif text-xl text-ink italic">
                {text(b.text)}
              </blockquote>
            );
        }
      })}
    </div>
  );
}
