import Button from "@/components/ui/Button";
import { getI18n } from "@/i18n/server";

// Nền tối phía trên để header trong suốt (chữ trắng) vẫn đọc được
export default async function NotFound() {
  const { t, href } = await getI18n();
  return (
    <section className="-mt-16 bg-ink px-4 pt-40 pb-28 text-center text-white">
      <p className="font-display text-6xl font-semibold md:text-8xl">404</p>
      <h1 className="mt-4 text-xl font-medium md:text-2xl">{t.notFound.title}</h1>
      <Button href={href("/")} variant="light" className="mt-8">
        {t.notFound.back}
      </Button>
    </section>
  );
}
