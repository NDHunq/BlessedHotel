import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import OpenBookingButton from "@/components/booking/OpenBookingButton";
import PostMiniList from "@/components/news/PostMiniList";
import RoomsMiniList from "@/components/news/RoomsMiniList";
import SideBookingCta from "@/components/news/SideBookingCta";
import ArrowLink from "@/components/ui/ArrowLink";
import Container from "@/components/ui/Container";
import { fill } from "@/i18n/config";
import { formatDate, readingMinutes } from "@/i18n/format";
import { pageMetadata } from "@/i18n/metadata";
import { getI18n } from "@/i18n/server";
import { getNews } from "@/lib/content";
import { news } from "@/lib/site";

// Cache Components: tạo sẵn trang tĩnh cho mọi bài (mỗi ngôn ngữ); URL là /news/<id>, id lạ → notFound()
export function generateStaticParams() {
  return news.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/news/[id]">): Promise<Metadata> {
  const { id } = await params;
  const i18n = await getI18n();
  const post = getNews(i18n).find((p) => String(p.id) === id);
  if (!post) return {};
  return pageMetadata({ locale: i18n.locale, path: `/news/${id}`, title: post.title, description: post.excerpt, image: post.image });
}

/** id neo cho mục thứ i (không lấy từ tiêu đề vì tiếng Hàn/Trung không chuyển được thành chữ Latin) */
const anchorId = (i: number) => `section-${i + 1}`;

/*
 * Bố cục theo bài viết Vinpearl: nền trắng (header đặc, không trong suốt ở trang này),
 * cột bài (breadcrumb, tiêu đề, ngày + thời gian đọc, đoạn mở đầu, Mục lục thu gọn, khung "Thông tin nhanh",
 * ảnh có chú thích, các mục đánh số, khối đặt phòng) + thanh bên dính (bài dành cho bạn, hạng phòng, đặt phòng).
 */
export default async function NewsArticlePage({ params }: PageProps<"/[lang]/news/[id]">) {
  const { id } = await params;
  const i18n = await getI18n();
  const { t, locale, href } = i18n;
  const all = getNews(i18n);
  const post = all.find((p) => String(p.id) === id);
  if (!post) notFound();

  const allText = [post.excerpt, ...post.keyPoints, ...post.body.flatMap((s) => [s.heading ?? "", ...s.paragraphs])];
  // Mục có tiêu đề được đánh số 1, 2, 3… (dùng chung cho Mục lục và tiêu đề trong bài)
  let n = 0;
  const sections = post.body.map((s, i) => ({ ...s, id: anchorId(i), number: s.heading ? ++n : 0 }));
  const toc = sections.filter((s) => s.heading);
  const others = all.filter((p) => p.id !== post.id).slice(0, 4);

  return (
    <Container className="grid gap-12 pt-8 pb-24 md:pt-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
      <article className="min-w-0">
        <nav aria-label={t.ui.breadcrumb} className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          <Link href={href("/")} className="hover:text-brand-600">
            {t.ui.home}
          </Link>
          <Chevron />
          <Link href={href("/news")} className="hover:text-brand-600">
            {t.nav.news}
          </Link>
          <Chevron />
          <span className="text-ink">{post.categoryLabel}</span>
        </nav>

        <h1 className="mt-5 font-display text-3xl leading-[1.2] font-semibold tracking-[-0.01em] text-ink md:text-[40px]">{post.title}</h1>

        <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5" title={t.article.publishedOn}>
            <CalendarIcon />
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5" title={t.article.readingTime}>
            <ClockIcon />
            {fill(t.article.minutes, { n: readingMinutes(allText, locale) })}
          </span>
          <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">{post.categoryLabel}</span>
        </p>

        <p className="mt-6 text-lg leading-relaxed text-ink">{post.excerpt}</p>

        {/* Mục lục thu gọn */}
        {toc.length > 0 && (
          <details className="group mt-8 rounded-xl ring-1 ring-line" open>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
              <span className="inline-flex items-center gap-2.5">
                <ListIcon />
                {t.article.tableOfContents}
              </span>
              <svg viewBox="0 0 24 24" className="size-5 text-muted transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <ol className="space-y-2 border-t border-line px-5 py-4 text-[15px]">
              {toc.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-ink-soft hover:text-brand-600">
                    {s.number}. {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        )}

        {/* Khung tóm tắt nhanh, nhãn gắn trên viền */}
        <aside className="relative mt-10 rounded-2xl border-2 border-brand-500 px-6 pt-8 pb-6">
          <p className="absolute -top-3.5 left-5 rounded-full bg-brand-600 px-4 py-1 text-sm font-semibold text-white">{t.article.keyPoints}</p>
          <ul className="space-y-2.5 text-[15px] leading-relaxed text-ink">
            {post.keyPoints.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </aside>

        <figure className="mt-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image src={post.image} alt={post.title} fill priority sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
          </div>
          <figcaption className="mt-3 text-center text-sm text-muted italic">{post.title}</figcaption>
        </figure>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={section.heading ? section.id : undefined}>
              {section.heading && (
                <h2 className="mb-4 font-display text-2xl font-semibold tracking-[-0.01em] text-ink">
                  {section.number}. {section.heading}
                </h2>
              )}
              <div className="space-y-5">
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="text-[17px] leading-[1.8] text-ink-soft">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-5 rounded-2xl bg-sand p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div>
            <p className="text-lg font-semibold text-ink">{t.article.ctaTitle}</p>
            <p className="mt-1 text-[15px] text-ink-soft">{t.article.ctaBody}</p>
          </div>
          <OpenBookingButton className="shrink-0 self-start sm:self-auto">{t.ui.contactToBook}</OpenBookingButton>
        </div>

        <ArrowLink href={href("/news")} className="mt-10">
          {t.article.allNews}
        </ArrowLink>
      </article>

      {/* Thanh bên: dính khi cuộn trên desktop */}
      <aside className="space-y-10 lg:sticky lg:top-24 lg:self-start">
        <PostMiniList title={t.article.forYou} posts={others} />
        <RoomsMiniList />
        <SideBookingCta />
      </aside>
    </Container>
  );
}

const Chevron = () => (
  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const ListIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5 text-brand-600" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
    <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
  </svg>
);
