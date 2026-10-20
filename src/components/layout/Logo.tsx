import Link from "next/link";

/** Logo chữ tạm thời — thay bằng file logo thật khi có. */
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="Blessed Hotel — Trang chủ" className="flex items-baseline gap-1.5 leading-none">
      <span className={`font-serif text-2xl font-semibold tracking-wide ${light ? "text-white" : "text-ink"}`}>
        Blessed
      </span>
      <span className={`font-overline text-[10px] font-semibold tracking-[0.3em] uppercase ${light ? "text-accent" : "text-brand-600"}`}>
        Hotel
      </span>
    </Link>
  );
}
