/**
 * Markdown đơn giản cho nội dung bài viết (soạn ở trang quản trị, hiển thị ở trang bài viết).
 * Hỗ trợ: `## Tiêu đề` (### tiêu đề nhỏ), đoạn văn (cách nhau 1 dòng trống), `**đậm**`, `*nghiêng*`,
 * `[chữ](link)`, `![mô tả](link ảnh)` (một dòng riêng = ảnh lớn có chú thích), `- danh sách`, `1. danh sách`, `> trích dẫn`.
 * Không cho HTML thô; link chỉ nhận http(s), đường dẫn nội bộ, mailto:, tel: và blob: (ảnh xem trước).
 */

export type Inline =
  | { type: "text"; text: string }
  | { type: "strong" | "em"; children: Inline[] }
  | { type: "link"; href: string; children: Inline[] }
  | { type: "image"; src: string; alt: string };

export type Block =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string };

const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)\s]+)\)$/;
const HEADING = /^(#{1,3})\s+(.+)$/;
const BULLET = /^[-*]\s+(.*)$/;
const NUMBERED = /^\d+[.)]\s+(.*)$/;
const QUOTE = /^>\s?(.*)$/;

/** Chỉ giữ link an toàn; còn lại (VD javascript:) đổi thành "#" */
export function safeUrl(url: string) {
  return /^(https?:\/\/|\/|#|mailto:|tel:|blob:)/i.test(url) ? url : "#";
}

/** Tách văn bản Markdown thành các khối */
export function parseMarkdown(source: string): Block[] {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks: Block[] = [];
  let paragraph: string[] = [];

  const flush = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    paragraph = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    let m: RegExpMatchArray | null;

    if (!line) {
      flush();
    } else if ((m = line.match(HEADING))) {
      flush();
      blocks.push({ type: "heading", level: m[1].length === 3 ? 3 : 2, text: m[2] });
    } else if ((m = line.match(IMAGE_LINE))) {
      flush();
      blocks.push({ type: "image", alt: m[1], src: safeUrl(m[2]) });
    } else if (BULLET.test(line) || NUMBERED.test(line)) {
      flush();
      const ordered = NUMBERED.test(line);
      const pattern = ordered ? NUMBERED : BULLET;
      const items: string[] = [];
      while (i < lines.length && (m = lines[i].trim().match(pattern))) {
        items.push(m[1]);
        i++;
      }
      i--;
      blocks.push({ type: "list", ordered, items });
    } else if (QUOTE.test(line)) {
      flush();
      const quote: string[] = [];
      while (i < lines.length && (m = lines[i].trim().match(QUOTE))) {
        quote.push(m[1]);
        i++;
      }
      i--;
      blocks.push({ type: "quote", text: quote.join(" ") });
    } else {
      paragraph.push(line);
    }
  }
  flush();
  return blocks;
}

const INLINE = /(!\[[^\]]*\]\([^)\s]+\)|\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*|\*[^*\s][^*]*\*|_[^_\s][^_]*_)/;

/** Định dạng trong dòng: đậm, nghiêng, link, ảnh nhỏ */
export function parseInline(text: string): Inline[] {
  return text
    .split(INLINE)
    .filter(Boolean)
    .map((part): Inline => {
      let m: RegExpMatchArray | null;
      if ((m = part.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/))) return { type: "image", alt: m[1], src: safeUrl(m[2]) };
      if ((m = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/))) return { type: "link", href: safeUrl(m[2]), children: parseInline(m[1]) };
      if ((m = part.match(/^\*\*([^*]+)\*\*$/))) return { type: "strong", children: parseInline(m[1]) };
      if ((m = part.match(/^[*_](.+)[*_]$/))) return { type: "em", children: parseInline(m[1]) };
      return { type: "text", text: part };
    });
}

/** Chữ thuần (bỏ ký hiệu Markdown), dùng cho mục lục và ước tính thời gian đọc */
export function inlineText(text: string): string {
  return parseInline(text).map(plain).join("");
}

function plain(n: Inline): string {
  if (n.type === "text") return n.text;
  if (n.type === "image") return "";
  return n.children.map(plain).join("");
}

export function blocksText(blocks: Block[]): string[] {
  return blocks.flatMap((b) => (b.type === "list" ? b.items.map(inlineText) : b.type === "image" ? [] : [inlineText(b.text)]));
}

/** Nội dung bài dạng cũ (mục: tiêu đề + đoạn văn) → Markdown. Dùng tới khi bài được lưu sẵn dạng Markdown trong database */
export function bodyToMarkdown(body: readonly { heading?: string; paragraphs: readonly string[] }[]) {
  return body
    .flatMap((s) => [...(s.heading ? [`## ${s.heading}`] : []), ...s.paragraphs])
    .join("\n\n");
}
