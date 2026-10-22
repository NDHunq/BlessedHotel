import type { Metadata } from "next";
import BrandBand from "@/components/home/BrandBand";
import Explore from "@/components/home/Explore";
import Hero from "@/components/home/Hero";
import News from "@/components/home/News";
import PromoBanner from "@/components/home/PromoBanner";
import RoomTypes from "@/components/home/RoomTypes";
import { pageMetadata } from "@/i18n/metadata";
import { getI18n } from "@/i18n/server";
import { getRooms } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { t, locale } = await getI18n();
  return pageMetadata({ locale, path: "/", description: t.meta.description });
}

export default async function Home() {
  const i18n = await getI18n();
  const { t, locale } = i18n;

  return (
    <>
      <Hero />
      <Explore />
      <RoomTypes
        rooms={getRooms(i18n)}
        locale={locale}
        labels={{
          title: t.home.roomsTitle,
          tabsLabel: t.home.roomTabsLabel,
          tabs: t.home.roomTabs,
          card: { guests: t.ui.guests, from: t.ui.from, perNight: t.ui.perNight, viewDetails: t.ui.viewDetails },
        }}
      />
      <PromoBanner />
      <BrandBand />
      <News />
    </>
  );
}
