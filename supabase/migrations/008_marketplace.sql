-- Install 9: creator marketplace. Orders/payment records are intentionally absent.
create table if not exists public.marketplace_listings (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 3 and 100),
  description text not null check (char_length(description) between 10 and 3000),
  category text not null check (category in ('spirit', 'artwork', 'sound', 'template', 'other')),
  price_cents integer not null check (price_cents between 0 and 100000000),
  currency text not null default 'USD' check (currency ~ '^[A-Z]{3}$'),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists marketplace_status_created_idx on public.marketplace_listings(status, created_at desc);
alter table public.marketplace_listings enable row level security;

drop policy if exists "Published listings are public" on public.marketplace_listings;
create policy "Published listings are public" on public.marketplace_listings
for select to anon, authenticated using (status = 'published' or creator_id = (select auth.uid()));

drop policy if exists "Creators insert own drafts" on public.marketplace_listings;
create policy "Creators insert own drafts" on public.marketplace_listings
for insert to authenticated with check (creator_id = (select auth.uid()) and status = 'draft');

drop policy if exists "Creators update own listings" on public.marketplace_listings;
create policy "Creators update own listings" on public.marketplace_listings
for update to authenticated using (creator_id = (select auth.uid()))
with check (creator_id = (select auth.uid()));

drop policy if exists "Creators delete own listings" on public.marketplace_listings;
create policy "Creators delete own listings" on public.marketplace_listings
for delete to authenticated using (creator_id = (select auth.uid()));

-- Checkout and payments must not be enabled without a provider session and signed webhook verification.
