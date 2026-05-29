"use server";

import { headers } from "next/headers";
import { getServerClient } from "@/lib/supabase/server";
import {
  isSupabaseConfigured,
  isAdminAllowlistConfigured,
  isAdminEmail,
} from "@/lib/supabase/config";

export type LoginActionResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Sends a Supabase magic link to the given email.
 *
 * - Rejects emails not in the ADMIN_EMAILS allowlist *before* hitting
 *   Supabase, so we don't blast magic links to random addresses.
 * - The same email check happens again on /auth/callback after the user
 *   clicks the link, so there's no way around it.
 */
export async function sendMagicLink(
  _prev: LoginActionResult | null,
  formData: FormData,
): Promise<LoginActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase is not configured on this site." };
  }
  if (!isAdminAllowlistConfigured()) {
    return {
      ok: false,
      error: "Admin allowlist is not configured (ADMIN_EMAILS empty).",
    };
  }

  const raw = formData.get("email");
  if (typeof raw !== "string" || raw.trim().length === 0) {
    return { ok: false, error: "Please enter your email." };
  }
  const email = raw.trim().toLowerCase();

  if (!isAdminEmail(email)) {
    // Generic error — don't disclose whether the email is on the allowlist.
    return {
      ok: false,
      error: "That email isn't permitted to sign in to the admin.",
    };
  }

  const supabase = await getServerClient();
  if (!supabase) {
    return { ok: false, error: "Supabase client unavailable." };
  }

  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const proto = requestHeaders.get("x-forwarded-proto") ?? "https";
  const origin = host ? `${proto}://${host}` : "";

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      shouldCreateUser: true,
    },
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
