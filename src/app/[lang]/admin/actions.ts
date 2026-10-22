"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { defaultLocale, hasLocale, localizeHref } from "@/i18n/config";
import { ADMIN_COOKIE, ADMIN_LOGIN_PATH, ADMIN_SESSION, DEMO_ADMIN } from "@/lib/admin-auth";

export type LoginState = { error: boolean };

const localeOf = (formData: FormData) => {
  const lang = String(formData.get("lang") ?? "");
  return hasLocale(lang) ? lang : defaultLocale;
};

/** Đăng nhập giả lập: so với tài khoản demo, đúng thì đặt cookie phiên và vào trang quản trị */
export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const locale = localeOf(formData);
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (username !== DEMO_ADMIN.username || password !== DEMO_ADMIN.password) return { error: true };

  (await cookies()).set(ADMIN_COOKIE, ADMIN_SESSION, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  // Chỉ quay lại trang trong khu quản trị (tránh chuyển hướng ra ngoài)
  const next = String(formData.get("next") ?? "");
  const home = localizeHref(locale, "/admin");
  redirect(next.startsWith(`${home}/`) || next === home ? next : home);
}

export async function logout(formData: FormData) {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect(localizeHref(localeOf(formData), ADMIN_LOGIN_PATH));
}
