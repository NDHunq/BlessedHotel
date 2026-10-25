@AGENTS.md

# Blessed Hotel Phú Quốc — website khách sạn

Website giới thiệu cho **một** khách sạn (Blessed Hotel, Phú Quốc). UI/UX lấy cảm hứng từ phong cách "lifestyle hotel" (bố cục thoáng, ảnh lớn), nhưng có nhận diện riêng.

> ⚠️ Chỉ tham khảo **bố cục/UX**. Không sao chép logo, ảnh, nội dung chữ, tên thương hiệu, code hay file font từ website tham khảo.

> 🌐 **Site đa ngôn ngữ: Tiếng Việt (gốc), English, 한국어, 简体中文.** Mọi chữ mới (tính năng, nội dung, nhãn nút, aria-label, metadata, alt ảnh…) **bắt buộc dịch đủ 4 ngôn ngữ** trong cùng lần thay đổi. Xem mục **Đa ngôn ngữ (i18n)** bên dưới.

**Không có tính năng đặt phòng trên site.** Khách đặt qua nút nổi "Đặt phòng" (góc phải dưới) → gọi điện, Zalo, Traveloka, Agoda, Klook. Không thêm lại form tìm/đặt phòng.

## Stack

- **Next.js 16** (App Router, `src/`, `cacheComponents: true`) — API khác bản cũ, đọc `node_modules/next/dist/docs/` trước khi dùng API lạ.
- **React 19**, **TypeScript**
- **Tailwind CSS v4** — cấu hình bằng `@theme` trong `src/app/globals.css`, **không có** `tailwind.config.*`.
- Font qua `next/font/google` (xem bảng dưới). Không dùng thư viện UI/icon — icon là SVG inline.
- **yet-another-react-lightbox** (plugin Zoom, Thumbnails, Counter, Captions): trình xem ảnh phòng trong `RoomGallery` và thực đơn dạng ảnh trong `MenuViewer`.
- **PostgreSQL 17** + **Drizzle ORM** (driver `postgres`): tin tức, chuyên mục, ảnh tải lên. Máy dev chạy database bằng Docker (`docker-compose.yml`; trên Mac này là **Colima**, không dùng Docker Desktop/OrbStack vì điều khoản bản quyền thương mại). `aws4fetch` để tải ảnh lên Cloudflare R2.

## Lệnh

```bash
npm run dev            # http://localhost:3000 (cần database đang chạy)
npm run build          # build production (bắt buộc pass trước khi xong việc). KHÔNG cần database (xem "Dữ liệu tin tức")
npm run lint           # ESLint (bắt buộc sạch)
npm start              # chạy bản build

npm run db:up          # bật PostgreSQL trong Docker (Mac: chạy `colima start` trước nếu máy vừa khởi động)
npm run db:migrate     # áp dụng migration trong drizzle/
npm run db:seed        # nạp db/seed.json (5 chuyên mục, 6 bài) vào database TRỐNG; đã có bài thì bỏ qua
npm run db:generate    # sau khi sửa src/lib/db/schema.ts: tạo file migration mới trong drizzle/ (commit file này)
npm run db:studio      # giao diện xem/sửa database (Drizzle Studio)
npm run hash-password  # tạo ADMIN_PASSWORD_HASH cho .env (nhập mật khẩu khi được hỏi)
```

**Chạy lần đầu trên máy mới**: cài Docker (`brew install colima docker docker-compose`, `colima start`) → `cp .env.example .env.local` rồi điền `ADMIN_PASSWORD_HASH` (`npm run hash-password`, máy dev có thể `ALLOW_WEAK=1`) và `SESSION_SECRET` (`openssl rand -base64 48`) → `npm install` → `npm run db:up && npm run db:migrate && npm run db:seed` → `npm run dev`. `.env.local` / `.env` không bao giờ commit (có `.env.example` làm mẫu).

## Cấu trúc

