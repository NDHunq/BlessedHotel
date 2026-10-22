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
- **yet-another-react-lightbox** (plugin Zoom, Thumbnails, Counter, Captions): trình xem ảnh phòng trong `RoomGallery`.

## Lệnh

```bash
npm run dev     # http://localhost:3000
npm run build   # build production (bắt buộc pass trước khi xong việc)
npm run lint    # ESLint (bắt buộc sạch)
npm start       # chạy bản build
```

## Cấu trúc

```
src/
  proxy.ts              # URL thiếu tiền tố ngôn ngữ → chuyển sang /<ngôn ngữ>/… (cookie → Accept-Language → vi)
  app/
    [lang]/             # MỌI trang nằm dưới segment ngôn ngữ (vi | en | ko | zh)
      layout.tsx        # layout gốc: <html lang>, font, metadata, Header + Footer + BookingFab; generateStaticParams 4 ngôn ngữ
      page.tsx          # trang chủ
      ve-chung-toi/ hang-phong/ am-thuc/ dich-vu/ tin-tuc/   # mỗi tab menu là 1 trang (/gioi-thieu → /ve-chung-toi: redirect 308 trong next.config.ts)
      tin-tuc/[slug]/   # chi tiết bài viết (generateStaticParams từ `news`; slug lạ → notFound())
      not-found.tsx     # 404 trong một ngôn ngữ
    global-not-found.tsx # 404 cho URL không khớp route nào (hiện 4 ngôn ngữ; bật `experimental.globalNotFound`)
    globals.css         # design tokens (@theme), font dự phòng CJK theo :lang
  i18n/
    config.ts           # locales, localeMeta (nhãn, mã Intl, hreflang…), localizeHref, switchLocalePath, fill()
    dictionaries/       # vi.ts (GỐC, định nghĩa kiểu `Dictionary`) · en.ts · ko.ts · zh.ts
    server.ts           # getI18n() → { locale, t, href } cho Server Component (đọc [lang] bằng next/root-params)
    format.ts           # formatPrice (VND), formatDate, readingMinutes theo ngôn ngữ
    metadata.ts         # pageMetadata(): title/description + canonical + hreflang 4 ngôn ngữ
  components/
    layout/             # Header (client, active tab theo pathname), LanguageSwitcher (LanguageMenu desktop, LanguagePills mobile), Footer, Logo
    home/               # section trang chủ: Hero + HeroSlideshow, Explore, RoomTypes, PromoBanner, BrandBand, News
    booking/            # BookingFab (nút nổi), ChannelList, BookingCta, OpenBookingButton, events.ts
    ui/                 # Button, ArrowLink, Carousel, Container, SectionHeading/Label, PageHero,
                        #   RoomCard, NewsGrid, ServiceList, Stats + CountUp (số chạy khi cuộn tới)
                        #   RoomGallery (bên ngoài 3 ảnh xếp chồng nghiêng lộn xộn kiểu xấp ảnh, không ghi số lượng → trình xem ảnh đủ ảnh: next/prev, zoom, vuốt, phím ←/→, bộ đếm)
  lib/
    site.ts             # dữ liệu KHÔNG phụ thuộc ngôn ngữ: ảnh, giá, số liệu, link, id/slug (không chứa chữ hiển thị)
    content.ts          # ghép site.ts + dictionary → getRooms/getNews/getNav/… (chữ đã dịch + href có tiền tố ngôn ngữ)
public/brands/          # logo Zalo, Traveloka, Agoda, Klook; social/ = icon Facebook, Instagram, TikTok, Zalo (Simple Icons)
public/flags/           # quốc kỳ vuông vn/gb/kr/cn (flag-icons, MIT) cho LanguageSwitcher, hiển thị cắt tròn; mã cờ ở `localeMeta[locale].flag`
```

