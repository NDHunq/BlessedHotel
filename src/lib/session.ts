/**
 * Cookie phiên đăng nhập quản trị: `<payload base64url>.<chữ ký HMAC-SHA256>`, payload = { u: tên đăng nhập, exp: hết hạn }.
 * Ký bằng SESSION_SECRET nên không thể tự tạo cookie hợp lệ. Dùng được trong proxy.ts (Node.js runtime) và Server Component/Action.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "blessed_admin";
/** Đường dẫn trang đăng nhập (không có tiền tố ngôn ngữ) */
export const ADMIN_LOGIN_PATH = "/admin/login";
/** Phiên đăng nhập kéo dài 8 giờ */
export const SESSION_MAX_AGE = 60 * 60 * 8;

type Payload = { u: string; exp: number };

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("SESSION_SECRET phải dài ít nhất 32 ký tự");
  return value;
}

const sign = (data: string) => createHmac("sha256", secret()).update(data).digest("base64url");

export function createSessionToken(username: string) {
  const payload: Payload = { u: username, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${sign(data)}`;
}

/** Trả về tên đăng nhập nếu cookie hợp lệ và chưa hết hạn, ngược lại `null` */
export function verifySessionToken(token: string | undefined): string | null {
  if (!token) return null;
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;
  try {
    const expected = Buffer.from(sign(data));
    const actual = Buffer.from(signature);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
    const payload = JSON.parse(Buffer.from(data, "base64url").toString()) as Payload;
    if (typeof payload.exp !== "number" || payload.exp < Date.now() / 1000) return null;
    return payload.u === process.env.ADMIN_USERNAME ? payload.u : null;
  } catch {
    return null;
  }
}
