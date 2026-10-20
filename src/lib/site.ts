/**
 * Nội dung tạm của site. Mọi trang/section đọc từ đây,
 * sau này thay bằng dữ liệu từ CMS/API mà không phải sửa component.
 * Ảnh hiện dùng Unsplash (miễn phí); thay bằng ảnh thật của khách sạn.
 */

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type NavItem = { label: string; href: string };

export type RoomCategory = "Phòng" | "Suite" | "Villa";

export type RoomType = {
  slug: string;
  name: string;
  category: RoomCategory;
  summary: string;
  description: string;
  size: number;
  guests: number;
  bed: string;
  view: string;
  priceFrom: number;
  amenities: string[];
  /** Ảnh đại diện (thẻ phòng ở trang chủ) */
  image: string;
  /** 3–4 ảnh cho bộ ảnh xếp chồng + trình xem ảnh ở /hang-phong; ảnh đầu = ảnh đại diện */
  gallery: { src: string; alt: string }[];
};

export type DiningVenue = {
  slug: string;
  name: string;
  kind: string;
  description: string;
  highlights: string[];
  hours: string;
  image: string;
};

export type Service = {
  icon: "spa" | "pool" | "shuttle" | "meeting" | "gym" | "concierge";
  title: string;
  description: string;
  details: string;
};

export type NewsPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
};

export type BookingChannel = {
  id: "phone" | "zalo" | "traveloka" | "agoda" | "klook";
  label: string;
  note: string;
  href: string;
  /** Logo trong public/brands; không có thì component vẽ icon SVG */
  logo?: { src: string; width: number; height: number; wordmark?: boolean };
};

// TODO: thay số hotline / Zalo thật
const HOTLINE = "1900 0000";
const ZALO_PHONE = "0900000000";

export const site = {
  name: "Blessed Hotel",
  tagline: "Nơi bình yên giữa đảo ngọc Phú Quốc",
  description:
    "Blessed Hotel Phú Quốc: khách sạn 120 phòng với hồ bơi vô cực, rooftop bar và nhà hàng hải sản.",
  hotline: HOTLINE,
  email: "booking@blessedhotel.vn",
  address: "Khu Sun Village - Primavera, Đường Venice, Phú Quốc, An Giang",
  /** Bản đồ nhúng ở footer (tìm theo tên trên Google Maps, không cần API key) */
  mapEmbed: "https://maps.google.com/maps?q=Blessed+Hotel+Ph%C3%BA+Qu%E1%BB%91c&z=15&hl=vi&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Blessed+Hotel+Ph%C3%BA+Qu%E1%BB%91c",
  social: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "Zalo", href: `https://zalo.me/${ZALO_PHONE}` },
  ],
};

/** Các kênh đặt phòng hiển thị ở nút nổi góc phải dưới */
export const bookingChannels: BookingChannel[] = [
  {
    id: "phone",
    label: "Gọi điện",
    note: HOTLINE,
    href: `tel:${HOTLINE.replace(/\s/g, "")}`,
  },
  {
    id: "zalo",
    label: "Zalo",
    note: "Nhắn tin tư vấn",
    href: `https://zalo.me/${ZALO_PHONE}`,
    logo: { src: "/brands/zalo.svg", width: 24, height: 24 },
  },
  {
    id: "traveloka",
    label: "Traveloka",
    note: "Đặt qua Traveloka",
    href: "https://www.traveloka.com/vi-vn/hotel/vietnam/blessed-hotel-phu-quoc-9000007620307",
    logo: { src: "/brands/traveloka.png", width: 480, height: 212, wordmark: true },
  },
  {
    id: "agoda",
    label: "Agoda",
    note: "Đặt qua Agoda",
    href: "https://www.agoda.com/vi-vn/blessed-hotel-phu-quoc/hotel/phu-quoc-island-vn.html?cid=1844104&ds=rz1JBc7dOaqMLn%2FD",
    logo: { src: "/brands/agoda.svg", width: 140, height: 72, wordmark: true },
  },
  {
    id: "klook",
    label: "Klook",
    note: "Đặt qua Klook",
    href: "https://www.klook.com/vi/hotels/detail/1985523-blessed-hotel-phu-quoc/",
    logo: { src: "/brands/klook.png", width: 120, height: 120 },
  },
];

