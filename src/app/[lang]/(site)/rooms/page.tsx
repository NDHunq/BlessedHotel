import type { Metadata } from "next";
import BookingCta from "@/components/booking/BookingCta";
import OpenBookingButton from "@/components/booking/OpenBookingButton";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import RoomDetails from "@/components/ui/RoomDetails";
import RoomGallery from "@/components/ui/RoomGallery";
import { Label } from "@/components/ui/SectionHeading";
import { fill } from "@/i18n/config";
import { formatPrice } from "@/i18n/format";
import { pageMetadata } from "@/i18n/metadata";
import { getI18n } from "@/i18n/server";
import { getRooms } from "@/lib/content";
import { pageImages } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { t, locale } = await getI18n();
  return pageMetadata({ locale, path: "/rooms", title: t.roomsPage.metaTitle, description: t.roomsPage.metaDescription });
}

export default async function RoomsPage() {
  const i18n = await getI18n();
  const { t, locale } = i18n;
  const rooms = getRooms(i18n);

  return (
    <>
      <PageHero
        title={t.roomsPage.metaTitle}
        description={t.roomsPage.heroDescription}
        image={pageImages.rooms}
      />

      {/* Mục lục nhanh */}
      <nav aria-label={t.roomsPage.metaTitle} className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur">
        <Container>
          <ul className="flex gap-6 overflow-x-auto py-4 text-sm font-medium whitespace-nowrap [scrollbar-width:none]">
            {rooms.map((r) => (
              <li key={r.slug}>
                <a href={`#${r.slug}`} className="text-ink-soft hover:text-brand-600">
                  {r.name}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <div className="py-16 md:py-24">
        <Container className="flex flex-col gap-20 md:gap-28">
          {rooms.map((room, i) => (
            <article id={room.slug} key={room.slug} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <RoomGallery
                  photos={room.gallery}
                  name={room.name}
                  labels={{ viewPhotos: t.ui.viewPhotos, viewPhotosOf: t.ui.viewPhotosOf }}
                  lightboxLabels={t.lightbox}
                />
              </div>
              <div>
                <Label>{room.view}</Label>
                <h2 className="mt-3 font-serif text-4xl font-semibold text-ink md:text-5xl">{room.name}</h2>
                <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">{room.description}</p>

                <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-line py-5 text-sm">
                  <div>
                    <dt className="text-muted">{t.roomsPage.size}</dt>
                    <dd className="mt-1 font-medium text-ink">{room.size} m²</dd>
                  </div>
                  <div>
                    <dt className="text-muted">{t.roomsPage.capacity}</dt>
                    <dd className="mt-1 font-medium text-ink">{fill(t.ui.guests, { n: room.guests })}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">{t.roomsPage.bed}</dt>
                    <dd className="mt-1 font-medium text-ink">{room.bed}</dd>
                  </div>
                </dl>

                <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-ink-soft">
                  {room.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-brand-500" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path d="m5 12 5 5L20 7" />
                      </svg>
                      {a}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <p className="text-sm text-muted">
                    {t.ui.fromLong} <span className="text-2xl font-semibold text-brand-600">{formatPrice(room.priceFrom, locale)}</span> {t.ui.perNight}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <OpenBookingButton>{t.roomsPage.bookThisRoom}</OpenBookingButton>
                    <RoomDetails
                      name={room.name}
                      description={room.description}
                      photos={room.gallery}
                      facilities={room.facilities.map((f) => t.roomFacilities[f])}
                      labels={{
                        viewMore: t.roomsPage.viewMore,
                        dialog: fill(t.roomsPage.detailsOf, { name: room.name }),
                        hotel: "Blessed Hotel",
                        facilities: t.roomsPage.facilities,
                        close: t.roomsPage.close,
                        photos: fill(t.roomsPage.photosOf, { name: room.name }),
                        previous: t.ui.previous,
                        next: t.ui.next,
                      }}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </Container>
      </div>

      <BookingCta />
    </>
  );
}