```
src/
  proxy.ts              # URL thiếu tiền tố ngôn ngữ → chuyển sang /<ngôn ngữ>/… (cookie → Accept-Language → vi)
  app/
    [lang]/             # MỌI trang nằm dưới segment ngôn ngữ (vi | en | ko | zh)
      layout.tsx        # layout gốc: chỉ <html lang>, <body>, font, metadata; generateStaticParams 4 ngôn ngữ
      (site)/           # nhóm route website công khai (không ảnh hưởng URL): layout.tsx = SiteChrome (Header + Footer + BookingFab)
      (site)/page.tsx   # trang chủ
      (site)/about/ rooms/ dining/ experiences/ news/   # mỗi tab menu là 1 trang (đường dẫn tiếng Việt cũ: redirect 308 trong next.config.ts)
      (site)/news/[id]/ # chi tiết bài viết theo mã số `id` (generateStaticParams từ `news`; id lạ → notFound())
      admin/            # trang quản trị (layout riêng, noindex); actions.ts = mọi Server Action (đăng nhập, lưu/xoá bài, tải ảnh, chuyên mục)
      admin/login/      # đăng nhập
      admin/(panel)/    # cần đăng nhập: danh sách bài · news/new · news/[id] (sửa) · categories (chuyên mục)
      not-found.tsx     # 404 trong một ngôn ngữ (tự bọc SiteChrome vì nằm ngoài nhóm (site))
    media/[...key]/     # route phục vụ ảnh tải lên khi STORAGE_DRIVER=local (chặn đi ra ngoài thư mục ảnh)
    global-not-found.tsx # 404 cho URL không khớp route nào (hiện 4 ngôn ngữ; bật `experimental.globalNotFound`)
    globals.css         # design tokens (@theme), font dự phòng CJK theo :lang
  i18n/
    config.ts           # locales, localeMeta (nhãn, mã Intl, hreflang…), localizeHref, switchLocalePath, fill()
    dictionaries/       # vi.ts (GỐC, định nghĩa kiểu `Dictionary`) · en.ts · ko.ts · zh.ts
    server.ts           # getI18n() → { locale, t, href } cho Server Component (đọc [lang] bằng next/root-params)
    format.ts           # formatPrice (VND), formatDate, readingMinutes theo ngôn ngữ
    metadata.ts         # pageMetadata(): title/description + canonical + hreflang 4 ngôn ngữ
  components/
    admin/              # PostEditor (tab nội dung 4 ngôn ngữ, thiết lập, xem trước thẻ bài), MarkdownEditor (thanh công cụ + tab Xem trước),
                        #   SeoPanel (điểm SEO + từ khoá chính + danh sách kiểm tra), SerpPreview (tiêu đề SEO, mô tả meta, xem trước trên Google),
                        #   CategoryManager (thêm/sửa/xoá chuyên mục), LoginForm
    layout/             # SiteChrome, Header (client, active tab theo pathname), LanguageSwitcher (LanguageMenu desktop, LanguagePills mobile), Footer, Logo
    home/               # section trang chủ: Hero + HeroSlideshow, Explore, RoomTypes, PromoBanner, BrandBand, News
    booking/            # BookingFab (nút nổi), ChannelList, BookingCta, OpenBookingButton, events.ts
    news/               # trang tin (kiểu Vinpearl): NewsBrowser (client: ô chuyên mục lọc + tìm kiếm + "Tin mới nhất"),
                        #   FeaturedNews (1 lớn + 2 nhỏ), SideTitle (tiêu đề + vạch gold), PostMiniList, RoomsMiniList, SideBookingCta
    ui/                 # Markdown (hiển thị nội dung bài từ parseMarkdown, dùng ở trang bài viết + xem trước trong admin), Button, ArrowLink, Carousel, Container, SectionHeading/Label, PageHero,
                        #   RoomCard, NewsGrid, Stats + CountUp (số chạy khi cuộn tới)
                        #   VenueCard (thẻ ngang nhà hàng/spa/gym: PhotoScroller cuộn ảnh + giờ mở cửa, điện thoại, MenuViewer "Xem menu", nút đặt bàn/đặt chỗ)
                        #   RoomGallery (bên ngoài 3 ảnh xếp chồng nghiêng lộn xộn kiểu xấp ảnh, không ghi số lượng → trình xem ảnh đủ ảnh: next/prev, zoom, vuốt, phím ←/→, bộ đếm)
  lib/
    site.ts             # dữ liệu KHÔNG phụ thuộc ngôn ngữ: ảnh, giá, số liệu, link, id/slug (không chứa chữ hiển thị). Tin tức KHÔNG nằm ở đây (database)
    db/schema.ts        # bảng database (Drizzle): categories, category_translations, posts, post_translations, media
    db/index.ts         # getDb(): kết nối PostgreSQL (DATABASE_URL), tạo khi dùng lần đầu
    news.ts             # đọc/ghi tin tức + chuyên mục: get* cho trang công khai (cache, thẻ NEWS_TAG), admin* cho trang quản trị, write*/remove*
    auth.ts             # đăng nhập 1 tài khoản (ADMIN_USERNAME + ADMIN_PASSWORD_HASH scrypt), khoá tạm khi sai nhiều lần, requireAdmin()
    session.ts          # cookie phiên có chữ ký HMAC (SESSION_SECRET), dùng chung cho proxy.ts và server
    storage.ts          # lưu ảnh tải lên: thư mục UPLOAD_DIR hoặc Cloudflare R2 (STORAGE_DRIVER), nhận dạng ảnh theo byte đầu file
    images.ts           # canOptimizeImage(): ảnh từ nguồn lạ hiển thị next/image `unoptimized` thay vì làm lỗi trang
    markdown.ts         # Markdown đơn giản cho nội dung bài: parseMarkdown → khối, parseInline, safeUrl
    seo.ts              # analyzeSeo(): chấm điểm SEO bài viết theo từng ngôn ngữ (hàm thuần, chạy cả client lẫn server)
    admin.ts            # kiểu PostDraft cho trình soạn, newPostDraft(), sanitizeDraft() (kiểm tra dữ liệu gửi lên Server Action)
    content.ts          # ghép site.ts + dictionary → getRooms/getNav/… (chữ đã dịch + href có tiền tố ngôn ngữ); getNews/getNewsCategories (async, từ database)
drizzle/                # migration SQL do `npm run db:generate` tạo (commit cùng thay đổi schema); scripts/migrate.mjs áp dụng
scripts/                # migrate.mjs, seed.mjs, hash-password.mjs (chạy bằng Node, không qua Next)
db/seed.json            # dữ liệu ban đầu: 5 chuyên mục + 6 bài đủ 4 ngôn ngữ (chỉ dùng cho database trống)
docker-compose.yml      # PostgreSQL cho máy dev (cổng 127.0.0.1:5432)
public/menus/           # ảnh từng trang thực đơn <slug>-<n>.svg (ẢNH TẠM, thay bằng menu thật; khai báo trong `menu` của venue ở site.ts)
public/brands/          # logo Zalo, Traveloka, Agoda, Klook; social/ = icon Facebook, Instagram, TikTok, Zalo (Simple Icons)
public/flags/           # quốc kỳ vuông vn/gb/kr/cn (flag-icons, MIT) cho LanguageSwitcher, hiển thị cắt tròn; mã cờ ở `localeMeta[locale].flag`
```

