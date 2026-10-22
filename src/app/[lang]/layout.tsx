import type { Metadata } from "next";
import { Be_Vietnam_Pro, Cormorant, Inter_Tight, Mona_Sans } from "next/font/google";
import BookingFab from "@/components/booking/BookingFab";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { localeMeta, locales } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { getBookingChannels, getNav } from "@/lib/content";
import { site } from "@/lib/site";
import "../globals.css";

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

// Cache Components: tạo sẵn mọi ngôn ngữ lúc build
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { t, locale } = await getI18n();
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: {
      default: `${site.name} | ${t.meta.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: t.meta.description,
    openGraph: { siteName: site.name, locale: localeMeta[locale].ogLocale, type: "website" },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const i18n = await getI18n();
  const { t, locale, href } = i18n;

  return (
    <html
      lang={localeMeta[locale].htmlLang}
      className={`${beVietnam.variable} ${interTight.variable} ${cormorant.variable} ${monaSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Header
          locale={locale}
          nav={getNav(i18n)}
          homeHref={href("/")}
          hotline={site.hotline}
          labels={{
            mainMenu: t.ui.mainMenu,
            mobileMenu: t.ui.mobileMenu,
            openMenu: t.ui.openMenu,
            closeMenu: t.ui.closeMenu,
            homeAria: t.ui.homeAria,
            bookNow: t.ui.bookNow,
            bookNowLong: t.ui.bookNowLong,
            language: t.ui.language,
            hotline: t.ui.hotline,
          }}
        />
        <main className="flex-1">{children}</main>
        <Footer />
        <BookingFab
          channels={getBookingChannels(i18n)}
          labels={{ bookNow: t.ui.bookNow, via: t.booking.via, panelLabel: t.booking.panelLabel }}
        />
      </body>
    </html>
  );
}
