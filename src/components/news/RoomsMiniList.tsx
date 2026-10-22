import Image from "next/image";
import Link from "next/link";
import SideTitle from "@/components/news/SideTitle";
import { formatPrice } from "@/i18n/format";
import { getI18n } from "@/i18n/server";
import { getRooms } from "@/lib/content";

/** Danh sách hạng phòng (ảnh thu nhỏ + giá từ + tên) cho thanh bên */
export default async function RoomsMiniList() {
  const i18n = await getI18n();
  const { t, locale } = i18n;
  return (
    <div>
      <SideTitle as="h3">{t.newsPage.roomsTitle}</SideTitle>
      <ul className="mt-5 divide-y divide-line">
        {getRooms(i18n).map((r) => (
          <li key={r.slug}>
            <Link href={r.href} className="group flex gap-4 py-4 first:pt-0">
              <span className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-lg">
                <Image src={r.image} alt="" fill sizes="112px" className="object-cover" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-muted">
                  {t.ui.from} <span className="font-semibold text-brand-600">{formatPrice(r.priceFrom, locale)}</span> {t.ui.perNight}
                </span>
                <span className="mt-1 block text-[15px] leading-snug font-semibold text-ink transition-colors group-hover:text-brand-600">
                  {r.name}
                </span>
                <span className="mt-0.5 block text-xs text-muted">{r.view}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
