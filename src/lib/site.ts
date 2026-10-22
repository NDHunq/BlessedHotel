/**
 * Dữ liệu KHÔNG phụ thuộc ngôn ngữ: ảnh, giá, số liệu, link, slug, id.
 * Mọi chữ hiển thị nằm trong src/i18n/dictionaries/*.ts (khoá theo id/slug ở đây).
 * Component lấy dữ liệu đã ghép sẵn chữ theo ngôn ngữ qua src/lib/content.ts.
 * Ảnh hiện dùng Unsplash (miễn phí); thay bằng ảnh thật của khách sạn.
 */

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// TODO: thay số hotline / Zalo thật
const HOTLINE = "1900 0000";
const ZALO_PHONE = "0900000000";

const MAP_QUERY = "Blessed+Hotel+Ph%C3%BA+Qu%E1%BB%91c";

export const site = {
  name: "Blessed Hotel",
  hotline: HOTLINE,
  email: "booking@blessedhotel.vn",
  /** Bản đồ nhúng (tìm theo tên trên Google Maps, không cần API key); `hl` = ngôn ngữ bản đồ */
  mapEmbed: (lang: string) => `https://maps.google.com/maps?q=${MAP_QUERY}&z=15&hl=${lang}&output=embed`,
  mapLink: `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`,
  social: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "Zalo", href: `https://zalo.me/${ZALO_PHONE}` },
  ],
};

export type BookingChannelId = "phone" | "zalo" | "traveloka" | "agoda" | "klook";

/** Các kênh đặt phòng (nhãn/ghi chú dịch trong dictionary `booking.channels`) */
export const bookingChannels: {
  id: BookingChannelId;
  href: string;
  /** Logo trong public/brands; không có thì component vẽ icon SVG */
  logo?: { src: string; width: number; height: number; wordmark?: boolean };
}[] = [
  { id: "phone", href: `tel:${HOTLINE.replace(/\s/g, "")}` },
  { id: "zalo", href: `https://zalo.me/${ZALO_PHONE}`, logo: { src: "/brands/zalo.svg", width: 24, height: 24 } },
  {
    id: "traveloka",
    href: "https://www.traveloka.com/vi-vn/hotel/vietnam/blessed-hotel-phu-quoc-9000007620307",
    logo: { src: "/brands/traveloka.png", width: 480, height: 212, wordmark: true },
  },
  {
    id: "agoda",
    href: "https://www.agoda.com/vi-vn/blessed-hotel-phu-quoc/hotel/phu-quoc-island-vn.html?cid=1844104&ds=rz1JBc7dOaqMLn%2FD",
    logo: { src: "/brands/agoda.svg", width: 140, height: 72, wordmark: true },
  },
  {
    id: "klook",
    href: "https://www.klook.com/vi/hotels/detail/1985523-blessed-hotel-phu-quoc/",
    logo: { src: "/brands/klook.png", width: 120, height: 120 },
  },
];

/** Menu chính (nhãn: dictionary `nav`) — href chưa có tiền tố ngôn ngữ */
export const nav = [
  { id: "about", href: "/ve-chung-toi" },
  { id: "rooms", href: "/hang-phong" },
  { id: "dining", href: "/am-thuc" },
  { id: "services", href: "/dich-vu" },
  { id: "news", href: "/tin-tuc" },
] as const;

/** Banner trang chủ (chữ: `home.heroSlides`), tự chuyển mỗi `interval` ms */
export const hero = {
  slides: [
    { id: "welcome", image: unsplash("photo-1542314831-068cd1dbfeeb", 2400), href: "/ve-chung-toi" },
    { id: "pool", image: unsplash("photo-1566073771259-6a8506099945", 2400), href: "/dich-vu" },
    { id: "sunset", image: unsplash("photo-1600011689032-8b628b8a8747", 2400), href: "/am-thuc" },
    { id: "rooms", image: unsplash("photo-1571896349842-33c89424de2d", 2400), href: "/hang-phong" },
  ],
  interval: 4000,
} as const;

/** Thẻ "Khám phá" ở trang chủ (chữ: `home.explore`) */
export const explore = [
  { id: "rooms", href: "/hang-phong", image: unsplash("photo-1631049307264-da0ec9d70304", 1000) },
  { id: "dining", href: "/am-thuc", image: unsplash("photo-1414235077428-338989a2e8c0", 1000) },
  { id: "spa", href: "/dich-vu", image: unsplash("photo-1540555700478-4be289fbecef", 1000) },
  { id: "story", href: "/ve-chung-toi", image: unsplash("photo-1520250497591-112f2f40a3f4", 1000) },
  { id: "news", href: "/tin-tuc/brunch-cuoi-tuan", image: unsplash("photo-1544148103-0773bf10d330", 1000) },
] as const;

/** Hàng điểm nhấn trong khối thương hiệu ở trang chủ (nhãn: `home.highlights`; tên riêng không dịch) */
export const highlights = [
  { id: "the-hearth", name: "The Hearth", href: "/am-thuc#the-hearth" },
  { id: "saffron", name: "Saffron", href: "/am-thuc#saffron" },
  { id: "sky-terrace", name: "Sky Terrace", href: "/am-thuc#sky-terrace" },
  { id: "spa", name: "Blessed Spa", href: "/dich-vu" },
] as const;

export type Stat = { value: number; label: string; decimals?: number; suffix?: string };

