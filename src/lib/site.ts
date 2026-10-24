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
  { id: "about", href: "/about" },
  { id: "rooms", href: "/rooms" },
  { id: "dining", href: "/dining" },
  { id: "experiences", href: "/experiences" },
  { id: "news", href: "/news" },
] as const;

/** Banner trang chủ (chữ: `home.heroSlides`), tự chuyển mỗi `interval` ms */
export const hero = {
  slides: [
    { id: "welcome", image: unsplash("photo-1542314831-068cd1dbfeeb", 2400), href: "/about" },
    { id: "pool", image: unsplash("photo-1566073771259-6a8506099945", 2400), href: "/experiences" },
    { id: "sunset", image: unsplash("photo-1600011689032-8b628b8a8747", 2400), href: "/dining#olea-cafe" },
    { id: "rooms", image: unsplash("photo-1571896349842-33c89424de2d", 2400), href: "/rooms" },
  ],
  interval: 4000,
} as const;

/** Thẻ "Khám phá" ở trang chủ (chữ: `home.explore`) */
export const explore = [
  { id: "rooms", href: "/rooms", image: unsplash("photo-1631049307264-da0ec9d70304", 1000) },
  { id: "dining", href: "/dining#blessed-bistro", image: unsplash("photo-1414235077428-338989a2e8c0", 1000) },
  { id: "spa", href: "/experiences#spa", image: unsplash("photo-1540555700478-4be289fbecef", 1000) },
  { id: "story", href: "/about", image: unsplash("photo-1520250497591-112f2f40a3f4", 1000) },
  // Bài "Sunday Brunch" (id 5 trong `news`)
  { id: "news", href: "/news/5", image: unsplash("photo-1544148103-0773bf10d330", 1000) },
] as const;

/** Hàng điểm nhấn trong khối thương hiệu ở trang chủ (nhãn: `home.highlights`; tên riêng không dịch) */
export const highlights = [
  { id: "blessed-bistro", name: "Blessed Bistro", href: "/dining#blessed-bistro" },
  { id: "olea-cafe", name: "Olea Café", href: "/dining#olea-cafe" },
  { id: "spa", name: "Blessed Spa", href: "/experiences#spa" },
  { id: "gym", name: "Blessed Gym", href: "/experiences#gym" },
] as const;

export type Stat = { value: number; label: string; decimals?: number; suffix?: string };

/** Trang /about (chữ: dictionary `about`) */
export const about = {
  heroImage: unsplash("photo-1520250497591-112f2f40a3f4", 2400),
  stats: [
    { id: "rooms", value: 120, suffix: "+" },
    { id: "dining", value: 2 },
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
  experiences: unsplash("photo-1566073771259-6a8506099945", 2400),
  news: unsplash("photo-1551882547-ff40c63fe5fa", 2400),
};

export type RoomCategory = "room" | "suite" | "villa";

/**
 * Tiện ích hiển thị trong modal "Xem thêm" của trang phòng (nhãn: dictionary `roomFacilities[id]`).
 * `baseFacilities` có ở mọi hạng phòng; mỗi phòng thêm tiện ích riêng trong `facilities`.
 */
const baseFacilities = [
  "air-conditioning", "wifi", "smart-tv", "satellite-tv", "telephone", "minibar", "kettle", "bottled-water",
  "slippers", "wardrobe", "blackout-curtains", "safe", "private-bathroom", "rain-shower", "hairdryer", "towels",
  "toiletries", "daily-housekeeping", "room-service", "reception-24h", "laundry", "luggage-storage", "wake-up-call",
] as const;

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
    facilities: ["desk", "coffee-machine", ...baseFacilities],
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
    facilities: ["balcony", "sea-view", "desk", "bathrobe", ...baseFacilities],
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
    facilities: ["living-area", "sofa-bed", "bathtub", "coffee-machine", "bathrobe", "turndown", ...baseFacilities],
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
    facilities: ["terrace", "garden-view", "living-area", "bathtub", "coffee-machine", "bathrobe", "in-room-breakfast", ...baseFacilities],
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
  facilities: readonly string[];
}[];

export type RoomFacility = (typeof rooms)[number]["facilities"][number];

export const promoImage = unsplash("photo-1561501900-3701fa6a0864", 2400);

/**
 * Nhà hàng / spa / phòng tập hiển thị bằng `VenueCard` (chữ: dictionary `dining[slug]` / `experiences[slug]`).
 * Tên riêng, giờ mở cửa, số điện thoại không dịch. `menu`: ảnh từng trang thực đơn (public/menus, đang là ảnh tạm).
 * `reserveUrl`: link đặt bàn / đặt chỗ riêng (đang chờ đối tác làm); để trống thì nút gọi số `phone`.
 */
