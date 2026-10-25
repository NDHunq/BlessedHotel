/**
 * Ảnh bài viết có thể là link bất kỳ (admin dán vào). `next/image` chỉ tối ưu được ảnh trong thư mục site
 * hoặc từ tên miền khai báo ở `images.remotePatterns` (next.config.ts); nguồn khác phải hiển thị `unoptimized`
 * để trang không bị lỗi. Chỉ gọi ở server (đọc R2_PUBLIC_URL), truyền kết quả xuống Client Component.
 */
const ALLOWED_HOSTS = ["images.unsplash.com"];

export function canOptimizeImage(src: string) {
  if (src.startsWith("/") && !src.startsWith("//")) return true;
  try {
    const { protocol, hostname } = new URL(src);
    const r2 = process.env.R2_PUBLIC_URL ? new URL(process.env.R2_PUBLIC_URL).hostname : undefined;
    return protocol === "https:" && (ALLOWED_HOSTS.includes(hostname) || hostname === r2);
  } catch {
    return false;
  }
}
