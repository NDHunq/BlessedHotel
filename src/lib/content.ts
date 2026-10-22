/**
 * Ghép dữ liệu không phụ thuộc ngôn ngữ (site.ts) với chữ đã dịch (dictionary).
 * Component nhận dữ liệu đã có chữ đúng ngôn ngữ + href đã gắn tiền tố ngôn ngữ.
 */
import { fill } from "@/i18n/config";
import type { I18n } from "@/i18n/server";
import { bodyToMarkdown } from "@/lib/markdown";
import { bookingChannels, dining, experiences, explore, hero, highlights, nav, news, newsCategories, rooms, site, type Venue } from "@/lib/site";

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
      href: href(`/rooms#${r.slug}`),
      gallery: r.gallery.map((src, i) => ({ src, alt: text.gallery[i] ?? r.name })),
    };
  });

export type LocalizedRoom = ReturnType<typeof getRooms>[number];

/** Ghép dữ liệu nhà hàng / spa / phòng tập với chữ đã dịch; ảnh và trang thực đơn kèm `alt` theo ngôn ngữ */
const localizeVenue = ({ t }: I18n, v: Venue, text: { kind: string; description: string }) => ({
  slug: v.slug,
  name: v.name,
  hours: v.hours,
  phone: v.phone,
  reserveUrl: v.reserveUrl ?? "",
  ...text,
  gallery: v.gallery.map((src, i) => ({ src, alt: fill(t.venue.photoAlt, { name: v.name, n: i + 1 }) })),
  menu: (v.menu ?? []).map((src, i) => ({ src, alt: fill(t.venue.menuAlt, { name: v.name, n: i + 1 }) })),
});

export const getDining = (i18n: I18n) => dining.map((d) => localizeVenue(i18n, d, i18n.t.dining[d.slug]));

export const getExperiences = (i18n: I18n) => experiences.map((e) => localizeVenue(i18n, e, i18n.t.experiences[e.slug]));

export type LocalizedVenue = ReturnType<typeof localizeVenue>;

export const getNews = ({ t, href }: I18n) =>
  news.map((n) => ({
    ...n,
    ...t.news[n.slug],
    /** Nội dung bài dạng Markdown (trang bài viết hiển thị bằng `Markdown`) */
    markdown: bodyToMarkdown(t.news[n.slug].body),
    categoryLabel: t.newsCategories[n.category],
    href: href(`/news/${n.id}`),
  }));

export type LocalizedNewsPost = ReturnType<typeof getNews>[number];

/** Chuyên mục tin tức kèm nhãn và ảnh đại diện (ảnh bài mới nhất của chuyên mục) */
export const getNewsCategories = ({ t }: I18n) =>
  newsCategories.map((id) => ({
    id,
    label: t.newsCategories[id],
    image: news.find((n) => n.category === id)?.image ?? news[0].image,
  }));

export type LocalizedNewsCategory = ReturnType<typeof getNewsCategories>[number];
