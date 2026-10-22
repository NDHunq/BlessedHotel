import type { Dictionary } from "./vi";

/** 한국어. Cấu trúc phải khớp vi.ts (kiểu `Dictionary`). */
export const ko: Dictionary = {
  meta: {
    tagline: "푸꾸옥 섬의 평화로운 휴식처",
    description: "블레스드 호텔 푸꾸옥: 인피니티 풀, 루프톱 바, 해산물 레스토랑을 갖춘 120객실 호텔입니다.",
    place: "푸꾸옥",
    address: "베트남 안장성 푸꾸옥, 베니스 거리, 선 빌리지 - 프리마베라",
  },

  nav: {
    about: "호텔 소개",
    rooms: "객실",
    dining: "다이닝",
    services: "서비스",
    news: "소식",
  },

  ui: {
    mainMenu: "주 메뉴",
    mobileMenu: "모바일 메뉴",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    homeAria: "블레스드 호텔, 홈",
    home: "홈",
    breadcrumb: "경로",
    language: "언어",
    hotline: "핫라인",
    bookNow: "예약하기",
    bookNowLong: "지금 예약하기",
    contactToBook: "예약 문의",
    explore: "자세히 보기",
    viewAll: "전체 보기",
    readMore: "더 읽기",
    viewDetails: "자세히 보기",
    callPhone: "{phone} 전화하기",
    previous: "이전",
    next: "다음",
    slideLabel: "사진 {n}: {title}",
    viewPhotos: "사진 보기",
    viewPhotosOf: "{name} 객실 사진 보기",
    from: "최저",
    fromLong: "최저",
    perNight: "/ 1박",
    guests: "최대 {n}명",
  },

  lightbox: {
    Previous: "이전 사진",
    Next: "다음 사진",
    Close: "닫기",
    Slide: "사진",
    Carousel: "사진 슬라이드",
    Lightbox: "사진 뷰어",
    "Photo gallery": "사진 갤러리",
    "{index} of {total}": "{index} / {total}",
    "Zoom in": "확대",
    "Zoom out": "축소",
    "Show thumbnails": "미리보기 표시",
    "Hide thumbnails": "미리보기 숨기기",
    "Show captions": "설명 표시",
    "Hide captions": "설명 숨기기",
  },

  booking: {
    panelLabel: "예약 채널",
    via: "예약 방법",
    channels: {
      phone: { label: "전화 예약", note: "" },
      zalo: { label: "Zalo", note: "메시지로 상담하기" },
      traveloka: { label: "Traveloka", note: "Traveloka에서 예약" },
      agoda: { label: "Agoda", note: "Agoda에서 예약" },
      klook: { label: "Klook", note: "Klook에서 예약" },
    },
    cta: {
      title: "푸꾸옥 여행을 준비하셨나요?",
      description: "전화나 Zalo 메시지로 최저가를 안내받거나, 익숙한 예약 플랫폼에서 간편하게 예약하세요.",
    },
  },

  footer: {
    social: "소셜 미디어",
    contact: "연락처",
    hotlineZalo: "핫라인 / Zalo",
    email: "이메일",
    address: "주소",
    explore: "둘러보기",
    booking: "예약",
    location: "위치",
    mapTitle: "블레스드 호텔 푸꾸옥 지도",
    copyright: "© Blessed Hotel Phu Quoc. All rights reserved.",
    license: "숙박업 영업 허가 정보: 업데이트 예정입니다.",
  },

  notFound: {
    title: "요청하신 페이지를 찾을 수 없습니다.",
    back: "홈으로 돌아가기",
  },

  home: {
    heroSlides: {
      welcome: { kicker: "환영합니다", title: "Blessed Hotel", subtitle: "푸꾸옥 섬에서" },
      pool: { kicker: "하루 종일 여유롭게", title: "인피니티 풀", subtitle: "운영 시간 6:00 – 22:00" },
      sunset: { kicker: "루프톱 바", title: "스카이 테라스의 노을", subtitle: "매일 저녁 시그니처 칵테일" },
      rooms: { kicker: "객실 & 빌라 120개", title: "섬에서의 편안한 잠", subtitle: "디럭스부터 가든 빌라까지" },
    },
    exploreTitle: "블레스드 호텔 둘러보기",
    explore: {
      rooms: {
        label: "객실",
        title: "28 m²부터 60 m²까지, 4가지 객실",
        description: "노을이 보이는 발코니가 딸린 오션뷰 객실과 가족을 위한 정원 속 프라이빗 빌라.",
      },
      dining: {
        label: "다이닝",
        title: "사프론에서 맛보는 푸꾸옥 해산물",
        description: "매일 아침 즈엉동 시장에서 들여온 생선, 게, 성게를 베트남 전국의 레시피로 요리합니다.",
      },
      spa: {
        label: "스파 & 수영장",
        title: "느긋한 오후",
        description: "90분 핫스톤 마사지 후 인피니티 풀에서 마지막 햇살을 즐겨 보세요.",
      },
      story: {
        label: "우리 이야기",
        title: "섬 한가운데, 집에 돌아온 듯한 편안함",
        description: "우리가 푸꾸옥을 선택한 이유와 매일 아침 프런트에서 손님을 맞이하는 사람들.",
      },
      news: {
        label: "소식",
        title: "더 하스의 선데이 브런치",
        description: "60가지가 넘는 아시아·서양 요리, 키즈 플레이 공간, 매주 일요일 라이브 음악.",
      },
    },
    roomsTitle: "객실",
    roomTabsLabel: "객실 유형",
    roomTabs: { all: "전체", room: "룸", suite: "스위트", villa: "빌라" },
    promo: {
      title: "호텔에 직접 예약하고 최저가를 받으세요.",
      body: "객실 사정에 따라 얼리 체크인, 레이트 체크아웃, 무료 업그레이드를 제공합니다.",
      cta: "예약 문의",
    },
    brand: {
      wordmark: ["Blessed", "Hotel", "Phu Quoc"],
      tagline: ["푹 자고.", "잘 먹고.", "섬에서 천천히."],
    },
    highlights: {
      "the-hearth": "올데이 다이닝",
      saffron: "베트남 요리",
      "sky-terrace": "루프톱 바",
      spa: "스파 & 웰니스",
    },
    newsTitle: "소식 & 프로모션",
  },

  about: {
    metaTitle: "호텔 소개",
    metaDescription: "블레스드 호텔 푸꾸옥의 이야기와 철학.",
    heroTagline: "섬 위의 평화로운 휴식처",
    wordmarkSub: "Hotel · Phu Quoc",
    philosophy: {
      lead: ["여행은 단순한 목적지가 아닙니다.", "머무는 곳은 단순한 잠자리가 아닙니다.", "그래서 우리는 블레스드 호텔을", "바닷가의 집처럼 지었습니다."],
      title: [
        { highlight: "온전한", rest: " 휴식." },
        { highlight: "바닷가의", rest: " 평온." },
      ],
      body: "기억에 남는 여행은 소소한 것에서 시작됩니다. 깊은 잠, 따뜻한 아침 식사, 프런트의 미소, 그리고 나만의 방식으로 섬을 즐길 수 있도록 건네는 적절한 추천 한마디.",
    },
    stats: { rooms: "객실 & 빌라", dining: "레스토랑 & 바", reception: "프런트 & 고객 지원" },
    pillars: {
      rooms: { title: "밝은 객실", description: "구석구석 세심한 손길에서 시작됩니다." },
      food: { title: "따뜻한 식사", description: "그날 들어온 해산물과 집밥 레시피로 만듭니다." },
      leisure: { title: "여유로운 순간", description: "수영장, 스파, 그리고 파도 소리 속에서." },
      people: { title: "정성 어린 사람들", description: "이름과 좋아하는 메뉴를 기억하는 팀." },
    },
    closing: {
      lead: ["단순히 잠만 자는 곳이 아닙니다.", "우리가 되고 싶은 것은:"],
      titleLight: "당신의 집, ",
      titleBold: "푸꾸옥",
      body: ["섬 남쪽 해변의 작은 호텔,", "이름으로 손님을 맞이하고,", "다음 시즌에도 다시 오고 싶은 곳."],
    },
  },

  roomsPage: {
    metaTitle: "객실",
    metaDescription: "블레스드 호텔 푸꾸옥의 디럭스, 프리미어 오션뷰, 주니어 스위트, 가든 빌라.",
    heroDescription: "아늑한 디럭스부터 프라이빗한 가든 빌라까지, 여행에 맞는 공간을 선택하세요.",
    size: "면적",
    capacity: "수용 인원",
    bed: "침대",
    bookThisRoom: "이 객실 예약하기",
  },

  rooms: {
    deluxe: {
      summary: "출장이나 짧은 휴가에 알맞은 아늑하고 편리한 객실.",
      description: "따뜻한 색감의 디럭스 객실에는 편안한 킹 침대와 창가 휴식 공간이 있습니다. 커플이나 출장객에게 추천합니다.",
      bed: "킹 침대 1개",
      view: "가든 뷰",
      amenities: ["무료 Wi-Fi", "스마트 TV", "커피 머신", "미니바", "객실 금고", "워크인 샤워"],
      gallery: ["디럭스 침실", "킹 침대와 독서등", "창가 휴식 공간", "유리 워크인 샤워"],
    },
    premier: {
      summary: "바다가 보이는 큰 창, 업무 공간과 워크인 샤워를 갖춘 객실.",
      description:
        "큰 통유리창 너머 푸른 바다를 보며 하루를 시작하세요. 프리미어 객실은 더 넓고, 업무용 책상과 노을을 감상할 수 있는 작은 발코니가 있습니다.",
      bed: "킹 침대 1개 또는 싱글 침대 2개",
      view: "오션 뷰",
      amenities: ["무료 Wi-Fi", "발코니", "스마트 TV", "업무용 책상", "미니바", "목욕 가운"],
      gallery: ["프리미어 오션뷰 침실", "소파 공간과 큰 창", "통유리창", "바다가 보이는 발코니"],
    },
    "junior-suite": {
      summary: "독립된 거실과 클래식한 인테리어로 장기 투숙에 알맞은 스위트.",
      description: "주니어 스위트에는 편안한 소파가 있는 별도 거실, 클래식한 가구, 소가족이나 장기 투숙에 충분한 넓은 공간이 있습니다.",
      bed: "킹 침대 1개 + 소파 베드",
      view: "부분 오션 뷰",
      amenities: ["거실 공간", "욕조", "스마트 TV", "커피 머신", "미니바", "턴다운 서비스"],
      gallery: ["주니어 스위트", "독서 의자가 있는 침실", "독립된 거실", "욕조가 있는 욕실"],
    },
    "garden-villa": {
      summary: "열대 정원 속 프라이빗 빌라, 전용 테라스와 휴식용 욕조.",
      description: "열대 정원에 자리한 프라이빗 빌라로, 넓은 테라스와 큰 욕조, 온 가족이 함께 즐길 수 있는 공간을 갖추었습니다.",
      bed: "킹 침대 1개 + 싱글 침대 2개",
      view: "열대 정원 뷰",
      amenities: ["전용 테라스", "대형 욕조", "거실", "스마트 TV", "커피 머신", "빌라 내 조식"],
      gallery: ["가든 빌라 침실", "열대 정원 속 수영장", "빌라 거실", "초록으로 둘러싸인 대형 욕조"],
    },
  },

  diningPage: {
    metaTitle: "다이닝",
    metaDescription: "블레스드 호텔 푸꾸옥의 올데이 다이닝, 베트남 요리, 루프톱 바.",
    heroDescription: "여유로운 아침 식사부터 노을 속 칵테일까지, 세 곳의 다이닝 공간.",
    openingHours: "운영 시간",
    cta: {
      title: "테이블 또는 객실 예약",
      description: "전화나 Zalo 메시지로 테이블을 예약하거나, 제휴 플랫폼에서 객실을 빠르게 예약하세요.",
    },
  },

  dining: {
    "the-hearth": {
      kind: "올데이 레스토랑",
      description: "풍성한 조식 뷔페와 하루 종일 즐기는 아시아·서양 메뉴, 현지 농장과 푸꾸옥 바다의 신선한 재료를 사용합니다.",
      highlights: ["50가지 이상의 조식 뷔페", "반미 & 커피 코너", "어린이 메뉴"],
    },
    saffron: {
      kind: "베트남 파인 다이닝",
      description: "베트남 세 지역의 전통 요리와 섬의 해산물을 세련되게 담아내고, 엄선한 와인과 함께 즐깁니다.",
      highlights: ["매일 들어오는 신선한 해산물", "7코스 테이스팅 메뉴", "엄선한 와인"],
    },
    "sky-terrace": {
      kind: "루프톱 바",
      description: "시그니처 칵테일, 편안한 음악, 그리고 매일 저녁 바다 위로 지는 노을.",
      highlights: ["시그니처 칵테일", "해피 아워 17:00 – 19:00", "주말 DJ"],
    },
  },

  servicesPage: {
    metaTitle: "서비스",
    metaDescription: "블레스드 호텔 푸꾸옥의 스파, 수영장, 공항 픽업, 회의 시설, 컨시어지.",
    heroDescription: "공항에 도착하는 순간부터 섬을 떠날 때까지, 모든 것을 맡겨 주세요.",
  },

  services: {
    spa: {
      title: "스파 & 마사지",
      description: "몸과 마음을 풀어 주는 허브·아로마 오일 트리트먼트.",
      details: "프라이빗 트리트먼트 룸, 핫스톤 마사지, 페이셜 케어, 커플 스파 패키지. 프런트에서 예약하세요.",
    },
    pool: {
      title: "인피니티 풀",
      description: "이른 아침부터 늦은 저녁까지 운영하는 야외 수영장.",
      details: "선베드, 무료 타월, 가벼운 음료를 제공하는 풀사이드 바가 있는 오션뷰 수영장.",
    },
    shuttle: {
      title: "공항 픽업",
      description: "미리 예약하는 전용 차량 픽업·샌딩 서비스.",
      details: "푸꾸옥 공항 왕복 4–16인승 차량. 최소 24시간 전에 항공편 번호를 알려 주세요.",
    },
    meeting: {
      title: "회의 & 이벤트",
      description: "10–300명을 위한 다양한 회의실.",
      details: "최신 프레젠테이션 장비, 유연한 연회 메뉴, 전문 이벤트 지원팀.",
    },
    gym: {
      title: "24시간 피트니스",
      description: "최신 장비, 밤낮없이 운영.",
      details: "러닝머신, 실내 자전거, 프리 웨이트, 요가 공간. 요청 시 퍼스널 트레이너 이용 가능.",
    },
    concierge: {
      title: "컨시어지",
      description: "일정 추천, 투어 및 관광지 티켓 예약.",
      details: "4개 섬 투어, 혼텀 케이블카, 빈원더스, 오토바이 렌털, 현지 맛집 추천.",
    },
  },

  newsPage: {
    metaTitle: "소식",
    metaDescription: "블레스드 호텔의 프로모션, 이벤트, 푸꾸옥 여행 가이드.",
    heroDescription: "프로모션, 이벤트, 푸꾸옥 여행 가이드.",
  },

  article: {
    postedBy: "작성",
    publishedOn: "게시일",
    readingTime: "읽는 시간",
    minutes: "{n}분",
    inThisPost: "목차",
    allNews: "전체 소식",
    moreArticles: "다른 글",
    ctaTitle: "예약하거나 문의하고 싶으신가요?",
    ctaBody: "전화, Zalo 메시지, 또는 제휴 플랫폼에서 간편하게 예약하세요.",
  },

  news: {
    "spa-mua-thu": {
      category: "프로모션",
      title: "가을 스파 패키지: 특별한 가격으로 완벽한 휴식",
      excerpt: "허브티와 함께하는 90분 트리트먼트, 11월 말까지 진행됩니다.",
      body: [
        {
          paragraphs: ["푸꾸옥의 가을은 햇살이 부드럽고 바다가 잔잔해지는 계절입니다. 이 시기에 맞춰 블레스드 스파가 투숙객과 방문객을 위한 90분 릴랙스 패키지를 선보입니다."],
        },
        {
          heading: "패키지 구성",
          paragraphs: [
            "허브 족욕으로 시작해 레몬그라스 오일을 사용한 60분 전신 마사지, 보습 마스크로 마무리합니다.",
            "트리트먼트 후에는 휴식 라운지에서 생강 꿀차와 제철 과일을 즐기실 수 있습니다.",
          ],
        },
        {
          heading: "운영 기간",
          paragraphs: ["11월 말까지 매일 10:00부터 20:00까지 진행됩니다. 원하는 시간을 예약하시려면 프런트 또는 Zalo로 미리 문의해 주세요."],
        },
      ],
    },
    "brunch-cuoi-tuan": {
      category: "다이닝",
      title: "더 하스 선데이 브런치 오픈",
      excerpt: "60가지가 넘는 아시아·서양 요리, 키즈 플레이 공간, 매주 일요일 라이브 음악.",
      body: [
        { paragraphs: ["이번 일요일부터 더 하스에서 60가지가 넘는 아시아·서양 요리로 구성된 선데이 브런치를 11:00부터 14:30까지 운영합니다."] },
        {
          heading: "메뉴",
          paragraphs: [
            "신선한 해산물 코너에는 푸꾸옥산 굴, 새우, 게가 준비됩니다. 그 옆에는 그릴 스테이션, 즉석 면 요리, 디저트, 베트남 핀 커피 바가 있습니다.",
            "매주 헤드 셰프가 제철 재료로 두 가지 스페셜 메뉴를 추가합니다.",
          ],
        },
        {
          heading: "온 가족을 위해",
          paragraphs: ["보호자가 상주하는 키즈 플레이 공간과 잔잔한 어쿠스틱 음악이 함께합니다. 성인과 동반한 6세 미만 어린이는 무료입니다."],
        },
      ],
    },
    "hoang-hon-ho-boi": {
      category: "이벤트",
      title: "월말 선셋 풀 파티",
      excerpt: "매월 마지막 토요일 저녁, 인피니티 풀에서 DJ, 칵테일, 바비큐를 즐기세요.",
      body: [
        {
          paragraphs: ["매월 마지막 토요일 저녁, 블레스드 호텔의 인피니티 풀이 DJ, 칵테일, 야외 바비큐와 함께하는 노을 명소로 변신합니다."],
        },
        {
          heading: "프로그램",
          paragraphs: [
            "17:00부터 풀사이드 바에서 스카이 테라스의 시그니처 칵테일을 제공합니다. 바비큐는 18:30에 시작하며 해산물과 숯불구이가 준비됩니다.",
            "DJ 공연은 22:00까지 이어집니다. 투숙객은 무료 입장이며, 외부 방문객은 사전 예약을 부탁드립니다.",
          ],
        },
      ],
    },
    "kinh-nghiem-du-lich-phu-quoc": {
      category: "여행 가이드",
      title: "푸꾸옥 3박 4일 여행 가이드",
      excerpt: "추천 일정, 꼭 먹어 봐야 할 음식, 섬에서 가장 아름다운 노을 명소.",
      body: [
        {
          paragraphs: ["4일이면 서두르지 않고 쉬면서 푸꾸옥을 둘러보기에 충분합니다. 처음 섬을 찾는 손님께 저희 컨시어지 팀이 자주 추천하는 일정을 소개합니다."],
        },
        {
          heading: "1–2일차: 섬 남부",
          paragraphs: [
            "첫날은 체크인 후 선셋 타운 해변까지 걸어가 노을을 감상하세요. 저녁에는 야시장에서 해산물 구이를 맛보세요.",
            "둘째 날은 스피드보트로 4개 섬 투어를 하며 스노클링을 즐기고 섬에서 점심을 먹습니다. 오후에는 호텔 수영장에서 휴식을 취하세요.",
          ],
        },
        {
          heading: "3–4일차: 섬 북부와 쇼핑",
          paragraphs: [
            "셋째 날은 북쪽으로 이동해 해수욕을 즐기고 후추 농장을 방문하세요. 마지막 날에는 공항으로 가기 전 피시 소스, 후추, 진주를 선물로 구입해 보세요.",
            "컨시어지가 차량, 투어, 레스토랑 예약을 도와드립니다. 하루 전에 메시지만 보내 주세요.",
          ],
        },
      ],
    },
    "uu-dai-luu-tru-dai-ngay": {
      category: "프로모션",
      title: "오래 머물수록 더 큰 혜택",
      excerpt: "호텔에 직접 예약 시 5박 이상 최대 25% 할인.",
      body: [
        { paragraphs: ["푸꾸옥에서 5박 이상 머무를 계획이라면 호텔에 직접 예약하고 더 좋은 요금을 받으세요."] },
        {
          heading: "혜택",
          paragraphs: [
            "5박 이상 15%, 7박 이상 25% 할인됩니다. 매일 조식과 하루 2벌 세탁 서비스가 포함됩니다.",
            "장기 투숙객은 객실 사정에 따라 얼리 체크인과 레이트 체크아웃도 가능합니다.",
          ],
        },
        {
          heading: "예약 방법",
          paragraphs: ["핫라인으로 전화하시거나 Zalo로 도착일, 출발일, 인원을 알려 주세요. 온라인 예약 플랫폼을 통한 예약에는 적용되지 않습니다."],
        },
      ],
    },
    "yoga-san-thuong": {
      category: "웰니스",
      title: "루프톱 선라이즈 요가",
      excerpt: "매일 아침 6:00, 투숙객을 위한 무료 요가 클래스로 섬의 아침 햇살을 맞이하세요.",
      body: [
        { paragraphs: ["매일 아침 6:00, 블레스드 호텔 루프톱에서 투숙객을 위한 45분 무료 요가 클래스가 열립니다."] },
        {
          heading: "클래스 안내",
          paragraphs: [
            "초보자도 참여할 수 있으며 호흡과 스트레칭에 집중합니다. 매트, 타월, 물이 준비되어 있습니다.",
            "수업 후에는 더 하스에서 아침 식사를 하거나, 햇살이 부드러울 때 수영장으로 향해 보세요.",
          ],
        },
      ],
    },
  },
};
