"use client";

import { useRef } from "react";

/** Băng thẻ cuộn ngang (scroll-snap) với nút mũi tên tròn đè lên mép */
export default function Carousel({ children, label }: { children: React.ReactNode; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const btn =
    "absolute top-[38%] z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-card ring-1 ring-line transition-colors hover:bg-sand md:grid";

  return (
    <div className="relative" role="region" aria-label={label}>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] md:gap-6 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <button type="button" aria-label="Trước" onClick={() => scroll(-1)} className={`${btn} -left-5`}>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="m15 6-6 6 6 6" />
        </svg>
      </button>
      <button type="button" aria-label="Sau" onClick={() => scroll(1)} className={`${btn} -right-5`}>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="m9 6 6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
