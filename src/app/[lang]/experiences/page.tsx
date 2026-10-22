import type { Metadata } from "next";
import Image from "next/image";
import BookingCta from "@/components/booking/BookingCta";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import VenueCard from "@/components/ui/VenueCard";
import { pageMetadata } from "@/i18n/metadata";
import { getI18n } from "@/i18n/server";
import { getExperiences } from "@/lib/content";
import { pageImages } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { t, locale } = await getI18n();
  return pageMetadata({ locale, path: "/experiences", title: t.experiencesPage.metaTitle, description: t.experiencesPage.metaDescription });
}

/*
 * Bố cục theo trang chủ Vinpearl: banner toàn màn hình (tiêu đề + 1 dòng mô tả + nút "Khám phá" cuộn xuống),
 * sau đó các thẻ ngang giống trang Ẩm thực: Blessed Spa (Xem menu + Đặt chỗ) và phòng tập (giờ mở cửa).
 */
export default async function ExperiencesPage() {
  const i18n = await getI18n();
  const { t } = i18n;
  const page = t.experiencesPage;

  return (
    <>
      {/* Banner toàn màn hình, nằm dưới header trong suốt */}
      <section className="relative isolate -mt-16 flex h-[600px] items-center overflow-hidden md:h-svh md:max-h-[900px] md:min-h-[640px]">
        <Image src={pageImages.experiences} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/65 via-black/30 to-black/5" />
        <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/45 to-transparent" />
        <Container className="w-full pt-16 text-white">
          <h1 className="max-w-2xl font-display text-4xl leading-[1.1] font-semibold tracking-[-0.01em] md:text-6xl">{page.heroTitle}</h1>
          <p className="mt-5 max-w-xl text-base text-white/85 md:text-lg">{page.heroDescription}</p>
          <Button href="#explore" variant="ghost" size="lg" className="mt-8">
            {page.explore}
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Button>
        </Container>
      </section>

      <section id="explore" className="scroll-mt-16 py-16 md:py-24">
        <Container>
          <SectionHeading title={page.title} description={page.intro} align="center" />
          <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-8 md:mt-16 md:gap-10">
            {getExperiences(i18n).map((venue) => (
              <VenueCard key={venue.slug} venue={venue} reserveLabel={venue.slug === "spa" ? t.venue.reserveSpa : undefined} />
            ))}
          </div>
        </Container>
      </section>

      <BookingCta />
    </>
  );
}
