import type { NextConfig } from "next";
import { news } from "./src/lib/site";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Trang 404 chung cho URL không khớp route nào (layout gốc nằm trong [lang])
    globalNotFound: true,
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
      ...news.map((post) => ({ source: `/${L}/tin-tuc/${post.slug}`, destination: `/:lang/news/${post.id}`, permanent: true })),
      ...pages.map(([from, to]) => ({ source: `/${L}/${from}`, destination: `/:lang/${to}`, permanent: true })),
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
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
