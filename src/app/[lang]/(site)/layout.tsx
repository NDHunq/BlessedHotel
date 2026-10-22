import SiteChrome from "@/components/layout/SiteChrome";

/** Mọi trang công khai (trang chủ, Giới thiệu, Phòng, Ẩm thực, Trải nghiệm, Tin tức) dùng chung Header/Footer */
export default function SiteLayout({ children }: LayoutProps<"/[lang]">) {
  return <SiteChrome>{children}</SiteChrome>;
}
