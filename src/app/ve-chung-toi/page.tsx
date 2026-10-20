import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Stats from "@/components/ui/Stats";
import { about } from "@/lib/site";

export const metadata: Metadata = {
  title: "Về chúng tôi",
  description: "Câu chuyện và triết lý của Blessed Hotel Phú Quốc.",
};

/*
 * Bố cục theo trang "Về chúng tôi" của site tham khảo:
 * banner toàn màn hình → section nền xám (đoạn dẫn, tiêu đề tô màu, số liệu, 4 thẻ ảnh dọc) → ảnh tràn viền + chữ trái.
 */
export default function AboutPage() {
  const { hero, philosophy, pillars, closing } = about;

  return (
    <>
      {/* Banner toàn màn hình, nằm dưới header trong suốt */}
      <section className="relative isolate -mt-16 flex h-[640px] items-end overflow-hidden md:h-svh md:max-h-[920px] md:min-h-[680px]">
        <Image src={hero.image} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/10 to-black/60" />
        <div className="w-full px-4 pb-20 text-center text-white md:pb-24">
          <h1 className="sr-only">Về chúng tôi</h1>
          <p className="text-2xl font-light md:text-3xl">{hero.tagline}</p>
          <p className="mt-4 font-serif text-6xl leading-none font-semibold md:text-8xl">Blessed</p>
          <p className="mt-3 font-overline text-sm font-semibold tracking-[0.4em] text-accent uppercase md:text-base">Hotel · Phú Quốc</p>
        </div>
      </section>

      {/* Triết lý + số liệu + 4 thẻ ảnh, chung nền xám nhạt */}
      <section className="relative isolate overflow-hidden bg-surface py-20 md:py-28">
        <Arcs />
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <p className="text-base leading-relaxed text-ink md:text-lg">
              {philosophy.lead.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <h2 className="mt-8 font-display text-4xl leading-[1.2] font-semibold tracking-[-0.01em] text-ink md:text-6xl">
              {philosophy.title.map((line) => (
                <span key={line.highlight} className="block">
                  <span className="text-brand-600">{line.highlight}</span>
                  {line.rest}
                </span>
              ))}
            </h2>
            <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-ink md:text-lg">{philosophy.body}</p>
          </div>

          <Stats stats={about.stats} className="mt-14 md:mt-16" />

          <ul className="-mx-4 mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:mt-20 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0">
            {pillars.map((p) => (
              <li key={p.title} className="relative aspect-[2/3] w-[72%] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[45%] md:w-auto">
                <Image src={p.image} alt="" fill sizes="(min-width: 768px) 25vw, 72vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="text-xl leading-snug font-semibold">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/85">{p.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Ảnh tràn viền + chữ bên trái */}
      <section className="relative isolate flex min-h-[560px] items-center overflow-hidden md:min-h-[720px]">
        <Image src={closing.image} alt="" fill sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        <Container className="py-20 text-white">
          <p className="text-base font-light md:text-lg">
            {closing.lead.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.15] font-light tracking-[-0.01em] md:text-6xl">
            {closing.titleLight} <span className="font-semibold">{closing.titleBold}</span>
          </h2>
          <p className="mt-6 text-base font-light md:text-lg">
            {closing.body.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </Container>
      </section>
    </>
  );
}

/** Hai đường cong lớn mờ trang trí nền (giống họa tiết ở site tham khảo) */
function Arcs() {
  const ring = "pointer-events-none absolute -z-10 rounded-full border-[44px] border-line/60";
  return (
    <>
      <span aria-hidden className={`${ring} -top-24 -left-72 size-[620px]`} />
      <span aria-hidden className={`${ring} -right-80 -bottom-40 size-[680px]`} />
    </>
  );
}
