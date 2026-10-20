import Image from "next/image";
import ArrowLink from "@/components/ui/ArrowLink";
import Carousel from "@/components/ui/Carousel";
import Container from "@/components/ui/Container";
import SectionHeading, { Label } from "@/components/ui/SectionHeading";
import { explore } from "@/lib/site";

export default function Explore() {
  return (
    <section className="py-20 md:py-28">
      <Container className="px-0 md:px-8">
        <SectionHeading align="center" title="Khám phá Blessed Hotel" className="mb-12 max-w-[740px] px-4 md:text-6xl" />
        <Carousel label="Khám phá Blessed Hotel">
          {explore.map((item) => (
            <article
              key={item.href}
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
                  Khám phá
                </ArrowLink>
              </div>
            </article>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
