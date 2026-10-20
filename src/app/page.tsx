import BrandBand from "@/components/home/BrandBand";
import Explore from "@/components/home/Explore";
import Hero from "@/components/home/Hero";
import News from "@/components/home/News";
import PromoBanner from "@/components/home/PromoBanner";
import RoomTypes from "@/components/home/RoomTypes";

export default function Home() {
  return (
    <>
      <Hero />
      <Explore />
      <RoomTypes />
      <PromoBanner />
      <BrandBand />
      <News />
    </>
  );
}
