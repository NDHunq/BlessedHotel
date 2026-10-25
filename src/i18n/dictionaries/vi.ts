/**
 * TỪ ĐIỂN GỐC (tiếng Việt). Mọi chữ hiển thị trên site nằm ở đây.
 * en.ts / ko.ts / zh.ts có kiểu `Dictionary` = cấu trúc của file này:
 * thêm/sửa/xoá key ở đây thì PHẢI làm tương ứng ở cả 3 file kia (thiếu key → `npm run build` báo lỗi).
 * Chuỗi có {biến} được điền bằng `fill()` trong i18n/config.ts.
 * Nội dung theo danh sách được đặt khoá theo id/slug để không bị lệch thứ tự giữa các ngôn ngữ.
 */
export const vi = {
  meta: {
    tagline: "Nơi bình yên giữa đảo ngọc Phú Quốc",
    description: "Blessed Hotel Phú Quốc: khách sạn 120 phòng với hồ bơi vô cực, spa và nhà hàng hải sản.",
    place: "Phú Quốc",
    address: "Khu Sun Village - Primavera, Đường Venice, Phú Quốc, An Giang",
  },

  nav: {
    about: "Giới thiệu",
    rooms: "Các hạng phòng",
    dining: "Ẩm thực",
    experiences: "Trải nghiệm",
    news: "Tin tức",
  },

  ui: {
    mainMenu: "Menu chính",
    mobileMenu: "Menu di động",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    homeAria: "Blessed Hotel, trang chủ",
    home: "Trang chủ",
    breadcrumb: "Đường dẫn",
    language: "Ngôn ngữ",
    hotline: "Hotline",
    bookNow: "Đặt phòng",
    bookNowLong: "Đặt phòng ngay",
    contactToBook: "Liên hệ đặt phòng",
    explore: "Khám phá",
    viewAll: "Xem tất cả",
    readMore: "Đọc tiếp",
    viewDetails: "Xem chi tiết",
    callPhone: "Gọi {phone}",
    previous: "Trước",
    next: "Sau",
    slideLabel: "Ảnh {n}: {title}",
    viewPhotos: "Xem ảnh",
    viewPhotosOf: "Xem ảnh phòng {name}",
    from: "Từ",
    fromLong: "Chỉ từ",
    perNight: "/ đêm",
    guests: "{n} khách",
  },

  /** Nhãn của trình xem ảnh (yet-another-react-lightbox) */
  lightbox: {
    Previous: "Ảnh trước",
    Next: "Ảnh sau",
    Close: "Đóng",
    Slide: "Ảnh",
    Carousel: "Băng ảnh",
    Lightbox: "Trình xem ảnh",
    "Photo gallery": "Bộ ảnh",
    "{index} of {total}": "{index} / {total}",
    "Zoom in": "Phóng to",
    "Zoom out": "Thu nhỏ",
    "Show thumbnails": "Hiện ảnh nhỏ",
    "Hide thumbnails": "Ẩn ảnh nhỏ",
    "Show captions": "Hiện chú thích",
    "Hide captions": "Ẩn chú thích",
  },

  booking: {
    panelLabel: "Kênh đặt phòng",
    via: "Đặt phòng qua",
    channels: {
      phone: { label: "Gọi điện", note: "" },
      zalo: { label: "Zalo", note: "Nhắn tin tư vấn" },
      traveloka: { label: "Traveloka", note: "Đặt qua Traveloka" },
      agoda: { label: "Agoda", note: "Đặt qua Agoda" },
      klook: { label: "Klook", note: "Đặt qua Klook" },
    },
    cta: {
      title: "Sẵn sàng cho kỳ nghỉ ở Phú Quốc?",
      description: "Gọi hoặc nhắn Zalo để nhận giá tốt nhất, hoặc đặt nhanh qua các nền tảng quen thuộc.",
    },
  },

  footer: {
    social: "Mạng xã hội",
    contact: "Liên hệ",
    hotlineZalo: "Hotline / Zalo",
    email: "Email",
    address: "Địa chỉ",
    explore: "Khám phá",
    booking: "Đặt phòng",
    location: "Vị trí",
    mapTitle: "Bản đồ Blessed Hotel Phú Quốc",
    copyright: "© Blessed Hotel Phú Quốc. Bảo lưu mọi quyền.",
    license: "Giấy phép kinh doanh dịch vụ lưu trú: đang cập nhật.",
  },

  notFound: {
    title: "Không tìm thấy trang bạn cần.",
    back: "Về trang chủ",
  },

  home: {
    heroSlides: {
      welcome: { kicker: "Chào mừng đến với", title: "Blessed Hotel", subtitle: "Tại đảo ngọc Phú Quốc" },
      pool: { kicker: "Thư giãn trọn ngày", title: "Hồ bơi vô cực", subtitle: "Mở cửa từ 6:00 đến 22:00" },
      sunset: { kicker: "Cà phê bên hồ bơi", title: "Chiều ở Olea Café", subtitle: "Trà chiều từ 14:00 đến 17:00" },
      rooms: { kicker: "120 phòng & villa", title: "Ngủ ngon giữa đảo", subtitle: "Từ Deluxe đến Garden Villa" },
    },
    exploreTitle: "Khám phá Blessed Hotel",
    explore: {
      rooms: {
        label: "Phòng nghỉ",
        title: "4 hạng phòng, từ 28 m² đến 60 m²",
        description: "Phòng hướng biển có ban công ngắm hoàng hôn, villa riêng giữa vườn cho cả gia đình.",
      },
      dining: {
        label: "Ẩm thực",
        title: "Hải sản Phú Quốc tại Blessed Bistro",
        description: "Cá, ghẹ, nhum được nhập trong ngày từ chợ Dương Đông, chế biến theo công thức ba miền.",
      },
      spa: {
        label: "Spa & hồ bơi",
        title: "Một buổi chiều chậm lại",
        description: "Massage đá nóng 90 phút, sau đó ra hồ bơi vô cực đón nắng cuối ngày.",
      },
      story: {
        label: "Câu chuyện",
        title: "Như trở về nhà, giữa lòng đảo ngọc",
        description: "Lý do chúng tôi chọn Phú Quốc, và những người đón bạn mỗi sáng ở quầy lễ tân.",
      },
      news: {
        label: "Tin tức",
        title: "Sunday Brunch tại Blessed Bistro",
        description: "Hơn 60 món Á Âu, khu vui chơi cho trẻ em và nhạc sống mỗi Chủ nhật.",
      },
    },
    roomsTitle: "Hạng phòng",
    roomTabsLabel: "Loại phòng",
    roomTabs: { all: "Tất cả", room: "Phòng", suite: "Suite", villa: "Villa" },
    promo: {
      title: "Đặt trực tiếp với khách sạn để nhận giá tốt nhất.",
      body: "Nhận phòng sớm, trả phòng muộn và nâng hạng miễn phí khi còn phòng.",
      cta: "Liên hệ đặt phòng",
    },
    brand: {
      wordmark: ["Blessed", "Hotel", "Phú Quốc"],
      tagline: ["Ngủ ngon.", "Ăn ngon.", "Sống chậm giữa đảo."],
    },
    highlights: {
      "blessed-bistro": "Ẩm thực Á Âu",
      "olea-cafe": "Cà phê & bánh ngọt",
      spa: "Spa & thư giãn",
      gym: "Phòng tập",
    },
    newsTitle: "Tin tức & ưu đãi",
  },

  about: {
    metaTitle: "Giới thiệu",
    metaDescription: "Câu chuyện và triết lý của Blessed Hotel Phú Quốc.",
    heroTagline: "Nơi bình yên giữa đảo ngọc",
    wordmarkSub: "Hotel · Phú Quốc",
    philosophy: {
      title: { before: "Trải nghiệm nghỉ dưỡng tinh tế ngay giữa ", highlight: "Thị trấn Hoàng Hôn", after: "" },
      body: [
        "Ngay giữa nhịp sống rực rỡ của Thị trấn Hoàng Hôn, chỉ một phút đi bộ ra biển và vài phút tới Cầu Hôn cùng ga cáp treo An Thới, Blessed Hotel Phú Quốc tái hiện tinh thần một thị trấn biển hiện đại giữa Đảo ngọc với không gian đậm chất Địa Trung Hải.",
        "Bắt đầu ngày mới với những phút thư thả bên bờ biển Nam đảo, thưởng thức hải sản tại Blessed Bistro, thu trọn tầm mắt vào vẻ đẹp lộng lẫy của hoàng hôn ngũ sắc trứ danh và ngắm pháo hoa rực sáng bầu trời mỗi tối ngay tại chính căn phòng của bạn. Tất cả những trải nghiệm đó đều được chăm chút tỉ mỉ cho những ngày sống trọn vẹn cùng biển khơi tại Blessed Hotel.",
      ],
    },
    stats: { rooms: "Phòng & villa", dining: "Nhà hàng & café", reception: "Lễ tân & hỗ trợ" },
    pillars: {
      rooms: { title: "Những căn phòng sáng", description: "Đến từ sự chăm chút trong từng góc nhỏ." },
      food: { title: "Những bữa ăn ấm", description: "Đến từ hải sản trong ngày và công thức nhà làm." },
      leisure: { title: "Những phút thảnh thơi", description: "Đến từ hồ bơi, spa và tiếng sóng." },
      people: { title: "Những người tận tâm", description: "Đến từ đội ngũ nhớ tên và món bạn thích." },
    },
    closing: {
      lead: ["Không chỉ là nơi để ngủ.", "Chúng tôi muốn trở thành:"],
      titleLight: "Ngôi nhà của bạn ở ",
      titleBold: "Phú Quốc",
      body: ["Một khách sạn nhỏ bên bờ biển phía nam đảo,", "nơi bạn được gọi bằng tên,", "và luôn muốn quay lại vào mùa sau."],
    },
  },

  roomsPage: {
    metaTitle: "Các hạng phòng",
    metaDescription: "Deluxe, Premier Ocean View, Junior Suite và Garden Villa tại Blessed Hotel Phú Quốc.",
    heroDescription: "Từ phòng Deluxe ấm cúng đến Garden Villa biệt lập, chọn không gian hợp với chuyến đi của bạn.",
    size: "Diện tích",
    capacity: "Sức chứa",
    bed: "Giường",
    bookThisRoom: "Đặt phòng này",
    viewMore: "Xem thêm",
    detailsOf: "Thông tin phòng {name}",
    photosOf: "Ảnh phòng {name}",
    facilities: "Tiện ích",
    close: "Đóng",
  },

  /** Tiện ích trong modal "Xem thêm" của trang phòng (khoá = id trong `rooms[].facilities` ở site.ts) */
  roomFacilities: {
    "air-conditioning": "Điều hoà không khí",
    "wifi": "Wi-Fi miễn phí",
    "smart-tv": "Smart TV",
    "satellite-tv": "Truyền hình cáp/vệ tinh",
    "telephone": "Điện thoại",
    "minibar": "Minibar (có phí)",
    "kettle": "Ấm đun nước",
    "bottled-water": "Nước uống miễn phí",
    "slippers": "Dép đi trong phòng",
    "wardrobe": "Tủ quần áo",
    "blackout-curtains": "Rèm cản sáng",
    "safe": "Két an toàn",
    "private-bathroom": "Phòng tắm riêng",
    "rain-shower": "Vòi sen",
    "hairdryer": "Máy sấy tóc",
    "towels": "Khăn tắm",
    "toiletries": "Bộ vệ sinh cá nhân",
    "daily-housekeeping": "Dọn phòng hằng ngày",
    "room-service": "Dịch vụ phòng",
    "reception-24h": "Lễ tân 24 giờ",
    "laundry": "Dịch vụ giặt là",
    "luggage-storage": "Giữ hành lý",
    "wake-up-call": "Dịch vụ báo thức",
    "desk": "Bàn làm việc",
    "coffee-machine": "Máy pha cà phê",
    "balcony": "Ban công",
    "sea-view": "Hướng biển",
    "bathrobe": "Áo choàng tắm",
    "living-area": "Khu tiếp khách",
    "sofa-bed": "Sofa bed",
    "bathtub": "Bồn tắm",
    "turndown": "Dịch vụ turndown buổi tối",
    "terrace": "Hiên riêng",
    "garden-view": "Hướng vườn",
    "in-room-breakfast": "Bữa sáng tại phòng",
  },

  rooms: {
    deluxe: {
      summary: "Không gian ấm cúng, đầy đủ tiện nghi cho chuyến công tác hoặc nghỉ ngắn ngày.",
      description:
        "Phòng Deluxe được bài trí với gam màu ấm, giường King êm ái và góc ngồi thư giãn bên cửa sổ. Hợp với cặp đôi hoặc khách đi công tác.",
      bed: "1 giường King",
      view: "Hướng vườn",
      amenities: ["Wi-Fi miễn phí", "Smart TV", "Máy pha cà phê", "Minibar", "Két sắt", "Phòng tắm đứng"],
      gallery: ["Phòng ngủ Deluxe", "Giường King và đèn đọc sách", "Góc ngồi bên cửa sổ", "Phòng tắm đứng vách kính"],
    },
    premier: {
      summary: "Cửa kính lớn nhìn ra biển, góc làm việc riêng và phòng tắm đứng.",
      description:
        "Thức dậy với khung cảnh biển xanh qua ô cửa kính lớn. Phòng Premier rộng rãi hơn, có bàn làm việc và ban công nhỏ để ngắm hoàng hôn.",
      bed: "1 giường King hoặc 2 giường đơn",
      view: "Hướng biển",
      amenities: ["Wi-Fi miễn phí", "Ban công", "Smart TV", "Bàn làm việc", "Minibar", "Áo choàng tắm"],
      gallery: ["Phòng ngủ Premier Ocean View", "Góc sofa và cửa kính lớn", "Cửa kính nhìn ra ngoài", "Ban công nhìn ra biển"],
    },
    "junior-suite": {
      summary: "Khu tiếp khách tách biệt, nội thất cổ điển sang trọng cho kỳ nghỉ dài.",
      description:
        "Junior Suite có khu tiếp khách riêng với sofa êm ái, nội thất cổ điển và không gian rộng rãi, đủ cho gia đình nhỏ hoặc kỳ nghỉ dài ngày.",
      bed: "1 giường King + sofa bed",
      view: "Hướng biển một phần",
      amenities: ["Khu tiếp khách", "Bồn tắm", "Smart TV", "Máy pha cà phê", "Minibar", "Dịch vụ turndown"],
      gallery: ["Junior Suite", "Phòng ngủ có ghế đọc sách", "Khu tiếp khách riêng", "Phòng tắm có bồn tắm"],
    },
    "garden-villa": {
      summary: "Biệt lập giữa vườn nhiệt đới, ban công riêng và bồn tắm thư giãn.",
      description:
        "Biệt thự riêng tư nép mình giữa khu vườn nhiệt đới, với hiên rộng, bồn tắm lớn và không gian đủ cho cả gia đình cùng tận hưởng.",
      bed: "1 giường King + 2 giường đơn",
      view: "Hướng vườn nhiệt đới",
      amenities: ["Hiên riêng", "Bồn tắm lớn", "Phòng khách", "Smart TV", "Máy pha cà phê", "Bữa sáng tại phòng"],
      gallery: ["Phòng ngủ Garden Villa", "Hồ bơi giữa vườn nhiệt đới", "Phòng khách trong villa", "Bồn tắm lớn bên cây xanh"],
    },
  },

  diningPage: {
    metaTitle: "Ẩm thực",
    metaDescription: "Blessed Bistro và Olea Café tại Blessed Hotel Phú Quốc: giờ mở cửa, thực đơn và đặt bàn.",
    heroDescription: "Hai điểm hẹn ăn uống, từ bữa sáng buffet đến ly cà phê chiều bên hồ bơi.",
    title: "Tinh hoa ẩm thực",
    intro: "Hải sản nhập mỗi sáng từ chợ Dương Đông, bánh nướng tại bếp và cà phê rang xay từ Lâm Đồng. Xem thực đơn từng nơi và đặt bàn trước để có chỗ đẹp.",
    cta: {
      title: "Đặt bàn hoặc đặt phòng",
      description: "Gọi điện hoặc nhắn Zalo để đặt bàn, hoặc đặt phòng nhanh qua các nền tảng.",
    },
  },

  /** Nhà hàng, khoá theo slug trong site.ts `dining` (tên riêng, giờ mở cửa, số điện thoại không dịch) */
  dining: {
    "blessed-bistro": {
      kind: "Ẩm thực Á Âu",
      description: "Nhà hàng phục vụ cả ngày: buffet sáng hơn 50 món, trưa và tối gọi món với hải sản Phú Quốc nướng than, phở bò và mì Ý làm tại bếp. Sức chứa 120 khách, có khu ngoài trời nhìn ra vườn.",
    },
    "olea-cafe": {
      kind: "Cà phê & bánh ngọt",
      description: "Quán cà phê cạnh hồ bơi với cà phê phin, cold brew, bánh croissant nướng mỗi sáng và set trà chiều từ 14:00 đến 17:00. Buổi tối có cocktail và mocktail trái cây nhiệt đới.",
    },
  },

  experiencesPage: {
    metaTitle: "Trải nghiệm",
    metaDescription: "Blessed Spa và phòng tập tại Blessed Hotel Phú Quốc: giờ mở cửa, bảng giá liệu trình và đặt lịch.",
    heroTitle: "Chậm lại giữa đảo ngọc",
    heroDescription: "Massage thảo mộc, xông hơi và phòng tập nhìn ra vườn, ngay trong khuôn viên khách sạn.",
    explore: "Khám phá",
    title: "Thư giãn & rèn luyện",
    intro: "Liệu trình 60 đến 120 phút tại Blessed Spa, hoặc một buổi tập sáng trước khi xuống biển. Khách lưu trú dùng phòng tập miễn phí.",
  },

  /** Spa / phòng tập, khoá theo slug trong site.ts `experiences` */
  experiences: {
    spa: {
      kind: "Spa & trị liệu",
      description: "6 phòng trị liệu riêng, trong đó có 2 phòng đôi. Massage đá nóng, massage thảo mộc Việt, chăm sóc da mặt và xông hơi. Vui lòng đặt lịch trước ít nhất 2 giờ.",
    },
    gym: {
      kind: "Phòng tập",
      description: "Máy chạy bộ, xe đạp, máy tập kháng lực và khu tạ tự do, cùng góc yoga có thảm và bóng. Khăn và nước uống miễn phí cho khách lưu trú.",
    },
  },

  /** Nhãn dùng chung cho thẻ nhà hàng / spa / phòng tập (`VenueCard`) */
  venue: {
    everyday: "Hằng ngày",
    openingHours: "Giờ mở cửa",
    phone: "Điện thoại",
    viewMenu: "Xem menu",
    reserveTable: "Đặt bàn",
    reserveSpa: "Đặt chỗ",
    prevPhoto: "Ảnh trước",
    nextPhoto: "Ảnh sau",
    photos: "Ảnh {name}",
    photoAlt: "{name}, ảnh {n}",
    menuAlt: "Thực đơn {name}, trang {n}",
  },

  /** Trang quản trị /admin (đăng bài; bản demo chưa lưu thật) */
  admin: {
    metaTitle: "Quản trị",
    badge: "Quản trị",
    demoNotice: "Bản demo: chưa kết nối máy chủ, mọi thay đổi sẽ không được lưu.",
    nav: {
      posts: "Bài viết",
      newPost: "Viết bài mới",
      viewSite: "Xem website",
      categories: "Chuyên mục",
      logout: "Đăng xuất",
    },
    list: {
      title: "Bài viết",
      count: "{n} bài viết",
      post: "Bài viết",
      category: "Chuyên mục",
      date: "Ngày đăng",
      status: "Trạng thái",
      actions: "Thao tác",
      published: "Đã đăng",
      featured: "Nổi bật",
      edit: "Sửa",
      view: "Xem",
      seo: "SEO",
    },
    login: {
      metaTitle: "Đăng nhập",
      title: "Đăng nhập quản trị",
      subtitle: "Dành cho nhân viên Blessed Hotel.",
      username: "Tên đăng nhập",
      password: "Mật khẩu",
      showPassword: "Hiện mật khẩu",
      hidePassword: "Ẩn mật khẩu",
      submit: "Đăng nhập",
      submitting: "Đang đăng nhập…",
      error: "Tên đăng nhập hoặc mật khẩu không đúng.",
      backToSite: "Về website",
    },
    categories: {
      title: "Chuyên mục",
      count: "{n} chuyên mục",
      description: "Chuyên mục dùng để lọc bài ở trang Tin tức. Tên chuyên mục cần đủ 4 ngôn ngữ.",
      add: "Thêm chuyên mục",
      id: "Mã",
      idHint: "Chữ thường không dấu, số và dấu gạch nối, VD: spa-wellness. Dùng trong dữ liệu, không đổi được sau khi tạo.",
      name: "Tên",
      posts: "Số bài",
      postsCount: "{n} bài",
      actions: "Thao tác",
      edit: "Sửa",
      delete: "Xoá",
      save: "Lưu",
      cancel: "Huỷ",
      confirmDelete: "Xoá chuyên mục “{name}”?",
      confirm: "Xoá",
      inUse: "Chuyên mục “{name}” đang có {n} bài. Hãy chuyển các bài sang chuyên mục khác trước khi xoá.",
      missingNames: "Vui lòng nhập tên chuyên mục đủ 4 ngôn ngữ.",
      invalidId: "Mã chỉ gồm chữ thường a-z, số, dấu gạch nối và không trùng mã đã có.",
      added: "Đã thêm chuyên mục (bản demo, chưa lưu lên máy chủ).",
      updated: "Đã cập nhật chuyên mục (bản demo, chưa lưu lên máy chủ).",
      deleted: "Đã xoá chuyên mục (bản demo, chưa lưu lên máy chủ).",
    },
    editor: {
      newTitle: "Viết bài mới",
      editTitle: "Sửa bài #{id}",
      back: "Tất cả bài viết",
      contentLanguage: "Ngôn ngữ nội dung",
      languageHint: "Bài viết cần đủ 4 ngôn ngữ trước khi đăng.",
      complete: "Đã đủ",
      incomplete: "Còn thiếu",
      title: "Tiêu đề",
      excerpt: "Tóm tắt",
      excerptHint: "1 đến 2 câu, hiện trên thẻ bài và kết quả tìm kiếm.",
      keyPoints: "Thông tin nhanh",
      keyPointsHint: "3 ý chính, hiện trong khung viền gold ở đầu bài.",
      keyPoint: "Ý {n}",
      body: "Nội dung",
      bodyHint: "Soạn bằng Markdown: ## tiêu đề mục, **đậm**, *nghiêng*, - danh sách, > trích dẫn, [chữ](link), ![mô tả](link ảnh). Đoạn văn cách nhau một dòng trống.",
      write: "Soạn thảo",
      previewTab: "Xem trước",
      emptyPreview: "Chưa có nội dung.",
      toolbar: {
        label: "Định dạng",
        heading: "Tiêu đề mục",
        bold: "In đậm",
        italic: "In nghiêng",
        list: "Danh sách",
        quote: "Trích dẫn",
        link: "Chèn link",
        image: "Chèn ảnh từ link",
        upload: "Tải ảnh lên",
        text: "chữ",
        linkText: "chữ hiển thị",
        imageAlt: "mô tả ảnh",
      },
      settings: "Thiết lập",
      category: "Chuyên mục",
      date: "Ngày đăng",
      featured: "Hiện ở khối Tin nổi bật",
      cover: "Ảnh bìa",
      coverUrl: "Đường dẫn ảnh",
      coverUpload: "Chọn ảnh từ máy",
      noCover: "Chưa có ảnh bìa",
      preview: "Xem trước",
      untitled: "Chưa có tiêu đề",
      saveDraft: "Lưu nháp",
      publish: "Đăng bài",
      update: "Cập nhật",
      draftSaved: "Đã lưu nháp (bản demo, chưa lưu lên máy chủ).",
      published: "Bài viết hợp lệ, sẵn sàng đăng. Đây là bản demo nên bài chưa được lưu.",
      missingLanguages: "Còn thiếu tiêu đề hoặc tóm tắt ở: {langs}.",
      missingSettings: "Vui lòng chọn ngày đăng và ảnh bìa.",
      listSeparator: ", ",
    },
    /** Khung chấm điểm SEO trong trình soạn bài (lib/seo.ts) */
    seo: {
      title: "SEO",
      score: "Điểm SEO",
      tabScore: "Điểm SEO {score}/100",
      ratingGood: "Tốt",
      ratingWarn: "Tạm được",
      ratingBad: "Cần cải thiện",
      keyword: "Từ khoá chính",
      keywordHint: "Cụm từ khách hay gõ khi tìm, VD: brunch phú quốc.",
      problems: "Cần sửa",
      improvements: "Nên cải thiện",
      passed: "Đạt",
      snippet: "Hiển thị trên Google",
      snippetHint: "Để trống thì dùng tiêu đề và tóm tắt của bài.",
      seoTitle: "Tiêu đề SEO",
      metaDescription: "Mô tả meta",
      desktop: "Máy tính",
      mobile: "Điện thoại",
      width: "Độ dài hiển thị",
      goTo: "Đi tới chỗ cần sửa",
      tips: "Gợi ý thêm",
      sourceGoogle: "Google",
      sourceGoogleTitle: "Mở khuyến nghị chính thức của Google cho mục này",
      sourceConvention: "Thông lệ",
      sourceConventionTitle: "Thông lệ của Yoast / Rank Math, Google không quy định. Chỉ là gợi ý, không trừ điểm.",
      disclaimer: "Chỉ các mục có nhãn Google được tính điểm, bấm nhãn để xem tài liệu chính thức. Mục \"Thông lệ\" theo Yoast / Rank Math, chỉ là gợi ý. Các ngưỡng số đều là tham khảo vì Google không giới hạn độ dài. Đây không phải điểm xếp hạng của Google.",
      messages: {
        keywordMissing: "Nhập từ khoá chính để chấm các mục liên quan đến từ khoá.",
        titleShort: "Tiêu đề SEO hơi ngắn ({n}/{max}), có thể thêm chi tiết cụ thể.",
        titleLong: "Tiêu đề SEO quá dài ({n}/{max}), Google sẽ cắt bớt.",
        titleGood: "Độ dài tiêu đề SEO vừa đẹp ({n}/{max}).",
        titleKeywordMissing: "Tiêu đề SEO chưa có từ khoá chính.",
        titleKeywordLate: "Nên đưa từ khoá chính lên gần đầu tiêu đề SEO.",
        titleKeywordGood: "Tiêu đề SEO có từ khoá chính ở gần đầu.",
        metaMissing: "Chưa có mô tả meta và phần tóm tắt cũng đang trống.",
        metaShort: "Mô tả meta hơi ngắn ({n}, nên {min} đến {max}).",
        metaLong: "Mô tả meta quá dài ({n}/{max}), Google sẽ cắt bớt.",
        metaGood: "Độ dài mô tả meta vừa đẹp ({n}).",
        metaKeywordMissing: "Mô tả meta chưa có từ khoá chính.",
        metaKeywordGood: "Mô tả meta có từ khoá chính.",
        introKeywordMissing: "Đoạn mở đầu của nội dung chưa nhắc tới từ khoá chính.",
        introKeywordGood: "Từ khoá chính có ngay ở đoạn mở đầu.",
        lengthBad: "Nội dung quá ngắn ({n} từ), nên có ít nhất {min} từ.",
        lengthWarn: "Nội dung hơi ngắn ({n} từ), nên có ít nhất {min} từ.",
        lengthGood: "Độ dài nội dung tốt ({n} từ).",
        densityNone: "Từ khoá chính chưa xuất hiện trong nội dung.",
        densityLow: "Từ khoá xuất hiện {n} lần ({pct}%), hơi ít. Nên khoảng 0,5 đến 2,5%.",
        densityHigh: "Từ khoá xuất hiện {n} lần ({pct}%), quá dày, dễ bị coi là nhồi từ khoá.",
        densityGood: "Mật độ từ khoá hợp lý: {n} lần ({pct}%).",
        headingsFew: "Nên chia nội dung thành ít nhất 2 mục có tiêu đề (##).",
        headingsGood: "Nội dung có {n} tiêu đề mục.",
        headingKeywordMissing: "Chưa có tiêu đề mục nào chứa từ khoá chính.",
        headingKeywordGood: "Có tiêu đề mục chứa từ khoá chính.",
        coverMissing: "Chưa có ảnh bìa (ảnh hiện khi chia sẻ link và trên kết quả tìm kiếm).",
        coverGood: "Đã có ảnh bìa.",
        imagesNone: "Nên thêm ít nhất 1 ảnh minh hoạ vào nội dung.",
        imagesAltMissing: "{n} ảnh trong nội dung chưa có mô tả (alt).",
        imagesGood: "Mọi ảnh trong nội dung đều có mô tả.",
        linksNone: "Chưa có link tới trang khác của website (phòng, ẩm thực, bài viết khác).",
        linksGood: "Có {n} link tới trang khác của website.",
        paragraphsLong: "{n} đoạn văn quá dài, nên tách nhỏ cho dễ đọc trên điện thoại.",
        paragraphsGood: "Các đoạn văn có độ dài dễ đọc.",
        keywordDuplicate: "Từ khoá này đã dùng cho bài “{title}”, hai bài sẽ tranh hạng với nhau.",
        keywordUnique: "Từ khoá chính chưa trùng với bài nào khác.",
      },
    },
  },

  newsPage: {
    metaTitle: "Tin tức",
    metaDescription: "Ưu đãi, sự kiện và cẩm nang du lịch Phú Quốc từ Blessed Hotel.",
    heroDescription: "Ưu đãi, sự kiện và cẩm nang du lịch Phú Quốc.",
    featured: "Tin nổi bật",
    latest: "Tin mới nhất",
    categories: "Chuyên mục",
    allCategories: "Tất cả",
    search: "Tìm kiếm",
    searchPlaceholder: "Tìm theo từ khoá",
    noResults: "Không có bài viết phù hợp.",
    roomsTitle: "Hạng phòng",
    ctaTitle: "Đặt phòng trực tiếp",
    ctaBody: "Gọi hoặc nhắn Zalo để nhận giá tốt nhất.",
  },

  /** Nhãn chuyên mục tin tức, khoá theo id trong site.ts `newsCategories` */
  newsCategories: {
    offer: "Ưu đãi",
    dining: "Ẩm thực",
    event: "Sự kiện",
    guide: "Cẩm nang",
    wellness: "Sức khỏe",
  },

  article: {
    tableOfContents: "Mục lục",
    keyPoints: "Thông tin nhanh",
    forYou: "Bài viết dành cho bạn",
    publishedOn: "Ngày đăng",
    readingTime: "Thời gian đọc",
    minutes: "{n} phút",
    allNews: "Tất cả tin tức",
    moreArticles: "Bài viết khác",
    ctaTitle: "Muốn đặt phòng hoặc hỏi thêm?",
    ctaBody: "Gọi, nhắn Zalo hoặc đặt nhanh qua các nền tảng.",
  },

  /** Bài viết, khoá theo slug (slug giữ nguyên cho mọi ngôn ngữ) */
  news: {
    "spa-mua-thu": {
      title: "Gói spa mùa thu: thư giãn trọn vẹn với giá đặc biệt",
      /** Từ khoá chính (SEO) */
      focusKeyword: "spa phú quốc",
      excerpt: "Tận hưởng liệu trình 90 phút cùng trà thảo mộc, áp dụng đến hết tháng 11.",
      keyPoints: ["Liệu trình 90 phút: ngâm chân, massage 60 phút, đắp mặt nạ", "Mời trà gừng mật ong và trái cây theo mùa", "Áp dụng 10:00 – 20:00 mỗi ngày đến hết tháng 11"],
      body: [
        {
          paragraphs: [
            "Mùa thu ở Phú Quốc là lúc nắng dịu và biển lặng hơn. Đây cũng là thời điểm Blessed Spa ra mắt gói thư giãn 90 phút dành riêng cho khách lưu trú và khách ghé thăm.",
          ],
        },
        {
          heading: "Gói spa gồm những gì",
          paragraphs: [
            "Liệu trình bắt đầu bằng ngâm chân thảo mộc, tiếp theo là 60 phút massage toàn thân với tinh dầu sả chanh và kết thúc bằng đắp mặt nạ dưỡng ẩm.",
            "Sau liệu trình, bạn được mời trà gừng mật ong và một đĩa trái cây theo mùa tại phòng thư giãn.",
          ],
        },
        {
          heading: "Thời gian áp dụng",
          paragraphs: [
            "Ưu đãi áp dụng mỗi ngày từ 10:00 đến 20:00, đến hết tháng 11. Vui lòng đặt lịch trước tại quầy lễ tân hoặc qua Zalo để chọn được khung giờ mong muốn.",
          ],
        },
      ],
    },
    "brunch-cuoi-tuan": {
      title: "Ra mắt Sunday Brunch tại Blessed Bistro",
      /** Từ khoá chính (SEO) */
      focusKeyword: "brunch phú quốc",
      excerpt: "Hơn 60 món Á Âu, khu vui chơi cho trẻ em và nhạc sống mỗi Chủ nhật.",
      keyPoints: ["Mỗi Chủ nhật, 11:00 – 14:30 tại Blessed Bistro", "Hơn 60 món, quầy hải sản tươi Phú Quốc", "Trẻ em dưới 6 tuổi được miễn phí"],
      body: [
        { paragraphs: ["Từ Chủ nhật này, Blessed Bistro mở Sunday Brunch với hơn 60 món Á Âu, phục vụ từ 11:00 đến 14:30."] },
        {
          heading: "Thực đơn",
          paragraphs: [
            "Quầy hải sản tươi có hàu, tôm và ghẹ Phú Quốc. Bên cạnh là góc món nướng, mì làm tại chỗ, bánh ngọt và quầy cà phê phin.",
            "Mỗi tuần, bếp trưởng chọn thêm hai món đặc biệt theo nguyên liệu trong mùa.",
          ],
        },
        {
          heading: "Cho cả gia đình",
          paragraphs: [
            "Khu vui chơi trẻ em có người trông, cùng nhạc acoustic nhẹ suốt buổi. Trẻ em dưới 6 tuổi được miễn phí khi đi cùng người lớn.",
          ],
        },
      ],
    },
    "hoang-hon-ho-boi": {
      title: "Pool Party hoàng hôn cuối tháng",
      /** Từ khoá chính (SEO) */
      focusKeyword: "pool party phú quốc",
      excerpt: "DJ, cocktail và BBQ bên hồ bơi vô cực vào tối thứ Bảy cuối cùng mỗi tháng.",
      keyPoints: ["Tối thứ Bảy cuối cùng mỗi tháng", "Cocktail từ 17:00, tiệc nướng từ 18:30, DJ đến 22:00", "Khách lưu trú vào cửa miễn phí"],
      body: [
        {
          paragraphs: [
            "Vào tối thứ Bảy cuối cùng mỗi tháng, hồ bơi vô cực của Blessed Hotel trở thành nơi đón hoàng hôn với DJ, cocktail và tiệc nướng ngoài trời.",
          ],
        },
        {
          heading: "Chương trình",
          paragraphs: [
            "Từ 17:00, quầy bar bên hồ phục vụ cocktail đặc trưng của Olea Café. Tiệc nướng bắt đầu lúc 18:30 với hải sản và thịt nướng than hoa.",
            "DJ chơi nhạc đến 22:00. Khách lưu trú được vào cửa miễn phí, khách bên ngoài vui lòng đặt chỗ trước.",
          ],
        },
      ],
    },
    "kinh-nghiem-du-lich-phu-quoc": {
      title: "Kinh nghiệm du lịch Phú Quốc 4 ngày 3 đêm",
      /** Từ khoá chính (SEO) */
      focusKeyword: "kinh nghiệm du lịch phú quốc",
      excerpt: "Lịch trình gợi ý, món ngon nên thử và những điểm ngắm hoàng hôn đẹp nhất đảo.",
      keyPoints: ["Ngày 1–2: Thị trấn Hoàng Hôn, chợ đêm, tour 4 đảo", "Ngày 3–4: bắc đảo, vườn tiêu, mua quà", "Concierge đặt xe, tour, nhà hàng nếu nhắn trước một ngày"],
      body: [
        {
          paragraphs: [
            "Bốn ngày là vừa đủ để vừa nghỉ ngơi vừa khám phá Phú Quốc mà không bị vội. Dưới đây là lịch trình đội ngũ concierge của chúng tôi hay gợi ý cho khách lần đầu đến đảo.",
          ],
        },
        {
          heading: "Ngày 1 và 2: Nam đảo",
          paragraphs: [
            "Ngày đầu, nhận phòng và đi bộ ra biển ngắm hoàng hôn ở khu Thị trấn Hoàng Hôn. Buổi tối ghé chợ đêm để thử hải sản nướng.",
            "Ngày thứ hai, đi tour 4 đảo bằng ca nô, lặn ngắm san hô và ăn trưa trên đảo. Chiều về nghỉ ở hồ bơi khách sạn.",
          ],
        },
        {
          heading: "Ngày 3 và 4: Bắc đảo và mua sắm",
          paragraphs: [
            "Ngày thứ ba, đi về phía bắc đảo để tắm biển và ghé một vườn tiêu. Ngày cuối, mua nước mắm, tiêu và ngọc trai làm quà trước khi ra sân bay.",
            "Concierge có thể đặt xe, tour và nhà hàng giúp bạn. Chỉ cần nhắn trước một ngày.",
          ],
        },
      ],
    },
    "uu-dai-luu-tru-dai-ngay": {
      title: "Ở càng lâu, ưu đãi càng lớn",
      /** Từ khoá chính (SEO) */
      focusKeyword: "ưu đãi lưu trú dài ngày",
      excerpt: "Giảm đến 25% cho kỳ nghỉ từ 5 đêm trở lên khi liên hệ đặt phòng trực tiếp.",
      keyPoints: ["Giảm 15% từ 5 đêm, 25% từ 7 đêm", "Bao gồm bữa sáng và giặt ủi hằng ngày", "Chỉ áp dụng khi đặt trực tiếp qua hotline hoặc Zalo"],
      body: [
        {
          paragraphs: [
            "Nếu bạn có kế hoạch ở Phú Quốc từ 5 đêm trở lên, hãy liên hệ đặt phòng trực tiếp với khách sạn để nhận mức giá tốt hơn.",
          ],
        },
        {
          heading: "Ưu đãi",
          paragraphs: [
            "Giảm 15% cho kỳ nghỉ từ 5 đêm và 25% cho kỳ nghỉ từ 7 đêm. Ưu đãi đã bao gồm bữa sáng hằng ngày và giặt ủi hai bộ quần áo mỗi ngày.",
            "Khách lưu trú dài ngày được nhận phòng sớm và trả phòng muộn nếu còn phòng.",
          ],
        },
        {
          heading: "Cách đặt",
          paragraphs: [
            "Gọi hotline hoặc nhắn Zalo cho chúng tôi, kèm ngày đến, ngày đi và số khách. Ưu đãi không áp dụng khi đặt qua các nền tảng đặt phòng trực tuyến.",
          ],
        },
      ],
    },
    "yoga-san-thuong": {
      title: "Yoga bình minh trên sân thượng",
      /** Từ khoá chính (SEO) */
      focusKeyword: "yoga phú quốc",
      excerpt: "Lớp yoga miễn phí cho khách lưu trú lúc 6:00 sáng mỗi ngày, đón nắng sớm trên đảo.",
      keyPoints: ["6:00 sáng mỗi ngày trên sân thượng", "Lớp 45 phút, phù hợp người mới bắt đầu", "Miễn phí cho khách lưu trú, có sẵn thảm và nước"],
      body: [
        {
          paragraphs: [
            "Mỗi sáng lúc 6:00, sân thượng của Blessed Hotel có một lớp yoga nhẹ nhàng kéo dài 45 phút, miễn phí cho khách lưu trú.",
          ],
        },
        {
          heading: "Lớp học",
          paragraphs: [
            "Lớp phù hợp cả người mới bắt đầu, tập trung vào hít thở và giãn cơ. Thảm, khăn và nước được chuẩn bị sẵn.",
            "Sau buổi tập, bạn có thể xuống Blessed Bistro ăn sáng hoặc ra hồ bơi khi nắng còn dịu.",
          ],
        },
      ],
    },
  },
};

/** Cấu trúc bắt buộc cho mọi ngôn ngữ (en/ko/zh phải có đủ các key này) */
export type Dictionary = Omit<typeof vi, "news"> & {
  news: Record<keyof typeof vi.news, NewsText>;
};

export type NewsText = {
  title: string;
  /** Từ khoá chính (SEO), dùng cho bộ chấm SEO ở trang quản trị */
  focusKeyword: string;
  excerpt: string;
  /** 3 ý chính hiện trong khung "Thông tin nhanh" */
  keyPoints: string[];
  body: { heading?: string; paragraphs: string[] }[];
};
