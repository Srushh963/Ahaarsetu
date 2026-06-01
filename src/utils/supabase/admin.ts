import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client with the SERVICE ROLE key.
 * This bypasses all Row Level Security (RLS) policies.
 * NEVER expose this client to the browser — only use in API routes.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set in environment variables.");
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
