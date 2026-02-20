import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anon) {
  // Helpful error in dev; in production this will be stripped by bundlers if unused.
  // eslint-disable-next-line no-console
  console.warn(
    "[supabase] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. " +
      "App will run in offline mode (local content only)."
  );
}

export const supabase = url && anon ? createClient(url, anon) : null;