export const nav: NavItem[] = [
  { label: "Về chúng tôi", href: "/ve-chung-toi" },
  { label: "Các hạng phòng", href: "/hang-phong" },
  { label: "Ẩm thực", href: "/am-thuc" },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Tin tức", href: "/tin-tuc" },
];

export type HeroSlide = {
  image: string;
  kicker: string;
  title: string;
  /** Dòng phụ viết bằng font serif */
  subtitle: string;
  href: string;
};

/** Banner trang chủ: mỗi ảnh một câu chữ riêng, tự chuyển mỗi `interval` ms */
export const hero: { slides: HeroSlide[]; interval: number } = {
  slides: [
    {
      image: unsplash("photo-1542314831-068cd1dbfeeb", 2400),
      kicker: "Chào mừng đến với",
      title: "Blessed Hotel",
      subtitle: "Tại đảo ngọc Phú Quốc",
      href: "/ve-chung-toi",
    },
    {
      image: unsplash("photo-1566073771259-6a8506099945", 2400),
      kicker: "Thư giãn trọn ngày",
      title: "Hồ bơi vô cực",
      subtitle: "Mở cửa từ 6:00 đến 22:00",
      href: "/dich-vu",
    },
    {
      image: unsplash("photo-1600011689032-8b628b8a8747", 2400),
      kicker: "Rooftop bar",
      title: "Hoàng hôn Sky Terrace",
      subtitle: "Cocktail đặc trưng mỗi chiều",
      href: "/am-thuc",
    },
    {
      image: unsplash("photo-1571896349842-33c89424de2d", 2400),
      kicker: "120 phòng & villa",
      title: "Ngủ ngon giữa đảo",
      subtitle: "Từ Deluxe đến Garden Villa",
      href: "/hang-phong",
    },
  ],
  interval: 4000,
};

export type ExploreItem = { label: string; title: string; description: string; href: string; image: string };

/** Thẻ "Khám phá" ở trang chủ, mỗi thẻ dẫn tới một trang */
export const explore: ExploreItem[] = [
  {
    label: "Phòng nghỉ",
    title: "4 hạng phòng, từ 28 m² đến 60 m²",
    description: "Phòng hướng biển có ban công ngắm hoàng hôn, villa riêng giữa vườn cho cả gia đình.",
    href: "/hang-phong",
    image: unsplash("photo-1631049307264-da0ec9d70304", 1000),
  },
  {
    label: "Ẩm thực",
    title: "Hải sản Phú Quốc tại Saffron",
    description: "Cá, ghẹ, nhum được nhập trong ngày từ chợ Dương Đông, chế biến theo công thức ba miền.",
    href: "/am-thuc",
    image: unsplash("photo-1414235077428-338989a2e8c0", 1000),
  },
  {
    label: "Spa & hồ bơi",
    title: "Một buổi chiều chậm lại",
    description: "Massage đá nóng 90 phút, sau đó ra hồ bơi vô cực đón nắng cuối ngày.",
    href: "/dich-vu",
    image: unsplash("photo-1540555700478-4be289fbecef", 1000),
  },
  {
    label: "Câu chuyện",
    title: "Như trở về nhà, giữa lòng đảo ngọc",
    description: "Lý do chúng tôi chọn Phú Quốc, và những người đón bạn mỗi sáng ở quầy lễ tân.",
    href: "/ve-chung-toi",
    image: unsplash("photo-1520250497591-112f2f40a3f4", 1000),
  },
  {
    label: "Tin tức",
    title: "Sunday Brunch tại The Hearth",
    description: "Hơn 60 món Á Âu, khu vui chơi cho trẻ em và nhạc sống mỗi Chủ nhật.",
    href: "/tin-tuc",
    image: unsplash("photo-1544148103-0773bf10d330", 1000),
  },
];