export type Venue = {
  slug: string;
  name: string;
  hours: string;
  phone?: string;
  gallery: readonly string[];
  menu?: readonly string[];
  reserveUrl?: string;
};

const menuPages = (slug: string, pages: number) => Array.from({ length: pages }, (_, i) => `/menus/${slug}-${i + 1}.svg`);

// TODO: thay số điện thoại thật của nhà hàng / spa
export const dining = [
  {
    slug: "blessed-bistro",
    name: "Blessed Bistro",
    hours: "06:00 – 22:00",
    phone: "0297 000 0011",
    gallery: [
      unsplash("photo-1517248135467-4c7edcad34c4", 1400),
      unsplash("photo-1552566626-52f8b828add9", 1400),
      unsplash("photo-1424847651672-bf20a4b0982b", 1400),
      unsplash("photo-1504674900247-0877df9cc836", 1400),
    ],
    menu: menuPages("blessed-bistro", 3),
    reserveUrl: "",
  },
  {
    slug: "olea-cafe",
    name: "Olea Café",
    hours: "07:00 – 23:00",
    phone: "0297 000 0012",
    gallery: [
      unsplash("photo-1554118811-1e0d58224f24", 1400),
      unsplash("photo-1501339847302-ac426a4a7cbb", 1400),
      unsplash("photo-1495474472287-4d71bcdd2085", 1400),
      unsplash("photo-1509042239860-f550ce710b93", 1400),
    ],
    menu: menuPages("olea-cafe", 2),
    reserveUrl: "",
  },
] as const satisfies readonly Venue[];

export const experiences = [
  {
    slug: "spa",
    name: "Blessed Spa",
    hours: "09:00 – 22:00",
    phone: "0297 000 0013",
    gallery: [
      unsplash("photo-1540555700478-4be289fbecef", 1400),
      unsplash("photo-1544161515-4ab6ce6db874", 1400),
      unsplash("photo-1600334089648-b0d9d3028eb2", 1400),
      unsplash("photo-1515377905703-c4788e51af15", 1400),
    ],
    menu: menuPages("blessed-spa", 2),
    reserveUrl: "",
  },
  {
    slug: "gym",
    name: "Blessed Gym",
    hours: "05:30 – 22:00",
    gallery: [
      unsplash("photo-1534438327276-14e5300c3a48", 1400),
      unsplash("photo-1571902943202-507ec2618e8f", 1400),
      unsplash("photo-1540497077202-7c8a3999166f", 1400),
      unsplash("photo-1517836357463-d25dfeac3438", 1400),
    ],
  },
] as const satisfies readonly Venue[];

export type NewsCategory = "offer" | "dining" | "event" | "guide" | "wellness";

/** Chuyên mục tin tức theo thứ tự hiển thị (nhãn: dictionary `newsCategories`) */
export const newsCategories: NewsCategory[] = ["offer", "dining", "event", "guide", "wellness"];

/**
 * Bài viết, mới nhất trước; `featured` = hiện ở khối "Tin nổi bật".
 * `id`: mã bài (số, không đổi, sau này là khoá trong CMS/database), dùng trong URL `/news/<id>`.
 * `slug`: khoá chữ trong dictionary `news[slug]` (không xuất hiện trên URL; URL cũ /tin-tuc/<slug> được redirect về /news/<id>).
 */
export const news = [
  { id: 6, slug: "spa-mua-thu", category: "offer", date: "2026-10-10", featured: true, image: unsplash("photo-1507652313519-d4e9174996dd", 1600) },
  { id: 5, slug: "brunch-cuoi-tuan", category: "dining", date: "2026-10-02", featured: true, image: unsplash("photo-1544148103-0773bf10d330", 1600) },
  { id: 4, slug: "hoang-hon-ho-boi", category: "event", date: "2026-09-25", featured: false, image: unsplash("photo-1600011689032-8b628b8a8747", 1600) },
  { id: 3, slug: "kinh-nghiem-du-lich-phu-quoc", category: "guide", date: "2026-09-12", featured: true, image: unsplash("photo-1551882547-ff40c63fe5fa", 1600) },
  { id: 2, slug: "uu-dai-luu-tru-dai-ngay", category: "offer", date: "2026-08-30", featured: false, image: unsplash("photo-1584132967334-10e028bd69f7", 1600) },
  { id: 1, slug: "yoga-san-thuong", category: "wellness", date: "2026-08-15", featured: false, image: unsplash("photo-1445019980597-93fa8acb246c", 1600) },
] as const satisfies readonly { id: number; slug: string; category: NewsCategory; date: string; featured: boolean; image: string }[];
