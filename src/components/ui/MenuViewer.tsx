"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

/** Nút "Xem menu": mở thực đơn dạng ảnh từng trang (vuốt / phím ←/→ để lật trang, zoom để đọc chữ nhỏ) */
export default function MenuViewer({
  pages,
  label,
  lightboxLabels,
}: {
  pages: { src: string; alt: string }[];
  label: string;
  /** Nhãn của trình xem ảnh đã dịch (dictionary `lightbox`) */
  lightboxLabels: Record<string, string>;
}) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <button
        type="button"
        onClick={() => setIndex(0)}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-ink px-6 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-white"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
          <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z" />
        </svg>
        {label}
      </button>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={pages.map((p) => ({ src: p.src, alt: p.alt }))}
        plugins={[Zoom, Thumbnails, Counter]}
        labels={lightboxLabels}
        carousel={{ finite: true }}
        zoom={{ maxZoomPixelRatio: 4, scrollToZoom: true }}
        thumbnails={{ width: 60, height: 84, border: 0, borderRadius: 6, padding: 0, gap: 12, imageFit: "cover" }}
        counter={{ container: { style: { top: 0, bottom: "unset" } } }}
        styles={{ container: { backgroundColor: "rgb(0 0 0 / 0.92)" } }}
      />
    </>
  );
}
