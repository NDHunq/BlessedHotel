"use client";

import { useEffect, useRef, useState } from "react";
import ChannelList from "@/components/booking/ChannelList";
import { OPEN_BOOKING_EVENT } from "@/components/booking/events";
import type { LocalizedChannel } from "@/lib/content";

// Thời gian giữ dạng đầy đủ (icon + chữ) và dạng thu gọn (chỉ icon)
const EXPANDED_MS = 4000;
const COLLAPSED_MS = 3000;

/** Nút nổi "Đặt phòng" góc phải dưới, bấm mở danh sách kênh đặt phòng */
export default function BookingFab({
  channels,
  labels,
}: {
  channels: LocalizedChannel[];
  labels: { bookNow: string; via: string; panelLabel: string };
}) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [hovered, setHovered] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const showLabel = expanded || open || hovered;

  // Tự chuyển qua lại giữa dạng đầy đủ và thu gọn; dừng khi đang mở menu hoặc rê chuột
  useEffect(() => {
    if (open || hovered) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setExpanded((v) => !v), expanded ? EXPANDED_MS : COLLAPSED_MS);
    return () => window.clearTimeout(id);
  }, [expanded, open, hovered]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_BOOKING_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_BOOKING_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      <div
        id="booking-panel"
        role="dialog"
        aria-label={labels.panelLabel}
        className={`w-[min(20rem,calc(100vw-2rem))] origin-bottom-right rounded-2xl bg-white p-2 shadow-[0_12px_40px_rgb(0_0_0/0.18)] ring-1 ring-line transition-all duration-200 ${
          open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
        }`}
      >
        <p className="px-3 pt-2 pb-1 font-overline text-[11px] font-semibold tracking-[0.2em] text-brand-600 uppercase">
          {labels.via}
        </p>
        <ChannelList channels={channels} onSelect={() => setOpen(false)} />
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="booking-panel"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        className={`flex h-14 items-center rounded-full bg-brand-600 font-medium text-white shadow-[0_8px_24px_rgb(147_112_31/0.45)] transition-[padding,background-color] duration-500 ease-out hover:bg-brand-700 ${
          showLabel ? "pr-5 pl-4" : "px-3.5"
        }`}
      >
        <span className="grid size-7 place-items-center">
          {open ? (
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M3 18v2M21 18v2M6 10V6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4M8 10V8h3v2M13 10V8h3v2" />
            </svg>
          )}
        </span>
        {/* Chữ vẫn nằm trong DOM khi thu gọn để giữ tên nút cho trình đọc màn hình */}
        <span
          className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity,margin] duration-500 ease-out ${
            showLabel ? "ml-2 max-w-40 opacity-100" : "ml-0 max-w-0 opacity-0"
          }`}
        >
          {labels.bookNow}
        </span>
      </button>
    </div>
  );
}
