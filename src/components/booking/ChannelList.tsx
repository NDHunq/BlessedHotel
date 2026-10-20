import Image from "next/image";
import { bookingChannels, type BookingChannel } from "@/lib/site";

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);

function ChannelLogo({ channel }: { channel: BookingChannel }) {
  if (!channel.logo) {
    return (
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
        <PhoneIcon />
      </span>
    );
  }
  if (channel.logo.wordmark) {
    return (
      <span className="flex h-10 w-28 shrink-0 items-center">
        <Image
          src={channel.logo.src}
          alt={channel.label}
          width={channel.logo.width}
          height={channel.logo.height}
          className="h-10 w-auto max-w-full object-contain object-left"
        />
      </span>
    );
  }
  return (
    <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-line">
      <Image src={channel.logo.src} alt={channel.label} width={channel.logo.width} height={channel.logo.height} className="size-7 object-contain" />
    </span>
  );
}

/** Danh sách kênh đặt phòng — dùng trong BookingFab và các trang */
export default function ChannelList({ onSelect }: { onSelect?: () => void }) {
  return (
    <ul className="flex flex-col gap-1">
      {bookingChannels.map((c) => {
        const external = c.href.startsWith("http");
        return (
          <li key={c.id}>
            <a
              href={c.href}
              onClick={onSelect}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-brand-50"
            >
              <ChannelLogo channel={c} />
              <span className="min-w-0 flex-1">
                {/* Logo dạng chữ đã có tên thương hiệu → chỉ hiện ghi chú */}
                {!c.logo?.wordmark && <span className="block text-sm font-semibold text-ink">{c.label}</span>}
                <span className={`block text-xs text-muted ${c.logo?.wordmark ? "sr-only" : ""}`}>{c.note}</span>
              </span>
              <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" fill="none" stroke="currentColor" strokeWidth={2}>
                {external ? <path d="M7 17 17 7M8 7h9v9" /> : <path d="m9 6 6 6-6 6" />}
              </svg>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
