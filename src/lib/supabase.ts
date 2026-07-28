import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let supabaseClient: SupabaseClient | null = null;

function createSupabaseBrowserClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}

export function getSupabaseClient() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase nao configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY antes de usar o cliente.",
    );
  }

  if (!supabaseClient) {
    supabaseClient = createSupabaseBrowserClient();
  }

  return supabaseClient;
}

export async function checkSupabaseConnection() {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      status: 0,
      error:
        "Variaveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY ainda nao foram configuradas.",
    };
  }

  const response = await fetch(`${supabaseUrl}/auth/v1/settings`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
  });

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: await response.text(),
    };
  }

  return {
    ok: true,
    status: response.status,
    data: await response.json(),
  };
}
