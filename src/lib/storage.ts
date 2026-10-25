/**
 * Lưu ảnh tải lên từ trang quản trị. STORAGE_DRIVER:
 * - "local" (mặc định): ghi vào thư mục UPLOAD_DIR, phục vụ qua route /media/<key> (app/media/[...key]/route.ts).
 *   Trên server cần gắn thư mục này ra ngoài container (volume) và đưa vào backup.
 * - "r2": tải lên Cloudflare R2 (API tương thích S3, ký bằng aws4fetch); ảnh xem qua R2_PUBLIC_URL.
 * Chỉ nhận ảnh JPEG/PNG/WebP/AVIF/GIF ≤ 10MB (không nhận SVG vì có thể chứa mã chạy được). Loại ảnh xác định theo
 * vài byte đầu của file (`sniffImageType`), không tin loại file trình duyệt gửi kèm.
 */
import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { AwsClient } from "aws4fetch";
import { getDb } from "@/lib/db";
import { media } from "@/lib/db/schema";

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

// turbopackIgnore: thư mục chỉ biết lúc chạy, không để Next đóng gói cả project vào bản build
export const uploadDir = () => path.resolve(/*turbopackIgnore: true*/ process.env.UPLOAD_DIR || "./uploads");

export class UploadError extends Error {
  constructor(public reason: "type" | "size") {
    super(reason);
  }
}

/** Loại ảnh theo chữ ký đầu file (magic bytes); không phải ảnh được hỗ trợ → null */
export function sniffImageType(b: Buffer): string | null {
  const ascii = (start: number, end: number) => b.subarray(start, end).toString("latin1");
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (ascii(0, 8) === "\x89PNG\r\n\x1a\n") return "image/png";
  if (ascii(0, 6) === "GIF87a" || ascii(0, 6) === "GIF89a") return "image/gif";
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "image/webp";
  if (ascii(4, 8) === "ftyp" && ["avif", "avis"].includes(ascii(8, 12))) return "image/avif";
  return null;
}

/** Lưu ảnh, ghi vào bảng `media`, trả về URL dùng được trong bài viết / ảnh bìa */
export async function saveImage(file: File) {
  if (file.size > MAX_UPLOAD_BYTES) throw new UploadError("size");
  const bytes = Buffer.from(await file.arrayBuffer());
  const type = sniffImageType(bytes);
  if (!type) throw new UploadError("type");
  const ext = IMAGE_TYPES[type];

  const now = new Date();
  const key = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${randomUUID()}.${ext}`;

  let url: string;
  if (process.env.STORAGE_DRIVER === "r2") {
    const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_PUBLIC_URL } = process.env;
    if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET || !R2_PUBLIC_URL) {
      throw new Error("Thiếu cấu hình R2 (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_PUBLIC_URL)");
    }
    const r2 = new AwsClient({ accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY, service: "s3", region: "auto" });
    const res = await r2.fetch(`https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${R2_BUCKET}/${key}`, {
      method: "PUT",
      body: bytes,
      headers: { "Content-Type": type, "Cache-Control": "public, max-age=31536000, immutable" },
    });
    if (!res.ok) throw new Error(`Tải ảnh lên R2 thất bại: ${res.status}`);
    url = `${R2_PUBLIC_URL.replace(/\/$/, "")}/${key}`;
  } else {
    const target = path.join(uploadDir(), key);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, bytes);
    url = `/media/${key}`;
  }

  await getDb().insert(media).values({ key, url, filename: file.name.slice(0, 200), contentType: type, size: file.size });
  return url;
}
