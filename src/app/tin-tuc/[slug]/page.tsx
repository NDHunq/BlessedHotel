import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import OpenBookingButton from "@/components/booking/OpenBookingButton";
import ArrowLink from "@/components/ui/ArrowLink";
import Container from "@/components/ui/Container";
import NewsGrid from "@/components/ui/NewsGrid";
import { formatDate, news } from "@/lib/site";

// Cache Components: tạo sẵn trang tĩnh cho mọi bài; slug lạ → notFound()
export function generateStaticParams() {
  return news.map((post) => ({ slug: post.slug }));
}

const findPost = (slug: string) => news.find((p) => p.slug === slug);

export async function generateMetadata({ params }: PageProps<"/tin-tuc/[slug]">): Promise<Metadata> {
  const post = findPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.image], type: "article" },
  };
}

/** Thời gian đọc ước tính (~200 từ/phút) */
const readingMinutes = (texts: string[]) => Math.max(1, Math.round(texts.join(" ").split(/\s+/).length / 200));

/** id neo cho tiêu đề mục (bỏ dấu tiếng Việt) */
const toAnchor = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const metaLabel = "text-xs font-medium tracking-wider text-white/55 uppercase";

/*
 * Bố cục kiểu tạp chí (tham khảo trang Stories của Belmond):
 * phần đầu nền tối (tag, tiêu đề, hàng thông tin bài) → ảnh chính đè lên mép phần đầu →
 * lưới 12 cột: lề trái (mục lục, dính khi cuộn) + cột chữ → bài viết khác.
 */
export default async function NewsArticlePage({ params }: PageProps<"/tin-tuc/[slug]">) {
  const post = findPost((await params).slug);
  if (!post) notFound();

  const allText = [post.excerpt, ...post.body.flatMap((s) => [s.heading ?? "", ...s.paragraphs])];
  const toc = post.body.filter((s) => s.heading).map((s) => ({ text: s.heading!, id: toAnchor(s.heading!) }));
  const others = news.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      {/* Phần đầu nền tối, nằm dưới header trong suốt */}
      <header className="-mt-16 bg-ink pt-32 pb-40 text-white md:pt-40 md:pb-56">
        <Container className="grid gap-y-8 md:grid-cols-12 md:gap-x-8">
          {/* Cùng mép trái với ảnh chính (cột 2) và mục lục bên dưới */}
          <div className="md:col-span-10 md:col-start-2">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Link href="/tin-tuc" className="text-white/70 transition-colors hover:text-white">
                Tin tức
              </Link>
              <span className="text-white/40" aria-hidden>
                /
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 font-medium text-accent">{post.category}</span>
            </div>
            <h1 className="mt-6 font-display text-4xl leading-[1.15] font-semibold tracking-[-0.01em] md:text-6xl">{post.title}</h1>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-white/15 pt-6 md:max-w-2xl">
              <div>
                <dt className={metaLabel}>Đăng bởi</dt>
                <dd className="mt-1.5 text-[15px]">Blessed Hotel</dd>
              </div>
              <div>
                <dt className={metaLabel}>Ngày đăng</dt>
                <dd className="mt-1.5 text-[15px]">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </dd>
              </div>
              <div>
                <dt className={metaLabel}>Thời gian đọc</dt>
                <dd className="mt-1.5 text-[15px]">{readingMinutes(allText)} phút</dd>
              </div>
            </dl>
          </div>
        </Container>
      </header>

      {/* Ảnh chính đè lên mép dưới phần đầu */}
      <Container className="-mt-28 md:-mt-44">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl md:mx-auto md:w-10/12">
          <Image src={post.image} alt={post.title} fill priority sizes="(min-width: 768px) 80vw, 100vw" className="object-cover" />
        </div>
      </Container>

      {/* Thân bài: lề trái (mục lục) + cột chữ */}
      <Container className="grid gap-10 py-14 md:grid-cols-12 md:gap-x-8 md:py-20">
        <aside className="hidden md:col-span-3 md:col-start-2 md:block">
          <div className="sticky top-28">
            {toc.length > 0 && (
              <>
                <p className="text-xs font-semibold tracking-wider text-muted uppercase">Trong bài này</p>
                <ol className="mt-4 space-y-3 border-l border-line">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="-ml-px block border-l border-transparent pl-4 text-[15px] leading-snug text-ink-soft transition-colors hover:border-brand-500 hover:text-brand-600">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </>
            )}
            <ArrowLink href="/tin-tuc" className="mt-8 text-sm">
              Tất cả tin tức
            </ArrowLink>
          </div>
        </aside>

        <article className="md:col-span-7">
          <p className="font-display text-2xl leading-[1.45] font-medium tracking-[-0.01em] text-ink md:text-[28px]">{post.excerpt}</p>

          <div className="mt-10 space-y-10 border-t border-line pt-10">
            {post.body.map((section, i) => (
              <section key={i} id={section.heading ? toAnchor(section.heading) : undefined}>
                {section.heading && (
                  <h2 className="mb-4 font-display text-2xl font-semibold tracking-[-0.01em] text-ink md:text-[28px]">{section.heading}</h2>
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
              <p className="text-lg font-semibold text-ink">Muốn đặt phòng hoặc hỏi thêm?</p>
              <p className="mt-1 text-[15px] text-ink-soft">Gọi, nhắn Zalo hoặc đặt nhanh qua các nền tảng.</p>
            </div>
            <OpenBookingButton className="shrink-0 self-start sm:self-auto">Liên hệ đặt phòng</OpenBookingButton>
          </div>

          <ArrowLink href="/tin-tuc" className="mt-10 md:hidden">
            Tất cả tin tức
          </ArrowLink>
        </article>
      </Container>

      {/* Bài viết khác */}
      <section className="border-t border-line py-16 md:py-20">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] text-ink md:text-4xl">Bài viết khác</h2>
            <ArrowLink href="/tin-tuc" className="shrink-0 pb-1">
              Xem tất cả
            </ArrowLink>
          </div>
          <NewsGrid posts={others} className="mt-10" />
        </Container>
      </section>
    </>
  );
}
