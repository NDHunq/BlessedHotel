"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Photo = { src: string; alt: string };

/**
 * Băng ảnh cuộn ngang (vuốt trên điện thoại, nút mũi tên trái/phải + bộ đếm trên máy tính).
 * Hết ảnh thì nút "sau" quay về ảnh đầu và ngược lại. `indicator`: bộ đếm "n / tổng" (mặc định) hoặc chấm tròn ở giữa đáy.
 */
export default function PhotoScroller({
  photos,
  sizes,
  labels,
  indicator = "counter",
  className = "",
}: {
  photos: Photo[];
  sizes: string;
  labels: { region: string; previous: string; next: string };
  indicator?: "counter" | "dots";
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const go = (index: number) => {
    const el = track.current;
    if (!el) return;
    const next = (index + photos.length) % photos.length;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  const btn =
    "absolute top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-[0_2px_8px_rgb(0_0_0/0.2)] transition-colors hover:bg-white";

  return (
    <div className={`relative overflow-hidden ${className}`} role="region" aria-roledescription="carousel" aria-label={labels.region}>
      <div
        ref={track}
        onScroll={(e) => setCurrent(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="flex size-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, i) => (
          <div key={photo.src} className="relative size-full shrink-0 snap-start">
            <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={i === 0} className="object-cover" />
          </div>
        ))}
      </div>

      {photos.length > 1 && (
        <>
          <button type="button" aria-label={labels.previous} onClick={() => go(current - 1)} className={`${btn} left-3`}>
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="m15 6-6 6 6 6" />
            </svg>
          </button>
          <button type="button" aria-label={labels.next} onClick={() => go(current + 1)} className={`${btn} right-3`}>
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>
          {indicator === "dots" ? (
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {photos.map((photo, i) => (
                <span
                  key={photo.src}
                  aria-hidden
                  className={`size-1.5 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/50"}`}
                />
              ))}
              <span className="sr-only" aria-live="polite">
                {current + 1} / {photos.length}
              </span>
            </div>
          ) : (
            <p className="absolute right-3 bottom-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white tabular-nums" aria-live="polite">
              {current + 1} / {photos.length}
            </p>
          )}
        </>
      )}
    </div>
  );
}