/** Hàng điểm nhấn trong khối thương hiệu ở trang chủ */
export const highlights = [
  { label: "Ẩm thực cả ngày", name: "The Hearth", href: "/am-thuc#the-hearth" },
  { label: "Ẩm thực Việt", name: "Saffron", href: "/am-thuc#saffron" },
  { label: "Rooftop bar", name: "Sky Terrace", href: "/am-thuc#sky-terrace" },
  { label: "Spa & thư giãn", name: "Blessed Spa", href: "/dich-vu" },
];

export type Stat = {
  value: number;
  label: string;
  decimals?: number;
  suffix?: string;
};

/** Nội dung trang /ve-chung-toi (bố cục theo trang "Về chúng tôi" của site tham khảo) */
export const about = {
  hero: {
    image: unsplash("photo-1520250497591-112f2f40a3f4", 2400),
    tagline: "Nơi bình yên giữa đảo ngọc",
  },
  /** Section nền xám: đoạn dẫn, tiêu đề tô màu vài từ, đoạn kết */
  philosophy: {
    lead: [
      "Mỗi chuyến đi không chỉ là một điểm đến.",
      "Nơi ta ở lại không chỉ là một chỗ ngủ.",
      "Đó là lý do chúng tôi xây Blessed Hotel",
      "như một ngôi nhà bên biển.",
    ],
    /** Mỗi dòng: phần tô màu + phần còn lại */
    title: [
      { highlight: "Nghỉ ngơi", rest: " trọn vẹn." },
      { highlight: "Bình yên", rest: " bên biển." },
    ],
    body: "Một kỳ nghỉ đáng nhớ đến từ những điều giản dị: giấc ngủ ngon, bữa sáng nóng hổi, nụ cười ở quầy lễ tân và một gợi ý đúng lúc để bạn khám phá hòn đảo theo cách của riêng mình.",
  },
  /** Số liệu chạy số (CountUp) */
  stats: [
    { value: 120, suffix: "+", label: "Phòng & villa" },
    { value: 3, label: "Nhà hàng & bar" },
    { value: 24, suffix: "/7", label: "Lễ tân & hỗ trợ" },
  ] satisfies Stat[],
  /** 4 thẻ ảnh dọc, chữ nằm trên ảnh */
  pillars: [
    { title: "Những căn phòng sáng", description: "Đến từ sự chăm chút trong từng góc nhỏ.", image: unsplash("photo-1618773928121-c32242e63f39", 900) },
    { title: "Những bữa ăn ấm", description: "Đến từ hải sản trong ngày và công thức nhà làm.", image: unsplash("photo-1414235077428-338989a2e8c0", 900) },
    { title: "Những phút thảnh thơi", description: "Đến từ hồ bơi, spa và tiếng sóng.", image: unsplash("photo-1507652313519-d4e9174996dd", 900) },
    { title: "Những người tận tâm", description: "Đến từ đội ngũ nhớ tên và món bạn thích.", image: unsplash("photo-1544148103-0773bf10d330", 900) },
  ],
  /** Ảnh tràn viền + chữ bên trái */
  closing: {
    image: unsplash("photo-1571896349842-33c89424de2d", 2400),
    lead: ["Không chỉ là nơi để ngủ.", "Chúng tôi muốn trở thành:"],
    titleLight: "Ngôi nhà của bạn ở",
    titleBold: "Phú Quốc",
    body: [
      "Một khách sạn nhỏ bên bờ biển phía nam đảo,",
      "nơi bạn được gọi bằng tên,",
      "và luôn muốn quay lại vào mùa sau.",
    ],
  },
};

/** Ảnh banner các trang con khác */
export const pageImages = {
  services: unsplash("photo-1566073771259-6a8506099945", 2400),
};

