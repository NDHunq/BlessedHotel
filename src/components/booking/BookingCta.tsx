import ChannelList from "@/components/booking/ChannelList";
import Container from "@/components/ui/Container";

/** Khối kêu gọi đặt phòng cuối các trang con, liệt kê sẵn các kênh */
export default function BookingCta({
  title = "Sẵn sàng cho kỳ nghỉ ở Phú Quốc?",
  description = "Gọi hoặc nhắn Zalo để nhận giá tốt nhất, hoặc đặt nhanh qua các nền tảng quen thuộc.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-sand py-20 md:py-24">
      <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-display text-4xl leading-[1.15] font-semibold tracking-[-0.01em] text-ink md:text-5xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">{description}</p>
        </div>
        <div className="rounded-2xl bg-white p-3">
          <ChannelList />
        </div>
      </Container>
    </section>
  );
}