- **Menu chính** (`nav` trong `site.ts`, nhãn trong dictionary `nav`): Giới thiệu `/about` · Các hạng phòng `/rooms` · Ẩm thực `/dining` · Trải nghiệm `/experiences` · Tin tức `/news`. Mỗi tab mở trang riêng; trang chủ chỉ tóm tắt và dẫn tới các trang đó.
- **Trang chủ** (thứ tự): Hero (banner) → Explore (băng thẻ "Khám phá Blessed Hotel") → RoomTypes (tab lọc Phòng/Suite/Villa) → PromoBanner → BrandBand (băng đen + hàng điểm nhấn) → News.
- **Header trong suốt ở mọi trang** (chữ trắng, tab đang mở màu `accent`) nằm đè lên banner, chuyển nền trắng khi cuộn > 24px hoặc mở menu mobile; logic trong `Header.tsx` (`transparent`, `navColor`). Vì vậy **mọi trang phải mở đầu bằng banner ảnh/nền tối có `-mt-16`** (`Hero`, `PageHero`, banner trang Về chúng tôi, `not-found.tsx`). **Ngoại lệ:** trang mở đầu bằng nền trắng (hiện là chi tiết bài viết `/<lang>/news/<id>`) khai báo trong `SOLID_HEADER_PAGES` (regex trong `Header.tsx`) → header luôn nền trắng, trang không dùng `-mt-16`. `HeroSlideshow` chuyển `hero.slides` (ảnh + chữ + link riêng mỗi slide) mỗi `hero.interval` = 4000ms.
- **Trang Ẩm thực** (bố cục theo vinpearl.com/.../foods + thẻ nhà hàng kiểu Marriott): `PageHero` → tiêu đề + đoạn dẫn căn giữa → mỗi nhà hàng một `VenueCard`, thẻ thứ 2, 4… truyền `reverse` (ảnh phải, chữ trái) để xen kẽ (Blessed Bistro, Olea Café; dữ liệu `dining` trong `site.ts`, chữ `dining[slug]`) → `BookingCta`.
- **Trang Trải nghiệm** (bố cục theo trang chủ vinpearl.com): banner toàn màn hình (tiêu đề + 1 dòng + nút viền "Khám phá" cuộn tới `#explore`) → `VenueCard` Blessed Spa (Xem menu + Đặt chỗ) và Blessed Gym (chỉ giờ mở cửa) (dữ liệu `experiences` trong `site.ts`, chữ `experiences[slug]`) → `BookingCta`.
- **`VenueCard`**: ảnh `gallery` cuộn ngang (mũi tên, vuốt, bộ đếm); "Xem menu" chỉ hiện khi venue có `menu` (mở popup ảnh lật trang, zoom); nút đặt hiện khi trang truyền `reserveLabel`, link lấy từ `reserveUrl` (mở tab mới). **`reserveUrl` đang để trống** (chờ đối tác làm trang đặt bàn) → tạm thời nút gọi số `phone` của venue. Nhãn chung trong dictionary `venue`.
- **Trang Các hạng phòng**: mỗi phòng hiển thị `RoomGallery` với `room.gallery` (3–4 ảnh có `alt` dùng làm chú thích; ảnh đầu trùng `room.image`). Cạnh nút "Đặt phòng này" có nút "Xem thêm" (`RoomDetails`) mở modal kiểu Vinpearl: tên khách sạn + nút đóng → băng ảnh có chấm → tên phòng, mô tả → lưới "Tiện ích" (id trong `rooms[].facilities` ở `site.ts` = tiện ích riêng + `baseFacilities`; nhãn trong dictionary `roomFacilities`).
- **Trang con**: `PageHero` (ảnh dưới header trong suốt + breadcrumb + tiêu đề) → nội dung → `BookingCta` (trừ Tin tức).
- **Tin tức** (bố cục tham khảo trang tin Vinpearl vinpearl.com/vi/news/travel-guide): **dữ liệu nằm trong database** (xem "Dữ liệu tin tức" bên dưới), không nằm trong `site.ts` hay dictionary. Mỗi bài: chuyên mục (mã chữ, VD offer), trạng thái nháp/đã đăng, ngày, ảnh bìa, `featured`; mỗi ngôn ngữ: tiêu đề, tóm tắt, `keyPoints` (3 ý chính), nội dung Markdown, 3 trường SEO. Tên chuyên mục theo ngôn ngữ cũng trong database. Trang công khai chỉ hiện bài đã đăng, có ngày và có tiêu đề ở ngôn ngữ đang xem.
  - **Danh sách `/news`**: `PageHero` → hàng ô chuyên mục có ảnh (ô "Tất cả" + 5 chuyên mục; bấm để lọc) → "Tin nổi bật" (`featured`: 1 bài lớn chữ đè ảnh + nút, 2 bài nhỏ xếp chồng) → 2 cột: "Tin mới nhất" (lưới 2 cột: ảnh, tiêu đề, ngày · chuyên mục, tóm tắt; lọc theo chuyên mục + từ khoá ngay trên trang) + thanh bên 340px (ô tìm kiếm, `RoomsMiniList`, `SideBookingCta`). Tiêu đề khối dùng `SideTitle`.
  - **Chi tiết `/news/[id]`**: nền trắng, header đặc. Cột bài: breadcrumb (Trang chủ › Tin tức › chuyên mục) → `h1` → ngày + thời gian đọc + nhãn chuyên mục → đoạn mở đầu → "Mục lục" thu gọn (`<details>`, mục đánh số 1, 2… neo `section-N`) → khung viền gold "Thông tin nhanh" (`keyPoints`) → ảnh 16:9 có chú thích → các mục (tiêu đề đánh số) → khối liên hệ đặt phòng. Thanh bên dính khi cuộn: "Bài viết dành cho bạn" (`PostMiniList`), `RoomsMiniList`, `SideBookingCta`. Không hiển thị lượt xem (không có số thật).
  - Bài không tồn tại / chưa đăng vẫn trả HTTP 200 nhưng hiển thị trang 404 + `noindex` (nội dung bài nằm trong `<Suspense>`, `notFound()` xảy ra khi đang stream), đây là hành vi của Next, không phải lỗi.
  - Link cũ `/<lang>/tin-tuc/<slug>` của 6 bài ban đầu redirect 308 về `/news/<id>` (bảng `legacyNewsSlugs` trong `next.config.ts`).