export const rooms: RoomType[] = [
  {
    slug: "deluxe",
    category: "Phòng",
    name: "Deluxe",
    summary: "Không gian ấm cúng, đầy đủ tiện nghi cho chuyến công tác hoặc nghỉ ngắn ngày.",
    description:
      "Phòng Deluxe được bài trí với gam màu ấm, giường King êm ái và góc ngồi thư giãn bên cửa sổ. Hợp với cặp đôi hoặc khách đi công tác.",
    size: 28,
    guests: 2,
    bed: "1 giường King",
    view: "Hướng vườn",
    priceFrom: 1_450_000,
    amenities: ["Wi-Fi miễn phí", "Smart TV", "Máy pha cà phê", "Minibar", "Két sắt", "Phòng tắm đứng"],
    image: unsplash("photo-1618773928121-c32242e63f39", 1400),
    gallery: [
      { src: unsplash("photo-1618773928121-c32242e63f39", 1800), alt: "Phòng ngủ Deluxe" },
      { src: unsplash("photo-1566665797739-1674de7a421a", 1800), alt: "Giường King và đèn đọc sách" },
      { src: unsplash("photo-1629140727571-9b5c6f6267b4", 1800), alt: "Góc ngồi bên cửa sổ" },
      { src: unsplash("photo-1584622650111-993a426fbf0a", 1800), alt: "Phòng tắm đứng vách kính" },
    ],
  },
  {
    slug: "premier",
    category: "Phòng",
    name: "Premier Ocean View",
    summary: "Cửa kính lớn nhìn ra biển, góc làm việc riêng và phòng tắm đứng.",
    description:
      "Thức dậy với khung cảnh biển xanh qua ô cửa kính lớn. Phòng Premier rộng rãi hơn, có bàn làm việc và ban công nhỏ để ngắm hoàng hôn.",
    size: 34,
    guests: 2,
    bed: "1 giường King hoặc 2 giường đơn",
    view: "Hướng biển",
    priceFrom: 1_850_000,
    amenities: ["Wi-Fi miễn phí", "Ban công", "Smart TV", "Bàn làm việc", "Minibar", "Áo choàng tắm"],
    image: unsplash("photo-1631049307264-da0ec9d70304", 1400),
    gallery: [
      { src: unsplash("photo-1631049307264-da0ec9d70304", 1800), alt: "Phòng ngủ Premier Ocean View" },
      { src: unsplash("photo-1631049552057-403cdb8f0658", 1800), alt: "Góc sofa và cửa kính lớn" },
      { src: unsplash("photo-1568495248636-6432b97bd949", 1800), alt: "Cửa kính nhìn ra ngoài" },
      { src: unsplash("photo-1582719508461-905c673771fd", 1800), alt: "Ban công nhìn ra biển" },
    ],
  },
  {
    slug: "junior-suite",
    category: "Suite",
    name: "Junior Suite",
    summary: "Khu tiếp khách tách biệt, nội thất cổ điển sang trọng cho kỳ nghỉ dài.",
    description:
      "Junior Suite có khu tiếp khách riêng với sofa êm ái, nội thất cổ điển và không gian rộng rãi, đủ cho gia đình nhỏ hoặc kỳ nghỉ dài ngày.",
    size: 45,
    guests: 3,
    bed: "1 giường King + sofa bed",
    view: "Hướng biển một phần",
    priceFrom: 2_650_000,
    amenities: ["Khu tiếp khách", "Bồn tắm", "Smart TV", "Máy pha cà phê", "Minibar", "Dịch vụ turndown"],
    image: unsplash("photo-1590490360182-c33d57733427", 1400),
    gallery: [
      { src: unsplash("photo-1590490360182-c33d57733427", 1800), alt: "Junior Suite" },
      { src: unsplash("photo-1591088398332-8a7791972843", 1800), alt: "Phòng ngủ có ghế đọc sách" },
      { src: unsplash("photo-1598928506311-c55ded91a20c", 1800), alt: "Khu tiếp khách riêng" },
      { src: unsplash("photo-1620626011761-996317b8d101", 1800), alt: "Phòng tắm có bồn tắm" },
    ],
  },
  {
    slug: "garden-villa",
    category: "Villa",
    name: "Garden Villa",
    summary: "Biệt lập giữa vườn nhiệt đới, ban công riêng và bồn tắm thư giãn.",
    description:
      "Biệt thự riêng tư nép mình giữa khu vườn nhiệt đới, với hiên rộng, bồn tắm lớn và không gian đủ cho cả gia đình cùng tận hưởng.",
    size: 60,
    guests: 4,
    bed: "1 giường King + 2 giường đơn",
    view: "Hướng vườn nhiệt đới",
    priceFrom: 3_900_000,
    amenities: ["Hiên riêng", "Bồn tắm lớn", "Phòng khách", "Smart TV", "Máy pha cà phê", "Bữa sáng tại phòng"],
    image: unsplash("photo-1611892440504-42a792e24d32", 1400),
    gallery: [
      { src: unsplash("photo-1611892440504-42a792e24d32", 1800), alt: "Phòng ngủ Garden Villa" },
      { src: unsplash("photo-1563911302283-d2bc129e7570", 1800), alt: "Hồ bơi giữa vườn nhiệt đới" },
      { src: unsplash("photo-1618221195710-dd6b41faaea6", 1800), alt: "Phòng khách trong villa" },
      { src: unsplash("photo-1507652313519-d4e9174996dd", 1800), alt: "Bồn tắm lớn bên cây xanh" },
    ],
  },
];

