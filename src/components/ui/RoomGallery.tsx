"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

type Photo = { src: string; alt: string };

// Xếp chồng lộn xộn kiểu xấp ảnh: ảnh trên cùng nằm thẳng, 2 ảnh phía sau nghiêng lệch hai bên
// đủ nhiều để thấy rõ từng ảnh; xoè ra thêm khi hover. Thứ tự: độ sâu 0 (trên cùng), 1, 2.
const layers = [
  "group-hover:-translate-y-1",
  "rotate-[5deg] translate-x-[4%] -translate-y-[2%] group-hover:rotate-[8deg] group-hover:translate-x-[7%]",
  "-rotate-[6deg] -translate-x-[4%] translate-y-[1%] group-hover:-rotate-[9deg] group-hover:-translate-x-[7%]",
];

/**
 * Ảnh phòng hiển thị dạng xếp chồng (tối đa 3 lớp cho gọn mắt); bấm vào mở trình xem ảnh
 * với đủ số ảnh (next/prev, zoom, vuốt, phím ←/→, thumbnails, bộ đếm).
 */
export default function RoomGallery({ photos, name }: { photos: Photo[]; name: string }) {
  const [index, setIndex] = useState(-1);
  const stack = photos.slice(0, layers.length);

  return (
    <>
      <button
        type="button"
        onClick={() => setIndex(0)}
        aria-label={`Xem ảnh phòng ${name}`}
        // p-*: chừa chỗ cho góc các ảnh nghiêng không tràn ra ngoài cột
        className="group relative block aspect-[4/3] w-full cursor-zoom-in p-5 text-left md:p-8"
      >
        <div className="relative size-full">
          {/* Vẽ từ ảnh sâu nhất lên ảnh trước nhất */}
          {stack
            .map((photo, depth) => ({ photo, depth }))
            .reverse()
            .map(({ photo, depth }) => (
              <div
                key={photo.src}
                className={`absolute inset-0 overflow-hidden rounded-2xl shadow-[0_6px_18px_rgb(0_0_0/0.15)] ring-4 ring-white transition-transform duration-500 ease-out ${layers[depth]}`}
              >
                <Image src={photo.src} alt={depth === 0 ? photo.alt : ""} fill sizes="(min-width: 768px) 45vw, 90vw" className="object-cover" />
              </div>
            ))}

          <span className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-black/60 px-3.5 py-2 text-sm font-medium text-white backdrop-blur transition-colors group-hover:bg-black/75">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
              <rect x="3" y="5" width="15" height="13" rx="2" />
              <path d="M7 3h12a2 2 0 0 1 2 2v11M3 14l4-4 4 4 3-3 4 4" />
            </svg>
            Xem ảnh
          </span>
        </div>
      </button>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photos.map((p) => ({ src: p.src, alt: p.alt, description: p.alt }))}
        plugins={[Zoom, Thumbnails, Counter, Captions]}
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
        thumbnails={{ width: 96, height: 64, border: 0, borderRadius: 8, padding: 0, gap: 12, imageFit: "cover" }}
        counter={{ container: { style: { top: 0, bottom: "unset" } } }}
        captions={{ descriptionTextAlign: "center" }}
        styles={{ container: { backgroundColor: "rgb(0 0 0 / 0.92)" } }}
      />
    </>
  );
}
