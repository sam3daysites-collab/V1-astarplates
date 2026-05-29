import type { AdminGateReason } from "@/lib/auth/admin";

interface BannerProps {
  reason: AdminGateReason;
}

const COPY: Record<AdminGateReason, { title: string; body: string }> = {
  "supabase-missing": {
    title: "Supabase isn't configured.",
    body: "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local, then restart the dev server.",
  },
  "allowlist-missing": {
    title: "Admin allowlist is empty.",
    body: "Set ADMIN_EMAILS in .env.local to a comma-separated list of permitted addresses, then restart.",
  },
  "not-signed-in": {
    title: "You're signed out.",
    body: "Sign in with one of the allowlisted emails to view this page.",
  },
  "not-admin": {
    title: "This account isn't permitted.",
    body: "Your signed-in email isn't on the ADMIN_EMAILS allowlist. Sign in with an allowlisted address.",
  },
};

export default function SupabaseNotConfiguredBanner({ reason }: BannerProps) {
  const { title, body } = COPY[reason];
  return (
    <div className="rounded-2xl border border-[var(--brand-gold)]/40 bg-[var(--brand-cream)] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-lime)]/70">
        Setup
      </p>
      <h2 className="mt-2 text-lg font-semibold text-neutral-900">{title}</h2>
      <p className="mt-2 text-sm text-neutral-700">{body}</p>
      <p className="mt-4 text-xs text-neutral-500">
        See <code>.env.example</code> and{" "}
        <code>supabase/migrations/0001_orders.sql</code> at the repo root.
      </p>
    </div>
  );
}
