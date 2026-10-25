"use client";

import { useActionState, useState } from "react";
import { login, type LoginState } from "@/app/[lang]/admin/actions";
import { fill, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/vi";

const field =
  "w-full rounded-xl bg-white px-4 py-3 text-[15px] text-ink outline-none ring-1 ring-line placeholder:text-muted focus:ring-2 focus:ring-brand-500";

/** Form đăng nhập quản trị: gửi tới Server Action `login`; sai mật khẩu hoặc bị khoá tạm thì báo ngay dưới form */
export default function LoginForm({ locale, labels }: { locale: Locale; labels: Dictionary["admin"]["login"] }) {
  // Trang đích sau khi đăng nhập (?next= do proxy gắn) đọc lúc gửi form để trang đăng nhập vẫn là trang tĩnh
  const [state, action, pending] = useActionState(async (prev: LoginState, formData: FormData) => {
    formData.set("next", new URLSearchParams(window.location.search).get("next") ?? "");
    return login(prev, formData);
  }, { error: null });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="lang" value={locale} />
      <label className="block">
        <span className="text-sm font-medium text-ink">{labels.username}</span>
        <input name="username" required autoComplete="username" autoFocus className={`${field} mt-2`} />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">{labels.password}</span>
        <span className="relative mt-2 block">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            className={`${field} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? labels.hidePassword : labels.showPassword}
            className="absolute inset-y-0 right-0 grid w-12 place-items-center text-muted hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
              <circle cx="12" cy="12" r="3" />
              {showPassword && <path d="M4 4l16 16" />}
            </svg>
          </button>
        </span>
      </label>

      <div role="alert" aria-live="polite">
        {state.error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
            {state.error === "locked" ? fill(labels.locked, { n: state.minutes ?? 15 }) : labels.error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="h-12 w-full rounded-full bg-brand-600 text-base font-medium text-white transition-colors hover:bg-brand-700 disabled:opacity-70"
      >
        {pending ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
