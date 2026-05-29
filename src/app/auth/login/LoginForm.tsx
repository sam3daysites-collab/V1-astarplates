"use client";

import { useActionState } from "react";
import { sendMagicLink, type LoginActionResult } from "./actions";

interface LoginFormProps {
  nextPath?: string;
  disabled?: boolean;
}

export default function LoginForm({ nextPath, disabled }: LoginFormProps) {
  const [state, formAction, pending] = useActionState<
    LoginActionResult | null,
    FormData
  >(sendMagicLink, null);

  if (state?.ok) {
    return (
      <div className="rounded-lg border border-[var(--brand-gold)]/40 bg-[var(--brand-cream)] px-4 py-4 text-sm text-[var(--brand-lime)]">
        <p className="font-semibold">Check your inbox.</p>
        <p className="mt-1 text-neutral-700">
          We&apos;ve sent a sign-in link. Open it on this device to continue.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {nextPath && <input type="hidden" name="next" value={nextPath} />}
      <label className="block">
        <span className="text-sm font-medium text-neutral-800">Email</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          disabled={disabled || pending}
          placeholder="you@astarnumberplates.uk"
          className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-[var(--brand-gold)] focus:ring-2 focus:ring-[var(--brand-gold)]/30 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </label>
      {state && !state.ok && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={disabled || pending}
        className="touch-target inline-flex w-full items-center justify-center rounded-lg bg-[var(--brand-gold)] px-4 py-3 text-sm font-semibold text-[var(--brand-lime)] transition hover:bg-[#e6c14d] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500"
      >
        {pending ? "Sending…" : "Email me a sign-in link"}
      </button>
    </form>
  );
}
