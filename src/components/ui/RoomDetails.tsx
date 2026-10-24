"use client";

import { useEffect, useRef, useState } from "react";
import PhotoScroller from "@/components/ui/PhotoScroller";

type Photo = { src: string; alt: string };

/**
 * Nút "Xem thêm" + modal chi tiết phòng (bố cục theo modal phòng của Vinpearl):
 * thanh trên (tên khách sạn + nút đóng) → băng ảnh cuộn có chấm → tên phòng, mô tả → lưới "Tiện ích".
 * Dùng <dialog> gốc: tự giữ focus trong modal, Esc để đóng; bấm ra nền tối cũng đóng; khoá cuộn trang khi mở.
 */
export default function RoomDetails({
  name,
  description,
  photos,
  facilities,
  labels,
}: {
  name: string;
  description: string;
  photos: Photo[];
  facilities: string[];
  labels: {
    viewMore: string;
    dialog: string;
    hotel: string;
    facilities: string;
    close: string;
    photos: string;
    previous: string;
    next: string;
  };
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    dialog.current?.showModal();
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center justify-center rounded-full border border-brand-600 px-5 text-sm font-medium whitespace-nowrap text-brand-600 transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        {labels.viewMore}
      </button>

      {open && (
        <dialog
          ref={dialog}
          aria-label={labels.dialog}
          onClose={() => setOpen(false)}
          onClick={(e) => e.target === e.currentTarget && close()}
          className="m-auto max-h-[92svh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto overscroll-contain rounded-2xl bg-white p-0 text-ink backdrop:bg-black/60"
        >
          <div className="sticky top-0 z-20 flex items-center justify-between gap-4 bg-white px-5 py-4 md:px-7">
            <p className="font-serif text-2xl font-semibold">{labels.hotel}</p>
            <button
              type="button"
              onClick={close}
              aria-label={labels.close}
              className="grid size-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-surface hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div className="px-5 pb-8 md:px-7 md:pb-10">
            <PhotoScroller
              photos={photos}
              sizes="(min-width: 1024px) 960px, 100vw"
              labels={{ region: labels.photos, previous: labels.previous, next: labels.next }}
              indicator="dots"
              className="aspect-[16/10] rounded-xl md:aspect-[16/9]"
            />

            <h2 className="mt-6 font-serif text-3xl font-semibold md:text-4xl">{name}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{description}</p>

            <h3 className="mt-8 font-serif text-2xl font-semibold">{labels.facilities}</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-ink-soft sm:grid-cols-3 lg:grid-cols-5">
              {facilities.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-brand-500" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </dialog>
      )}
    </>
  );
}