- **Trang Giới thiệu** (bố cục theo modernvillagelifestyle.vn/vi/ve-mvillage; dữ liệu `about` trong `site.ts`): banner toàn màn hình (khẩu hiệu mảnh + chữ "Blessed" serif lớn, `h1` ẩn) → section nền `surface` có 2 vòng tròn trang trí mờ: tiêu đề căn giữa có cụm tô màu (`philosophy.title` = `before` + `highlight` + `after`, để mỗi ngôn ngữ tự đặt vị trí cụm tô màu), 2 đoạn giới thiệu (`philosophy.body`), `Stats` hàng ngang, 4 thẻ ảnh dọc chữ nằm trên ảnh (`pillars`) → ảnh tràn viền + chữ trái, tiêu đề trộn chữ mảnh/đậm (`closing`).
- **Footer** (dùng chung `Container`): hàng trên: logo + khẩu hiệu (trái) · icon mạng xã hội 22px (phải). Hàng chính 4 cột: Liên hệ (hotline, email, địa chỉ) · Khám phá · Đặt phòng · Vị trí (bản đồ). Tiêu đề cột `text-sm` chữ hoa `brand-400`, link 15px `white/80`. Dòng cuối: bản quyền + giấy phép 13px. **Không có nhóm "Chính sách"** (đã bỏ theo yêu cầu).
- **Trang quản trị `/<lang>/admin`**: không link từ website, `robots: noindex` trong `admin/layout.tsx`, không dùng `pageMetadata`. Mọi thay đổi lưu thẳng vào database.
  - **Đăng nhập** (1 tài khoản, không có bảng user): `ADMIN_USERNAME` + `ADMIN_PASSWORD_HASH` (scrypt, tạo bằng `npm run hash-password`) trong biến môi trường; đổi mật khẩu = sửa `.env` rồi khởi động lại. Đúng → cookie httpOnly `blessed_admin` ký HMAC bằng `SESSION_SECRET` (`lib/session.ts`), hạn 8 giờ. Sai 5 lần trong 15 phút → khoá 15 phút theo IP (`cf-connecting-ip` / `x-forwarded-for`, lưu trong bộ nhớ: đủ cho 1 server). `proxy.ts` chặn mọi `/<lang>/admin/...` khi cookie không hợp lệ → `/<lang>/admin/login?next=…` (riêng request Server Action được cho qua để action tự trả lỗi "unauthorized"); đã đăng nhập mà mở trang đăng nhập → vào `/admin`.
  - **Server Action** (`admin/actions.ts`): mọi action trừ `login` chạy trong `guarded()` → `requireAdmin()` trước tiên (Server Action có thể bị gọi thẳng), lỗi trả về mã (`unauthorized`, `server`…) để giao diện báo, không làm hỏng trang. `next/root-params` không dùng được trong Server Action: ngôn ngữ gửi kèm form khi cần chuyển trang. Dữ liệu gửi lên luôn kiểm tra lại ở server (`sanitizeDraft`, mã chuyên mục, ảnh). Ghi xong gọi `updateTag(NEWS_TAG)`.
  - **Khung `(panel)`**: logo + nhãn Quản trị, Bài viết, Chuyên mục, Xem website, đổi ngôn ngữ giao diện, Đăng xuất; nội dung trang trong `<Suspense>` (đọc database lúc có request).
  - **Bài viết**: bảng danh sách (cả nháp và đã đăng, nhãn trạng thái, điểm SEO; "Xem" chỉ hiện với bài đã đăng) → `PostEditor`: tab 4 ngôn ngữ (chấm xanh = đủ tiêu đề + tóm tắt), tóm tắt, 3 ý "Thông tin nhanh", **nội dung soạn bằng Markdown** (`MarkdownEditor`: H, B, I, danh sách, trích dẫn, link, ảnh từ link, tải ảnh lên máy chủ; tab Xem trước dùng đúng component `Markdown` của trang bài viết); thiết lập chung (chuyên mục, ngày, Tin nổi bật, ảnh bìa: dán link hoặc tải lên); xem trước thẻ bài. Nút: bài mới/nháp = **Lưu nháp** + **Đăng bài**; bài đã đăng = **Chuyển về nháp** + **Cập nhật**; bài đã lưu có **Xoá bài** (xác nhận ngay tại chỗ). Lưu nháp được khi còn thiếu; đăng cần đủ tiêu đề + tóm tắt 4 ngôn ngữ, ngày và ảnh bìa (kiểm tra cả ở server). Bài mới lưu lần đầu → chuyển sang trang sửa `/admin/news/<id>`. Còn thay đổi chưa lưu → nhãn "Có thay đổi chưa lưu" + trình duyệt hỏi lại khi đóng tab.
  - **Chuyên mục** (`CategoryManager`): bảng tên (4 ngôn ngữ) + mã + số bài; thêm (mã `a-z0-9-` không trùng + tên đủ 4 ngôn ngữ), sửa tên, xoá (xác nhận ngay trên dòng; không cho xoá khi còn bài, kiểm tra cả ở server).
  - **Ảnh tải lên** (`lib/storage.ts`): JPEG/PNG/WebP/AVIF/GIF ≤ 10MB, loại ảnh nhận theo byte đầu file (không tin loại file trình duyệt khai báo; không nhận SVG). `STORAGE_DRIVER=local` → `UPLOAD_DIR/<năm>/<tháng>/<uuid>.<đuôi>`, xem qua `/media/...`; `r2` → Cloudflare R2, xem qua `R2_PUBLIC_URL` (tên miền này tự thêm vào `images.remotePatterns` lúc build). Mỗi ảnh ghi 1 dòng bảng `media`. Giới hạn body Server Action/proxy 11MB trong `next.config.ts`.
  - **Chấm điểm SEO khi soạn** (`lib/seo.ts` → `analyzeSeo`): chấm lại theo từng phím gõ, riêng cho từng ngôn ngữ. Điểm hiện ở tab ngôn ngữ, ở khung `SeoPanel` (dính bên phải: điểm 0–100, ô **từ khoá chính**, nhóm Cần sửa / Nên cải thiện / Gợi ý thêm / Đạt; bấm vào mục chưa đạt thì nhảy tới ô `seo-field-<field>` cần sửa) và ở cột SEO của danh sách bài. `SerpPreview` (dưới nội dung): ô **tiêu đề SEO** và **mô tả meta** (để trống thì dùng tiêu đề / tóm tắt; bộ đếm độ dài) + khung xem trước kết quả Google máy tính/điện thoại.
    - **Nguồn của từng mục phải trung thực** (`source` trong mỗi `SeoCheck`, hiện thành nhãn trong khung):
      - `"google"` (nhãn "Google ↗", link tới `GOOGLE_DOCS`): có trong tài liệu chính thức Google Search Central. **Chỉ các mục này tính điểm** (`WEIGHTS`): có mô tả meta, tiêu đề/mô tả không dài quá chỗ hiển thị, ≥ 2 tiêu đề mục, ảnh bìa, ảnh trong bài có alt, link nội bộ, không nhồi nhét từ khoá (mật độ > 2,5%). Điểm = điểm đạt / tổng điểm các tiêu chí áp dụng.
      - `"convention"` (nhãn "Thông lệ"): thông lệ Yoast / Rank Math mà Google không quy định (mọi mục về từ khoá chính, số từ tối thiểu, mật độ thấp, đoạn văn dài, có ảnh trong bài, tiêu đề/mô tả ngắn, trùng từ khoá). Chưa đạt thì `status: "tip"` (nhóm "Gợi ý thêm"), **không bao giờ trừ điểm**.
      - Thêm tiêu chí mới: chỉ gắn `"google"` khi có trang tài liệu Google nói rõ (kiểm tra link còn sống), còn lại là `"convention"`. Không viết "theo Google" cho ngưỡng số: Google không giới hạn độ dài tiêu đề/mô tả (chỉ cắt cho vừa màn hình) và không có số từ hay mật độ từ khoá lý tưởng.
    - Ngưỡng số đều là tham khảo: độ dài theo **độ rộng** (chữ Hàn/Trung tính 2; tiêu đề gồm hậu tố ` | Blessed Hotel` 30–60, mô tả 120–160), số từ (`Intl.Segmenter`, ngưỡng tự ước lượng từng ngôn ngữ trong `WORDS`), mật độ = số lần / tổng số từ như Yoast.
    - Tìm từ khoá không phân biệt hoa/thường nhưng phân biệt dấu tiếng Việt; vi/en khớp nguyên từ, ko chỉ chặn đầu từ (trợ từ dính phía sau), zh không có ranh giới từ.
    - `focus_keyword`, `seo_title`, `meta_description` lưu theo từng ngôn ngữ trong `post_translations`; trang bài viết dùng tiêu đề SEO / mô tả meta (nếu có, không thì tiêu đề / tóm tắt) cho `<title>` và `<meta description>`. Màu tiêu đề Google trong khung xem trước: token `serp-title`, `serp-text` (chỉ dùng ở đây).
  - Chữ giao diện trong dictionary `admin` (`nav`, `list`, `login`, `categories`, `editor`, `seo`).
