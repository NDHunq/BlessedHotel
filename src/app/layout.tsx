import type { Metadata } from "next";
import { Be_Vietnam_Pro, Cormorant, Inter_Tight, Mona_Sans } from "next/font/google";
import BookingFab from "@/components/booking/BookingFab";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { site } from "@/lib/site";
import "./globals.css";

// Chữ thường (giống site tham khảo)
const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
});

// Tiêu đề lớn — site tham khảo dùng Forma DJR (font trả phí); Inter Tight là bản miễn phí gần nhất
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
});

// Serif cho logo, tên phòng/nhà hàng
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
});

// Overline/eyebrow chữ hoa nhỏ
const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${interTight.variable} ${cormorant.variable} ${monaSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BookingFab />
      </body>
    </html>
  );
}
