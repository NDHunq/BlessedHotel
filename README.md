# Blessed Hotel Phú Quốc

Website giới thiệu khách sạn (Next.js 16, Tailwind CSS v4, PostgreSQL), 4 ngôn ngữ: Tiếng Việt, English, 한국어, 简体中文.
Có trang quản trị để viết tin tức (4 ngôn ngữ, Markdown, chấm điểm SEO).

## Chạy trên máy dev

```bash
brew install colima docker docker-compose && colima start   # Docker (Mac)
cp .env.example .env.local                                  # rồi điền ADMIN_PASSWORD_HASH, SESSION_SECRET
npm install
npm run db:up && npm run db:migrate && npm run db:seed
npm run dev                                                 # http://localhost:3000 · quản trị: /vi/admin
```

Tạo mã băm mật khẩu quản trị: `npm run hash-password`. Tạo `SESSION_SECRET`: `openssl rand -base64 48`.

Chi tiết kiến trúc, quy ước và quy tắc đa ngôn ngữ: xem [CLAUDE.md](CLAUDE.md).
