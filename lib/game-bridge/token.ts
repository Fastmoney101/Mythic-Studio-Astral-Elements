function base64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function encodeJson(value: unknown) {
  return base64Url(new TextEncoder().encode(JSON.stringify(value)));
}

export async function signGameBridgeToken(user: { id: string; email?: string }) {
  const secret = process.env.GAME_BRIDGE_SIGNING_SECRET;
  if (!secret || secret.length < 32) throw new Error("Game Bridge signing secret is not configured securely.");

  const now = Math.floor(Date.now() / 1000);
  const header = encodeJson({ alg: "HS256", typ: "JWT" });
  const payload = encodeJson({
    iss: "mythic-studio-astral-elements",
    sub: user.id,
    ...(user.email ? { email: user.email } : {}),
    iat: now,
    exp: now + 300,
    aud: "astral-game-bridge"
  });
  const unsigned = `${header}.${payload}`;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(unsigned));
  return `${unsigned}.${base64Url(new Uint8Array(signature))}`;
}
