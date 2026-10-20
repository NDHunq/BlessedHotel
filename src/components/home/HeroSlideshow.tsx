"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import type { HeroSlide } from "@/lib/site";

/** Banner trang chủ: ảnh + chữ của từng slide, tự chuyển (crossfade) sau mỗi `interval` ms */
export default function HeroSlideshow({ slides, interval }: { slides: HeroSlide[]; interval: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => window.clearInterval(id);
  }, [slides.length, interval, index]); // phụ thuộc `index` để bấm chấm thì đếm lại từ đầu

  return (
    <>
      {slides.map((s, i) => (
        <Image
          key={s.image}
          src={s.image}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`-z-20 object-cover transition-[opacity,scale] ease-out ${
            i === index ? "scale-105 opacity-100 duration-[1200ms,5000ms]" : "scale-100 opacity-0 duration-[1200ms,0ms]"
          }`}
        />
      ))}

      {/* Chữ của các slide xếp chồng trong cùng một ô lưới để chuyển mờ dần */}
      <div className="mx-auto grid h-full max-w-7xl items-end px-4 pb-24 text-white md:px-8 md:pb-28">
        {slides.map((s, i) => (
          <div
            key={s.title}
            inert={i !== index}
            className={`col-start-1 row-start-1 transition-all duration-700 ${
              i === index ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
            }`}
          >
            <p className="text-lg font-light text-white/90 md:text-xl">{s.kicker}</p>
            {i === 0 ? (
              <h1 className="mt-2 font-display text-4xl leading-[1.1] font-semibold tracking-[-0.01em] uppercase md:text-5xl lg:text-6xl">
                {s.title}
              </h1>
            ) : (
              <p className="mt-2 font-display text-4xl leading-[1.1] font-semibold tracking-[-0.01em] uppercase md:text-5xl lg:text-6xl">
                {s.title}
              </p>
            )}
            <p className="mt-3 font-serif text-2xl md:text-3xl">{s.subtitle}</p>
            <Button href={s.href} variant="dark" size="lg" className="mt-8 font-semibold">
              Khám phá
            </Button>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-center gap-3">
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-label={`Ảnh ${i + 1}: ${s.title}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`grid size-4 place-items-center rounded-full transition-colors ${i === index ? "ring-2 ring-brand-500" : ""}`}
          >
            <span className={`size-2 rounded-full ${i === index ? "bg-brand-500" : "bg-white/60 hover:bg-white"}`} />
          </button>
        ))}
      </div>
    </>
  );
}
