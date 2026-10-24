import type { Metadata } from "next";
import BookingCta from "@/components/booking/BookingCta";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import VenueCard from "@/components/ui/VenueCard";
import { pageMetadata } from "@/i18n/metadata";
import { getI18n } from "@/i18n/server";
import { getDining } from "@/lib/content";
import { pageImages } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { t, locale } = await getI18n();
  return pageMetadata({ locale, path: "/dining", title: t.diningPage.metaTitle, description: t.diningPage.metaDescription });
}

/*
 * Bố cục theo trang ẩm thực của Vinpearl: tiêu đề + đoạn dẫn căn giữa, rồi mỗi nhà hàng một thẻ ngang
 * (băng ảnh cuộn + tên, loại hình, mô tả, giờ mở cửa, điện thoại, "Xem menu", "Đặt bàn"); thẻ thứ 2, 4… đổi bên (ảnh phải, chữ trái).
 */
export default async function DiningPage() {
  const i18n = await getI18n();
  const { t } = i18n;

  return (
    <>
      <PageHero title={t.diningPage.metaTitle} description={t.diningPage.heroDescription} image={pageImages.dining} />

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading title={t.diningPage.title} description={t.diningPage.intro} align="center" />
          <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-8 md:mt-16 md:gap-10">
            {getDining(i18n).map((venue, i) => (
              <VenueCard key={venue.slug} venue={venue} reserveLabel={t.venue.reserveTable} reverse={i % 2 === 1} />
            ))}
          </div>
        </Container>
      </section>

      <BookingCta title={t.diningPage.cta.title} description={t.diningPage.cta.description} />
    </>
  );
}