- **Menu chính** (`nav` trong `site.ts`, nhãn trong dictionary `nav`): Về chúng tôi `/ve-chung-toi` · Các hạng phòng `/hang-phong` · Ẩm thực `/am-thuc` · Dịch vụ `/dich-vu` · Tin tức `/tin-tuc`. Mỗi tab mở trang riêng; trang chủ chỉ tóm tắt và dẫn tới các trang đó.
- **Trang chủ** (thứ tự): Hero (banner) → Explore (băng thẻ "Khám phá Blessed Hotel") → RoomTypes (tab lọc Phòng/Suite/Villa) → PromoBanner → BrandBand (băng đen + hàng điểm nhấn) → News.
- **Header trong suốt ở mọi trang** (chữ trắng, tab đang mở màu `accent`) nằm đè lên banner, chuyển nền trắng khi cuộn > 24px hoặc mở menu mobile; logic trong `Header.tsx` (`transparent`, `navColor`). Vì vậy **mọi trang phải mở đầu bằng banner ảnh/nền tối có `-mt-16`** (`Hero`, `PageHero`, banner trang Về chúng tôi, `not-found.tsx`). `HeroSlideshow` chuyển `hero.slides` (ảnh + chữ + link riêng mỗi slide) mỗi `hero.interval` = 4000ms.
- **Trang Các hạng phòng**: mỗi phòng hiển thị `RoomGallery` với `room.gallery` (3–4 ảnh có `alt` dùng làm chú thích; ảnh đầu trùng `room.image`).
- **Trang con**: `PageHero` (ảnh dưới header trong suốt + breadcrumb + tiêu đề) → nội dung → `BookingCta` (trừ Tin tức).
- **Tin tức**: mỗi bài có ngày + ảnh trong `news` (`site.ts`); chữ (chuyên mục, tiêu đề, tóm tắt, `body` = các mục `heading?` + `paragraphs`) trong dictionary `news[slug]`. Neo mục lục đánh số `section-1, 2…` (không lấy từ tiêu đề vì chữ Hàn/Trung). Thẻ `NewsGrid` là link tới `/tin-tuc/[slug]`. Trang chi tiết bố cục kiểu tạp chí (tham khảo Belmond Stories), lưới 12 cột, mọi khối bắt đầu ở cột 2: phần đầu nền `ink` dưới header trong suốt (breadcrumb + tag chuyên mục, tiêu đề lớn, hàng thông tin Đăng bởi · Ngày đăng · Thời gian đọc) → ảnh chính 16:9 đè lên mép dưới phần đầu → lề trái dính khi cuộn (mục lục "Trong bài này" neo tới `h2`, link Tất cả tin tức; ẩn trên mobile) + cột chữ 7/12 (đoạn mở đầu `font-display` cỡ lớn, các mục, khối liên hệ đặt phòng) → "Bài viết khác". Lưu ý: với `cacheComponents`, slug không tồn tại vẫn trả HTTP 200 nhưng hiển thị trang 404 + `noindex` (do streaming), đây là hành vi của Next, không phải lỗi.
- **Trang Về chúng tôi** (bố cục theo modernvillagelifestyle.vn/vi/ve-mvillage; dữ liệu `about` trong `site.ts`): banner toàn màn hình (khẩu hiệu mảnh + chữ "Blessed" serif lớn, `h1` ẩn) → section nền `surface` có 2 vòng tròn trang trí mờ: đoạn dẫn căn giữa, tiêu đề 2 dòng tô màu từ đầu (`philosophy.title`), đoạn kết, `Stats` hàng ngang, 4 thẻ ảnh dọc chữ nằm trên ảnh (`pillars`) → ảnh tràn viền + chữ trái, tiêu đề trộn chữ mảnh/đậm (`closing`).
- **Footer** (dùng chung `Container`): hàng trên: logo + khẩu hiệu (trái) · icon mạng xã hội 22px (phải). Hàng chính 4 cột: Liên hệ (hotline, email, địa chỉ) · Khám phá · Đặt phòng · Vị trí (bản đồ). Tiêu đề cột `text-sm` chữ hoa `brand-400`, link 15px `white/80`. Dòng cuối: bản quyền + giấy phép 13px. **Không có nhóm "Chính sách"** (đã bỏ theo yêu cầu).
- **Đặt phòng**: link các kênh nằm ở `bookingChannels` trong `site.ts` (nhãn/ghi chú trong dictionary `booking.channels`). Muốn mở menu đặt phòng từ một nút bất kỳ thì dùng `OpenBookingButton` (gọi `openBooking()` trong `components/booking/events.ts`).

## Đa ngôn ngữ (i18n) — QUY TẮC BẮT BUỘC

Ngôn ngữ: `vi` (gốc, mặc định) · `en` · `ko` · `zh` (giản thể, `zh-CN`). URL luôn có tiền tố: `/vi/hang-phong`, `/en/hang-phong`… (phần sau tiền tố giữ nguyên, không dịch slug). `proxy.ts` chuyển URL thiếu tiền tố theo: cookie `NEXT_LOCALE` (lưu khi người dùng chọn ở `LanguageSwitcher`) → `Accept-Language` → `vi`.

