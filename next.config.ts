import type { NextConfig } from "next";

/** Bài viết cũ dùng URL /tin-tuc/<slug>; nay là /news/<id> (id trong database, cột legacy_slug) */
const legacyNewsSlugs: Record<string, number> = {
  "yoga-san-thuong": 1,
  "uu-dai-luu-tru-dai-ngay": 2,
  "kinh-nghiem-du-lich-phu-quoc": 3,
  "hoang-hon-ho-boi": 4,
  "brunch-cuoi-tuan": 5,
  "spa-mua-thu": 6,
};

/** Ảnh tải lên Cloudflare R2 hiển thị qua tên miền công khai của bucket (biến R2_PUBLIC_URL lúc build) */
const r2Host = process.env.R2_PUBLIC_URL ? new URL(process.env.R2_PUBLIC_URL).hostname : undefined;

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Trang 404 chung cho URL không khớp route nào (layout gốc nằm trong [lang])
    globalNotFound: true,
    // Tải ảnh lên qua Server Action (tối đa 10MB, xem lib/storage.ts) + phần đầu multipart
    serverActions: { bodySizeLimit: "11mb" },
    proxyClientMaxBodySize: "11mb",
  },
  async redirects() {
    // Đường dẫn cũ bằng tiếng Việt → đường dẫn tiếng Anh hiện tại. URL thiếu tiền tố ngôn ngữ
    // (VD "/hang-phong") được proxy thêm tiền tố trước, rồi khớp các luật dưới đây.
    const L = ":lang(vi|en|ko|zh)";
    const pages: [string, string][] = [
      ["gioi-thieu", "about"],
      ["ve-chung-toi", "about"],
      ["hang-phong", "rooms"],
      ["am-thuc", "dining"],
      ["trai-nghiem", "experiences"],
      ["dich-vu", "experiences"],
      ["tin-tuc", "news"],
    ];
    return [
      // Bài viết cũ /tin-tuc/<slug> → /news/<id>
      ...Object.entries(legacyNewsSlugs).map(([slug, id]) => ({ source: `/${L}/tin-tuc/${slug}`, destination: `/:lang/news/${id}`, permanent: true })),
      ...pages.map(([from, to]) => ({ source: `/${L}/${from}`, destination: `/:lang/${to}`, permanent: true })),
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      ...(r2Host ? [{ protocol: "https" as const, hostname: r2Host }] : []),
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