- **Nội dung bài viết là Markdown**: trang bài viết lấy `post.body` (Markdown trong database), tách khối bằng `parseMarkdown` rồi hiển thị bằng `Markdown`; tiêu đề `##` được đánh số và làm mục lục (neo `section-N`), `###` là tiêu đề nhỏ, ảnh một dòng riêng thành ảnh lớn có chú thích (= mô tả ảnh).
- **Đặt phòng**: link các kênh nằm ở `bookingChannels` trong `site.ts` (nhãn/ghi chú trong dictionary `booking.channels`). Muốn mở menu đặt phòng từ một nút bất kỳ thì dùng `OpenBookingButton` (gọi `openBooking()` trong `components/booking/events.ts`).

## Dữ liệu tin tức (database)

- Bảng (`src/lib/db/schema.ts`): `categories` (mã chữ, thứ tự) + `category_translations` (tên theo ngôn ngữ); `posts` (id số dùng trên URL, chuyên mục, `status` draft/published, `date`, `featured`, `cover_image`) + `post_translations` (khoá post_id + locale: tiêu đề, tóm tắt, `key_points` jsonb, `body` Markdown, `focus_keyword`, `seo_title`, `meta_description`); `media` (ảnh tải lên). Sửa schema → `npm run db:generate` → commit file trong `drizzle/` → `npm run db:migrate` (trên server chạy `scripts/migrate.mjs` khi khởi động).
- **Build không truy cập database**: mọi hàm đọc cho trang công khai (`getPublishedPosts`, `getCategories` trong `lib/news.ts`) gọi `await connection()` trước, rồi đọc qua hàm `"use cache"` + `cacheTag(NEWS_TAG)` + `cacheLife("max")`. Kết quả cache trong bộ nhớ server tới khi Server Action gọi `updateTag(NEWS_TAG)`. Hệ quả: (1) component đọc tin tức **phải nằm trong `<Suspense>`** (có khung xương: `NewsGridSkeleton`, `ArticleSkeleton`, khung admin); (2) `generateStaticParams` của `/news/[id]` và `/admin/news/[id]` trả về id mẫu `"1"` (Cache Components bắt buộc ≥ 1 id), mọi bài render khi có người mở. Không đọc database ngoài các hàm này, không đọc database trong `"use cache"` mà thiếu `connection()` ở nơi gọi (nội dung sẽ bị đóng băng theo database lúc build).
- Trang quản trị đọc qua `admin*` (không cache, có `connection()`).
- Ảnh bài viết có thể là link bất kỳ → luôn truyền `unoptimized={!post.optimize}` (`canOptimizeImage`) cho `next/image`.
- Dữ liệu ban đầu ở `db/seed.json` (6 bài, 5 chuyên mục, đủ 4 ngôn ngữ). Bài mới viết trong trang quản trị, không thêm bài vào code.

