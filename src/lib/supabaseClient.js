import { createClient } from "@supabase/supabase-js";

const url = process.env.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(url && key);

export const supabase = isSupabaseConfigured
  ? createClient(url, key, {
      accessToken: async () => {
        const session = window.Clerk?.session;
        if (!session) return null;
        return (await session.getToken()) ?? null;
      },
    })
  : null;

export function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_PUBLISHABLE_KEY to .env and restart the app."
    );
  }
  return supabase;
}

export function clerkUserId() {
  const id = window.Clerk?.user?.id;
  if (!id) {
    throw new Error("Sign in required.");
  }
  return id;
}
