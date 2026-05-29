import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  isSupabaseConfigured,
  isAdminEmail,
  isAdminAllowlistConfigured,
} from "@/lib/supabase/config";

/**
 * /admin guard — runs at the edge before any admin page renders.
 *
 *   - Supabase not configured  → let through; the page renders a
 *     "configure Supabase" banner. (Hard-failing here would block the
 *     setup screen.)
 *   - Allowlist not configured → let through; page shows a banner.
 *   - No session               → redirect to /auth/login?next=…
 *   - Signed in, not admin     → redirect to /auth/login?denied=1
 *   - Admin                    → continue
 *
 * The same checks are repeated by `requireAdmin()` inside each admin
 * server action, so middleware is defence-in-depth rather than the only
 * gate.
 */
export async function proxy(request: NextRequest) {
  // We only guard /admin/*. Everything else passes through untouched.
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next({ request });
  }

  // Setup-screen modes — let the page render its own banner.
  if (!isSupabaseConfigured() || !isAdminAllowlistConfigured()) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = request.nextUrl.clone();
    const next = request.nextUrl.pathname + request.nextUrl.search;
    url.pathname = "/auth/login";
    url.search = `?next=${encodeURIComponent(next)}`;
    return NextResponse.redirect(url);
  }

  if (!isAdminEmail(user.email)) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.search = "?denied=1";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  // Match every /admin route. /auth pages are unguarded.
  matcher: ["/admin/:path*"],
};