## Đa ngôn ngữ (i18n) — QUY TẮC BẮT BUỘC

Ngôn ngữ: `vi` (gốc, mặc định) · `en` · `ko` · `zh` (giản thể, `zh-CN`). URL luôn có tiền tố: `/vi/rooms`, `/en/rooms`… **Đường dẫn đặt bằng tiếng Anh, dùng chung cho cả 4 ngôn ngữ** (không đặt đường dẫn tiếng Việt, không dịch theo ngôn ngữ). Đổi đường dẫn thì thêm redirect 308 từ đường dẫn cũ trong `next.config.ts`. Bài viết dùng URL `/news/<id>` (`id` số, không đổi; `slug` chỉ là khoá chữ trong dictionary, không lên URL) để sau này chuyển sang CMS/database không phải đổi link. `proxy.ts` chuyển URL thiếu tiền tố theo: cookie `NEXT_LOCALE` (lưu khi người dùng chọn ở `LanguageSwitcher`) → `Accept-Language` → `vi`.

**Khi thêm/sửa BẤT KỲ chữ nào hiển thị cho người dùng** (tính năng mới, section mới, bài viết, phòng, nhãn nút, `aria-label`, `alt` ảnh, chú thích, metadata title/description, thông báo lỗi…):
1. Thêm/sửa key trong `src/i18n/dictionaries/vi.ts` (bản gốc).
2. **Cùng lần đó** thêm/sửa key tương ứng trong `en.ts`, `ko.ts`, `zh.ts`. Ba file này có kiểu `Dictionary` (= cấu trúc vi.ts) nên thiếu key là `npm run build` / `npx tsc --noEmit` báo lỗi. Không được để chuỗi tiếng Việt trong file ngôn ngữ khác, không để trống, không dùng "TODO".
3. Không viết cứng chữ trong component/trang. Server Component: `const { t, locale, href } = await getI18n()`. Client Component: nhận chữ đã dịch qua props từ server parent (không import dictionary vào client).
4. Link nội bộ luôn qua `href("/duong-dan")` (hoặc dữ liệu từ `lib/content.ts`, đã có tiền tố). Link ngoài, `tel:`, `mailto:` giữ nguyên.
5. Chuỗi có biến dùng `{tên}` + `fill()`, VD `"{n} khách"` → `fill(t.ui.guests, { n: 2 })`. Không ghép chuỗi theo thứ tự tiếng Việt trong code (trật tự từ mỗi ngôn ngữ khác nhau).
6. Nội dung theo danh sách (phòng, nhà hàng, slide…) đặt khoá theo id/slug trong dictionary (khớp id/slug trong `site.ts`), không dùng mảng theo thứ tự. **Ngoại lệ: bài viết và tên chuyên mục tin tức nằm trong database** (bản dịch theo `locale` trong `post_translations` / `category_translations`), người quản trị nhập đủ 4 ngôn ngữ trong trang quản trị.
7. Số/giá/ngày định dạng bằng `formatPrice` / `formatDate` / `localeMeta[locale].intl` — không viết cứng `"vi-VN"`.
8. Trang mới: đặt dưới `src/app/[lang]/`, export `generateMetadata` dùng `pageMetadata({ locale, path, title, description })` (tự thêm canonical + hreflang 4 ngôn ngữ).
9. Thêm ngôn ngữ mới: thêm mã vào `locales` + `localeMeta` (`i18n/config.ts`, kèm `flag` và file `public/flags/<mã>.svg` lấy từ flag-icons `flags/1x1/`), tạo `dictionaries/<mã>.ts` kiểu `Dictionary`, khai báo trong `i18n/server.ts`, thêm vào `global-not-found.tsx` và regex redirect `/:lang(vi|en|ko|zh)/…` trong `next.config.ts`.

Hướng dẫn dịch:
- Dịch theo nghĩa, văn phong tự nhiên của từng ngôn ngữ (tiếng Hàn dùng kính ngữ 합쇼체/해요체 như web khách sạn Hàn; tiếng Trung giản thể).
- **Không dịch tên riêng**: Blessed Hotel, Deluxe, Premier Ocean View, Junior Suite, Garden Villa, Blessed Bistro, Olea Café, Blessed Spa, Blessed Gym, Traveloka, Agoda, Klook, Zalo. Giờ mở cửa, giá VND giữ nguyên số.
- Địa danh: Phú Quốc → "Phu Quoc" (en) · "푸꾸옥" (ko) · "富国岛" (zh). Thị trấn Hoàng Hôn → "Sunset Town" · "선셋 타운" · "日落小镇"; Cầu Hôn → "Kiss Bridge" · "키스 브릿지" · "亲吻桥"; An Thới → "An Thoi" · "안터이" · "安泰". Địa chỉ viết theo thứ tự quen thuộc của từng nước.
- Khoảng trắng nằm trong chuỗi dịch, không để component tự chèn (tiếng Trung không có dấu cách giữa các phần, VD `closing.titleLight`, `philosophy.title[].rest`).
- Tiếng Hàn: CSS `:lang(ko) { word-break: keep-all }` để không ngắt giữa từ. Font Hàn/Trung dùng font hệ thống qua `--font-cjk-*` theo `<html lang>` (`globals.css`).
- Nhãn trình xem ảnh (yet-another-react-lightbox) nằm trong dictionary `lightbox`.

