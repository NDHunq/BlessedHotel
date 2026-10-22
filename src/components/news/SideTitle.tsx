/** Tiêu đề khối tin tức/thanh bên: chữ đậm + vạch gold ngắn nằm trên đường kẻ mảnh (kiểu trang tin Vinpearl) */
export default function SideTitle({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: React.ReactNode;
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={`border-b border-line ${className}`}>
      <Tag className="relative -mb-px inline-block border-b-2 border-brand-500 pb-3 font-display text-xl font-semibold tracking-[-0.01em] text-ink md:text-2xl">
        {children}
      </Tag>
    </div>
  );
}
