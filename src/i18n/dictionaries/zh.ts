import type { Dictionary } from "./vi";

/** 简体中文. Cấu trúc phải khớp vi.ts (kiểu `Dictionary`). */
export const zh: Dictionary = {
  meta: {
    tagline: "富国岛上的宁静居所",
    description: "富国岛 Blessed Hotel：拥有 120 间客房、无边泳池、水疗中心和海鲜餐厅的酒店。",
    place: "富国岛",
    address: "越南安江省富国岛威尼斯街 Sun Village - Primavera 区",
  },

  nav: {
    about: "酒店简介",
    rooms: "客房",
    dining: "餐饮",
    experiences: "体验",
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
      sunset: { kicker: "泳池边咖啡馆", title: "Olea Café 的午后", subtitle: "下午茶 14:00 – 17:00" },
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
        title: "Blessed Bistro 餐厅的富国岛海鲜",
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
        title: "Blessed Bistro 周日早午餐",
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
      "blessed-bistro": "亚洲与西式料理",
      "olea-cafe": "咖啡与甜点",
      spa: "水疗与养生",
      gym: "健身房",
    },
    newsTitle: "新闻与优惠",
  },

  about: {
    metaTitle: "酒店简介",
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
    stats: { rooms: "客房与别墅", dining: "餐厅与咖啡馆", reception: "前台与服务" },
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
    metaDescription: "富国岛 Blessed Hotel 的 Blessed Bistro 与 Olea Café：营业时间、菜单及餐位预订。",
    heroDescription: "两处餐饮空间，从自助早餐到泳池边的午后咖啡。",
    title: "美食精选",
    intro: "每天清晨从阳东市场采购的海鲜、酒店自制的烘焙点心和林同省烘焙的咖啡。查看各餐厅菜单，提前预订好位置。",
    cta: {
      title: "预订餐位或客房",
      description: "致电或通过 Zalo 预订餐位，也可在合作平台上快速预订客房。",
    },
  },

  /** Nhà hàng, khoá theo slug trong site.ts `dining` (tên riêng, giờ mở cửa, số điện thoại không dịch) */
  dining: {
    "blessed-bistro": {
      kind: "亚洲与西式料理",
      description: "全日餐厅：50 多道菜品的自助早餐，午餐和晚餐提供炭烤富国岛海鲜、牛肉河粉和自制意面等单点菜品。可容纳 120 位客人，设有面向花园的户外座位。",
    },
    "olea-cafe": {
      kind: "咖啡与甜点",
      description: "泳池边的咖啡馆，供应越南滴滤咖啡、冷萃咖啡、每天早上新鲜出炉的可颂，以及 14:00 至 17:00 的下午茶套餐。晚间提供鸡尾酒和热带水果无酒精饮品。",
    },
  },

  experiencesPage: {
    metaTitle: "体验",
    metaDescription: "富国岛 Blessed Hotel 的 Blessed Spa 与健身房：开放时间、护理项目及预约。",
    heroTitle: "在海岛慢下来",
    heroDescription: "草本按摩、蒸汽浴和花园景观健身房，都在酒店之内。",
    explore: "探索",
    title: "放松与运动",
    intro: "在 Blessed Spa 享受 60 至 120 分钟的护理，或在去海边前晨练一场。住客可免费使用健身房。",
  },

  /** Spa / phòng tập, khoá theo slug trong site.ts `experiences` */
  experiences: {
    spa: {
      kind: "水疗与护理",
      description: "设有 6 间私密护理室，其中 2 间为双人房。提供热石按摩、越南草本按摩、面部护理和蒸汽浴。请至少提前 2 小时预约。",
    },
    gym: {
      kind: "健身房",
      description: "配备跑步机、动感单车、力量器械和自由重量区，另有提供瑜伽垫和健身球的瑜伽角。住客可免费使用毛巾和饮用水。",
    },
  },

  /** Nhãn dùng chung cho thẻ nhà hàng / spa / phòng tập (`VenueCard`) */
  venue: {
    everyday: "每天",
    openingHours: "营业时间",
    phone: "电话",
    viewMenu: "查看菜单",
    reserveTable: "预订餐位",
    reserveSpa: "预约护理",
    prevPhoto: "上一张",
    nextPhoto: "下一张",
    photos: "{name} 图片",
    photoAlt: "{name}，第 {n} 张图片",
    menuAlt: "{name} 菜单，第 {n} 页",
  },

  /** Trang quản trị /admin (đăng bài; bản demo chưa lưu thật) */
  admin: {
    metaTitle: "管理后台",
    badge: "管理后台",
    demoNotice: "演示版本：尚未连接服务器，所有更改都不会被保存。",
    nav: {
      posts: "文章",
      newPost: "撰写新文章",
      viewSite: "查看网站",
    },
    list: {
      title: "文章",
      count: "共 {n} 篇文章",
      post: "文章",
      category: "分类",
      date: "发布日期",
      status: "状态",
      actions: "操作",
      published: "已发布",
      featured: "精选",
      edit: "编辑",
      view: "查看",
    },
    editor: {
      newTitle: "撰写新文章",
      editTitle: "编辑文章 #{id}",
      back: "全部文章",
      contentLanguage: "内容语言",
      languageHint: "文章需填写全部 4 种语言后才能发布。",
      complete: "已完成",
      incomplete: "未完成",
      title: "标题",
      excerpt: "摘要",
      excerptHint: "1 至 2 句，显示在文章卡片和搜索结果中。",
      keyPoints: "速览",
      keyPointsHint: "3 条要点，显示在文章开头的金色边框中。",
      keyPoint: "要点 {n}",
      sections: "正文",
      section: "第 {n} 节",
      heading: "小节标题（选填）",
      paragraphs: "段落",
      paragraphsHint: "段落之间请空一行。",
      addSection: "添加小节",
      removeSection: "删除小节",
      settings: "设置",
      category: "分类",
      date: "发布日期",
      featured: "显示在精选新闻中",
      cover: "封面图片",
      coverUrl: "图片链接",
      coverUpload: "从电脑选择",
      noCover: "尚无封面图片",
      preview: "预览",
      untitled: "无标题",
      saveDraft: "保存草稿",
      publish: "发布",
      update: "更新",
      draftSaved: "草稿已保存（演示版本，未保存到服务器）。",
      published: "文章内容完整，可以发布。这是演示版本，因此不会实际保存。",
      missingLanguages: "以下语言缺少标题或摘要：{langs}。",
      missingSettings: "请选择发布日期和封面图片。",
      listSeparator: "、",
    },
  },

  newsPage: {
    metaTitle: "新闻",
    metaDescription: "Blessed Hotel 的优惠、活动和富国岛旅行攻略。",
    heroDescription: "优惠、活动和富国岛旅行攻略。",
    featured: "精选文章",
    latest: "最新文章",
    categories: "分类",
    allCategories: "全部",
    search: "搜索",
    searchPlaceholder: "按关键词搜索",
    noResults: "没有找到相关文章。",
    roomsTitle: "客房",
    ctaTitle: "直接预订",
    ctaBody: "致电或通过 Zalo 联系我们获取最优价格。",
  },

  /** Nhãn chuyên mục tin tức, khoá theo id trong site.ts `newsCategories` */
  newsCategories: {
    offer: "优惠",
    dining: "餐饮",
    event: "活动",
    guide: "旅行攻略",
    wellness: "养生",
  },

  article: {
    tableOfContents: "目录",
    keyPoints: "要点速览",
    forYou: "为您推荐",
    publishedOn: "发布日期",
    readingTime: "阅读时间",
    minutes: "{n} 分钟",
    allNews: "全部新闻",
    moreArticles: "更多文章",
    ctaTitle: "想要预订或咨询？",
    ctaBody: "致电、通过 Zalo 联系我们，或在合作平台上快速预订。",
  },

  news: {
    "spa-mua-thu": {
      title: "秋季水疗套餐：特惠价格，全身放松",
      excerpt: "享受 90 分钟疗程与草本茶，活动截至 11 月底。",
      keyPoints: ["90 分钟疗程：足浴、60 分钟按摩、面膜", "附赠姜蜜茶和时令水果", "每天 10:00 – 20:00，截至 11 月底"],
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
      title: "Blessed Bistro 推出周日早午餐",
      excerpt: "60 多道亚洲与西式菜肴、儿童游乐区，每周日还有现场音乐。",
      keyPoints: ["每周日 11:00 – 14:30，Blessed Bistro 餐厅", "60 多道菜品及富国岛新鲜海鲜台", "6 岁以下儿童免费"],
      body: [
        { paragraphs: ["从本周日起，Blessed Bistro 推出周日早午餐，提供 60 多道亚洲与西式菜肴，供应时间为 11:00 至 14:30。"] },
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
      title: "月末日落泳池派对",
      excerpt: "每月最后一个周六晚上，在无边泳池畔享受 DJ、鸡尾酒和烧烤。",
      keyPoints: ["每月最后一个周六晚上", "17:00 鸡尾酒，18:30 烧烤，DJ 至 22:00", "住客免费入场"],
      body: [
        { paragraphs: ["每月最后一个周六晚上，Blessed Hotel 的无边泳池将化身观赏日落的好去处，伴有 DJ、鸡尾酒和户外烧烤。"] },
        {
          heading: "活动安排",
          paragraphs: [
            "17:00 起，池畔酒吧供应 Olea Café 招牌鸡尾酒。烧烤于 18:30 开始，提供海鲜和炭烤肉类。",
            "DJ 演出持续至 22:00。住客免费入场，外部访客请提前预订。",
          ],
        },
      ],
    },
    "kinh-nghiem-du-lich-phu-quoc": {
      title: "富国岛四天三晚旅行攻略",
      excerpt: "推荐行程、必尝美食以及岛上最美的日落观赏点。",
      keyPoints: ["第 1–2 天：日落小镇、夜市、四岛游", "第 3–4 天：北岛、胡椒园、购买伴手礼", "提前一天告知，礼宾部可代订车辆、游览和餐厅"],
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
      title: "住得越久，优惠越多",
      excerpt: "直接向酒店预订，入住 5 晚及以上最高可享 25% 折扣。",
      keyPoints: ["入住 5 晚享 85 折，7 晚享 75 折", "含每日早餐和洗衣服务", "仅限通过热线或 Zalo 直接预订"],
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
      title: "屋顶日出瑜伽",
      excerpt: "每天早上 6:00 为住客提供免费瑜伽课，迎接海岛清晨的阳光。",
      keyPoints: ["每天早上 6:00，酒店屋顶", "45 分钟课程，适合初学者", "住客免费，提供瑜伽垫和饮用水"],
      body: [
        { paragraphs: ["每天早上 6:00，Blessed Hotel 屋顶都会开设一节 45 分钟的舒缓瑜伽课，住客可免费参加。"] },
        {
          heading: "课程介绍",
          paragraphs: ["课程适合初学者，注重呼吸与拉伸。现场提供瑜伽垫、毛巾和饮用水。", "课后您可以到 Blessed Bistro 享用早餐，或趁阳光还柔和时去泳池。"],
        },
      ],
    },
  },
};
