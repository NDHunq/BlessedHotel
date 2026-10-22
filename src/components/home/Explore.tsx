import Image from "next/image";
import ArrowLink from "@/components/ui/ArrowLink";
import Carousel from "@/components/ui/Carousel";
import Container from "@/components/ui/Container";
import SectionHeading, { Label } from "@/components/ui/SectionHeading";
import { getI18n } from "@/i18n/server";
import { getExplore } from "@/lib/content";

export default async function Explore() {
  const i18n = await getI18n();
  const { t } = i18n;

  return (
    <section className="py-20 md:py-28">
      <Container className="px-0 md:px-8">
        <SectionHeading align="center" title={t.home.exploreTitle} className="mb-12 max-w-[740px] px-4 md:text-6xl" />
        <Carousel label={t.home.exploreTitle} labels={{ previous: t.ui.previous, next: t.ui.next }}>
          {getExplore(i18n).map((item) => (
            <article
              key={item.id}
              className="flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-sand sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)]"
            >
              <div className="relative aspect-[2/1] overflow-hidden">
                <Image src={item.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 82vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <Label>{item.label}</Label>
                <h3 className="mt-2 text-xl leading-snug font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{item.description}</p>
                <ArrowLink href={item.href} className="mt-auto pt-8">
                  {t.ui.explore}
                </ArrowLink>
              </div>
            </article>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
