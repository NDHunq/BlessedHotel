import Link from "next/link";

type Variant = "primary" | "dark" | "outline" | "light" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  /** Nút đen chữ hoa, dùng trên ảnh banner */
  dark: "bg-ink text-white uppercase hover:bg-black",
  outline: "border border-brand-600 text-brand-600 hover:bg-brand-50",
  light: "bg-white text-ink hover:bg-cream",
  /** Viền trắng, dùng trên ảnh tối */
  ghost: "border border-white/70 text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /** Có href → render Link, không có → render <button> */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
  onClick,
  type = "button",
}: Props) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href !== undefined) {
    return (
      <Link href={href} onClick={onClick} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
