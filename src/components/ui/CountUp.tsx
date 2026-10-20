"use client";

import { useEffect, useRef, useState } from "react";

const easeOutExpo = (p: number) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p));

/** Số chạy từ 0 lên `value` khi phần tử lọt vào màn hình (chạy một lần) */
export default function CountUp({
  value,
  decimals = 0,
  suffix = "",
  duration = 1600,
  className = "tabular-nums",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  /** Kiểu số; mặc định tabular-nums để số không nhảy độ rộng khi chạy */
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setCurrent(value);
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          setCurrent(value * easeOutExpo(p));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  const fmt = new Intl.NumberFormat("vi-VN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  return (
    <span ref={ref} className={className}>
      {/* Số đang chạy chỉ để nhìn; trình đọc màn hình đọc giá trị cuối */}
      <span aria-hidden>
        {fmt.format(current)}
        {suffix}
      </span>
      <span className="sr-only">
        {fmt.format(value)}
        {suffix}
      </span>
    </span>
  );
}
