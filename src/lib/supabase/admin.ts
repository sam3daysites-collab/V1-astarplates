import "server-only";

import { createClient } from "@supabase/supabase-js";
import {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  isSupabaseConfigured,
  isServiceRoleConfigured,
} from "./config";

/**
 * Service-role Supabase client. Bypasses RLS — server-side only.
 *
 * The `import "server-only"` at the top throws at build time if anything in
 * a client bundle reaches this file, so the service-role key cannot leak.
 *
 * Returns `null` when env vars are missing; admin pages render a
 * "Supabase not configured" banner in that case instead of crashing.
 */
export function getAdminClient() {
  if (!isSupabaseConfigured() || !isServiceRoleConfigured()) return null;

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
