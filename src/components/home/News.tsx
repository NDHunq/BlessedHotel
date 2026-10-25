import { Suspense } from "react";
import ArrowLink from "@/components/ui/ArrowLink";
import Container from "@/components/ui/Container";
import NewsGrid, { NewsGridSkeleton } from "@/components/ui/NewsGrid";
import { getI18n } from "@/i18n/server";
import { getNews } from "@/lib/content";

/** 3 bài mới nhất (đọc từ database lúc có request, nên nằm trong Suspense) */
async function LatestNews() {
  const posts = await getNews(await getI18n());
  return <NewsGrid posts={posts.slice(0, 3)} className="mt-10" />;
}

export default async function News() {
  const { t, href } = await getI18n();

  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-semibold tracking-[-0.01em] text-ink md:text-5xl">{t.home.newsTitle}</h2>
          <ArrowLink href={href("/news")} className="shrink-0 pb-1">
            {t.ui.viewAll}
          </ArrowLink>
        </div>
        <Suspense fallback={<NewsGridSkeleton className="mt-10" />}>
          <LatestNews />
        </Suspense>
      </Container>
    </section>
  );
}
