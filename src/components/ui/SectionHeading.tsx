/** Nhãn nhỏ màu xám chữ hoa, đặt trên tiêu đề thẻ (VD: "PHÒNG NGHỈ", "ƯU ĐÃI · 10/10/2026") */
export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-sm font-medium text-muted uppercase ${className}`}>{children}</p>;
}

/** Tiêu đề section: chỉ có tiêu đề đậm (và mô tả nếu cần), không có eyebrow phía trên */
export default function SectionHeading({
  title,
  description,
  align = "left",
  className = "",
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const alignCls = align === "center" ? "mx-auto text-center" : "";
  return (
    <div className={`max-w-3xl ${alignCls} ${className}`}>
      <h2 className="font-display text-4xl leading-[1.15] font-semibold tracking-[-0.01em] text-ink md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{description}</p>}
    </div>
  );
}
