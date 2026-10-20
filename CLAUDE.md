@AGENTS.md

# Blessed Hotel Phú Quốc — website khách sạn

Website giới thiệu cho **một** khách sạn (Blessed Hotel, Phú Quốc). UI/UX lấy cảm hứng từ phong cách "lifestyle hotel" (bố cục thoáng, ảnh lớn), nhưng có nhận diện riêng.

> ⚠️ Chỉ tham khảo **bố cục/UX**. Không sao chép logo, ảnh, nội dung chữ, tên thương hiệu, code hay file font từ website tham khảo.

**Không có tính năng đặt phòng trên site.** Khách đặt qua nút nổi "Đặt phòng" (góc phải dưới) → gọi điện, Zalo, Traveloka, Agoda, Klook. Không thêm lại form tìm/đặt phòng.

## Stack

- **Next.js 16** (App Router, `src/`, `cacheComponents: true`) — API khác bản cũ, đọc `node_modules/next/dist/docs/` trước khi dùng API lạ.
- **React 19**, **TypeScript**
- **Tailwind CSS v4** — cấu hình bằng `@theme` trong `src/app/globals.css`, **không có** `tailwind.config.*`.
- Font qua `next/font/google` (xem bảng dưới). Không dùng thư viện UI/icon — icon là SVG inline.

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
  app/
    layout.tsx          # font, metadata, Header + Footer + BookingFab
    page.tsx            # trang chủ: ghép các section
    ve-chung-toi/ hang-phong/ am-thuc/ dich-vu/ tin-tuc/   # mỗi tab menu là 1 trang (/gioi-thieu redirect 308 → /ve-chung-toi trong next.config.ts)
    globals.css         # design tokens (@theme)
  components/
    layout/             # Header (client, active tab theo pathname), Footer, Logo
    home/               # section trang chủ: Hero + HeroSlideshow, Explore, RoomTypes, PromoBanner, BrandBand, News
    booking/            # BookingFab (nút nổi), ChannelList, BookingCta, OpenBookingButton, events.ts
    ui/                 # Button, ArrowLink, Carousel, Container, SectionHeading/Label, PageHero,
                        #   RoomCard, NewsGrid, ServiceList, Stats + CountUp (số chạy khi cuộn tới)
  lib/
    site.ts             # TOÀN BỘ nội dung: menu, banner, thẻ khám phá, kênh đặt phòng, phòng, ẩm thực, dịch vụ, tin tức
public/brands/          # logo Zalo, Traveloka, Agoda, Klook; social/ = icon Facebook, Instagram, TikTok, Zalo (Simple Icons)
```

- **Menu chính** (`nav` trong `site.ts`): Về chúng tôi `/ve-chung-toi` · Các hạng phòng `/hang-phong` · Ẩm thực `/am-thuc` · Dịch vụ `/dich-vu` · Tin tức `/tin-tuc`. Mỗi tab mở trang riêng; trang chủ chỉ tóm tắt và dẫn tới các trang đó.
- **Trang chủ** (thứ tự): Hero (banner) → Explore (băng thẻ "Khám phá Blessed Hotel") → RoomTypes (tab lọc Phòng/Suite/Villa) → PromoBanner → BrandBand (băng đen + hàng điểm nhấn) → News.
- **Header trong suốt ở mọi trang** (chữ trắng, tab đang mở màu `accent`) nằm đè lên banner, chuyển nền trắng khi cuộn > 24px hoặc mở menu mobile; logic trong `Header.tsx` (`transparent`, `navColor`). Vì vậy **mọi trang phải mở đầu bằng banner ảnh/nền tối có `-mt-16`** (`Hero`, `PageHero`, banner trang Về chúng tôi, `not-found.tsx`). `HeroSlideshow` chuyển `hero.slides` (ảnh + chữ + link riêng mỗi slide) mỗi `hero.interval` = 4000ms.
- **Trang con**: `PageHero` (ảnh dưới header trong suốt + breadcrumb + tiêu đề) → nội dung → `BookingCta` (trừ Tin tức).
- **Trang Về chúng tôi** (bố cục theo modernvillagelifestyle.vn/vi/ve-mvillage; dữ liệu `about` trong `site.ts`): banner toàn màn hình (khẩu hiệu mảnh + chữ "Blessed" serif lớn, `h1` ẩn) → section nền `surface` có 2 vòng tròn trang trí mờ: đoạn dẫn căn giữa, tiêu đề 2 dòng tô màu từ đầu (`philosophy.title`), đoạn kết, `Stats` hàng ngang, 4 thẻ ảnh dọc chữ nằm trên ảnh (`pillars`) → ảnh tràn viền + chữ trái, tiêu đề trộn chữ mảnh/đậm (`closing`).
- **Footer** (dùng chung `Container`): hàng trên: logo + khẩu hiệu (trái) · icon mạng xã hội 22px (phải). Hàng chính 4 cột: Liên hệ (hotline, email, địa chỉ) · Khám phá · Đặt phòng · Vị trí (bản đồ). Tiêu đề cột `text-sm` chữ hoa `brand-400`, link 15px `white/80`. Dòng cuối: bản quyền + giấy phép 13px. **Không có nhóm "Chính sách"** (đã bỏ theo yêu cầu).
- **Đặt phòng**: link các kênh nằm ở `bookingChannels` trong `site.ts`. Muốn mở menu đặt phòng từ một nút bất kỳ thì dùng `OpenBookingButton` (gọi `openBooking()` trong `components/booking/events.ts`).

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

- Mặc định **Server Component**; chỉ thêm `"use client"` khi cần state/event (`Header`, `HeroSlideshow`, `RoomTypes`, `Carousel`, `BookingFab`, `OpenBookingButton`).
- Với `cacheComponents`, không gọi `new Date()`/`Math.random()`/API runtime trong Server Component lúc render — tính ở client (`useEffect`) hoặc bọc `<Suspense>`.
- Nội dung hiển thị viết **tiếng Việt có dấu**; dữ liệu lấy từ `src/lib/site.ts`, không hard-code nội dung trong component.
- Mỗi trang con export `metadata` (`title` ngắn; layout gắn hậu tố `| Blessed Hotel`).
- Link ra ngoài (OTA, Zalo) mở tab mới với `rel="noopener noreferrer"`.
- Ảnh dùng `next/image` (`fill` + `sizes`). Host ảnh ngoài phải khai báo trong `images.remotePatterns` ở `next.config.ts` (hiện có `images.unsplash.com` — ảnh tạm, sẽ thay bằng ảnh thật trong `public/`).
- Import bằng alias `@/…`. Tên component PascalCase, mỗi file một component export default.

## Dữ liệu còn là placeholder

- Hotline `1900 0000`, số Zalo `0900000000` (hằng `HOTLINE`, `ZALO_PHONE` đầu `site.ts`), email, giá phòng, số phòng và các chi tiết dịch vụ/ẩm thực/tin tức.
- Đã là dữ liệu thật: địa chỉ (`site.address`, lấy từ Google Maps), bản đồ footer (`site.mapEmbed`: nhúng theo tên "Blessed Hotel Phú Quốc", không cần API key; nhúng theo cid không hoạt động), link Traveloka/Agoda/Klook.
- Logo chữ trong `Logo.tsx`; ảnh Unsplash trong `site.ts`.

## Việc tiếp theo

- Thay thông tin liên hệ, logo và ảnh thật.
- Trang chi tiết tin tức `/tin-tuc/[slug]` (hiện thẻ tin chưa có link).
- Đa ngôn ngữ (vi/en), SEO (sitemap, Open Graph).