export const promo = {
  title: "Đặt trực tiếp với khách sạn để nhận giá tốt nhất.",
  body: "Nhận phòng sớm, trả phòng muộn và nâng hạng miễn phí khi còn phòng.",
  cta: "Liên hệ đặt phòng",
  image: unsplash("photo-1561501900-3701fa6a0864", 2400),
};

export const dining: DiningVenue[] = [
  {
    slug: "the-hearth",
    name: "The Hearth",
    kind: "Nhà hàng All-day",
    description:
      "Bữa sáng buffet phong phú và thực đơn Á Âu suốt ngày, sử dụng nguyên liệu tươi từ nông trại và biển Phú Quốc.",
    highlights: ["Buffet sáng hơn 50 món", "Góc bánh mì & cà phê", "Thực đơn trẻ em"],
    hours: "06:00 – 22:00",
    image: unsplash("photo-1517248135467-4c7edcad34c4", 1400),
  },
  {
    slug: "saffron",
    name: "Saffron",
    kind: "Ẩm thực Việt tinh hoa",
    description:
      "Những món ăn truyền thống ba miền và hải sản đảo được nâng tầm trong cách trình bày, kết hợp rượu vang chọn lọc.",
    highlights: ["Hải sản tươi trong ngày", "Thực đơn nếm thử 7 món", "Rượu vang chọn lọc"],
    hours: "11:00 – 14:00 · 17:30 – 22:00",
    image: unsplash("photo-1414235077428-338989a2e8c0", 1400),
  },
  {
    slug: "sky-terrace",
    name: "Sky Terrace",
    kind: "Rooftop Bar",
    description:
      "Cocktail đặc trưng, nhạc chill và khung cảnh hoàng hôn trên biển mỗi chiều.",
    highlights: ["Cocktail đặc trưng", "Happy hour 17:00 – 19:00", "DJ cuối tuần"],
    hours: "16:00 – 00:00",
    image: unsplash("photo-1559339352-11d035aa65de", 1400),
  },
];

