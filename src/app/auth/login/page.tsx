import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./LoginForm";
import {
  isSupabaseConfigured,
  isAdminAllowlistConfigured,
} from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Sign in — A Star Number Plates",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ next?: string; denied?: string }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const { next, denied } = await searchParams;
  const supabaseReady = isSupabaseConfigured();
  const allowlistReady = isAdminAllowlistConfigured();

  return (
    <section className="min-h-[70vh] bg-[var(--brand-cream)] py-16">
      <div className="mx-auto max-w-md px-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-lime)]/70">
            Admin
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-neutral-900">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            We&apos;ll email you a one-time sign-in link. Only emails on the
            admin allowlist can sign in.
          </p>

          {denied && (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              That account is not permitted to access the admin.
            </p>
          )}

          {!supabaseReady && (
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
              Supabase isn&apos;t configured yet. Set
              <code className="mx-1 rounded bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_URL</code>
              and
              <code className="mx-1 rounded bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
              in <code>.env.local</code>.
            </p>
          )}
          {supabaseReady && !allowlistReady && (
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
              Admin allowlist is empty. Set
              <code className="mx-1 rounded bg-amber-100 px-1">ADMIN_EMAILS</code>
              in <code>.env.local</code> to permit sign-in.
            </p>
          )}

          <div className="mt-6">
            <LoginForm
              nextPath={typeof next === "string" ? next : undefined}
              disabled={!supabaseReady || !allowlistReady}
            />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-500">
          Not staff?{" "}
          <Link href="/" className="underline">
            Back to the site
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