**Khi thêm/sửa BẤT KỲ chữ nào hiển thị cho người dùng** (tính năng mới, section mới, bài viết, phòng, nhãn nút, `aria-label`, `alt` ảnh, chú thích, metadata title/description, thông báo lỗi…):
1. Thêm/sửa key trong `src/i18n/dictionaries/vi.ts` (bản gốc).
2. **Cùng lần đó** thêm/sửa key tương ứng trong `en.ts`, `ko.ts`, `zh.ts`. Ba file này có kiểu `Dictionary` (= cấu trúc vi.ts) nên thiếu key là `npm run build` / `npx tsc --noEmit` báo lỗi. Không được để chuỗi tiếng Việt trong file ngôn ngữ khác, không để trống, không dùng "TODO".
3. Không viết cứng chữ trong component/trang. Server Component: `const { t, locale, href } = await getI18n()`. Client Component: nhận chữ đã dịch qua props từ server parent (không import dictionary vào client).
4. Link nội bộ luôn qua `href("/duong-dan")` (hoặc dữ liệu từ `lib/content.ts`, đã có tiền tố). Link ngoài, `tel:`, `mailto:` giữ nguyên.
5. Chuỗi có biến dùng `{tên}` + `fill()`, VD `"{n} khách"` → `fill(t.ui.guests, { n: 2 })`. Không ghép chuỗi theo thứ tự tiếng Việt trong code (trật tự từ mỗi ngôn ngữ khác nhau).
6. Nội dung theo danh sách (phòng, nhà hàng, bài viết, slide…) đặt khoá theo id/slug trong dictionary (khớp id/slug trong `site.ts`), không dùng mảng theo thứ tự.
7. Số/giá/ngày định dạng bằng `formatPrice` / `formatDate` / `localeMeta[locale].intl` — không viết cứng `"vi-VN"`.
8. Trang mới: đặt dưới `src/app/[lang]/`, export `generateMetadata` dùng `pageMetadata({ locale, path, title, description })` (tự thêm canonical + hreflang 4 ngôn ngữ).
9. Thêm ngôn ngữ mới: thêm mã vào `locales` + `localeMeta` (`i18n/config.ts`, kèm `flag` và file `public/flags/<mã>.svg` lấy từ flag-icons `flags/1x1/`), tạo `dictionaries/<mã>.ts` kiểu `Dictionary`, khai báo trong `i18n/server.ts`, thêm vào `global-not-found.tsx` và regex redirect `/:lang(vi|en|ko|zh)/…` trong `next.config.ts`.

Hướng dẫn dịch:
- Dịch theo nghĩa, văn phong tự nhiên của từng ngôn ngữ (tiếng Hàn dùng kính ngữ 합쇼체/해요체 như web khách sạn Hàn; tiếng Trung giản thể).
- **Không dịch tên riêng**: Blessed Hotel, Deluxe, Premier Ocean View, Junior Suite, Garden Villa, The Hearth, Saffron, Sky Terrace, Blessed Spa, Traveloka, Agoda, Klook, Zalo. Giờ mở cửa, giá VND giữ nguyên số.
- Địa danh: Phú Quốc → "Phu Quoc" (en) · "푸꾸옥" (ko) · "富国岛" (zh). Địa chỉ viết theo thứ tự quen thuộc của từng nước.
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
- Danh sách tính năng/dịch vụ → danh sách đánh số `01 02…` ngăn bằng đường kẻ mảnh (`ServiceList`), hoặc hàng chữ ngăn bằng đường kẻ (`BrandBand`). Không dùng thẻ icon.
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

- Mặc định **Server Component**; chỉ thêm `"use client"` khi cần state/event (`Header`, `LanguageSwitcher`, `HeroSlideshow`, `RoomTypes`, `RoomCard`, `Carousel`, `RoomGallery`, `CountUp`, `BookingFab`, `OpenBookingButton`). Client component nhận chữ đã dịch qua props.
- Với `cacheComponents`, không gọi `new Date()`/`Math.random()`/API runtime trong Server Component lúc render — tính ở client (`useEffect`) hoặc bọc `<Suspense>`.
- Chữ hiển thị lấy từ dictionary (xem mục i18n); dữ liệu không phụ thuộc ngôn ngữ lấy từ `src/lib/site.ts`, ghép qua `src/lib/content.ts`. Không hard-code nội dung trong component.
- Mỗi trang export `generateMetadata` dùng `pageMetadata()` (`title` ngắn; layout gắn hậu tố `| Blessed Hotel`). `NEXT_PUBLIC_SITE_URL` = domain thật cho canonical/hreflang/OG (mặc định `http://localhost:3000`).
- Link ra ngoài (OTA, Zalo) mở tab mới với `rel="noopener noreferrer"`.
- Ảnh dùng `next/image` (`fill` + `sizes`). Host ảnh ngoài phải khai báo trong `images.remotePatterns` ở `next.config.ts` (hiện có `images.unsplash.com` — ảnh tạm, sẽ thay bằng ảnh thật trong `public/`).
- Import bằng alias `@/…`. Tên component PascalCase, mỗi file một component export default.

## Dữ liệu còn là placeholder

- Hotline `1900 0000`, số Zalo `0900000000` (hằng `HOTLINE`, `ZALO_PHONE` đầu `site.ts`), email, giá phòng, số phòng và các chi tiết dịch vụ/ẩm thực/tin tức (ở cả 4 bản dịch).
- Đã là dữ liệu thật: địa chỉ (`meta.address` trong dictionary, lấy từ Google Maps), bản đồ footer (`site.mapEmbed(lang)`: nhúng theo tên "Blessed Hotel Phú Quốc", không cần API key; nhúng theo cid không hoạt động), link Traveloka/Agoda/Klook (hiện là link bản tiếng Việt cho mọi ngôn ngữ).
- Logo chữ trong `Logo.tsx`; ảnh Unsplash trong `site.ts`.

## Việc tiếp theo

- Thay thông tin liên hệ, logo và ảnh thật.
- SEO: sitemap.xml (4 ngôn ngữ), ảnh Open Graph; đặt `NEXT_PUBLIC_SITE_URL` khi có domain.
- Link OTA theo ngôn ngữ (Agoda/Klook/Traveloka có bản en/ko/zh).
