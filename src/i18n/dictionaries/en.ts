import type { Dictionary } from "./vi";

/** English. Cấu trúc phải khớp vi.ts (kiểu `Dictionary`). */
export const en: Dictionary = {
  meta: {
    tagline: "A peaceful retreat on Phu Quoc island",
    description: "Blessed Hotel Phu Quoc: a 120-room hotel with an infinity pool, a rooftop bar and a seafood restaurant.",
    place: "Phu Quoc",
    address: "Sun Village - Primavera, Venice Street, Phu Quoc, An Giang, Vietnam",
  },

  nav: {
    about: "About us",
    rooms: "Rooms",
    dining: "Dining",
    services: "Services",
    news: "News",
  },

  ui: {
    mainMenu: "Main menu",
    mobileMenu: "Mobile menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    homeAria: "Blessed Hotel, home",
    home: "Home",
    breadcrumb: "Breadcrumb",
    language: "Language",
    hotline: "Hotline",
    bookNow: "Book now",
    bookNowLong: "Book your stay",
    contactToBook: "Contact us to book",
    explore: "Explore",
    viewAll: "View all",
    readMore: "Read more",
    viewDetails: "View details",
    callPhone: "Call {phone}",
    previous: "Previous",
    next: "Next",
    slideLabel: "Slide {n}: {title}",
    viewPhotos: "View photos",
    viewPhotosOf: "View photos of the {name}",
    from: "From",
    fromLong: "From",
    perNight: "/ night",
    guests: "{n} guests",
  },

  lightbox: {
    Previous: "Previous photo",
    Next: "Next photo",
    Close: "Close",
    Slide: "Photo",
    Carousel: "Photo carousel",
    Lightbox: "Photo viewer",
    "Photo gallery": "Photo gallery",
    "{index} of {total}": "{index} of {total}",
    "Zoom in": "Zoom in",
    "Zoom out": "Zoom out",
    "Show thumbnails": "Show thumbnails",
    "Hide thumbnails": "Hide thumbnails",
    "Show captions": "Show captions",
    "Hide captions": "Hide captions",
  },

  booking: {
    panelLabel: "Booking channels",
    via: "Book via",
    channels: {
      phone: { label: "Call us", note: "" },
      zalo: { label: "Zalo", note: "Chat with us" },
      traveloka: { label: "Traveloka", note: "Book on Traveloka" },
      agoda: { label: "Agoda", note: "Book on Agoda" },
      klook: { label: "Klook", note: "Book on Klook" },
    },
    cta: {
      title: "Ready for your Phu Quoc getaway?",
      description: "Call or message us on Zalo for the best rate, or book in a few taps on the platforms you already use.",
    },
  },

  footer: {
    social: "Social media",
    contact: "Contact",
    hotlineZalo: "Hotline / Zalo",
    email: "Email",
    address: "Address",
    explore: "Explore",
    booking: "Book",
    location: "Location",
    mapTitle: "Map of Blessed Hotel Phu Quoc",
    copyright: "© Blessed Hotel Phu Quoc. All rights reserved.",
    license: "Accommodation business license: being updated.",
  },

  notFound: {
    title: "We couldn't find the page you were looking for.",
    back: "Back to home",
  },

  home: {
    heroSlides: {
      welcome: { kicker: "Welcome to", title: "Blessed Hotel", subtitle: "On the island of Phu Quoc" },
      pool: { kicker: "Unwind all day", title: "Infinity pool", subtitle: "Open from 6:00 to 22:00" },
      sunset: { kicker: "Rooftop bar", title: "Sky Terrace sunsets", subtitle: "Signature cocktails every evening" },
      rooms: { kicker: "120 rooms & villas", title: "Sleep well on the island", subtitle: "From Deluxe to Garden Villa" },
    },
    exploreTitle: "Explore Blessed Hotel",
    explore: {
      rooms: {
        label: "Rooms",
        title: "4 room types, from 28 m² to 60 m²",
        description: "Sea-view rooms with sunset balconies, and private garden villas for the whole family.",
      },
      dining: {
        label: "Dining",
        title: "Phu Quoc seafood at Saffron",
        description: "Fish, crab and sea urchin from Duong Dong market each morning, cooked with recipes from across Vietnam.",
      },
      spa: {
        label: "Spa & pool",
        title: "A slower afternoon",
        description: "A 90-minute hot stone massage, then out to the infinity pool for the last of the sun.",
      },
      story: {
        label: "Our story",
        title: "Like coming home, in the heart of the island",
        description: "Why we chose Phu Quoc, and the people who greet you at the front desk each morning.",
      },
      news: {
        label: "News",
        title: "Sunday Brunch at The Hearth",
        description: "Over 60 Asian and Western dishes, a kids' play area and live music every Sunday.",
      },
    },
    roomsTitle: "Rooms",
    roomTabsLabel: "Room type",
    roomTabs: { all: "All", room: "Rooms", suite: "Suites", villa: "Villas" },
    promo: {
      title: "Book directly with the hotel for the best rate.",
      body: "Enjoy early check-in, late check-out and a free upgrade when available.",
      cta: "Contact us to book",
    },
    brand: {
      wordmark: ["Blessed", "Hotel", "Phu Quoc"],
      tagline: ["Sleep well.", "Eat well.", "Slow down on the island."],
    },
    highlights: {
      "the-hearth": "All-day dining",
      saffron: "Vietnamese cuisine",
      "sky-terrace": "Rooftop bar",
      spa: "Spa & wellness",
    },
    newsTitle: "News & offers",
  },

  about: {
    metaTitle: "About us",
    metaDescription: "The story and philosophy behind Blessed Hotel Phu Quoc.",
    heroTagline: "A peaceful retreat on the island",
    wordmarkSub: "Hotel · Phu Quoc",
    philosophy: {
      lead: [
        "A journey is more than a destination.",
        "A place to stay is more than a bed.",
        "That is why we built Blessed Hotel",
        "like a home by the sea.",
      ],
      title: [
        { highlight: "Rest", rest: " fully." },
        { highlight: "Peace", rest: " by the sea." },
      ],
      body: "A memorable stay comes from simple things: a good night's sleep, a warm breakfast, a smile at the front desk and the right tip at the right time to explore the island your own way.",
    },
    stats: { rooms: "Rooms & villas", dining: "Restaurants & bars", reception: "Front desk & support" },
    pillars: {
      rooms: { title: "Bright rooms", description: "Shaped by care in every small corner." },
      food: { title: "Warm meals", description: "Made with the day's seafood and home recipes." },
      leisure: { title: "Quiet moments", description: "Found by the pool, in the spa and in the sound of the waves." },
      people: { title: "Thoughtful people", description: "A team that remembers your name and your favourite dish." },
    },
    closing: {
      lead: ["More than a place to sleep.", "We want to be:"],
      titleLight: "Your home in ",
      titleBold: "Phu Quoc",
      body: ["A small hotel on the island's southern shore,", "where you are greeted by name,", "and always want to return next season."],
    },
  },

  roomsPage: {
    metaTitle: "Rooms",
    metaDescription: "Deluxe, Premier Ocean View, Junior Suite and Garden Villa at Blessed Hotel Phu Quoc.",
    heroDescription: "From the cosy Deluxe to the secluded Garden Villa, choose the space that suits your trip.",
    size: "Size",
    capacity: "Capacity",
    bed: "Bed",
    bookThisRoom: "Book this room",
  },

  rooms: {
    deluxe: {
      summary: "A cosy, well-equipped room for business trips or short breaks.",
      description:
        "The Deluxe room is styled in warm tones, with a comfortable King bed and a reading nook by the window. Ideal for couples or business travellers.",
      bed: "1 King bed",
      view: "Garden view",
      amenities: ["Free Wi-Fi", "Smart TV", "Coffee machine", "Minibar", "In-room safe", "Walk-in shower"],
      gallery: ["Deluxe bedroom", "King bed and reading lamps", "Seating nook by the window", "Glass walk-in shower"],
    },
    premier: {
      summary: "Large windows facing the sea, a private work corner and a walk-in shower.",
      description:
        "Wake up to blue sea views through floor-to-ceiling windows. The Premier room is more spacious, with a work desk and a small balcony for watching the sunset.",
      bed: "1 King bed or 2 single beds",
      view: "Sea view",
      amenities: ["Free Wi-Fi", "Balcony", "Smart TV", "Work desk", "Minibar", "Bathrobes"],
      gallery: ["Premier Ocean View bedroom", "Sofa corner and large windows", "Floor-to-ceiling windows", "Balcony overlooking the sea"],
    },
    "junior-suite": {
      summary: "A separate lounge and classic, elegant furnishings for longer stays.",
      description:
        "The Junior Suite has its own lounge with a comfortable sofa, classic furnishings and plenty of space for a small family or a longer stay.",
      bed: "1 King bed + sofa bed",
      view: "Partial sea view",
      amenities: ["Lounge area", "Bathtub", "Smart TV", "Coffee machine", "Minibar", "Turndown service"],
      gallery: ["Junior Suite", "Bedroom with reading chair", "Private lounge area", "Bathroom with bathtub"],
    },
    "garden-villa": {
      summary: "Secluded in a tropical garden, with a private terrace and a relaxing bathtub.",
      description:
        "A private villa tucked into a tropical garden, with a wide terrace, a large bathtub and room for the whole family to enjoy.",
      bed: "1 King bed + 2 single beds",
      view: "Tropical garden view",
      amenities: ["Private terrace", "Large bathtub", "Living room", "Smart TV", "Coffee machine", "In-villa breakfast"],
      gallery: ["Garden Villa bedroom", "Pool in a tropical garden", "Villa living room", "Large bathtub surrounded by greenery"],
    },
  },

  diningPage: {
    metaTitle: "Dining",
    metaDescription: "All-day dining, Vietnamese cuisine and a rooftop bar at Blessed Hotel Phu Quoc.",
    heroDescription: "Three places to eat and drink, from a slow breakfast to a cocktail at sunset.",
    openingHours: "Opening hours",
    cta: {
      title: "Reserve a table or a room",
      description: "Call or message us on Zalo to reserve a table, or book a room quickly on our partner platforms.",
    },
  },

  dining: {
    "the-hearth": {
      kind: "All-day restaurant",
      description:
        "A generous breakfast buffet and an all-day Asian and Western menu, made with fresh produce from local farms and the Phu Quoc sea.",
      highlights: ["Breakfast buffet with 50+ dishes", "Bánh mì & coffee corner", "Kids' menu"],
    },
    saffron: {
      kind: "Fine Vietnamese cuisine",
      description:
        "Traditional dishes from all three regions of Vietnam and island seafood, elevated in presentation and paired with selected wines.",
      highlights: ["Fresh seafood daily", "7-course tasting menu", "Selected wines"],
    },
    "sky-terrace": {
      kind: "Rooftop Bar",
      description: "Signature cocktails, chill music and views of the sun setting over the sea every evening.",
      highlights: ["Signature cocktails", "Happy hour 17:00 – 19:00", "Weekend DJ"],
    },
  },

  servicesPage: {
    metaTitle: "Services",
    metaDescription: "Spa, pool, airport transfers, meetings and concierge at Blessed Hotel Phu Quoc.",
    heroDescription: "From the moment you land until you leave the island, leave the details to us.",
  },

  services: {
    spa: {
      title: "Spa & Massage",
      description: "Herbal and essential-oil treatments to help you unwind.",
      details: "Private treatment rooms, hot stone massage, facials and couples' spa packages. Book at the front desk.",
    },
    pool: {
      title: "Infinity pool",
      description: "An outdoor pool open from early morning until late evening.",
      details: "A sea-facing pool with sun loungers, free towels and a poolside bar serving light drinks.",
    },
    shuttle: {
      title: "Airport transfers",
      description: "Private door-to-door transfers, easy to book in advance.",
      details: "4 to 16-seat vehicles to and from Phu Quoc airport. Please send your flight number at least 24 hours ahead.",
    },
    meeting: {
      title: "Meetings & Events",
      description: "Flexible meeting rooms for 10 to 300 guests.",
      details: "Modern presentation equipment, flexible banquet menus and an experienced events team.",
    },
    gym: {
      title: "24/7 fitness centre",
      description: "Modern equipment, open day and night.",
      details: "Treadmills, bikes, free weights and a yoga area. Personal trainers available on request.",
    },
    concierge: {
      title: "Concierge",
      description: "Itinerary tips, tours and attraction tickets.",
      details: "4-island boat tours, the Hon Thom cable car, VinWonders, motorbike rental and local restaurant recommendations.",
    },
  },

  newsPage: {
    metaTitle: "News",
    metaDescription: "Offers, events and Phu Quoc travel tips from Blessed Hotel.",
    heroDescription: "Offers, events and Phu Quoc travel tips.",
  },

  article: {
    postedBy: "Posted by",
    publishedOn: "Published",
    readingTime: "Reading time",
    minutes: "{n} min",
    inThisPost: "In this post",
    allNews: "All news",
    moreArticles: "More articles",
    ctaTitle: "Want to book or ask a question?",
    ctaBody: "Call, message us on Zalo or book quickly on our partner platforms.",
  },

  news: {
    "spa-mua-thu": {
      category: "Offer",
      title: "Autumn spa package: full relaxation at a special price",
      excerpt: "Enjoy a 90-minute treatment with herbal tea, available until the end of November.",
      body: [
        {
          paragraphs: [
            "Autumn in Phu Quoc brings softer sunshine and calmer seas. It is also when Blessed Spa launches its 90-minute relaxation package for hotel guests and visitors.",
          ],
        },
        {
          heading: "What the package includes",
          paragraphs: [
            "The treatment begins with a herbal foot soak, followed by a 60-minute full-body massage with lemongrass oil, and ends with a hydrating face mask.",
            "Afterwards, enjoy ginger honey tea and a plate of seasonal fruit in the relaxation lounge.",
          ],
        },
        {
          heading: "When it's available",
          paragraphs: [
            "The offer runs daily from 10:00 to 20:00 until the end of November. Please book ahead at the front desk or via Zalo to get your preferred time.",
          ],
        },
      ],
    },
    "brunch-cuoi-tuan": {
      category: "Dining",
      title: "Introducing Sunday Brunch at The Hearth",
      excerpt: "Over 60 Asian and Western dishes, a kids' play area and live music every Sunday.",
      body: [
        { paragraphs: ["From this Sunday, The Hearth opens its Sunday Brunch with more than 60 Asian and Western dishes, served from 11:00 to 14:30."] },
        {
          heading: "The menu",
          paragraphs: [
            "A fresh seafood counter offers Phu Quoc oysters, prawns and crab. Alongside it you'll find a grill station, noodles made to order, desserts and a Vietnamese drip coffee bar.",
            "Each week, the head chef adds two specials based on what's in season.",
          ],
        },
        {
          heading: "For the whole family",
          paragraphs: [
            "There is a supervised kids' play area and gentle acoustic music throughout. Children under 6 eat free when accompanied by an adult.",
          ],
        },
      ],
    },
    "hoang-hon-ho-boi": {
      category: "Event",
      title: "Sunset Pool Party at the end of the month",
      excerpt: "DJ, cocktails and BBQ by the infinity pool on the last Saturday evening of every month.",
      body: [
        {
          paragraphs: [
            "On the last Saturday evening of every month, the Blessed Hotel infinity pool becomes the place to watch the sunset, with a DJ, cocktails and an outdoor barbecue.",
          ],
        },
        {
          heading: "The programme",
          paragraphs: [
            "From 17:00, the poolside bar serves Sky Terrace signature cocktails. The barbecue starts at 18:30 with seafood and charcoal-grilled meats.",
            "The DJ plays until 22:00. Entry is free for hotel guests; visitors are kindly asked to reserve in advance.",
          ],
        },
      ],
    },
    "kinh-nghiem-du-lich-phu-quoc": {
      category: "Travel guide",
      title: "Phu Quoc in 4 days and 3 nights",
      excerpt: "A suggested itinerary, dishes worth trying and the best sunset spots on the island.",
      body: [
        {
          paragraphs: [
            "Four days is just enough to relax and explore Phu Quoc without rushing. Here is the itinerary our concierge team often suggests to first-time visitors.",
          ],
        },
        {
          heading: "Days 1 and 2: the south of the island",
          paragraphs: [
            "On day one, check in and walk to the beach to watch the sunset at Sunset Town. In the evening, head to the night market for grilled seafood.",
            "On day two, take a 4-island speedboat tour, snorkel over the coral and have lunch on an island. Come back in the afternoon to relax by the hotel pool.",
          ],
        },
        {
          heading: "Days 3 and 4: the north and shopping",
          paragraphs: [
            "On day three, head north for a swim and a visit to a pepper farm. On your last day, pick up fish sauce, pepper and pearls as gifts before heading to the airport.",
            "Our concierge can book cars, tours and restaurants for you. Just message us a day ahead.",
          ],
        },
      ],
    },
    "uu-dai-luu-tru-dai-ngay": {
      category: "Offer",
      title: "Stay longer, save more",
      excerpt: "Up to 25% off stays of 5 nights or more when you book directly with us.",
      body: [
        {
          paragraphs: ["If you're planning to stay in Phu Quoc for 5 nights or more, book directly with the hotel for a better rate."],
        },
        {
          heading: "The offer",
          paragraphs: [
            "15% off stays of 5 nights and 25% off stays of 7 nights. The offer includes daily breakfast and laundry for two sets of clothes per day.",
            "Long-stay guests also enjoy early check-in and late check-out when available.",
          ],
        },
        {
          heading: "How to book",
          paragraphs: [
            "Call our hotline or message us on Zalo with your arrival date, departure date and number of guests. The offer does not apply to bookings made through online travel platforms.",
          ],
        },
      ],
    },
    "yoga-san-thuong": {
      category: "Wellness",
      title: "Sunrise yoga on the rooftop",
      excerpt: "A free yoga class for hotel guests at 6:00 every morning, greeting the early sun on the island.",
      body: [
        {
          paragraphs: ["Every morning at 6:00, the Blessed Hotel rooftop hosts a gentle 45-minute yoga class, free for hotel guests."],
        },
        {
          heading: "The class",
          paragraphs: [
            "The class suits beginners and focuses on breathing and stretching. Mats, towels and water are provided.",
            "After the session, head down to The Hearth for breakfast or to the pool while the sun is still soft.",
          ],
        },
      ],
    },
  },
};
