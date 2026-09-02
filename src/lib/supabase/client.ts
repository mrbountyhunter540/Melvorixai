import { createBrowserClient } from "@supabase/ssr";

/**
 * True once NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are
 * set. Check this before calling createClient() in any component that
 * runs on every page (like Navbar) — components that are only reached
 * by deliberate user action (login/register) can call createClient()
 * directly, since an error there is expected until you add real keys.
 */
export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * Supabase client for use in Client Components ("use client").
 * Reads the two public env vars — see .env.example. Throws if they're
 * missing, so callers on shared/global components should check
 * isSupabaseConfigured() first.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}