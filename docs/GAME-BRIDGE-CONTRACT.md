# Game Bridge contract

`POST /api/game-bridge/token` requires an authenticated Supabase user and returns a five-minute HS256 JWT. The signing secret stays server-side.

A receiving game server must verify the signature, `iss` (`mythic-studio-astral-elements`), `aud` (`astral-game-bridge`), expiration and issue time before trusting `sub` as a platform user ID. Never trust a browser-supplied token without server-side verification.

This does not include an engine SDK, game-server adapter, multiplayer transport, OAuth integration, or inventory sync.
