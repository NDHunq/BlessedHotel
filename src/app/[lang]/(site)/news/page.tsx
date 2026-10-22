import type { Metadata } from "next";
import FeaturedNews from "@/components/news/FeaturedNews";
import NewsBrowser from "@/components/news/NewsBrowser";
import RoomsMiniList from "@/components/news/RoomsMiniList";
import SideBookingCta from "@/components/news/SideBookingCta";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { formatDate } from "@/i18n/format";
import { pageMetadata } from "@/i18n/metadata";
import { getI18n } from "@/i18n/server";
import { getNews, getNewsCategories } from "@/lib/content";
import { about, pageImages } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { t, locale } = await getI18n();
  return pageMetadata({ locale, path: "/news", title: t.newsPage.metaTitle, description: t.newsPage.metaDescription });
}

/*
 * Bố cục theo trang tin Vinpearl: banner → ô chuyên mục (lọc) → Tin nổi bật (1 lớn + 2 nhỏ)
 * → 2 cột: Tin mới nhất (lưới 2 cột) + thanh bên (tìm kiếm, hạng phòng, đặt phòng).
 */
export default async function NewsPage() {
  const i18n = await getI18n();
  const { t, locale } = i18n;
  const posts = getNews(i18n);

  return (
    <>
      <PageHero title={t.newsPage.metaTitle} description={t.newsPage.heroDescription} image={pageImages.news} />

      <Container className="py-12 md:py-16">
        <NewsBrowser
          posts={posts.map((p) => ({
            slug: p.slug,
            href: p.href,
            image: p.image,
            title: p.title,
            excerpt: p.excerpt,
            category: p.category,
            categoryLabel: p.categoryLabel,
            date: p.date,
            dateLabel: formatDate(p.date, locale),
          }))}
          categories={getNewsCategories(i18n)}
          allImage={about.heroImage}
          labels={{
            categories: t.newsPage.categories,
            all: t.newsPage.allCategories,
            latest: t.newsPage.latest,
            search: t.newsPage.search,
            searchPlaceholder: t.newsPage.searchPlaceholder,
            noResults: t.newsPage.noResults,
          }}
          featured={<FeaturedNews posts={posts.filter((p) => p.featured)} />}
          sidebar={
            <>
              <RoomsMiniList />
              <SideBookingCta />
            </>
          }
        />
      </Container>
    </>
  );
}
