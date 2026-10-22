import HeroSlideshow from "@/components/home/HeroSlideshow";
import { getI18n } from "@/i18n/server";
import { getHeroSlides } from "@/lib/content";
import { hero } from "@/lib/site";

export default async function Hero() {
  const i18n = await getI18n();
  return (
    // -mt-16: kéo banner lên nằm dưới header trong suốt của trang chủ
    <section className="relative isolate -mt-16 h-[640px] w-full overflow-hidden md:h-svh md:max-h-[920px] md:min-h-[680px]">
      <HeroSlideshow
        slides={getHeroSlides(i18n)}
        interval={hero.interval}
        labels={{ explore: i18n.t.ui.explore, slideLabel: i18n.t.ui.slideLabel }}
      />
      {/* Tối phía trên cho chữ menu, tối phía dưới cho tiêu đề */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/5 to-black/60" />
    </section>
  );
}
