import type { Metadata } from "next";
import { Be_Vietnam_Pro, Cormorant, Inter_Tight, Mona_Sans } from "next/font/google";
import { localeMeta, locales } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
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

/** Layout gốc: chỉ <html>/<body> + font. Khung website (Header/Footer) nằm ở (site)/layout.tsx, admin có layout riêng */
export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const { locale } = await getI18n();

  return (
    <html
      lang={localeMeta[locale].htmlLang}
      className={`${beVietnam.variable} ${interTight.variable} ${cormorant.variable} ${monaSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
