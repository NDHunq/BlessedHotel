import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import NewsGrid from "@/components/ui/NewsGrid";
import PageHero from "@/components/ui/PageHero";
import { news } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Ưu đãi, sự kiện và cẩm nang du lịch Phú Quốc từ Blessed Hotel.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero title="Tin tức" description="Ưu đãi, sự kiện và cẩm nang du lịch Phú Quốc." image={news[3].image} />

      <section className="py-16 md:py-24">
        <Container>
          <NewsGrid posts={news} />
        </Container>
      </section>
    </>
  );
}
