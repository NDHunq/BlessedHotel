import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowLink";
import { formatVnd, type RoomType } from "@/lib/site";

export default function RoomCard({ room }: { room: RoomType }) {
  return (
    <Link
      href={`/hang-phong#${room.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={room.image}
          alt={`Phòng ${room.name}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug font-semibold text-ink">{room.name}</h3>
        <p className="mt-1 text-sm text-muted">
          {room.size} m² · {room.guests} khách · {room.view}
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          Từ <span className="font-semibold text-ink">{formatVnd(room.priceFrom)}</span> / đêm
        </p>
        <span className="mt-auto inline-flex items-center gap-1 pt-5 font-semibold text-brand-600">
          Xem chi tiết
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}
