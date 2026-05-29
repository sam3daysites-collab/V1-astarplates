import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  isSupabaseConfigured,
} from "./config";

/**
 * Cookie-aware Supabase client for server components and server actions.
 * Returns `null` if Supabase env vars are missing — callers must check.
 */
export async function getServerClient() {
  if (!isSupabaseConfigured()) return null;

  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        // Server components can't set cookies; the call throws and we
        // ignore. Middleware + route handlers + server actions can set
        // cookies, and there the call succeeds.
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          /* read-only context; safe to ignore */
        }
      },
    },
  });
}

/**
 * Returns the current authenticated user via cookie session, or null.
 * Never throws when Supabase isn't configured.
 */
export async function getCurrentUser() {
  const supabase = await getServerClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
