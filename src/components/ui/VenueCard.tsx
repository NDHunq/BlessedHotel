import MenuViewer from "@/components/ui/MenuViewer";
import PhotoScroller from "@/components/ui/PhotoScroller";
import { Label } from "@/components/ui/SectionHeading";
import { fill } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import type { LocalizedVenue } from "@/lib/content";

/**
 * Thẻ nhà hàng / spa / phòng tập: băng ảnh cuộn ngang bên trái, bên phải tên + loại hình + mô tả,
 * giờ mở cửa, số điện thoại; đáy thẻ: "Xem menu" (nếu có ảnh thực đơn) và nút đặt (nếu truyền `reserveLabel`).
 */
export default async function VenueCard({ venue, reserveLabel }: { venue: LocalizedVenue; reserveLabel?: string }) {
  const { t } = await getI18n();
  const tel = venue.phone ? `tel:${venue.phone.replace(/\s/g, "")}` : undefined;
  // Chưa có link đặt riêng → gọi thẳng số của nhà hàng / spa
  const reserveHref = venue.reserveUrl || tel;
  const external = Boolean(venue.reserveUrl);
  const showReserve = Boolean(reserveLabel && reserveHref);

  return (
    <article
      id={venue.slug}
      className="grid scroll-mt-24 overflow-hidden rounded-2xl bg-white ring-1 ring-line md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
    >
      <PhotoScroller
        photos={venue.gallery}
        sizes="(min-width: 1280px) 680px, (min-width: 768px) 56vw, 100vw"
        labels={{ region: fill(t.venue.photos, { name: venue.name }), previous: t.venue.prevPhoto, next: t.venue.nextPhoto }}
        className="aspect-[4/3] md:aspect-auto md:min-h-[420px]"
      />

      <div className="flex flex-col p-6 md:p-8 lg:p-10">
        <h3 className="font-serif text-3xl font-semibold text-ink md:text-4xl">{venue.name}</h3>
        <Label className="mt-1.5">{venue.kind}</Label>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{venue.description}</p>

        <dl className="mt-6 space-y-3 text-[15px]">
          <div className="flex items-center gap-3">
            <dt className="flex items-center gap-3 text-ink-soft">
              <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-brand-500" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <span className="sr-only">{t.venue.openingHours}: </span>
              <span className="min-w-24">{t.venue.everyday}</span>
            </dt>
            <dd className="font-medium text-ink tabular-nums">{venue.hours}</dd>
          </div>
          {venue.phone && (
            <div className="flex items-center gap-3">
              <dt className="text-ink-soft">
                <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-brand-500" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                </svg>
                <span className="sr-only">{t.venue.phone}</span>
              </dt>
              <dd>
                <a href={tel} className="font-medium text-ink tabular-nums hover:text-brand-600">
                  {venue.phone}
                </a>
              </dd>
            </div>
          )}
        </dl>

        {(venue.menu.length > 0 || showReserve) && (
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
            {venue.menu.length > 0 && (
              <MenuViewer
                pages={venue.menu}
                label={t.venue.viewMenu}
                lightboxLabels={t.lightbox}
              />
            )}
            {showReserve && (
              <a
                href={reserveHref}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex h-11 items-center rounded-full bg-brand-600 px-6 text-sm font-medium text-white transition-colors hover:bg-brand-700 sm:ml-auto"
              >
                {reserveLabel}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
