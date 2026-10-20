import ArrowLink from "@/components/ui/ArrowLink";
import Container from "@/components/ui/Container";
import NewsGrid from "@/components/ui/NewsGrid";
import { news } from "@/lib/site";

export default function News() {
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-semibold tracking-[-0.01em] text-ink md:text-5xl">Tin tức & ưu đãi</h2>
          <ArrowLink href="/tin-tuc" className="shrink-0 pb-1">
            Xem tất cả
          </ArrowLink>
        </div>
        <NewsGrid posts={news.slice(0, 3)} className="mt-10" />
      </Container>
    </section>
  );
}
