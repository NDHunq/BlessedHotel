import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import NewsGrid from "@/components/ui/NewsGrid";
import PageHero from "@/components/ui/PageHero";
import { pageMetadata } from "@/i18n/metadata";
import { getI18n } from "@/i18n/server";
import { getNews } from "@/lib/content";
import { pageImages } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { t, locale } = await getI18n();
  return pageMetadata({ locale, path: "/tin-tuc", title: t.newsPage.metaTitle, description: t.newsPage.metaDescription });
}

export default async function NewsPage() {
  const i18n = await getI18n();
  const { t } = i18n;

  return (
    <>
      <PageHero title={t.newsPage.metaTitle} description={t.newsPage.heroDescription} image={pageImages.news} />

      <section className="py-16 md:py-24">
        <Container>
          <NewsGrid posts={getNews(i18n)} />
        </Container>
      </section>
    </>
  );
}
