import Link from "next/link";
import Container from "@/components/ui/Container";
import { highlights } from "@/lib/site";

/** Khối thương hiệu: băng đen (logo chữ + khẩu hiệu) và hàng điểm nhấn ngăn bởi đường kẻ */
export default function BrandBand() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="overflow-hidden rounded-sm ring-1 ring-line">
          <div className="flex items-center justify-center gap-6 bg-ink px-6 py-10 text-white md:gap-8 md:py-12">
            <p className="text-right font-display text-2xl leading-[1.1] font-semibold tracking-wide text-white/90 uppercase md:text-4xl">
              Blessed
              <br />
              Hotel
              <br />
              Phú Quốc
            </p>
            <span className="h-24 w-px bg-white/25 md:h-28" aria-hidden />
            <p className="font-serif text-lg leading-snug text-white/85 md:text-2xl">
              Ngủ ngon.
              <br />
              Ăn ngon.
              <br />
              Sống chậm giữa đảo.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-y-8 px-6 py-10 md:grid-cols-4 md:px-8">
            {highlights.map((h, i) => (
              <li key={h.name} className="flex flex-col items-center text-center">
                {/* Đường kẻ nối giữa các mục, giống hàng logo ở site tham khảo */}
                <div className="flex w-full items-center gap-4">
                  <span className={`h-px flex-1 ${i === 0 ? "" : "bg-line"}`} aria-hidden />
                  <span className="text-sm whitespace-nowrap text-muted">{h.label}</span>
                  <span className={`h-px flex-1 ${i === highlights.length - 1 ? "" : "bg-line"}`} aria-hidden />
                </div>
                <Link href={h.href} className="mt-4 font-serif text-3xl font-semibold text-ink transition-colors hover:text-brand-600">
                  {h.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
