import type { Dictionary } from "./vi";

/** 简体中文. Cấu trúc phải khớp vi.ts (kiểu `Dictionary`). */
export const zh: Dictionary = {
  meta: {
    tagline: "富国岛上的宁静居所",
    description: "富国岛 Blessed Hotel：拥有 120 间客房、无边泳池、屋顶酒吧和海鲜餐厅的酒店。",
    place: "富国岛",
    address: "越南安江省富国岛威尼斯街 Sun Village - Primavera 区",
  },

  nav: {
    about: "关于我们",
    rooms: "客房",
    dining: "餐饮",
    services: "服务",
    news: "新闻",
  },

  ui: {
    mainMenu: "主菜单",
    mobileMenu: "移动端菜单",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    homeAria: "Blessed Hotel 首页",
    home: "首页",
    breadcrumb: "导航路径",
    language: "语言",
    hotline: "热线",
    bookNow: "预订",
    bookNowLong: "立即预订",
    contactToBook: "联系预订",
    explore: "了解更多",
    viewAll: "查看全部",
    readMore: "阅读全文",
    viewDetails: "查看详情",
    callPhone: "致电 {phone}",
    previous: "上一张",
    next: "下一张",
    slideLabel: "第 {n} 张：{title}",
    viewPhotos: "查看照片",
    viewPhotosOf: "查看 {name} 客房照片",
    from: "起价",
    fromLong: "起价",
    perNight: "/ 晚",
    guests: "最多 {n} 人",
  },

  lightbox: {
    Previous: "上一张",
    Next: "下一张",
    Close: "关闭",
    Slide: "照片",
    Carousel: "照片轮播",
    Lightbox: "照片查看器",
    "Photo gallery": "相册",
    "{index} of {total}": "{index} / {total}",
    "Zoom in": "放大",
    "Zoom out": "缩小",
    "Show thumbnails": "显示缩略图",
    "Hide thumbnails": "隐藏缩略图",
    "Show captions": "显示说明",
    "Hide captions": "隐藏说明",
  },

  booking: {
    panelLabel: "预订渠道",
    via: "预订方式",
    channels: {
      phone: { label: "电话预订", note: "" },
      zalo: { label: "Zalo", note: "在线咨询" },
      traveloka: { label: "Traveloka", note: "通过 Traveloka 预订" },
      agoda: { label: "Agoda", note: "通过 Agoda 预订" },
      klook: { label: "Klook", note: "通过 Klook 预订" },
    },
    cta: {
      title: "准备好开启富国岛假期了吗？",
      description: "致电或通过 Zalo 联系我们获取最优价格，也可在常用平台上快速预订。",
    },
  },

  footer: {
    social: "社交媒体",
    contact: "联系方式",
    hotlineZalo: "热线 / Zalo",
    email: "电子邮箱",
    address: "地址",
    explore: "探索",
    booking: "预订",
    location: "位置",
    mapTitle: "富国岛 Blessed Hotel 地图",
    copyright: "© Blessed Hotel Phu Quoc. 保留所有权利。",
    license: "住宿经营许可证信息：更新中。",
  },

  notFound: {
    title: "找不到您要访问的页面。",
    back: "返回首页",
  },

  home: {
    heroSlides: {
      welcome: { kicker: "欢迎来到", title: "Blessed Hotel", subtitle: "位于富国岛" },
      pool: { kicker: "全天惬意放松", title: "无边泳池", subtitle: "开放时间 6:00 – 22:00" },
      sunset: { kicker: "屋顶酒吧", title: "Sky Terrace 日落", subtitle: "每晚供应招牌鸡尾酒" },
      rooms: { kicker: "120 间客房与别墅", title: "在海岛安然入眠", subtitle: "从豪华客房到花园别墅" },
    },
    exploreTitle: "探索 Blessed Hotel",
    explore: {
      rooms: {
        label: "客房",
        title: "4 种房型，面积 28 至 60 平方米",
        description: "海景客房配有可观赏日落的阳台，花园私人别墅适合全家入住。",
      },
      dining: {
        label: "餐饮",
        title: "Saffron 餐厅的富国岛海鲜",
        description: "每天清晨从阳东市场采购鲜鱼、螃蟹和海胆，以越南南北各地的做法烹制。",
      },
      spa: {
        label: "水疗与泳池",
        title: "慢下来的午后",
        description: "享受 90 分钟热石按摩，再到无边泳池迎接傍晚的阳光。",
      },
      story: {
        label: "我们的故事",
        title: "在海岛中心，如同回家",
        description: "我们选择富国岛的原因，以及每天早晨在前台迎接您的人们。",
      },
      news: {
        label: "新闻",
        title: "The Hearth 周日早午餐",
        description: "60 多道亚洲与西式菜肴、儿童游乐区，每周日还有现场音乐。",
      },
    },
    roomsTitle: "客房",
    roomTabsLabel: "房型",
    roomTabs: { all: "全部", room: "客房", suite: "套房", villa: "别墅" },
    promo: {
      title: "直接向酒店预订，享受最优价格。",
      body: "视房态提供提前入住、延迟退房和免费升级。",
      cta: "联系预订",
    },
    brand: {
      wordmark: ["Blessed", "Hotel", "Phu Quoc"],
      tagline: ["睡得好。", "吃得好。", "在海岛慢下来。"],
    },
    highlights: {
      "the-hearth": "全日餐厅",
      saffron: "越南菜",
      "sky-terrace": "屋顶酒吧",
      spa: "水疗与养生",
    },
    newsTitle: "新闻与优惠",
  },

  about: {
    metaTitle: "关于我们",
    metaDescription: "富国岛 Blessed Hotel 的故事与理念。",
    heroTagline: "海岛上的宁静居所",
    wordmarkSub: "Hotel · Phu Quoc",
    philosophy: {
      lead: ["旅行不只是一个目的地。", "住处也不只是一张床。", "所以我们把 Blessed Hotel", "打造成一个海边的家。"],
      title: [
        { highlight: "安心", rest: "休憩。" },
        { highlight: "宁静", rest: "海边。" },
      ],
      body: "难忘的假期来自简单的小事：一夜好眠、一顿热腾腾的早餐、前台的微笑，以及在恰当时机给出的建议，让您以自己的方式探索这座海岛。",
    },
    stats: { rooms: "客房与别墅", dining: "餐厅与酒吧", reception: "前台与服务" },
    pillars: {
      rooms: { title: "明亮的客房", description: "源自每个角落的用心。" },
      food: { title: "温暖的餐食", description: "源自当天的海鲜和家常配方。" },
      leisure: { title: "悠闲的时光", description: "源自泳池、水疗和海浪声。" },
      people: { title: "用心的团队", description: "记得您的名字和您喜欢的菜。" },
    },
    closing: {
      lead: ["不只是睡觉的地方。", "我们希望成为："],
      titleLight: "您在富国岛的",
      titleBold: "家",
      body: ["一家位于海岛南部海边的小酒店，", "在这里，我们叫得出您的名字，", "让您下一季还想再来。"],
    },
  },

  roomsPage: {
    metaTitle: "客房",
    metaDescription: "富国岛 Blessed Hotel 的豪华客房、高级海景房、小套房和花园别墅。",
    heroDescription: "从温馨的豪华客房到私密的花园别墅，选择最适合您旅程的空间。",
    size: "面积",
    capacity: "入住人数",
    bed: "床型",
    bookThisRoom: "预订此房型",
  },

  rooms: {
    deluxe: {
      summary: "温馨舒适、设施齐全，适合商务出行或短期度假。",
      description: "豪华客房采用暖色调布置，配有舒适的特大床和窗边休憩角。适合情侣或商务旅客。",
      bed: "1 张特大床",
      view: "花园景观",
      amenities: ["免费 Wi-Fi", "智能电视", "咖啡机", "迷你吧", "保险箱", "步入式淋浴"],
      gallery: ["豪华客房卧室", "特大床与阅读灯", "窗边休憩角", "玻璃步入式淋浴间"],
    },
    premier: {
      summary: "大面积落地窗面朝大海，配有独立办公区和步入式淋浴。",
      description: "透过大落地窗醒来即见碧海。高级海景房空间更宽敞，配有书桌和可观赏日落的小阳台。",
      bed: "1 张特大床或 2 张单人床",
      view: "海景",
      amenities: ["免费 Wi-Fi", "阳台", "智能电视", "书桌", "迷你吧", "浴袍"],
      gallery: ["高级海景房卧室", "沙发区与大窗", "落地窗", "海景阳台"],
    },
    "junior-suite": {
      summary: "独立会客区与典雅古典的陈设，适合长住。",
      description: "小套房设有配备舒适沙发的独立会客区、古典家具和宽敞空间，适合小家庭或长期入住。",
      bed: "1 张特大床 + 沙发床",
      view: "部分海景",
      amenities: ["会客区", "浴缸", "智能电视", "咖啡机", "迷你吧", "夜床服务"],
      gallery: ["小套房", "带阅读椅的卧室", "独立会客区", "带浴缸的浴室"],
    },
    "garden-villa": {
      summary: "隐匿于热带花园之中，配有私人露台和放松浴缸。",
      description: "私密别墅坐落在热带花园中，拥有宽敞露台、大浴缸和足够全家共享的空间。",
      bed: "1 张特大床 + 2 张单人床",
      view: "热带花园景观",
      amenities: ["私人露台", "大浴缸", "客厅", "智能电视", "咖啡机", "别墅内早餐"],
      gallery: ["花园别墅卧室", "热带花园中的泳池", "别墅客厅", "绿植环绕的大浴缸"],
    },
  },

  diningPage: {
    metaTitle: "餐饮",
    metaDescription: "富国岛 Blessed Hotel 的全日餐厅、越南菜和屋顶酒吧。",
    heroDescription: "三处餐饮空间，从悠闲的早餐到日落时分的鸡尾酒。",
    openingHours: "营业时间",
    cta: {
      title: "预订餐位或客房",
      description: "致电或通过 Zalo 预订餐位，也可在合作平台上快速预订客房。",
    },
  },

  dining: {
    "the-hearth": {
      kind: "全日餐厅",
      description: "丰盛的自助早餐和全天供应的亚洲与西式菜单，选用当地农场和富国岛海域的新鲜食材。",
      highlights: ["50 多道菜的自助早餐", "越南法棍与咖啡角", "儿童菜单"],
    },
    saffron: {
      kind: "越南精致料理",
      description: "以精致的呈现方式演绎越南南北中三地的传统菜肴与海岛海鲜，并搭配精选葡萄酒。",
      highlights: ["每日新鲜海鲜", "7 道菜品鉴菜单", "精选葡萄酒"],
    },
    "sky-terrace": {
      kind: "屋顶酒吧",
      description: "招牌鸡尾酒、轻松的音乐，每晚都能欣赏海上日落。",
      highlights: ["招牌鸡尾酒", "欢乐时光 17:00 – 19:00", "周末 DJ"],
    },
  },

  servicesPage: {
    metaTitle: "服务",
    metaDescription: "富国岛 Blessed Hotel 的水疗、泳池、机场接送、会议及礼宾服务。",
    heroDescription: "从您抵达机场到离开海岛，一切交给我们。",
  },

  services: {
    spa: {
      title: "水疗与按摩",
      description: "草本与精油疗程，让身心彻底放松。",
      details: "私密理疗室、热石按摩、面部护理和情侣水疗套餐。请在前台预约。",
    },
    pool: {
      title: "无边泳池",
      description: "从清晨开放至深夜的户外泳池。",
      details: "面朝大海的泳池，配有日光躺椅、免费毛巾和供应轻饮的池畔酒吧。",
    },
    shuttle: {
      title: "机场接送",
      description: "专车门到门接送，可轻松提前预订。",
      details: "提供 4 至 16 座车辆往返富国岛机场。请至少提前 24 小时告知航班号。",
    },
    meeting: {
      title: "会议与活动",
      description: "可容纳 10 至 300 人的多功能会议室。",
      details: "现代化演示设备、灵活的宴会菜单和专业的活动支持团队。",
    },
    gym: {
      title: "24 小时健身房",
      description: "现代化设备，全天候开放。",
      details: "跑步机、动感单车、自由重量区和瑜伽区。可按需预约私人教练。",
    },
    concierge: {
      title: "礼宾服务",
      description: "行程建议，代订游览项目与景点门票。",
      details: "四岛游、香岛缆车、珍珠乐园（VinWonders）、摩托车租赁及当地餐厅推荐。",
    },
  },

  newsPage: {
    metaTitle: "新闻",
    metaDescription: "Blessed Hotel 的优惠、活动和富国岛旅行攻略。",
    heroDescription: "优惠、活动和富国岛旅行攻略。",
  },

  article: {
    postedBy: "发布者",
    publishedOn: "发布日期",
    readingTime: "阅读时间",
    minutes: "{n} 分钟",
    inThisPost: "本文目录",
    allNews: "全部新闻",
    moreArticles: "更多文章",
    ctaTitle: "想要预订或咨询？",
    ctaBody: "致电、通过 Zalo 联系我们，或在合作平台上快速预订。",
  },

  news: {
    "spa-mua-thu": {
      category: "优惠",
      title: "秋季水疗套餐：特惠价格，全身放松",
      excerpt: "享受 90 分钟疗程与草本茶，活动截至 11 月底。",
      body: [
        { paragraphs: ["富国岛的秋天阳光柔和、海面平静。Blessed Spa 也在此时为住客和访客推出 90 分钟放松套餐。"] },
        {
          heading: "套餐内容",
          paragraphs: ["疗程以草本足浴开始，随后是 60 分钟香茅精油全身按摩，最后以保湿面膜收尾。", "疗程结束后，您可在休息室享用姜蜜茶和一盘时令水果。"],
        },
        {
          heading: "活动时间",
          paragraphs: ["活动每天 10:00 至 20:00 进行，截至 11 月底。请提前通过前台或 Zalo 预约，以便选择心仪时段。"],
        },
      ],
    },
    "brunch-cuoi-tuan": {
      category: "餐饮",
      title: "The Hearth 推出周日早午餐",
      excerpt: "60 多道亚洲与西式菜肴、儿童游乐区，每周日还有现场音乐。",
      body: [
        { paragraphs: ["从本周日起，The Hearth 推出周日早午餐，提供 60 多道亚洲与西式菜肴，供应时间为 11:00 至 14:30。"] },
        {
          heading: "菜单",
          paragraphs: [
            "新鲜海鲜台提供富国岛生蚝、虾和螃蟹。旁边还有烧烤台、现做面食、甜点和越南滴漏咖啡吧。",
            "主厨每周还会根据时令食材加推两道特色菜。",
          ],
        },
        {
          heading: "适合全家",
          paragraphs: ["设有专人看护的儿童游乐区，全程伴有轻柔的原声音乐。6 岁以下儿童在成人陪同下免费用餐。"],
        },
      ],
    },
    "hoang-hon-ho-boi": {
      category: "活动",
      title: "月末日落泳池派对",
      excerpt: "每月最后一个周六晚上，在无边泳池畔享受 DJ、鸡尾酒和烧烤。",
      body: [
        { paragraphs: ["每月最后一个周六晚上，Blessed Hotel 的无边泳池将化身观赏日落的好去处，伴有 DJ、鸡尾酒和户外烧烤。"] },
        {
          heading: "活动安排",
          paragraphs: [
            "17:00 起，池畔酒吧供应 Sky Terrace 招牌鸡尾酒。烧烤于 18:30 开始，提供海鲜和炭烤肉类。",
            "DJ 演出持续至 22:00。住客免费入场，外部访客请提前预订。",
          ],
        },
      ],
    },
    "kinh-nghiem-du-lich-phu-quoc": {
      category: "旅行攻略",
      title: "富国岛四天三晚旅行攻略",
      excerpt: "推荐行程、必尝美食以及岛上最美的日落观赏点。",
      body: [
        { paragraphs: ["四天时间刚好可以不慌不忙地休息并游览富国岛。以下是我们礼宾团队常为首次来岛的客人推荐的行程。"] },
        {
          heading: "第 1–2 天：南岛",
          paragraphs: [
            "第一天办理入住后，步行到日落小镇海滩观赏日落。晚上去夜市品尝烤海鲜。",
            "第二天乘快艇参加四岛游，浮潜看珊瑚并在岛上享用午餐。下午回酒店泳池休息。",
          ],
        },
        {
          heading: "第 3–4 天：北岛与购物",
          paragraphs: [
            "第三天前往岛北部游泳，并参观胡椒园。最后一天在前往机场前，买些鱼露、胡椒和珍珠作为伴手礼。",
            "礼宾部可为您预订车辆、游览项目和餐厅，只需提前一天告诉我们。",
          ],
        },
      ],
    },
    "uu-dai-luu-tru-dai-ngay": {
      category: "优惠",
      title: "住得越久，优惠越多",
      excerpt: "直接向酒店预订，入住 5 晚及以上最高可享 25% 折扣。",
      body: [
        { paragraphs: ["如果您计划在富国岛入住 5 晚或以上，请直接向酒店预订以获得更优惠的价格。"] },
        {
          heading: "优惠内容",
          paragraphs: ["入住 5 晚享 85 折，入住 7 晚享 75 折。优惠包含每日早餐及每天两套衣物洗烫服务。", "长住客人还可视房态享受提前入住和延迟退房。"],
        },
        {
          heading: "预订方式",
          paragraphs: ["请致电热线或通过 Zalo 告知入住日期、离店日期和人数。通过在线旅行平台预订不适用此优惠。"],
        },
      ],
    },
    "yoga-san-thuong": {
      category: "养生",
      title: "屋顶日出瑜伽",
      excerpt: "每天早上 6:00 为住客提供免费瑜伽课，迎接海岛清晨的阳光。",
      body: [
        { paragraphs: ["每天早上 6:00，Blessed Hotel 屋顶都会开设一节 45 分钟的舒缓瑜伽课，住客可免费参加。"] },
        {
          heading: "课程介绍",
          paragraphs: ["课程适合初学者，注重呼吸与拉伸。现场提供瑜伽垫、毛巾和饮用水。", "课后您可以到 The Hearth 享用早餐，或趁阳光还柔和时去泳池。"],
        },
      ],
    },
  },
};
