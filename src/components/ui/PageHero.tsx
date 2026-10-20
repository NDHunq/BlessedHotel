import Image from "next/image";
import Link from "next/link";

/** Banner đầu trang con: ảnh nền (nằm dưới header trong suốt) + breadcrumb + tiêu đề */
export default function PageHero({
  title,
  description,
  image,
}: {
  title: string;
  description?: string;
  image: string;
}) {
  return (
    // -mt-16: kéo banner lên dưới header trong suốt; pt-* chừa chỗ cho header
    <section className="relative isolate -mt-16 overflow-hidden">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
      {/* Tối phía trên cho chữ menu, tối phía dưới cho tiêu đề */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/25 to-black/65" />
      <div className="mx-auto flex min-h-[380px] max-w-7xl flex-col justify-end px-4 pt-32 pb-12 text-white md:min-h-[480px] md:px-8 md:pb-16">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/75">
          <Link href="/" className="hover:text-white">
            Trang chủ
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-white">{title}</span>
        </nav>
        <h1 className="font-display text-4xl leading-tight font-semibold tracking-[-0.01em] md:text-6xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">{description}</p>}
      </div>
    </section>
  );
}
