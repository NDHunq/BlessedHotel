"use client";

import Button from "@/components/ui/Button";
import { openBooking } from "@/components/booking/events";

/** Nút mở menu đặt phòng (các kênh: gọi điện, Zalo, OTA) */
export default function OpenBookingButton({
  onClick,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "href">) {
  return (
    <Button
      {...props}
      onClick={() => {
        onClick?.();
        openBooking();
      }}
    />
  );
}
