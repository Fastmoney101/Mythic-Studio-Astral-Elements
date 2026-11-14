import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { signGameBridgeToken } from "../../../../lib/game-bridge/token";

export async function POST() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const token = await signGameBridgeToken({ id: data.user.id, email: data.user.email });
    return NextResponse.json({ token, tokenType: "Bearer", expiresIn: 300, audience: "astral-game-bridge" });
  } catch {
    return NextResponse.json({ error: "Game Bridge signing is not configured." }, { status: 503 });
  }
}
