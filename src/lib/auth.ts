/**
 * Đăng nhập quản trị (1 tài khoản, không có bảng user): tên đăng nhập + mã băm mật khẩu nằm trong biến môi trường
 * ADMIN_USERNAME / ADMIN_PASSWORD_HASH (tạo bằng `npm run hash-password`). Đổi mật khẩu = sửa .env rồi khởi động lại.
 * Sai quá `MAX_FAILURES` lần trong `WINDOW_MS` → khoá đăng nhập `LOCK_MS` (theo IP, lưu trong bộ nhớ: đủ cho 1 server).
 */
import "server-only";
import { scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/session";

const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;
const LOCK_MS = 15 * 60 * 1000;

const failures = new Map<string, { count: number; first: number; lockedUntil: number }>();

/** Còn bị khoá bao nhiêu phút (0 = không khoá) */
export function lockedMinutes(key: string) {
  const entry = failures.get(key);
  if (!entry || entry.lockedUntil <= Date.now()) return 0;
  return Math.ceil((entry.lockedUntil - Date.now()) / 60000);
}

export function recordFailure(key: string) {
  const now = Date.now();
  const entry = failures.get(key);
  if (!entry || now - entry.first > WINDOW_MS) {
    failures.set(key, { count: 1, first: now, lockedUntil: 0 });
    return;
  }
  entry.count++;
  if (entry.count >= MAX_FAILURES) entry.lockedUntil = now + LOCK_MS;
}

export const clearFailures = (key: string) => failures.delete(key);

const safeEqual = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

/** So tên đăng nhập và mật khẩu với biến môi trường. Thiếu cấu hình → luôn sai (và ghi log) */
export function checkCredentials(username: string, password: string) {
  const expectedUser = process.env.ADMIN_USERNAME;
  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (!expectedUser || !stored) {
    console.error("Chưa cấu hình ADMIN_USERNAME / ADMIN_PASSWORD_HASH");
    return false;
  }
  const [algo, n, r, p, salt, hash] = stored.split(":");
  if (algo !== "scrypt" || !salt || !hash) {
    console.error("ADMIN_PASSWORD_HASH sai định dạng, tạo lại bằng npm run hash-password");
    return false;
  }
  const expected = Buffer.from(hash, "base64url");
  const actual = scryptSync(password, Buffer.from(salt, "base64url"), expected.length, { N: Number(n), r: Number(r), p: Number(p) });
  // Luôn tính băm rồi mới so tên, để thời gian phản hồi không lộ tên đăng nhập đúng hay sai
  return timingSafeEqual(expected, actual) && safeEqual(username, expectedUser);
}

/** Tên đăng nhập của phiên hiện tại, hoặc `null` */
export async function getAdmin() {
  return verifySessionToken((await cookies()).get(ADMIN_COOKIE)?.value);
}

export class UnauthorizedError extends Error {
  constructor() {
    super("UNAUTHORIZED");
  }
}

/**
 * Bắt buộc đã đăng nhập: gọi đầu mỗi Server Action (proxy.ts đã chặn các trang quản trị,
 * nhưng Server Action có thể bị gọi thẳng nên phải kiểm tra lại). Chưa đăng nhập → ném `UnauthorizedError`.
 */
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) throw new UnauthorizedError();
  return admin;
}
