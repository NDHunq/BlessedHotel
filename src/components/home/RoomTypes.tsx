"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import RoomCard from "@/components/ui/RoomCard";
import { rooms, type RoomCategory } from "@/lib/site";

const tabs: ("Tất cả" | RoomCategory)[] = ["Tất cả", "Phòng", "Suite", "Villa"];

/** Trang chủ: tiêu đề trái + thanh tab dạng viên thuốc bên phải để lọc theo loại phòng */
export default function RoomTypes() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Tất cả");
  const list = tab === "Tất cả" ? rooms : rooms.filter((r) => r.category === tab);

  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display text-4xl font-semibold tracking-[-0.01em] text-ink md:text-5xl">Hạng phòng</h2>
          <div role="tablist" aria-label="Loại phòng" className="flex self-start rounded-full p-1 ring-1 ring-line md:self-auto">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`rounded-full px-5 py-2 text-base font-semibold transition-colors md:px-6 md:text-lg ${
                  tab === t ? "bg-ink text-white" : "text-ink hover:bg-sand"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((room) => (
            <RoomCard key={room.slug} room={room} />
          ))}
        </div>
      </Container>
    </section>
  );
}
