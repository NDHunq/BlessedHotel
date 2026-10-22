import type { Metadata } from "next";
import BookingCta from "@/components/booking/BookingCta";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import ServiceList from "@/components/ui/ServiceList";
import { pageMetadata } from "@/i18n/metadata";
import { getI18n } from "@/i18n/server";
import { pageImages } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { t, locale } = await getI18n();
  return pageMetadata({ locale, path: "/dich-vu", title: t.servicesPage.metaTitle, description: t.servicesPage.metaDescription });
}

export default async function ServicesPage() {
  const { t } = await getI18n();

  return (
    <>
      <PageHero
        title={t.servicesPage.metaTitle}
        description={t.servicesPage.heroDescription}
        image={pageImages.services}
      />

      <section className="py-16 md:py-24">
        <Container>
          <ServiceList />
        </Container>
      </section>

      <BookingCta />
    </>
  );
}
