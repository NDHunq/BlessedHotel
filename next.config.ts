import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Trang 404 chung cho URL không khớp route nào (layout gốc nằm trong [lang])
    globalNotFound: true,
  },
  async redirects() {
    // Trang "Giới thiệu" đổi tên thành "Về chúng tôi" (proxy tự thêm tiền tố ngôn ngữ nếu thiếu)
    return [
      { source: "/gioi-thieu", destination: "/ve-chung-toi", permanent: true },
      { source: "/:lang(vi|en|ko|zh)/gioi-thieu", destination: "/:lang/ve-chung-toi", permanent: true },
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
