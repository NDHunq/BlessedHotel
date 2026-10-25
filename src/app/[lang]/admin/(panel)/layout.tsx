import Link from "next/link";
import { Suspense } from "react";
import { logout } from "@/app/[lang]/admin/actions";
import { LanguageMenu } from "@/components/layout/LanguageSwitcher";
import Logo from "@/components/layout/Logo";
import Container from "@/components/ui/Container";
import { getI18n } from "@/i18n/server";

/**
 * Khung các trang quản trị sau khi đăng nhập: thanh trên (logo + nhãn Quản trị, Bài viết, Chuyên mục,
 * Xem website, đổi ngôn ngữ giao diện, Đăng xuất). Nội dung trang đọc database lúc có request nên nằm trong Suspense.
 */
export default async function AdminPanelLayout({ children }: LayoutProps<"/[lang]/admin">) {
  const { t, locale, href } = await getI18n();
  const link = "rounded-full px-3 py-2 text-ink-soft hover:bg-surface";

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <Container className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo href={href("/admin")} label={t.admin.metaTitle} />
            <span className="rounded-full bg-ink px-2.5 py-0.5 text-xs font-medium text-white">{t.admin.badge}</span>
          </div>
          <nav className="flex items-center gap-1 text-sm font-medium">
            <Link href={href("/admin")} className={`${link} hidden sm:block`}>
              {t.admin.nav.posts}
            </Link>
            <Link href={href("/admin/categories")} className={`${link} hidden sm:block`}>
              {t.admin.nav.categories}
            </Link>
            <Link href={href("/")} target="_blank" className={`${link} hidden md:block`}>
              {t.admin.nav.viewSite} ↗
            </Link>
            <LanguageMenu locale={locale} label={t.ui.language} light={false} />
            <form action={logout}>
              <input type="hidden" name="lang" value={locale} />
              <button type="submit" className="ml-1 h-9 rounded-full px-4 text-ink ring-1 ring-line hover:bg-surface">
                {t.admin.nav.logout}
              </button>
            </form>
          </nav>
        </Container>
        {/* Menu cho màn hình nhỏ */}
        <Container className="flex gap-1 pb-2 text-sm font-medium sm:hidden">
          <Link href={href("/admin")} className={link}>
            {t.admin.nav.posts}
          </Link>
          <Link href={href("/admin/categories")} className={link}>
            {t.admin.nav.categories}
          </Link>
        </Container>
      </header>
      <main className="flex-1 pt-8 pb-24 md:pt-10">
        <Container>
          <Suspense
            fallback={
              <div className="space-y-4" aria-hidden>
                <div className="h-9 w-56 animate-pulse rounded-lg bg-line/70" />
                <div className="h-64 w-full animate-pulse rounded-2xl bg-white ring-1 ring-line" />
              </div>
            }
          >
            {children}
          </Suspense>
        </Container>
      </main>
    </>
  );
}
