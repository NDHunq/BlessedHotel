import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowLink";
import { Label } from "@/components/ui/SectionHeading";
import { formatDate } from "@/i18n/format";
import { getI18n } from "@/i18n/server";
import type { LocalizedNewsPost } from "@/lib/content";

/** Lưới thẻ tin tức; cả thẻ là link tới /tin-tuc/[slug] */
export default async function NewsGrid({ posts, className = "" }: { posts: LocalizedNewsPost[]; className?: string }) {
  const { t, locale } = await getI18n();
  return (
    <div className={`grid gap-6 md:grid-cols-3 ${className}`}>
      {posts.map((post) => (
        <Link key={post.slug} href={post.href} className="group flex flex-col overflow-hidden rounded-2xl bg-sand">
          <div className="relative aspect-[2/1] overflow-hidden">
            <Image
              src={post.image}
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <Label>
              {post.category} · <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            </Label>
            <h3 className="mt-2 text-xl leading-snug font-semibold text-ink transition-colors group-hover:text-brand-600">{post.title}</h3>
            <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-ink-soft">{post.excerpt}</p>
            <span className="mt-auto inline-flex items-center gap-1 pt-8 font-semibold text-brand-600">
              {t.ui.readMore}
              <ArrowIcon />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
