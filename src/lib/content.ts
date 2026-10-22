/**
 * Ghép dữ liệu không phụ thuộc ngôn ngữ (site.ts) với chữ đã dịch (dictionary).
 * Component nhận dữ liệu đã có chữ đúng ngôn ngữ + href đã gắn tiền tố ngôn ngữ.
 */
import type { I18n } from "@/i18n/server";
import { bookingChannels, dining, explore, hero, highlights, nav, news, rooms, services, site } from "@/lib/site";

export const getNav = ({ t, href }: I18n) => nav.map((item) => ({ label: t.nav[item.id], href: href(item.href) }));

export const getBookingChannels = ({ t }: I18n) =>
  bookingChannels.map((c) => ({
    ...c,
    label: t.booking.channels[c.id].label,
    // Kênh gọi điện hiển thị số hotline làm ghi chú
    note: c.id === "phone" ? site.hotline : t.booking.channels[c.id].note,
  }));

export type LocalizedChannel = ReturnType<typeof getBookingChannels>[number];

export const getHeroSlides = ({ t, href }: I18n) =>
  hero.slides.map((s) => ({ ...s, ...t.home.heroSlides[s.id], href: href(s.href) }));

export type LocalizedHeroSlide = ReturnType<typeof getHeroSlides>[number];

export const getExplore = ({ t, href }: I18n) => explore.map((e) => ({ ...e, ...t.home.explore[e.id], href: href(e.href) }));

export const getHighlights = ({ t, href }: I18n) =>
  highlights.map((h) => ({ ...h, label: t.home.highlights[h.id], href: href(h.href) }));

export const getRooms = ({ t, href }: I18n) =>
  rooms.map((r) => {
    const text = t.rooms[r.slug];
    return {
      ...r,
      ...text,
      href: href(`/hang-phong#${r.slug}`),
      gallery: r.gallery.map((src, i) => ({ src, alt: text.gallery[i] ?? r.name })),
    };
  });

export type LocalizedRoom = ReturnType<typeof getRooms>[number];

export const getDining = ({ t }: I18n) => dining.map((d) => ({ ...d, ...t.dining[d.slug] }));

export const getServices = ({ t }: I18n) => services.map((id) => ({ id, ...t.services[id] }));

export const getNews = ({ t, href }: I18n) =>
  news.map((n) => ({ ...n, ...t.news[n.slug], href: href(`/tin-tuc/${n.slug}`) }));

export type LocalizedNewsPost = ReturnType<typeof getNews>[number];
