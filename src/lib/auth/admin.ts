import "server-only";

import { getCurrentUser } from "@/lib/supabase/server";
import {
  isAdminEmail,
  isAdminAllowlistConfigured,
  isSupabaseConfigured,
} from "@/lib/supabase/config";

export type AdminGateResult =
  | { ok: true; email: string }
  | { ok: false; reason: AdminGateReason };

export type AdminGateReason =
  | "supabase-missing"
  | "allowlist-missing"
  | "not-signed-in"
  | "not-admin";

/**
 * Authoritative admin check used by every admin server component and
 * server action. Never throws — callers branch on the result.
 *
 * Reasons returned (in order of precedence):
 *   - supabase-missing:  env vars NEXT_PUBLIC_SUPABASE_URL / ANON_KEY absent
 *   - allowlist-missing: ADMIN_EMAILS env var absent (fail-closed)
 *   - not-signed-in:     no active Supabase session
 *   - not-admin:         signed in but email not in ADMIN_EMAILS
 */
export async function checkAdmin(): Promise<AdminGateResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, reason: "supabase-missing" };
  }
  if (!isAdminAllowlistConfigured()) {
    return { ok: false, reason: "allowlist-missing" };
  }

  const user = await getCurrentUser();
  if (!user || !user.email) {
    return { ok: false, reason: "not-signed-in" };
  }
  if (!isAdminEmail(user.email)) {
    return { ok: false, reason: "not-admin" };
  }

  return { ok: true, email: user.email };
}

/**
 * Throwing variant for server actions where any non-ok result should abort.
 * Use the non-throwing `checkAdmin()` in server components so we can render
 * a tailored empty state.
 */
export async function requireAdmin(): Promise<{ email: string }> {
  const result = await checkAdmin();
  if (!result.ok) {
    throw new Error(`admin-required: ${result.reason}`);
  }
  return { email: result.email };
}
