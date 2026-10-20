import { services } from "@/lib/site";

/** Danh sách dịch vụ đánh số, ngăn bằng đường kẻ mảnh (không dùng thẻ icon) */
export default function ServiceList() {
  return (
    <ol className="border-t border-line">
      {services.map((s, i) => (
        <li key={s.title} className="grid gap-3 border-b border-line py-8 md:grid-cols-[5rem_1fr_1.4fr] md:gap-10 md:py-10">
          <span className="font-display text-lg font-semibold text-brand-500 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-ink md:text-3xl">{s.title}</h2>
            <p className="mt-2 text-muted">{s.description}</p>
          </div>
          <p className="leading-relaxed text-ink-soft md:pt-1">{s.details}</p>
        </li>
      ))}
    </ol>
  );
}
