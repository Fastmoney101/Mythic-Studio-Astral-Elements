# Install guide — Installs 7–10

## Before you start
- Create a backup or branch.
- Configure a Supabase project.
- Do not commit `.env.local`, a service-role key, or the Game Bridge signing secret.

## Configure environment
Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Set `GAME_BRIDGE_SIGNING_SECRET` only in server-side environments (at least 32 characters).

## Apply migrations
Apply `supabase/migrations/007_core_schema.sql` followed by `supabase/migrations/008_marketplace.sql` in the Supabase SQL Editor, or with the Supabase CLI. Stop if a migration reports an error.

## Verify locally
Run `npm install`, `npm run typecheck`, `npm run lint`, and `npm run build`. Then test with anonymous, ordinary-user, and admin accounts that RLS ownership policies work as intended. Also check that marketplace checkout returns `503` and anonymous Game Bridge token requests return `401`.

## Production readiness
Before launch, add rate limits, abuse monitoring, audit logs, backups, secret rotation, admin workflows, provider-specific payment sessions and signed webhook verification, plus receiving-game-server JWT verification. Review RLS policies against the deployed Supabase project.

## Boundaries
This foundation does not add payment processing, a real third-party game integration, a full admin interface, production rate limiting, or full UI wiring for every module. The app deliberately does not use a Supabase service-role key.