Kiểm tra trước khi xong việc: `npm run build` pass, mở thử ít nhất `/vi` và một ngôn ngữ khác (`/en`, `/ko`, `/zh`) ở trang vừa sửa, không còn chữ tiếng Việt lọt sang ngôn ngữ khác.

## Design system

Chỉ dùng token qua class Tailwind — **không viết cứng mã hex** trong component. Cần màu/giá trị mới thì thêm vào `@theme` trong `globals.css`.

| Token | Giá trị | Dùng cho |
|---|---|---|
| `brand-500` | `#B8902F` (vàng gold) | Gold trang trí: icon, viền nhấn, số lớn |
| `brand-600` | `#93701F` | Nền nút chính, chữ link/eyebrow (tương phản với chữ trắng đạt AA 4.6:1) |
| `brand-700` | `#7A5C1A` | Hover |
| `brand-50` / `brand-100` | `#FBF7EC` / `#F5EBCF` | Nền nhạt, icon badge |
| `accent` / `accent-soft` | `#E3C987` / `#F7F0DF` | Gold sáng trên nền tối (ảnh, footer); chip |
| `ink` / `ink-soft` | `#171717` / `#1F2937` | Chữ chính, nền footer |
| `muted` | `#6B7280` | Chữ phụ |
| `line` | `#E5E7EB` | Viền |
| `surface` / `cream` | `#F9FAFB` / `#FBF8F2` | Nền section xen kẽ |
| `sand` | `#F6F4F0` | Nền thẻ "Khám phá", tin tức, khối `BookingCta` |
| `rounded-card`, `shadow-card` | `0.75rem`, `0 4px 12px rgb(0 0 0/.1)` | Ít dùng; thẻ mới dùng `rounded-2xl`, không bóng |

**Font** (theo bộ font của site tham khảo):

| Class | Font | Dùng cho |
|---|---|---|
| `font-sans` (mặc định) | Be Vietnam Pro | Chữ thường |
| `font-display` | Inter Tight | Tiêu đề lớn (h1/h2), `font-semibold tracking-[-0.01em]`. **Không dùng `tracking-tight`**: Inter Tight vốn đã hẹp, ép thêm làm chữ có dấu tiếng Việt dính vào nhau. Site tham khảo dùng **Forma DJR** (font trả phí); Inter Tight là bản miễn phí gần nhất. Nếu mua license Forma DJR thì nạp bằng `next/font/local` vào biến `--font-inter-tight` (hoặc đổi biến trong `@theme`) |
| `font-serif` | Cormorant | Chỉ dùng điểm xuyết: logo, dòng phụ dưới tiêu đề banner, tên riêng (phòng, nhà hàng, khối thương hiệu), chữ ký và câu trích dẫn. Không dùng cho số liệu, tiêu đề mục hay tên giá trị |
| `font-overline` | Mona Sans | Chỉ còn dùng ở chữ "HOTEL" của logo và nhãn trong menu đặt phòng |

## Quy tắc thiết kế (chống "nhìn là biết AI làm")

Phong cách bám theo modernvillagelifestyle.vn: ít trang trí, chữ đậm, ảnh lớn, thẻ nền xám ấm. Trước khi thêm/sửa giao diện, đối chiếu các quy tắc dưới.

**Không làm:**
- Eyebrow chữ hoa giãn chữ phía trên tiêu đề section (bỏ hẳn, `SectionHeading` không còn prop `eyebrow`).
- Công thức lặp "eyebrow + tiêu đề + mô tả xám + nút viền bên phải" cho mọi section.
- Lưới thẻ giống hệt nhau có icon trong vòng tròn màu nhạt; icon tự vẽ bằng SVG cho tính năng/dịch vụ.
- Thẻ nổi lên / đổ bóng khi hover; viền + bóng cùng lúc.
- Dấu gạch ngang dài (—) trong nội dung; câu chữ chung chung ("tiện ích chu đáo", "trải nghiệm trọn vẹn") không kèm chi tiết cụ thể.
- Icon thương hiệu tự vẽ: dùng file chính thức trong `public/brands/` (Simple Icons, Wikimedia).

**Nên làm:**
- Tiêu đề section: `SectionHeading` (chỉ tiêu đề đậm `font-display font-semibold`, mô tả nếu thật cần). Hai kiểu bố cục: **căn giữa một mình**, hoặc **trái + điều khiển bên phải** (thanh tab dạng viên thuốc, hay `ArrowLink` "Xem tất cả ↗").
- Thẻ nội dung: nền `bg-sand rounded-2xl`, không viền không bóng; ảnh trên; `Label` (nhãn xám chữ hoa, VD "ẢM THỰC", "ƯU ĐÃI · 10/10/2026"); tiêu đề `text-xl font-semibold`; mô tả; `ArrowLink`/"Xem chi tiết ↗" màu `brand-600` ở đáy thẻ.
- Thẻ phòng (`RoomCard`): nền trắng + `ring-1 ring-line`, không bóng.
- Nhiều thẻ ngang hàng → `Carousel` (cuộn ngang, nút mũi tên tròn đè mép).
- Danh sách tính năng/dịch vụ → danh sách đánh số `01 02…` ngăn bằng đường kẻ mảnh, hoặc hàng chữ ngăn bằng đường kẻ (`BrandBand`). Không dùng thẻ icon.
- Số liệu nổi bật → `Stats`: hàng ngang căn giữa, số `font-display font-medium` màu `brand-600` + nhãn xám, ngăn bằng đường kẻ dọc mảnh, chạy số khi cuộn tới. Không làm ô số kẻ khung, không dùng số siêu đậm cỡ lớn. Không đưa điểm đánh giá Google vào.
- Banner ảnh tràn viền: tiêu đề trắng đậm, một dòng mô tả, nút viên thuốc (`primary` gold, `light` trắng, `dark` đen chữ hoa trên banner trang chủ).
- Mỗi section một bố cục khác nhau; xen kẽ section ảnh tràn viền với section nền trắng.
- Nội dung ngắn, cụ thể: tên riêng, con số, giờ giấc, địa danh.

