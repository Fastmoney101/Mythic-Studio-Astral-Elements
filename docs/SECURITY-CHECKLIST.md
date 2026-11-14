# Security checklist before launch

- [ ] `.env.local` and production secrets are protected; no service-role key or signing secret reaches browser code.
- [ ] Migrations applied and reviewed in staging.
- [ ] RLS tested using anonymous, ordinary-user, and admin accounts.
- [ ] Users cannot grant themselves admin, XP, levels, or power unlocks.
- [ ] XP awards are server-validated and idempotent.
- [ ] Creator submissions are validated and reviewed before publication.
- [ ] Checkout stays disabled until provider sessions and signed webhooks are implemented.
- [ ] Admin actions are logged and server-side role checked.
- [ ] Rate limiting, backups, monitoring, abuse controls, and secret rotation are configured.
- [ ] Game Bridge tokens are short-lived and verified by the receiving server.
- [ ] Typecheck, lint, build, and authorization tests pass.
