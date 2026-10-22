import BookingFab from "@/components/booking/BookingFab";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { getI18n } from "@/i18n/server";
import { getBookingChannels, getNav } from "@/lib/content";
import { site } from "@/lib/site";

/** Khung website công khai: Header + nội dung + Footer + nút nổi đặt phòng (trang admin không dùng) */
export default async function SiteChrome({ children }: { children: React.ReactNode }) {
  const i18n = await getI18n();
  const { t, locale, href } = i18n;

  return (
    <>
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
    </>
  );
}
