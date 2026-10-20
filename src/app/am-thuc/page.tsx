import type { Metadata } from "next";
import Image from "next/image";
import BookingCta from "@/components/booking/BookingCta";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { Label } from "@/components/ui/SectionHeading";
import { dining } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ẩm thực",
  description: "Nhà hàng, ẩm thực Việt và rooftop bar tại Blessed Hotel Phú Quốc.",
};

export default function DiningPage() {
  return (
    <>
      <PageHero
        title="Ẩm thực"
        description="Ba điểm đến ẩm thực, từ bữa sáng thong thả đến ly cocktail lúc hoàng hôn."
        image={dining[1].image}
      />

      <div className="py-16 md:py-24">
        <Container className="flex flex-col gap-20 md:gap-28">
          {dining.map((venue, i) => (
            <article id={venue.slug} key={venue.slug} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
              <div className={`relative aspect-[4/3] overflow-hidden rounded-card ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <Image src={venue.image} alt={venue.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div>
                <Label>{venue.kind}</Label>
                <h2 className="mt-3 font-serif text-4xl font-semibold text-ink md:text-5xl">{venue.name}</h2>
                <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">{venue.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {venue.highlights.map((h) => (
                    <li key={h} className="rounded-full bg-accent-soft px-4 py-2 text-sm text-ink">
                      {h}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink-soft">
                  <svg viewBox="0 0 24 24" className="size-4 text-brand-500" fill="none" stroke="currentColor" strokeWidth={1.75}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  Giờ mở cửa: {venue.hours}
                </p>
              </div>
            </article>
          ))}
        </Container>
      </div>

      <BookingCta title="Đặt bàn hoặc đặt phòng" description="Gọi điện hoặc nhắn Zalo để đặt bàn, hoặc đặt phòng nhanh qua các nền tảng." />
    </>
  );
}
