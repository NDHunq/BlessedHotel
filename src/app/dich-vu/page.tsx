import type { Metadata } from "next";
import BookingCta from "@/components/booking/BookingCta";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import ServiceList from "@/components/ui/ServiceList";
import { pageImages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dịch vụ",
  description: "Spa, hồ bơi, đưa đón sân bay, hội nghị và concierge tại Blessed Hotel Phú Quốc.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Dịch vụ"
        description="Từ lúc đặt chân xuống sân bay đến khi rời đảo, mọi việc cứ để chúng tôi lo."
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
