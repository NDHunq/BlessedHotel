import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { ADMIN_COOKIE, ADMIN_LOGIN_PATH, verifySessionToken } from "@/lib/session";

/** Ngôn ngữ cho người dùng: cookie đã chọn → ngôn ngữ trình duyệt (Accept-Language) → tiếng Việt */
function detectLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;

  const preferences = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { base: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  return preferences.find((p) => hasLocale(p.base))?.base as Locale | undefined ?? defaultLocale;
}

/**
 * Khu quản trị /<lang>/admin/...: chưa đăng nhập → trang đăng nhập (kèm ?next= để quay lại);
 * đã đăng nhập mà mở trang đăng nhập → vào thẳng trang quản trị. Cookie phiên có chữ ký, xem lib/session.ts
 */
function guardAdmin(request: NextRequest, locale: string) {
  const { pathname } = request.nextUrl;
  const loginPath = `/${locale}${ADMIN_LOGIN_PATH}`;
  const loggedIn = verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value) !== null;

  if (pathname === loginPath) {
    return loggedIn ? NextResponse.redirect(new URL(`/${locale}/admin`, request.url)) : undefined;
  }
  if (loggedIn) return;
  // Server Action tự kiểm tra đăng nhập (requireAdmin) và trả về lỗi "unauthorized" để trình soạn báo "phiên hết hạn"
  // mà không mất nội dung đang soạn; chuyển hướng ở đây sẽ làm action hỏng không rõ lý do.
  if (request.method === "POST" && request.headers.has("next-action")) return;
  const url = new URL(loginPath, request.url);
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

/** URL chưa có tiền tố ngôn ngữ (VD "/rooms") → chuyển hướng sang "/<ngôn ngữ>/rooms" */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, first = "", second] = pathname.split("/");
  if (hasLocale(first)) return second === "admin" ? guardAdmin(request, first) : undefined;

  const url = request.nextUrl.clone();
  url.pathname = `/${detectLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Bỏ qua file tĩnh (có dấu chấm), _next và api
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
