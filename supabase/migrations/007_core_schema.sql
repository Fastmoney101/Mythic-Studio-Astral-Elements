-- Install 7: profiles, spirits, powers and player progression.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (char_length(display_name) <= 60),
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.spirits (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  element text not null check (element in ('fire', 'water', 'earth', 'air', 'lightning', 'ice', 'light', 'shadow')),
  description text not null default '' check (char_length(description) <= 3000),
  configuration jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.powers (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  element text not null,
  description text not null default '',
  xp_cost integer not null default 0 check (xp_cost >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.player_progression (
  user_id uuid primary key references auth.users(id) on delete cascade,
  xp_total bigint not null default 0 check (xp_total >= 0),
  level integer not null default 1 check (level >= 1),
  updated_at timestamptz not null default now()
);

create table if not exists public.xp_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_key text not null,
  amount integer not null check (amount > 0 and amount <= 10000),
  source text not null check (char_length(source) <= 80),
  created_at timestamptz not null default now(),
  unique(user_id, event_key)
);

create table if not exists public.player_power_unlocks (
  user_id uuid not null references auth.users(id) on delete cascade,
  power_id uuid not null references public.powers(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  primary key(user_id, power_id)
);

create index if not exists spirits_owner_created_idx on public.spirits(owner_id, created_at desc);
create index if not exists xp_events_user_created_idx on public.xp_events(user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.spirits enable row level security;
alter table public.powers enable row level security;
alter table public.player_progression enable row level security;
alter table public.xp_events enable row level security;
alter table public.player_power_unlocks enable row level security;

-- SECURITY DEFINER avoids recursive evaluation of profiles RLS in admin policies.
create or replace function public.is_astral_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;
revoke all on function public.is_astral_admin() from public;
grant execute on function public.is_astral_admin() to authenticated;

drop policy if exists "Profiles readable by owner or admin" on public.profiles;
create policy "Profiles readable by owner or admin" on public.profiles
for select to authenticated
using (id = (select auth.uid()) or (select public.is_astral_admin()));

drop policy if exists "Users update own profile fields" on public.profiles;
create policy "Users update own profile fields" on public.profiles
for update to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()) and role = 'user');

drop policy if exists "Users insert own profile" on public.profiles;
create policy "Users insert own profile" on public.profiles
for insert to authenticated
with check (id = (select auth.uid()) and role = 'user');

drop policy if exists "Owners manage own spirits" on public.spirits;
create policy "Owners manage own spirits" on public.spirits
for all to authenticated using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));

drop policy if exists "Authenticated read active powers" on public.powers;
create policy "Authenticated read active powers" on public.powers
for select to authenticated using (is_active = true);

drop policy if exists "Users read own progression" on public.player_progression;
create policy "Users read own progression" on public.player_progression
for select to authenticated using (user_id = (select auth.uid()));

drop policy if exists "Users read own XP events" on public.xp_events;
create policy "Users read own XP events" on public.xp_events
for select to authenticated using (user_id = (select auth.uid()));

drop policy if exists "Users read own unlocked powers" on public.player_power_unlocks;
create policy "Users read own unlocked powers" on public.player_power_unlocks
for select to authenticated using (user_id = (select auth.uid()));

-- Intentionally no client write policies for XP, progression, or unlocks.
create or replace function public.handle_new_astral_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', ''))
  on conflict (id) do nothing;
  insert into public.player_progression (user_id) values (new.id) on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_astral on auth.users;
create trigger on_auth_user_created_astral after insert on auth.users
for each row execute procedure public.handle_new_astral_user();
