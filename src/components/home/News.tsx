import ArrowLink from "@/components/ui/ArrowLink";
import Container from "@/components/ui/Container";
import NewsGrid from "@/components/ui/NewsGrid";
import { getI18n } from "@/i18n/server";
import { getNews } from "@/lib/content";

export default async function News() {
  const i18n = await getI18n();
  const { t, href } = i18n;

  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-semibold tracking-[-0.01em] text-ink md:text-5xl">{t.home.newsTitle}</h2>
          <ArrowLink href={href("/tin-tuc")} className="shrink-0 pb-1">
            {t.ui.viewAll}
          </ArrowLink>
        </div>
        <NewsGrid posts={getNews(i18n).slice(0, 3)} className="mt-10" />
      </Container>
    </section>
  );
}
