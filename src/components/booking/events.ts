/** Sự kiện toàn cục để mở menu đặt phòng (BookingFab) từ bất kỳ nút nào */
export const OPEN_BOOKING_EVENT = "booking:open";

export function openBooking() {
  window.dispatchEvent(new Event(OPEN_BOOKING_EVENT));
}
