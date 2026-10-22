import type { Metadata } from "next";
import Link from "next/link";
import { LanguageMenu } from "@/components/layout/LanguageSwitcher";
import Logo from "@/components/layout/Logo";
import Container from "@/components/ui/Container";
import { getI18n } from "@/i18n/server";

// Trang nội bộ: không cho máy tìm kiếm lập chỉ mục, không có canonical/hreflang
export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.admin.metaTitle, robots: { index: false, follow: false } };
}

/**
 * Khung trang quản trị: thanh trên (logo + nhãn Quản trị, menu, đổi ngôn ngữ giao diện) và dòng báo bản demo.
 * Không dùng Header/Footer/nút đặt phòng của website (nằm trong nhóm `(site)`).
 * TODO: khi làm thật cần đăng nhập (chặn ở proxy.ts) và API lưu bài.
 */
export default async function AdminLayout({ children }: LayoutProps<"/[lang]/admin">) {
  const { t, locale, href } = await getI18n();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-surface">
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <Container className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo href={href("/admin")} label={t.admin.metaTitle} />
            <span className="rounded-full bg-ink px-2.5 py-0.5 text-xs font-medium text-white">{t.admin.badge}</span>
          </div>
          <nav className="flex items-center gap-1 text-sm font-medium sm:gap-2">
            <Link href={href("/admin")} className="hidden rounded-full px-3 py-2 text-ink-soft hover:bg-surface sm:block">
              {t.admin.nav.posts}
            </Link>
            <Link href={href("/")} target="_blank" className="hidden rounded-full px-3 py-2 text-ink-soft hover:bg-surface md:block">
              {t.admin.nav.viewSite} ↗
            </Link>
            <LanguageMenu locale={locale} label={t.ui.language} light={false} />
          </nav>
        </Container>
      </header>
      <p className="bg-accent-soft px-4 py-2 text-center text-sm text-ink">{t.admin.demoNotice}</p>
      <main className="flex-1 pt-8 pb-24 md:pt-10">
        <Container>{children}</Container>
      </main>
    </div>
  );
}