/** Trang /ve-chung-toi (chữ: dictionary `about`) */
export const about = {
  heroImage: unsplash("photo-1520250497591-112f2f40a3f4", 2400),
  stats: [
    { id: "rooms", value: 120, suffix: "+" },
    { id: "dining", value: 3 },
    { id: "reception", value: 24, suffix: "/7" },
  ],
  pillars: [
    { id: "rooms", image: unsplash("photo-1618773928121-c32242e63f39", 900) },
    { id: "food", image: unsplash("photo-1414235077428-338989a2e8c0", 900) },
    { id: "leisure", image: unsplash("photo-1507652313519-d4e9174996dd", 900) },
    { id: "people", image: unsplash("photo-1544148103-0773bf10d330", 900) },
  ],
  closingImage: unsplash("photo-1571896349842-33c89424de2d", 2400),
} as const;

/** Ảnh banner các trang con */
export const pageImages = {
  rooms: unsplash("photo-1631049307264-da0ec9d70304", 2400),
  dining: unsplash("photo-1414235077428-338989a2e8c0", 2400),
  services: unsplash("photo-1566073771259-6a8506099945", 2400),
  news: unsplash("photo-1551882547-ff40c63fe5fa", 2400),
};

export type RoomCategory = "room" | "suite" | "villa";

/** Hạng phòng (chữ: dictionary `rooms[slug]`; tên phòng là tên riêng, không dịch) */
export const rooms = [
  {
    slug: "deluxe",
    name: "Deluxe",
    category: "room",
    size: 28,
    guests: 2,
    priceFrom: 1_450_000,
    image: unsplash("photo-1618773928121-c32242e63f39", 1400),
    gallery: [
      unsplash("photo-1618773928121-c32242e63f39", 1800),
      unsplash("photo-1566665797739-1674de7a421a", 1800),
      unsplash("photo-1629140727571-9b5c6f6267b4", 1800),
      unsplash("photo-1584622650111-993a426fbf0a", 1800),
    ],
  },
  {
    slug: "premier",
    name: "Premier Ocean View",
    category: "room",
    size: 34,
    guests: 2,
    priceFrom: 1_850_000,
    image: unsplash("photo-1631049307264-da0ec9d70304", 1400),
    gallery: [
      unsplash("photo-1631049307264-da0ec9d70304", 1800),
      unsplash("photo-1631049552057-403cdb8f0658", 1800),
      unsplash("photo-1568495248636-6432b97bd949", 1800),
      unsplash("photo-1582719508461-905c673771fd", 1800),
    ],
  },
  {
    slug: "junior-suite",
    name: "Junior Suite",
    category: "suite",
    size: 45,
    guests: 3,
    priceFrom: 2_650_000,
    image: unsplash("photo-1590490360182-c33d57733427", 1400),
    gallery: [
      unsplash("photo-1590490360182-c33d57733427", 1800),
      unsplash("photo-1591088398332-8a7791972843", 1800),
      unsplash("photo-1598928506311-c55ded91a20c", 1800),
      unsplash("photo-1620626011761-996317b8d101", 1800),
    ],
  },
  {
    slug: "garden-villa",
    name: "Garden Villa",
    category: "villa",
    size: 60,
    guests: 4,
    priceFrom: 3_900_000,
    image: unsplash("photo-1611892440504-42a792e24d32", 1400),
    gallery: [
      unsplash("photo-1611892440504-42a792e24d32", 1800),
      unsplash("photo-1563911302283-d2bc129e7570", 1800),
      unsplash("photo-1618221195710-dd6b41faaea6", 1800),
      unsplash("photo-1507652313519-d4e9174996dd", 1800),
    ],
  },
] as const satisfies readonly {
  slug: string;
  name: string;
  category: RoomCategory;
  size: number;
  guests: number;
  priceFrom: number;
  image: string;
  gallery: readonly string[];
}[];

export const promoImage = unsplash("photo-1561501900-3701fa6a0864", 2400);

/** Nhà hàng & bar (chữ: dictionary `dining[slug]`; tên riêng và giờ mở cửa không dịch) */
export const dining = [
  { slug: "the-hearth", name: "The Hearth", hours: "06:00 – 22:00", image: unsplash("photo-1517248135467-4c7edcad34c4", 1400) },
  { slug: "saffron", name: "Saffron", hours: "11:00 – 14:00 · 17:30 – 22:00", image: unsplash("photo-1414235077428-338989a2e8c0", 1400) },
  { slug: "sky-terrace", name: "Sky Terrace", hours: "16:00 – 00:00", image: unsplash("photo-1559339352-11d035aa65de", 1400) },
] as const;

/** Dịch vụ, theo thứ tự hiển thị (chữ: dictionary `services[id]`) */
export const services = ["spa", "pool", "shuttle", "meeting", "gym", "concierge"] as const;

/** Bài viết (chữ: dictionary `news[slug]`), mới nhất trước */
export const news = [
  { slug: "spa-mua-thu", date: "2026-10-10", image: unsplash("photo-1507652313519-d4e9174996dd", 1000) },
  { slug: "brunch-cuoi-tuan", date: "2026-10-02", image: unsplash("photo-1544148103-0773bf10d330", 1000) },
  { slug: "hoang-hon-ho-boi", date: "2026-09-25", image: unsplash("photo-1600011689032-8b628b8a8747", 1000) },
  { slug: "kinh-nghiem-du-lich-phu-quoc", date: "2026-09-12", image: unsplash("photo-1551882547-ff40c63fe5fa", 1000) },
  { slug: "uu-dai-luu-tru-dai-ngay", date: "2026-08-30", image: unsplash("photo-1584132967334-10e028bd69f7", 1000) },
  { slug: "yoga-san-thuong", date: "2026-08-15", image: unsplash("photo-1445019980597-93fa8acb246c", 1000) },
] as const;
