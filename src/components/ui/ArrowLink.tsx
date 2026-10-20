import Link from "next/link";

/** Link chữ màu nhấn kèm mũi tên chéo, VD "Khám phá ↗" */
export default function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const cls = `group/arrow inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700 ${className}`;
  // Link ra ngoài (Google Maps…) mở tab mới
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <ArrowIcon />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      <ArrowIcon />
    </Link>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-4 transition-transform group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      aria-hidden
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