Quy ước kỹ thuật:
- Nút: `Button` (`primary` | `dark` | `outline` | `light` | `ghost`), luôn bo tròn dạng viên thuốc.
- Khung nội dung: `Container` (`max-w-7xl px-4 md:px-8`). Section dọc: `py-20 md:py-28` (hoặc chỉ `pb-` khi section trước đã có khoảng trắng).
- Mobile-first; breakpoint Tailwind mặc định. Menu desktop hiện từ `lg`.
- Nút nổi `BookingFab` cố định góc phải dưới → nội dung sát đáy trang cần chừa `pb-24`. Nút tự chuyển giữa dạng đầy đủ (icon + "Đặt phòng", `EXPANDED_MS` 4s) và thu gọn chỉ icon (`COLLAPSED_MS` 3s); giữ dạng đầy đủ khi hover, khi mở menu, hoặc khi người dùng bật giảm chuyển động.
- Chỉ giao diện sáng (không làm dark mode).

## Quy ước code

- Mặc định **Server Component**; chỉ thêm `"use client"` khi cần state/event (`Header`, `LanguageSwitcher`, `HeroSlideshow`, `RoomTypes`, `RoomCard`, `Carousel`, `RoomGallery`, `RoomDetails`, `PhotoScroller`, `MenuViewer`, `PostEditor`, `SeoPanel`, `SerpPreview`, `CountUp`, `BookingFab`, `OpenBookingButton`). Client component nhận chữ đã dịch qua props.
- Với `cacheComponents`, không gọi `new Date()`/`Math.random()`/API runtime trong Server Component lúc render — tính ở client (`useEffect`) hoặc bọc `<Suspense>`.
- Chữ hiển thị lấy từ dictionary (xem mục i18n); dữ liệu không phụ thuộc ngôn ngữ lấy từ `src/lib/site.ts`, ghép qua `src/lib/content.ts`; tin tức từ database qua `lib/news.ts` (xem "Dữ liệu tin tức"). Không hard-code nội dung trong component.
- Biến môi trường: mẫu đầy đủ trong `.env.example` (thêm biến mới thì thêm vào đó). Không commit `.env*`, không in giá trị bí mật ra log.
- Mỗi trang export `generateMetadata` dùng `pageMetadata()` (`title` ngắn; layout gắn hậu tố `| Blessed Hotel`). `NEXT_PUBLIC_SITE_URL` = domain thật cho canonical/hreflang/OG (mặc định `http://localhost:3000`).
- Link ra ngoài (OTA, Zalo) mở tab mới với `rel="noopener noreferrer"`.
- Ảnh dùng `next/image` (`fill` + `sizes`). Host ảnh ngoài phải khai báo trong `images.remotePatterns` ở `next.config.ts` (hiện có `images.unsplash.com` — ảnh tạm, sẽ thay bằng ảnh thật trong `public/`).
- Import bằng alias `@/…`. Tên component PascalCase, mỗi file một component export default.

## Dữ liệu còn là placeholder

- Hotline `1900 0000`, số Zalo `0900000000` (hằng `HOTLINE`, `ZALO_PHONE` đầu `site.ts`), email, giá phòng, số phòng và các chi tiết dịch vụ/ẩm thực (ở cả 4 bản dịch). 6 bài tin tức mẫu trong `db/seed.json` (sửa/xoá trong trang quản trị).
- Số điện thoại, giờ mở cửa, ảnh thực đơn (`drizzle/                # migration SQL do `npm run db:generate` tạo (commit cùng thay đổi schema); scripts/migrate.mjs áp dụng
scripts/                # migrate.mjs, seed.mjs, hash-password.mjs (chạy bằng Node, không qua Next)
db/seed.json            # dữ liệu ban đầu: 5 chuyên mục + 6 bài đủ 4 ngôn ngữ (chỉ dùng cho database trống)
docker-compose.yml      # PostgreSQL cho máy dev (cổng 127.0.0.1:5432)
public/menus/*.svg`) của Blessed Bistro, Olea Café, Blessed Spa; `reserveUrl` (link đặt bàn/đặt chỗ) chưa có.
- Đã là dữ liệu thật: địa chỉ (`meta.address` trong dictionary, lấy từ Google Maps), bản đồ footer (`site.mapEmbed(lang)`: nhúng theo tên "Blessed Hotel Phú Quốc", không cần API key; nhúng theo cid không hoạt động), link Traveloka/Agoda/Klook (hiện là link bản tiếng Việt cho mọi ngôn ngữ).
- Logo chữ trong `Logo.tsx`; ảnh Unsplash trong `site.ts`.

## Việc tiếp theo

- Triển khai lên VPS: Dockerfile + docker-compose bản server (web + PostgreSQL + Caddy), GitHub Actions build image rồi deploy, backup database + thư mục ảnh lên R2. Trên server: `STORAGE_DRIVER=r2` (hoặc gắn `UPLOAD_DIR` ra volume), mật khẩu admin mạnh, `SESSION_SECRET` mới, `NEXT_PUBLIC_SITE_URL` = domain thật.
- Thay thông tin liên hệ, logo và ảnh thật.
- SEO: sitemap.xml (4 ngôn ngữ), ảnh Open Graph; đặt `NEXT_PUBLIC_SITE_URL` khi có domain.
- Link OTA theo ngôn ngữ (Agoda/Klook/Traveloka có bản en/ko/zh).
