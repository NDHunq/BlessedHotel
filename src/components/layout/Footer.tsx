import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/layout/Logo";
import Container from "@/components/ui/Container";
import { footerLinks, site } from "@/lib/site";

const isExternal = (href: string) => href.startsWith("http");
const externalProps = (href: string) => (isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});

const colHeading = "text-sm font-semibold tracking-wide text-brand-400 uppercase";
const linkCls = "text-white/80 transition-colors hover:text-white";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <Container>
        {/* Hàng trên: logo + khẩu hiệu (trái) · mạng xã hội (phải) */}
        <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
            <Logo light />
            <p className="text-sm text-white/60">{site.tagline}</p>
          </div>
          <ul className="flex items-center gap-5" aria-label="Mạng xã hội">
            {site.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} aria-label={s.label} {...externalProps(s.href)} className="block opacity-70 transition-opacity hover:opacity-100">
                  <Image src={`/brands/social/${s.label.toLowerCase()}.svg`} alt="" width={22} height={22} className="size-[22px] invert" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Hàng chính: Liên hệ · Khám phá · Đặt phòng · Vị trí (bản đồ) */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/15 py-12 md:grid-cols-[1.3fr_1fr_1fr_1.6fr]">
          <div className="col-span-2 md:col-span-1">
            <h3 className={colHeading}>Liên hệ</h3>
            <ul className="mt-5 space-y-4 text-[15px]">
              <li>
                <p className="text-xs text-white/50">Hotline / Zalo</p>
                <a href={`tel:${site.hotline.replace(/\s/g, "")}`} className="mt-0.5 block text-lg font-semibold hover:text-accent">
                  {site.hotline}
                </a>
              </li>
              <li>
                <p className="text-xs text-white/50">Email</p>
                <a href={`mailto:${site.email}`} className="mt-0.5 block font-medium break-all hover:text-accent">
                  {site.email}
                </a>
              </li>
              <li>
                <p className="text-xs text-white/50">Địa chỉ</p>
                <p className="mt-0.5 leading-relaxed text-white/80">{site.address}</p>
              </li>
            </ul>
          </div>

          {footerLinks.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className={colHeading}>{col.title}</h3>
              <ul className="mt-5 space-y-3 text-[15px]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {isExternal(l.href) ? (
                      <a href={l.href} {...externalProps(l.href)} className={linkCls}>
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className={linkCls}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 md:col-span-1">
            <h3 className={colHeading}>Vị trí</h3>
            <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-lg bg-white/5">
              <iframe
                src={site.mapEmbed}
                title={`Bản đồ ${site.name} Phú Quốc`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0"
              />
            </div>
          </div>
        </div>

        {/* Bản quyền; pb lớn để không bị nút Đặt phòng nổi che */}
        <div className="flex flex-col gap-1 border-t border-white/15 pt-6 pb-24 text-[13px] text-white/50 md:flex-row md:justify-between">
          <p>© {site.name} Phú Quốc. Bảo lưu mọi quyền.</p>
          {/* TODO: thay bằng thông tin doanh nghiệp / giấy phép lưu trú thật */}
          <p>Giấy phép kinh doanh dịch vụ lưu trú: đang cập nhật.</p>
        </div>
      </Container>
    </footer>
  );
}
