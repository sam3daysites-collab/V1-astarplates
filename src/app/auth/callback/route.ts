import { NextResponse, type NextRequest } from "next/server";
import { getServerClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/supabase/config";

/**
 * Supabase magic-link callback.
 *
 *   1. Exchange the `?code=` query param for a session.
 *   2. Re-check the resulting email against the admin allowlist.
 *   3. If allowed, redirect to `?next=` (or /admin). If not, sign out and
 *      bounce to /auth/login?denied=1.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin";

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/login?error=missing-code`);
  }

  const supabase = await getServerClient();
  if (!supabase) {
    return NextResponse.redirect(
      `${origin}/auth/login?error=supabase-missing`,
    );
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data?.user?.email) {
    return NextResponse.redirect(`${origin}/auth/login?error=exchange-failed`);
  }

  if (!isAdminEmail(data.user.email)) {
    // Drop the just-created session so a denied email doesn't keep one.
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/auth/login?denied=1`);
  }

  // Only allow same-origin redirects.
  const safeNext = next.startsWith("/") ? next : "/admin";
  return NextResponse.redirect(`${origin}${safeNext}`);
}
