import CountUp from "@/components/ui/CountUp";
import type { Stat } from "@/lib/site";

/** Hàng số liệu căn giữa, ngăn bằng đường kẻ dọc mảnh; số màu gold chạy khi cuộn tới */
export default function Stats({ stats, intlLocale, className = "" }: { stats: Stat[]; intlLocale: string; className?: string }) {
  return (
    <dl className={`mx-auto grid max-w-2xl grid-cols-3 divide-x divide-line ${className}`}>
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col-reverse items-center px-2 text-center">
          <dt className="mt-2 text-sm text-muted md:text-base">{s.label}</dt>
          <dd className="font-display text-4xl leading-none font-medium tracking-[-0.01em] text-brand-600 md:text-5xl">
            <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} locale={intlLocale} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
