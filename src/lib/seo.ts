/**
 * Chấm điểm SEO cho bài viết lúc soạn (trang quản trị), riêng cho từng ngôn ngữ.
 * Hàm thuần, không gọi mạng: dùng được ở Client Component (chấm khi gõ) và Server Component (cột SEO ở danh sách bài).
 *
 * Mỗi mục kiểm tra ghi rõ nguồn (`source`):
 * - "google": khuyến nghị có trong tài liệu chính thức của Google Search Central (link ở `GOOGLE_DOCS`). Chỉ các mục này được tính điểm.
 * - "convention": thông lệ của Yoast / Rank Math (từ khoá chính, số từ, mật độ, độ dài đoạn…). Google không quy định,
 *   nên chỉ hiện dạng "gợi ý" (status "tip"), không bao giờ trừ điểm.
 * Mọi ngưỡng số (độ dài tiêu đề/mô tả, số từ…) đều là tham khảo: Google không đặt giới hạn, chỉ cắt bớt cho vừa màn hình.
 * Đây KHÔNG phải điểm xếp hạng của Google.
 */
import { localeMeta, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { parseInline, parseMarkdown, type Block, type Inline } from "@/lib/markdown";

export type SeoMessage = keyof Dictionary["admin"]["seo"]["messages"];
/** tip = gợi ý theo thông lệ, không trừ điểm */
export type SeoStatus = "good" | "warn" | "bad" | "tip";
export type SeoRating = "good" | "warn" | "bad";
/** Ô nhập liên quan, để bấm vào mục kiểm tra thì nhảy tới đúng chỗ cần sửa */
export type SeoField = "keyword" | "seoTitle" | "metaDescription" | "body" | "cover";
export type SeoSource = "google" | "convention";

export type SeoCheck = {
  message: SeoMessage;
  status: SeoStatus;
  source: SeoSource;
  /** Trang tài liệu Google của mục này (khi source = "google") */
  url?: string;
  params?: Record<string, string | number>;
  field?: SeoField;
};

export type SeoResult = { score: number; rating: SeoRating; checks: SeoCheck[] };

export type SeoInput = {
  locale: Locale;
  keyword: string;
  title: string;
  excerpt: string;
  seoTitle: string;
  metaDescription: string;
  /** Nội dung bài dạng Markdown */
  body: string;
  hasCover: boolean;
  /** Từ khoá chính của các bài khác cùng ngôn ngữ (kiểm tra trùng) */
  otherKeywords: { keyword: string; title: string }[];
};

/** Tài liệu chính thức của Google Search Central (Google tự hiện bản tiếng Việt/Hàn/Trung theo ngôn ngữ trình duyệt) */
export const GOOGLE_DOCS = {
  titleLink: "https://developers.google.com/search/docs/appearance/title-link",
  snippet: "https://developers.google.com/search/docs/appearance/snippet",
  starterGuide: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
  images: "https://developers.google.com/search/docs/appearance/google-images",
  links: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable",
  article: "https://developers.google.com/search/docs/appearance/structured-data/article",
  keywordStuffing: "https://developers.google.com/search/docs/essentials/spam-policies#keyword-stuffing",
} as const;

/** Màu theo mức đánh giá (class Tailwind), dùng ở khung SEO, tab ngôn ngữ và cột SEO của danh sách bài */
export const ratingColor: Record<SeoStatus, { text: string; bg: string; dot: string }> = {
  good: { text: "text-emerald-700", bg: "bg-emerald-500", dot: "bg-emerald-500" },
  warn: { text: "text-amber-700", bg: "bg-amber-400", dot: "bg-amber-400" },
  bad: { text: "text-red-700", bg: "bg-red-500", dot: "bg-red-500" },
  tip: { text: "text-sky-700", bg: "bg-sky-500", dot: "bg-sky-500" },
};

/** Hậu tố layout gắn vào `<title>` (xem `app/[lang]/layout.tsx`) */
export const TITLE_SUFFIX = " | Blessed Hotel";

/**
 * Ngưỡng tham khảo theo "độ rộng" (chữ Hàn/Trung rộng gấp đôi chữ Latin nên tính 2).
 * Google không giới hạn độ dài, chỉ cắt cho vừa màn hình (~600px tiêu đề trên máy tính); 60 / 160 là mốc giới SEO hay dùng.
 */
export const LIMITS = { title: { min: 30, max: 60 }, meta: { min: 120, max: 160 } };

/** Số từ gợi ý tối thiểu và tối đa của một đoạn văn (thông lệ, tự ước lượng cho từng ngôn ngữ; tiếng Việt tách theo âm tiết) */
const WORDS: Record<Locale, { min: number; paragraph: number }> = {
  vi: { min: 400, paragraph: 180 },
  en: { min: 300, paragraph: 150 },
  ko: { min: 250, paragraph: 120 },
  zh: { min: 300, paragraph: 150 },
};

/** Điểm của các tiêu chí theo khuyến nghị của Google (tổng 100); tiêu chí nào không áp dụng thì bỏ khỏi mẫu số */
const WEIGHTS = {
  titleLength: 20,
  metaLength: 20,
  headings: 10,
  cover: 10,
  imageAlt: 15,
  links: 10,
  stuffing: 15,
} as const;
type Criterion = keyof typeof WEIGHTS;

const WIDE = /[ᄀ-ᇿ⺀-鿿가-힯豈-﫿＀-￯]/;

/** Độ rộng hiển thị của chuỗi (chữ Hàn/Trung/toàn khổ = 2) */
export function textWidth(text: string) {
  let n = 0;
  for (const ch of text) n += WIDE.test(ch) ? 2 : 1;
  return n;
}

const normalize = (text: string, locale: Locale) =>
  text.normalize("NFC").toLocaleLowerCase(localeMeta[locale].intl).replace(/\s+/g, " ").trim();

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Tìm từ khoá (không phân biệt hoa/thường, vẫn phân biệt dấu tiếng Việt).
 * vi/en: khớp nguyên từ; ko: chỉ chặn đầu từ (tiếng Hàn gắn trợ từ phía sau, VD 스파를); zh: không có ranh giới từ.
 */
function keywordPattern(keyword: string, locale: Locale) {
  const kw = escape(normalize(keyword, locale));
  const before = locale === "zh" ? "" : "(?<![\\p{L}\\p{N}])";
  const after = locale === "vi" || locale === "en" ? "(?![\\p{L}\\p{N}])" : "";
  return new RegExp(`${before}${kw}${after}`, "gu");
}

const countMatches = (text: string, pattern: RegExp, locale: Locale) => normalize(text, locale).match(pattern)?.length ?? 0;

/** Đếm từ bằng Intl.Segmenter (tách được tiếng Trung không có dấu cách) */
function countWords(text: string, locale: Locale) {
  const segmenter = new Intl.Segmenter(localeMeta[locale].intl, { granularity: "word" });
  let n = 0;
  for (const s of segmenter.segment(text)) if (s.isWordLike) n++;
  return n;
}

function plain(nodes: Inline[]): string {
  return nodes.map((n) => (n.type === "text" ? n.text : n.type === "image" ? "" : plain(n.children))).join("");
}

function collect(nodes: Inline[], out: { links: string[]; images: { alt: string }[] }) {
  for (const n of nodes) {
    if (n.type === "link") {
      out.links.push(n.href);
      collect(n.children, out);
    } else if (n.type === "image") out.images.push({ alt: n.alt });
    else if (n.type !== "text") collect(n.children, out);
  }
}

const blockTexts = (b: Block) => (b.type === "list" ? b.items : b.type === "image" ? [] : [b.text]);

/** Link nội bộ: đường dẫn bắt đầu bằng "/" hoặc cùng tên miền với website */
function isInternal(href: string) {
  if (href.startsWith("/")) return true;
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (!site) return false;
  try {
    return new URL(href).host === new URL(site).host;
  } catch {
    return false;
  }
}

export function analyzeSeo(input: SeoInput): SeoResult {
  const { locale } = input;
  const intl = localeMeta[locale].intl;
  const keyword = input.keyword.trim();
  const pattern = keyword ? keywordPattern(keyword, locale) : null;
  const has = (text: string) => (pattern ? countMatches(text, pattern, locale) > 0 : false);

  const blocks = parseMarkdown(input.body);
  const inlines = blocks.flatMap(blockTexts).map(parseInline);
  const found = { links: [] as string[], images: [] as { alt: string }[] };
  inlines.forEach((nodes) => collect(nodes, found));
  blocks.forEach((b) => b.type === "image" && found.images.push({ alt: b.alt }));

  const bodyText = inlines.map(plain).join("\n");
  const words = countWords(bodyText, locale);
  const headings = blocks.filter((b) => b.type === "heading").map((b) => plain(parseInline(b.text)));
  const firstParagraph = blocks.find((b) => b.type === "paragraph");

  const fullTitle = (input.seoTitle.trim() || input.title.trim()) + TITLE_SUFFIX;
  const meta = input.metaDescription.trim() || input.excerpt.trim();

  const checks: (SeoCheck & { criterion?: Criterion })[] = [];
  /** Mục theo khuyến nghị của Google (tính điểm qua `criterion`) */
  const google = (criterion: Criterion, url: string, check: Omit<SeoCheck, "source" | "url">) =>
    checks.push({ ...check, source: "google", url, criterion });
  /** Mục theo thông lệ Yoast / Rank Math: chưa đạt chỉ là gợi ý; `criterion` (nếu có) vẫn được đủ điểm */
  const convention = (check: Omit<SeoCheck, "source" | "status">, ok: boolean, criterion?: Criterion) =>
    checks.push({ ...check, status: ok ? "good" : "tip", source: "convention", criterion });

  // Tiêu đề: Google khuyên ngắn gọn, mô tả đúng, tránh dài dòng (bị cắt cho vừa màn hình); không có độ dài tối thiểu
  const titleW = textWidth(fullTitle);
  const titleParams = { n: titleW, max: LIMITS.title.max };
  if (titleW > LIMITS.title.max)
    google("titleLength", GOOGLE_DOCS.titleLink, { message: "titleLong", status: "warn", params: titleParams, field: "seoTitle" });
  else if (titleW < LIMITS.title.min) convention({ message: "titleShort", params: titleParams, field: "seoTitle" }, false, "titleLength");
  else google("titleLength", GOOGLE_DOCS.titleLink, { message: "titleGood", status: "good", params: titleParams });

  // Mô tả meta: Google khuyên mỗi trang có mô tả riêng; không giới hạn độ dài, bị cắt cho vừa màn hình
  const metaW = textWidth(meta);
  if (!meta) google("metaLength", GOOGLE_DOCS.snippet, { message: "metaMissing", status: "bad", field: "metaDescription" });
  else if (metaW > LIMITS.meta.max)
    google("metaLength", GOOGLE_DOCS.snippet, { message: "metaLong", status: "warn", params: { n: metaW, max: LIMITS.meta.max }, field: "metaDescription" });
  else if (metaW < LIMITS.meta.min)
    convention({ message: "metaShort", params: { n: metaW, min: LIMITS.meta.min, max: LIMITS.meta.max }, field: "metaDescription" }, false, "metaLength");
  else google("metaLength", GOOGLE_DOCS.snippet, { message: "metaGood", status: "good", params: { n: metaW } });

  // Tiêu đề mục: Google khuyên chia nội dung thành các phần có tiêu đề rõ ràng
  if (headings.length >= 2) google("headings", GOOGLE_DOCS.starterGuide, { message: "headingsGood", status: "good", params: { n: headings.length } });
  else google("headings", GOOGLE_DOCS.starterGuide, { message: "headingsFew", status: "warn", field: "body" });

  // Ảnh: ảnh đại diện cho bài (dữ liệu có cấu trúc Article), ảnh trong bài có mô tả (alt)
  if (input.hasCover) google("cover", GOOGLE_DOCS.article, { message: "coverGood", status: "good" });
  else google("cover", GOOGLE_DOCS.article, { message: "coverMissing", status: "bad", field: "cover" });
  const noAlt = found.images.filter((img) => !img.alt.trim()).length;
  if (found.images.length === 0) convention({ message: "imagesNone", field: "body" }, false);
  else if (noAlt > 0) google("imageAlt", GOOGLE_DOCS.images, { message: "imagesAltMissing", status: "bad", params: { n: noAlt }, field: "body" });
  else google("imageAlt", GOOGLE_DOCS.images, { message: "imagesGood", status: "good" });

  // Link nội bộ: giúp Google tìm và hiểu các trang của website
  const internal = found.links.filter(isInternal).length;
  if (internal > 0) google("links", GOOGLE_DOCS.links, { message: "linksGood", status: "good", params: { n: internal } });
  else google("links", GOOGLE_DOCS.links, { message: "linksNone", status: "warn", field: "body" });

  // Từ khoá chính: khái niệm của Yoast / Rank Math, Google không dùng. Riêng nhồi nhét từ khoá là vi phạm chính sách của Google
  if (!pattern) convention({ message: "keywordMissing", field: "keyword" }, false);
  else {
    const title = normalize(fullTitle, locale);
    const at = title.search(pattern);
    const early = at >= 0 && at <= title.length / 2;
    convention({ message: at < 0 ? "titleKeywordMissing" : early ? "titleKeywordGood" : "titleKeywordLate", field: "seoTitle" }, early);
    const inMeta = has(meta);
    convention({ message: inMeta ? "metaKeywordGood" : "metaKeywordMissing", field: "metaDescription" }, inMeta);
    const intro = Boolean(firstParagraph && has(plain(parseInline(firstParagraph.text))));
    convention({ message: intro ? "introKeywordGood" : "introKeywordMissing", field: "body" }, intro);
    const inHeading = headings.some(has);
    convention({ message: inHeading ? "headingKeywordGood" : "headingKeywordMissing", field: "body" }, inHeading);

    const n = countMatches(bodyText, pattern, locale);
    // Như Yoast: số lần xuất hiện cụm từ khoá / tổng số từ
    const pct = words ? (n * 100) / words : 0;
    const params = { n, pct: new Intl.NumberFormat(intl, { maximumFractionDigits: 1 }).format(pct) };
    if (pct > 2.5) google("stuffing", GOOGLE_DOCS.keywordStuffing, { message: "densityHigh", status: "bad", params, field: "body" });
    else if (n === 0) convention({ message: "densityNone", field: "body" }, false, "stuffing");
    else if (pct < 0.5) convention({ message: "densityLow", params, field: "body" }, false, "stuffing");
    else convention({ message: "densityGood", params }, true, "stuffing");

    const same = input.otherKeywords.find((o) => o.keyword.trim() && normalize(o.keyword, locale) === normalize(keyword, locale));
    convention(same ? { message: "keywordDuplicate", params: { title: same.title }, field: "keyword" } : { message: "keywordUnique" }, !same);
  }

  // Độ dài nội dung, độ dài đoạn: Google không quy định số từ
  const { min, paragraph } = WORDS[locale];
  const lengthMessage = words >= min ? "lengthGood" : words >= min / 2 ? "lengthWarn" : "lengthBad";
  convention({ message: lengthMessage, params: { n: words, min }, field: "body" }, words >= min);
  const longParagraphs = blocks.filter((b) => b.type === "paragraph" && countWords(plain(parseInline(b.text)), locale) > paragraph).length;
  convention(
    longParagraphs > 0 ? { message: "paragraphsLong", params: { n: longParagraphs }, field: "body" } : { message: "paragraphsGood" },
    longParagraphs === 0,
  );

  // Điểm = điểm đạt / tổng điểm các tiêu chí áp dụng. Đạt và gợi ý = đủ điểm, nên cải thiện = nửa, cần sửa = 0
  let earned = 0;
  let possible = 0;
  for (const c of checks) {
    if (!c.criterion) continue;
    possible += WEIGHTS[c.criterion];
    earned += c.status === "warn" ? WEIGHTS[c.criterion] / 2 : c.status === "bad" ? 0 : WEIGHTS[c.criterion];
  }
  const score = possible ? Math.round((earned / possible) * 100) : 0;

  return {
    score,
    rating: score >= 80 ? "good" : score >= 50 ? "warn" : "bad",
    checks: checks.map((c) => ({ message: c.message, status: c.status, source: c.source, url: c.url, params: c.params, field: c.field })),
  };
}
