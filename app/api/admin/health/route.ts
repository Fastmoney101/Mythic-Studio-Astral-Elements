import { NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "../../../../lib/auth/require-user";

export async function GET() {
  const auth = await getAuthenticatedAdmin();
  if (!auth) {
    const { data } = await (await import("../../../../lib/supabase/server")).createClient().then(client => client.auth.getUser());
    return NextResponse.json({ error: data.user ? "Forbidden" : "Unauthorized" }, { status: data.user ? 403 : 401 });
  }

  return NextResponse.json({ ok: true, service: "astral-elements-admin-api" });
}
