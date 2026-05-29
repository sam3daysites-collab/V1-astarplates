/**
 * Shared Supabase configuration + admin allowlist.
 *
 * All consumers go through these helpers so we never read process.env in
 * scattered places and "is it configured?" returns the same answer
 * everywhere. Graceful empty states depend on this.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Server-only. Reading this in a client bundle will leak the key — we make
 * that hard by only importing it from src/lib/supabase/admin.ts.
 */
export const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const RAW_ADMIN_EMAILS = process.env.ADMIN_EMAILS ?? "";

export const ADMIN_EMAILS: readonly string[] = RAW_ADMIN_EMAILS.split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function isSupabaseConfigured(): boolean {
  return SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;
}

export function isServiceRoleConfigured(): boolean {
  return SUPABASE_SERVICE_ROLE_KEY.length > 0;
}

export function isAdminAllowlistConfigured(): boolean {
  return ADMIN_EMAILS.length > 0;
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
