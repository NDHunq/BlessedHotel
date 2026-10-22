import Image from "next/image";
import Link from "next/link";
import SideTitle from "@/components/news/SideTitle";
import { formatDate } from "@/i18n/format";
import { getI18n } from "@/i18n/server";
import type { LocalizedNewsPost } from "@/lib/content";

/** "Tin nổi bật": 1 bài lớn bên trái (chữ đè ảnh + nút) và 2 bài nhỏ xếp chồng bên phải */
export default async function FeaturedNews({ posts }: { posts: LocalizedNewsPost[] }) {
  const { t, locale } = await getI18n();
  const [main, ...side] = posts;
  if (!main) return null;

  return (
    <section>
      <SideTitle>{t.newsPage.featured}</SideTitle>
      <div className="mt-6 grid gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5">
        <Link href={main.href} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[440px]">
          <Image src={main.image} alt="" fill priority sizes="(min-width: 768px) 66vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
            <p className="text-sm text-white/80">
              {main.categoryLabel} · <time dateTime={main.date}>{formatDate(main.date, locale)}</time>
            </p>
            <h3 className="mt-2 max-w-2xl font-display text-2xl leading-snug font-semibold md:text-3xl">{main.title}</h3>
            <p className="mt-2 line-clamp-2 max-w-2xl text-[15px] text-white/85">{main.excerpt}</p>
            <span className="mt-5 inline-flex h-10 items-center rounded-full bg-brand-600 px-5 text-sm font-semibold transition-colors group-hover:bg-brand-700">
              {t.ui.readMore}
            </span>
          </div>
        </Link>

        {side.slice(0, 2).map((post) => (
          <Link key={post.slug} href={post.href} className="group relative block aspect-[16/10] overflow-hidden rounded-2xl md:aspect-auto">
            <Image src={post.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-xs text-white/80">
                {post.categoryLabel} · <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
              </p>
              <h3 className="mt-1.5 line-clamp-2 text-base leading-snug font-semibold md:text-lg">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
