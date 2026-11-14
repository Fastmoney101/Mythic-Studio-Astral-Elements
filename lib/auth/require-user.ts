import { createClient } from "../supabase/server";

export async function getAuthenticatedUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return { supabase, user: data.user };
}

export async function getAuthenticatedAdmin() {
  const auth = await getAuthenticatedUser();
  if (!auth) return null;

  const { data: profile, error } = await auth.supabase
    .from("profiles")
    .select("role")
    .eq("id", auth.user.id)
    .maybeSingle();

  if (error || profile?.role !== "admin") return null;
  return { ...auth, profile };
}
