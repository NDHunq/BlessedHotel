"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import SideTitle from "@/components/news/SideTitle";

export type BrowserPost = {
  id: number;
  href: string;
  image: string;
  /** false: ảnh từ nguồn lạ, hiển thị không tối ưu (xem lib/images.ts) */
  optimize: boolean;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  date: string;
  /** Ngày đã định dạng theo ngôn ngữ (tính ở server) */
  dateLabel: string;
};

export type BrowserLabels = {
  categories: string;
  all: string;
  latest: string;
  search: string;
  searchPlaceholder: string;
  noResults: string;
};

/**
 * Trang danh sách tin: hàng ô chuyên mục (lọc) → `featured` (Tin nổi bật, render ở server)
 * → 2 cột: "Tin mới nhất" (lưới 2 cột, lọc theo chuyên mục + từ khoá) và thanh bên (ô tìm kiếm + `sidebar`).
 */
export default function NewsBrowser({
  posts,
  categories,
  allImage,
  labels,
  featured,
  sidebar,
}: {
  posts: BrowserPost[];
  categories: { id: string; label: string; image: string; optimize: boolean }[];
  /** Ảnh cho ô "Tất cả" (khác ảnh các chuyên mục) */
  allImage: string;
  labels: BrowserLabels;
  featured: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return posts.filter(
      (p) =>
        (!category || p.category === category) &&
        (!q || `${p.title} ${p.excerpt} ${p.categoryLabel}`.toLocaleLowerCase().includes(q)),
    );
  }, [posts, category, query]);

  const pick = (id: string | null) => {
    setCategory(id);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const tiles: { id: string | null; label: string; image: string; optimize: boolean }[] = [
    { id: null, label: labels.all, image: allImage, optimize: true },
    ...categories,
  ];

  return (
    <>
      {/* Ô chuyên mục: ảnh + nhãn, bấm để lọc "Tin mới nhất" */}
      <nav aria-label={labels.categories}>
        <ul className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-6 md:gap-4 md:px-0">
          {tiles.map((c) => {
            const active = category === c.id;
            return (
              <li key={c.id ?? "all"} className="w-32 shrink-0 snap-start md:w-auto">
                <button
                  type="button"
                  onClick={() => pick(c.id)}
                  aria-pressed={active}
                  className={`group relative block aspect-[4/5] w-full overflow-hidden rounded-xl text-left ring-offset-2 transition ${
                    active ? "ring-2 ring-brand-500" : ""
                  }`}
                >
                  {c.image && (
                    <Image src={c.image} alt="" fill unoptimized={!c.optimize} sizes="(min-width: 768px) 16vw, 128px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  )}
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-3 text-center text-sm font-semibold text-white">{c.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-14 md:mt-16">{featured}</div>

      <div ref={listRef} className="mt-14 grid scroll-mt-28 gap-12 md:mt-16 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section>
          <SideTitle>
            {labels.latest}
            {category && <span className="ml-2 text-base font-medium text-muted">· {categories.find((c) => c.id === category)?.label}</span>}
          </SideTitle>

          {visible.length === 0 ? (
            <p className="mt-8 text-ink-soft">{labels.noResults}</p>
          ) : (
            <ul className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2">
              {visible.map((p) => (
                <li key={p.id}>
                  <Link href={p.href} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                      <Image src={p.image} alt="" fill unoptimized={!p.optimize} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    </div>
                    <h3 className="mt-4 line-clamp-2 text-lg leading-snug font-semibold text-ink transition-colors group-hover:text-brand-600">{p.title}</h3>
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                      <CalendarIcon />
                      <time dateTime={p.date}>{p.dateLabel}</time>
                      <span aria-hidden>·</span>
                      {p.categoryLabel}
                    </p>
                    <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-ink-soft">{p.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="space-y-10">
          <div>
            <SideTitle as="h3">{labels.search}</SideTitle>
            <label className="mt-5 flex h-12 items-center gap-2 rounded-xl px-4 ring-1 ring-line focus-within:ring-2 focus-within:ring-brand-500">
              <span className="sr-only">{labels.search}</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={labels.searchPlaceholder}
                className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
              />
              <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </label>
          </div>
          {sidebar}
        </aside>
      </div>
    </>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}
