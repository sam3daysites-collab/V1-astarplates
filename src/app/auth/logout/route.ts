import { NextResponse, type NextRequest } from "next/server";
import { getServerClient } from "@/lib/supabase/server";

/** POST/GET → sign out, bounce to /auth/login. */
async function handler(request: NextRequest) {
  const supabase = await getServerClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/auth/login`);
}

export { handler as GET, handler as POST };
