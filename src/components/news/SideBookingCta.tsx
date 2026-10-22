import OpenBookingButton from "@/components/booking/OpenBookingButton";
import { getI18n } from "@/i18n/server";

/** Khối kêu gọi đặt phòng nhỏ cho thanh bên */
export default async function SideBookingCta() {
  const { t } = await getI18n();
  return (
    <div className="rounded-2xl bg-sand p-6">
      <p className="font-display text-xl font-semibold tracking-[-0.01em] text-ink">{t.newsPage.ctaTitle}</p>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{t.newsPage.ctaBody}</p>
      <OpenBookingButton className="mt-5">{t.ui.contactToBook}</OpenBookingButton>
    </div>
  );
}
