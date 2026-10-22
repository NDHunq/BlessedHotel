import ChannelList from "@/components/booking/ChannelList";
import Container from "@/components/ui/Container";
import { getI18n } from "@/i18n/server";
import { getBookingChannels } from "@/lib/content";

/** Khối kêu gọi đặt phòng cuối các trang con, liệt kê sẵn các kênh (mặc định dùng chữ `booking.cta`) */
export default async function BookingCta({ title, description }: { title?: string; description?: string }) {
  const i18n = await getI18n();
  const { t } = i18n;

  return (
    <section className="bg-sand py-20 md:py-24">
      <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-display text-4xl leading-[1.15] font-semibold tracking-[-0.01em] text-ink md:text-5xl">
            {title ?? t.booking.cta.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">{description ?? t.booking.cta.description}</p>
        </div>
        <div className="rounded-2xl bg-white p-3">
          <ChannelList channels={getBookingChannels(i18n)} />
        </div>
      </Container>
    </section>
  );
}
