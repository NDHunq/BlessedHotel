import type { Metadata } from "next";
import { getI18n } from "@/i18n/server";

// Trang nội bộ: không cho máy tìm kiếm lập chỉ mục, không có canonical/hreflang
export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.admin.metaTitle, robots: { index: false, follow: false } };
}

/**
 * Khu quản trị (không dùng Header/Footer của website). Trang đăng nhập nằm ở login/,
 * các trang cần đăng nhập nằm trong nhóm (panel)/ (proxy.ts chặn khi chưa đăng nhập).
 */
export default function AdminRootLayout({ children }: LayoutProps<"/[lang]/admin">) {
  return <div className="flex min-h-full flex-1 flex-col bg-surface">{children}</div>;
}
