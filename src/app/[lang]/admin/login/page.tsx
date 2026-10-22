import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/admin/LoginForm";
import { LanguageMenu } from "@/components/layout/LanguageSwitcher";
import Logo from "@/components/layout/Logo";
import { getI18n } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.admin.login.metaTitle };
}

/** Trang đăng nhập quản trị (giả lập). Đã đăng nhập mà vào đây → proxy chuyển thẳng vào /admin */
export default async function AdminLoginPage() {
  const { t, locale, href } = await getI18n();
  const labels = t.admin.login;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-end px-4 pt-4 md:px-8">
        <LanguageMenu locale={locale} label={t.ui.language} light={false} />
      </div>
      <div className="flex flex-1 items-center justify-center px-4 pt-6 pb-24">
        <div className="w-full max-w-sm">
          <div className="flex justify-center">
            <Logo href={href("/")} label={t.ui.homeAria} />
          </div>
          <div className="mt-8 rounded-2xl bg-white p-6 ring-1 ring-line md:p-8">
            <h1 className="font-display text-2xl font-semibold tracking-[-0.01em] text-ink">{labels.title}</h1>
            <p className="mt-1 text-sm text-muted">{labels.subtitle}</p>
            <div className="mt-6">
              <LoginForm locale={locale} labels={labels} />
            </div>
          </div>
          <p className="mt-6 text-center text-sm">
            <Link href={href("/")} className="text-ink-soft hover:text-brand-600">
              ← {labels.backToSite}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
