import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowLink";
import { fill, type Locale } from "@/i18n/config";
import { formatPrice } from "@/i18n/format";
import type { LocalizedRoom } from "@/lib/content";

export type RoomCardLabels = { guests: string; from: string; perNight: string; viewDetails: string };

export default function RoomCard({ room, locale, labels }: { room: LocalizedRoom; locale: Locale; labels: RoomCardLabels }) {
  return (
    <Link href={room.href} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={room.image}
          alt={room.gallery[0]?.alt ?? room.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug font-semibold text-ink">{room.name}</h3>
        <p className="mt-1 text-sm text-muted">
          {room.size} m² · {fill(labels.guests, { n: room.guests })} · {room.view}
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          {labels.from} <span className="font-semibold text-ink">{formatPrice(room.priceFrom, locale)}</span> {labels.perNight}
        </p>
        <span className="mt-auto inline-flex items-center gap-1 pt-5 font-semibold text-brand-600">
          {labels.viewDetails}
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}
