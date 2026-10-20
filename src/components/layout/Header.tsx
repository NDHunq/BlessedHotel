"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import OpenBookingButton from "@/components/booking/OpenBookingButton";
import Logo from "@/components/layout/Logo";
import { nav, site } from "@/lib/site";

/** Màu chữ menu: trên ảnh (header trong suốt) dùng trắng / gold sáng, trên nền trắng dùng chữ tối / gold */
const navColor = (transparent: boolean, active: boolean) => {
  if (transparent) return active ? "text-accent" : "text-white hover:text-accent";
  return active ? "text-brand-600" : "text-ink-soft hover:text-brand-600";
};

const subscribeScroll = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
};

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 24,
    () => false,
  );
  // Mọi trang đều mở đầu bằng banner ảnh nằm dưới header (-mt-16):
  // header trong suốt khi chưa cuộn, chuyển nền trắng khi cuộn hoặc mở menu mobile
  const transparent = !scrolled && !open;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Khóa cuộn trang khi mở menu mobile
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 h-16 border-b transition-colors duration-300 ${
        transparent ? "border-transparent bg-transparent" : "border-line bg-white/95 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 md:px-8">
        <Logo light={transparent} />

        <nav aria-label="Menu chính" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative py-5 text-sm font-medium transition-colors ${navColor(transparent, isActive(item.href))} ${
                    isActive(item.href) ? "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-current" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.hotline.replace(/\s/g, "")}`}
            className={`hidden text-sm font-medium transition-colors xl:block ${
              transparent ? "text-white hover:text-accent" : "text-ink-soft hover:text-brand-600"
            }`}
          >
            {site.hotline}
          </a>
          <OpenBookingButton className="hidden sm:inline-flex">Đặt phòng</OpenBookingButton>
          <button
            type="button"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`grid size-10 place-items-center rounded-full lg:hidden ${
              transparent ? "text-white hover:bg-white/10" : "text-ink hover:bg-surface"
            }`}
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.75}>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={`fixed inset-x-0 top-16 bottom-0 bg-white transition-opacity duration-200 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="Menu mobile" className="flex h-full flex-col px-6 py-8">
          <ul className="flex flex-col divide-y divide-line">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block py-4 font-display text-2xl font-medium ${
                    isActive(item.href) ? "text-brand-600" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pb-20">
            <OpenBookingButton size="lg" onClick={() => setOpen(false)}>
              Đặt phòng ngay
            </OpenBookingButton>
            <p className="text-center text-sm text-muted">Hotline {site.hotline}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
