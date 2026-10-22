import Image from "next/image";
import OpenBookingButton from "@/components/booking/OpenBookingButton";
import { fill } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { promoImage, site } from "@/lib/site";

export default async function PromoBanner() {
  const { t } = await getI18n();

  return (
    <section className="relative isolate overflow-hidden">
      <Image src={promoImage} alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-20 text-white md:px-8 md:py-28">
        <h2 className="max-w-2xl font-display text-4xl leading-[1.1] font-semibold tracking-[-0.01em] md:text-6xl">
          {t.home.promo.title}
        </h2>
        <p className="mt-4 max-w-xl text-base font-medium md:text-lg">{t.home.promo.body}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <OpenBookingButton className="font-semibold">{t.home.promo.cta}</OpenBookingButton>
          <a
            href={`tel:${site.hotline.replace(/\s/g, "")}`}
            className="inline-flex h-10 items-center rounded-full bg-white px-5 text-sm font-semibold text-ink transition-colors hover:bg-cream"
          >
            {fill(t.ui.callPhone, { phone: site.hotline })}
          </a>
        </div>
      </div>
    </section>
  );
}
