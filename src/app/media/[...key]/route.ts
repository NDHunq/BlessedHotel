import { readFile } from "node:fs/promises";
import path from "node:path";
import { IMAGE_TYPES, uploadDir } from "@/lib/storage";

const CONTENT_TYPES = Object.fromEntries(Object.entries(IMAGE_TYPES).map(([type, ext]) => [ext, type]));

/** Phục vụ ảnh đã tải lên khi STORAGE_DRIVER=local (file trong UPLOAD_DIR, tên file ngẫu nhiên nên cache vĩnh viễn) */
export async function GET(_request: Request, { params }: RouteContext<"/media/[...key]">) {
  const { key } = await params;
  const root = uploadDir();
  const file = path.resolve(root, ...key);
  const type = CONTENT_TYPES[path.extname(file).slice(1).toLowerCase()];
  // Chặn đi ra ngoài thư mục ảnh (VD /media/../../.env) và loại file không phải ảnh
  if (!file.startsWith(root + path.sep) || !type) return new Response("Not found", { status: 404 });

  try {
    return new Response(new Uint8Array(await readFile(file)), {
      headers: { "Content-Type": type, "Cache-Control": "public, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
