import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { fill, localeMeta, locales } from "@/i18n/config";
import { formatDate } from "@/i18n/format";
import { getI18n } from "@/i18n/server";
import { canOptimizeImage } from "@/lib/images";
import { adminKeywordIndex, adminListCategories, adminListPosts } from "@/lib/news";
import { analyzeSeo, ratingColor } from "@/lib/seo";

/** Danh sách bài viết trong trang quản trị (đọc database: cả bài nháp và bài đã đăng) */
export default async function AdminPostsPage() {
  const { t, locale, href } = await getI18n();
  const { list } = t.admin;
  const [posts, categories, keywordIndex] = await Promise.all([adminListPosts(), adminListCategories(), adminKeywordIndex()]);
  const categoryName = (id: string) => categories.find((c) => c.id === id)?.names[locale] || id;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-[-0.01em] text-ink">{list.title}</h1>
          <p className="mt-1 text-sm text-muted">{fill(list.count, { n: posts.length })}</p>
        </div>
        <Button href={href("/admin/news/new")}>+ {t.admin.nav.newPost}</Button>
      </div>

      {posts.length === 0 ? (
        <p className="mt-8 rounded-2xl bg-white px-6 py-12 text-center text-ink-soft ring-1 ring-line">{list.empty}</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl bg-white ring-1 ring-line">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="border-b border-line text-xs text-muted uppercase">
              <tr>
                <th className="px-5 py-3 font-medium">{list.post}</th>
                <th className="px-5 py-3 font-medium">{list.category}</th>
                <th className="px-5 py-3 font-medium">{list.date}</th>
                <th className="px-5 py-3 font-medium">{list.seo}</th>
                <th className="px-5 py-3 font-medium">{list.status}</th>
                <th className="px-5 py-3 text-right font-medium">{list.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {posts.map((post) => {
                // Tiêu đề theo ngôn ngữ giao diện, chưa có thì lấy bản ngôn ngữ khác
                const title = post.content[locale].title || locales.map((l) => post.content[l].title).find(Boolean) || t.admin.editor.untitled;
                // Điểm SEO từng ngôn ngữ (cùng bộ chấm với trình soạn)
                const scores = locales.map((l) => {
                  const c = post.content[l];
                  const result = analyzeSeo({
                    locale: l,
                    keyword: c.focusKeyword,
                    title: c.title,
                    excerpt: c.excerpt,
                    seoTitle: c.seoTitle,
                    metaDescription: c.metaDescription,
                    body: c.body,
                    hasCover: post.image !== "",
                    otherKeywords: keywordIndex[l].filter((k) => k.id !== post.id),
                  });
                  return { locale: l, score: result.score, rating: result.rating };
                });
                const published = post.status === "published";
                return (
                  <tr key={post.id} className="hover:bg-surface/60">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-line">
                          {post.image && (
                            <Image src={post.image} alt="" fill unoptimized={!canOptimizeImage(post.image)} sizes="64px" className="object-cover" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link href={href(`/admin/news/${post.id}`)} className="line-clamp-1 font-medium text-ink hover:text-brand-600">
                            {title}
                          </Link>
                          <p className="text-xs text-muted">#{post.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-ink-soft">{categoryName(post.category)}</td>
                    <td className="px-5 py-3 whitespace-nowrap text-ink-soft tabular-nums">{post.date ? formatDate(post.date, locale) : "–"}</td>
                    <td className="px-5 py-3">
                      <ul className="flex gap-1.5">
                        {scores.map((s) => (
                          <li
                            key={s.locale}
                            title={`${localeMeta[s.locale].label}: ${fill(t.admin.seo.tabScore, { score: s.score })}`}
                            className="flex items-center gap-1 rounded-full bg-surface px-1.5 py-0.5 text-xs text-ink-soft ring-1 ring-line"
                          >
                            <span className={`size-1.5 rounded-full ${ratingColor[s.rating].dot}`} aria-hidden />
                            <span className="font-medium uppercase">{s.locale}</span>
                            <span className={`tabular-nums ${ratingColor[s.rating].text}`}>{s.score}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${
                            published ? "bg-emerald-50 text-emerald-700 ring-emerald-100" : "bg-surface text-ink-soft ring-line"
                          }`}
                        >
                          {published ? list.published : list.draft}
                        </span>
                        {post.featured && <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">{list.featured}</span>}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      <Link href={href(`/admin/news/${post.id}`)} className="font-medium text-brand-600 hover:text-brand-700">
                        {list.edit}
                      </Link>
                      {published && (
                        <>
                          <span className="mx-2 text-line" aria-hidden>
                            |
                          </span>
                          <Link href={href(`/news/${post.id}`)} target="_blank" className="font-medium text-ink-soft hover:text-ink">
                            {list.view} ↗
                          </Link>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
