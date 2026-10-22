"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import RoomCard, { type RoomCardLabels } from "@/components/ui/RoomCard";
import type { Locale } from "@/i18n/config";
import type { LocalizedRoom } from "@/lib/content";
import type { RoomCategory } from "@/lib/site";

type Tab = "all" | RoomCategory;
const tabs: Tab[] = ["all", "room", "suite", "villa"];

/** Trang chủ: tiêu đề trái + thanh tab dạng viên thuốc bên phải để lọc theo loại phòng (chữ đã dịch truyền qua props) */
export default function RoomTypes({
  rooms,
  locale,
  labels,
}: {
  rooms: LocalizedRoom[];
  locale: Locale;
  labels: { title: string; tabsLabel: string; tabs: Record<Tab, string>; card: RoomCardLabels };
}) {
  const [tab, setTab] = useState<Tab>("all");
  const list = tab === "all" ? rooms : rooms.filter((r) => r.category === tab);

  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display text-4xl font-semibold tracking-[-0.01em] text-ink md:text-5xl">{labels.title}</h2>
          <div role="tablist" aria-label={labels.tabsLabel} className="flex self-start rounded-full p-1 ring-1 ring-line md:self-auto">
            {tabs.map((id) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`rounded-full px-5 py-2 text-base font-semibold whitespace-nowrap transition-colors md:px-6 md:text-lg ${
                  tab === id ? "bg-ink text-white" : "text-ink hover:bg-sand"
                }`}
              >
                {labels.tabs[id]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((room) => (
            <RoomCard key={room.slug} room={room} locale={locale} labels={labels.card} />
          ))}
        </div>
      </Container>
    </section>
  );
}
