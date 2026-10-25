import Image from "next/image";
import Link from "next/link";
import SideTitle from "@/components/news/SideTitle";
import { formatDate } from "@/i18n/format";
import { getI18n } from "@/i18n/server";
import type { LocalizedNewsPost } from "@/lib/content";

/** Danh sách bài nhỏ (ảnh thu nhỏ + ngày + tiêu đề) cho thanh bên */
export default async function PostMiniList({ title, posts }: { title: string; posts: LocalizedNewsPost[] }) {
  const { locale } = await getI18n();
  return (
    <div>
      <SideTitle as="h3">{title}</SideTitle>
      <ul className="mt-5 divide-y divide-line">
        {posts.map((p) => (
          <li key={p.id}>
            <Link href={p.href} className="group flex gap-4 py-4 first:pt-0">
              <span className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-lg">
                <Image src={p.image} alt="" fill unoptimized={!p.optimize} sizes="112px" className="object-cover" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-muted">
                  <time dateTime={p.date}>{formatDate(p.date, locale)}</time>
                </span>
                <span className="mt-1 line-clamp-3 text-[15px] leading-snug font-semibold text-ink transition-colors group-hover:text-brand-600">
                  {p.title}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
