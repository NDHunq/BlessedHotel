"use server";

/**
 * Server Action của trang quản trị. Mọi action (trừ login) gọi `requireAdmin()` trước, vì Server Action có thể bị
 * gọi thẳng bằng request POST. Sau khi ghi database thì `updateTag(NEWS_TAG)` để trang công khai hiện ngay thay đổi.
 * (next/root-params không dùng được trong Server Action nên ngôn ngữ được gửi kèm từ form khi cần chuyển trang.)
 */
import { updateTag } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { defaultLocale, hasLocale, locales, localizeHref, type Locale } from "@/i18n/config";
import { missingLocales, sanitizeDraft } from "@/lib/admin";
import { checkCredentials, clearFailures, lockedMinutes, recordFailure, requireAdmin, UnauthorizedError } from "@/lib/auth";
import { categoryExists, NEWS_TAG, removeCategory, removePost, writeCategory, writePost } from "@/lib/news";
import { ADMIN_COOKIE, ADMIN_LOGIN_PATH, createSessionToken, SESSION_MAX_AGE } from "@/lib/session";
import { saveImage, UploadError } from "@/lib/storage";

const localeOf = (value: unknown): Locale => (typeof value === "string" && hasLocale(value) ? value : defaultLocale);

/** IP người dùng (sau Cloudflare / Caddy), dùng để giới hạn số lần đăng nhập sai */
async function clientIp() {
  const h = await headers();
  return h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "unknown";
}

/** Chạy action cần đăng nhập; lỗi đăng nhập / lỗi không lường trước → trả về mã lỗi thay vì làm hỏng trang */
async function guarded<T>(run: () => Promise<T>): Promise<T | { ok: false; error: "unauthorized" | "server" }> {
  try {
    await requireAdmin();
    return await run();
  } catch (error) {
    if (error instanceof UnauthorizedError) return { ok: false, error: "unauthorized" };
    console.error(error);
    return { ok: false, error: "server" };
  }
}

/* ------------------------------------------------------------------ Đăng nhập */

export type LoginState = { error: null | "invalid" | "locked"; minutes?: number };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const locale = localeOf(formData.get("lang"));
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const key = await clientIp();
  const locked = lockedMinutes(key);
  if (locked > 0) return { error: "locked", minutes: locked };
  if (!checkCredentials(username, password)) {
    recordFailure(key);
    const nowLocked = lockedMinutes(key);
    return nowLocked > 0 ? { error: "locked", minutes: nowLocked } : { error: "invalid" };
  }
  clearFailures(key);

  (await cookies()).set(ADMIN_COOKIE, createSessionToken(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  // Chỉ quay lại trang trong khu quản trị (tránh chuyển hướng ra ngoài)
  const next = String(formData.get("next") ?? "");
  const home = localizeHref(locale, "/admin");
  redirect(next.startsWith(`${home}/`) || next === home ? next : home);
}

export async function logout(formData: FormData) {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect(localizeHref(localeOf(formData.get("lang")), ADMIN_LOGIN_PATH));
}

/* ------------------------------------------------------------------ Bài viết */

export type SavePostResult =
  | { ok: true; id: number }
  | { ok: false; error: "unauthorized" | "server" | "invalid" | "notFound" | "missingSettings" }
  | { ok: false; error: "missingLanguages"; locales: Locale[] };

/** Lưu bài (tạo mới khi không có `id`). Bài "published" phải đủ tiêu đề + tóm tắt 4 ngôn ngữ, có ngày và ảnh bìa */
export async function savePost(id: number | null, input: unknown): Promise<SavePostResult> {
  return guarded(async (): Promise<SavePostResult> => {
    const draft = sanitizeDraft(input);
    if (!draft || !(await categoryExists(draft.category))) return { ok: false, error: "invalid" };
    if (draft.status === "published") {
      const missing = missingLocales(draft);
      if (missing.length > 0) return { ok: false, error: "missingLanguages", locales: missing };
      if (!draft.date || !draft.image) return { ok: false, error: "missingSettings" };
    }
    try {
      const savedId = await writePost(draft, id ?? undefined);
      updateTag(NEWS_TAG);
      return { ok: true, id: savedId };
    } catch (error) {
      if (error instanceof Error && error.message === "NOT_FOUND") return { ok: false, error: "notFound" };
      throw error;
    }
  });
}

export async function deletePost(id: number) {
  return guarded(async () => {
    await removePost(id);
    updateTag(NEWS_TAG);
    return { ok: true as const };
  });
}

/** Tải ảnh lên (ảnh bìa hoặc ảnh trong nội dung), trả về URL */
export async function uploadImage(formData: FormData) {
  return guarded(async (): Promise<{ ok: true; url: string } | { ok: false; error: "type" | "size" }> => {
    const file = formData.get("file");
    if (!(file instanceof File)) return { ok: false, error: "type" };
    try {
      return { ok: true, url: await saveImage(file) };
    } catch (error) {
      if (error instanceof UploadError) return { ok: false, error: error.reason };
      throw error;
    }
  });
}

/* ------------------------------------------------------------------ Chuyên mục */

const CATEGORY_ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export type CategoryResult = { ok: true } | { ok: false; error: "unauthorized" | "server" | "invalidId" | "missingNames" | "inUse"; posts?: number };

/** Thêm (`isNew`) hoặc đổi tên chuyên mục; mã chuyên mục không đổi được sau khi tạo */
export async function saveCategory(id: string, names: Record<string, string>, isNew: boolean): Promise<CategoryResult> {
  return guarded(async (): Promise<CategoryResult> => {
    if (typeof id !== "string" || id.length > 64 || !CATEGORY_ID.test(id)) return { ok: false, error: "invalidId" };
    const clean = Object.fromEntries(locales.map((l) => [l, typeof names?.[l] === "string" ? names[l].trim().slice(0, 100) : ""])) as Record<Locale, string>;
    if (locales.some((l) => !clean[l])) return { ok: false, error: "missingNames" };
    const exists = await categoryExists(id);
    if (isNew === exists) return { ok: false, error: "invalidId" };
    await writeCategory(id, clean, isNew);
    updateTag(NEWS_TAG);
    return { ok: true };
  });
}

export async function deleteCategory(id: string): Promise<CategoryResult> {
  return guarded(async (): Promise<CategoryResult> => {
    const posts = await removeCategory(id);
    if (posts > 0) return { ok: false, error: "inUse", posts };
    updateTag(NEWS_TAG);
    return { ok: true };
  });
}
