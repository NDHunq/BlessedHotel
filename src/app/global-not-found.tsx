import type { Metadata } from "next";
import { localeMeta, locales } from "@/i18n/config";
import "./globals.css";

export const metadata: Metadata = { title: "404 | Blessed Hotel" };

// Không biết người dùng đang ở ngôn ngữ nào → hiện thông báo đủ 4 ngôn ngữ
const messages = {
  vi: "Không tìm thấy trang bạn cần.",
  en: "We couldn't find the page you were looking for.",
  ko: "요청하신 페이지를 찾을 수 없습니다.",
  zh: "找不到您要访问的页面。",
} satisfies Record<(typeof locales)[number], string>;

/** 404 cho URL không khớp route nào (bỏ qua layout, nên tự có <html>) */
export default function GlobalNotFound() {
  return (
    <html lang="vi">
      <body className="grid min-h-svh place-items-center bg-ink px-4 text-center text-white">
        <main>
          <p className="text-6xl font-semibold md:text-8xl">404</p>
          <ul className="mt-6 space-y-2 text-lg">
            {locales.map((l) => (
              <li key={l} lang={localeMeta[l].htmlLang}>
                {messages[l]}
              </li>
            ))}
          </ul>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {locales.map((l) => (
              <li key={l}>
                <a href={`/${l}`} lang={localeMeta[l].htmlLang} className="inline-flex h-10 items-center rounded-full bg-white px-5 text-sm font-medium text-ink">
                  Blessed Hotel · {localeMeta[l].label}
                </a>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  );
}
