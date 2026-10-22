/**
 * Đăng nhập trang quản trị: BẢN GIẢ LẬP, không an toàn để chạy thật.
 * - Tài khoản demo bên dưới (ghi đè bằng biến môi trường ADMIN_USERNAME / ADMIN_PASSWORD).
 * - Đăng nhập đúng → cookie httpOnly `ADMIN_COOKIE` = `ADMIN_SESSION`; proxy.ts chặn /<lang>/admin khi thiếu cookie.
 * Khi làm thật: thay bằng hệ thống tài khoản (mật khẩu băm, phiên ký/mã hoá, hết hạn, giới hạn số lần thử).
 * Chỉ import ở server (proxy, Server Action), không import vào Client Component.
 */
export const DEMO_ADMIN = {
  username: process.env.ADMIN_USERNAME ?? "admin",
  password: process.env.ADMIN_PASSWORD ?? "1234",
};

export const ADMIN_COOKIE = "blessed_admin";
export const ADMIN_SESSION = "demo-session";

/** Đường dẫn trang đăng nhập (không có tiền tố ngôn ngữ) */
export const ADMIN_LOGIN_PATH = "/admin/login";
