import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE, type Locale } from "@/i18n/config";

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

/** URL chưa có tiền tố ngôn ngữ (VD "/rooms") → chuyển hướng sang "/<ngôn ngữ>/rooms" */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  if (hasLocale(first)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${detectLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Bỏ qua file tĩnh (có dấu chấm), _next và api
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
