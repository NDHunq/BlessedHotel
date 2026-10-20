import HeroSlideshow from "@/components/home/HeroSlideshow";
import { hero } from "@/lib/site";

export default function Hero() {
  return (
    // -mt-16: kéo banner lên nằm dưới header trong suốt của trang chủ
    <section className="relative isolate -mt-16 h-[640px] w-full overflow-hidden md:h-svh md:max-h-[920px] md:min-h-[680px]">
      <HeroSlideshow slides={hero.slides} interval={hero.interval} />
      {/* Tối phía trên cho chữ menu, tối phía dưới cho tiêu đề */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/5 to-black/60" />
    </section>
  );
}