export const services: Service[] = [
  {
    icon: "spa",
    title: "Spa & Massage",
    description: "Liệu trình thảo mộc và tinh dầu giúp cơ thể thư thái.",
    details: "Phòng trị liệu riêng tư, massage đá nóng, chăm sóc da mặt và gói spa cho cặp đôi. Đặt lịch tại lễ tân.",
  },
  {
    icon: "pool",
    title: "Hồ bơi vô cực",
    description: "Hồ bơi ngoài trời mở cửa từ sáng sớm đến tối muộn.",
    details: "Hồ bơi hướng biển với ghế tắm nắng, khăn tắm miễn phí và quầy bar bên hồ phục vụ đồ uống nhẹ.",
  },
  {
    icon: "shuttle",
    title: "Đưa đón sân bay",
    description: "Xe riêng đón tiễn tận nơi, đặt trước dễ dàng.",
    details: "Xe 4–16 chỗ đón tiễn sân bay Phú Quốc. Vui lòng báo trước số hiệu chuyến bay ít nhất 24 giờ.",
  },
  {
    icon: "meeting",
    title: "Hội nghị & Sự kiện",
    description: "Phòng họp linh hoạt cho 10 – 300 khách.",
    details: "Trang thiết bị trình chiếu hiện đại, thực đơn tiệc linh hoạt và đội ngũ hỗ trợ tổ chức chuyên nghiệp.",
  },
  {
    icon: "gym",
    title: "Phòng tập 24/7",
    description: "Trang thiết bị hiện đại, mở cửa suốt ngày đêm.",
    details: "Máy chạy bộ, xe đạp, tạ tự do và khu yoga. Huấn luyện viên cá nhân theo yêu cầu.",
  },
  {
    icon: "concierge",
    title: "Concierge",
    description: "Gợi ý lịch trình, đặt tour và vé tham quan.",
    details: "Đặt tour 4 đảo, cáp treo Hòn Thơm, VinWonders, thuê xe máy và gợi ý quán ăn địa phương.",
  },
];

export const news: NewsPost[] = [
  {
    slug: "spa-mua-thu",
    category: "Ưu đãi",
    title: "Gói spa mùa thu: thư giãn trọn vẹn với giá đặc biệt",
    excerpt: "Tận hưởng liệu trình 90 phút cùng trà thảo mộc, áp dụng đến hết tháng 11.",
    date: "2026-10-10",
    image: unsplash("photo-1507652313519-d4e9174996dd", 1000),
  },
  {
    slug: "brunch-cuoi-tuan",
    category: "Ẩm thực",
    title: "Ra mắt Sunday Brunch tại The Hearth",
    excerpt: "Hơn 60 món Á Âu, khu vui chơi cho trẻ em và nhạc sống mỗi Chủ nhật.",
    date: "2026-10-02",
    image: unsplash("photo-1544148103-0773bf10d330", 1000),
  },
  {
    slug: "hoang-hon-ho-boi",
    category: "Sự kiện",
    title: "Pool Party hoàng hôn cuối tháng",
    excerpt: "DJ, cocktail và BBQ bên hồ bơi vô cực vào tối thứ Bảy cuối cùng mỗi tháng.",
    date: "2026-09-25",
    image: unsplash("photo-1600011689032-8b628b8a8747", 1000),
  },
  {
    slug: "kinh-nghiem-du-lich-phu-quoc",
    category: "Cẩm nang",
    title: "Kinh nghiệm du lịch Phú Quốc 4 ngày 3 đêm",
    excerpt: "Lịch trình gợi ý, món ngon nên thử và những điểm ngắm hoàng hôn đẹp nhất đảo.",
    date: "2026-09-12",
    image: unsplash("photo-1551882547-ff40c63fe5fa", 1000),
  },
  {
    slug: "uu-dai-luu-tru-dai-ngay",
    category: "Ưu đãi",
    title: "Ở càng lâu, ưu đãi càng lớn",
    excerpt: "Giảm đến 25% cho kỳ nghỉ từ 5 đêm trở lên khi liên hệ đặt phòng trực tiếp.",
    date: "2026-08-30",
    image: unsplash("photo-1584132967334-10e028bd69f7", 1000),
  },
  {
    slug: "yoga-san-thuong",
    category: "Sức khỏe",
    title: "Yoga bình minh trên sân thượng",
    excerpt: "Lớp yoga miễn phí cho khách lưu trú lúc 6:00 sáng mỗi ngày, đón nắng sớm trên đảo.",
    date: "2026-08-15",
    image: unsplash("photo-1445019980597-93fa8acb246c", 1000),
  },
];

export const footerLinks: { title: string; links: NavItem[] }[] = [
  { title: "Khám phá", links: nav },
  {
    title: "Đặt phòng",
    links: bookingChannels
      .filter((c) => c.id !== "phone")
      .map((c) => ({ label: c.label, href: c.href })),
  },
];

export const formatVnd = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "₫";

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso),
  );
