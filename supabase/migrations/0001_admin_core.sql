-- =============================================================================
-- 0001_admin_core.sql
-- Feature: Admin accounts + shared helpers used by every later migration.
-- Run this FIRST. Every other migration depends on public.is_admin().
-- =============================================================================

create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- Shared trigger: keeps updated_at honest on every table that has the column.
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- admin_users: the allowlist. Being in Supabase Auth is NOT enough to reach the
-- back office — a row must exist here too.
-- -----------------------------------------------------------------------------
create table if not exists public.admin_users (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  full_name   text,
  role        text not null default 'admin' check (role in ('admin', 'owner')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists set_admin_users_updated_at on public.admin_users;
create trigger set_admin_users_updated_at
  before update on public.admin_users
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- is_admin(): the single authorisation check reused by every RLS policy.
--
-- SECURITY DEFINER is required. The function is owned by the table owner, and
-- Postgres does not apply RLS to a table's owner, so this can read admin_users
-- without the policy on admin_users recursing back into this function.
-- -----------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, anon, service_role;

-- -----------------------------------------------------------------------------
-- RLS
-- -----------------------------------------------------------------------------
alter table public.admin_users enable row level security;

drop policy if exists "admins read admin_users" on public.admin_users;
create policy "admins read admin_users"
  on public.admin_users for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admins update own profile" on public.admin_users;
create policy "admins update own profile"
  on public.admin_users for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- Deliberately no INSERT/DELETE policy: admins are granted only by the
-- service-role key (Supabase SQL editor / dashboard), never from the app.

-- =============================================================================
-- GRANTING YOUR FIRST ADMIN
-- -----------------------------------------------------------------------------
-- 1. Supabase Dashboard -> Authentication -> Users -> "Add user"
--    (set a password and tick "Auto Confirm User").
-- 2. Run the statement below with that user's email:
--
--    insert into public.admin_users (id, email, full_name, role)
--    select id, email, 'Your Name', 'owner'
--    from auth.users
--    where email = 'you@example.com'
--    on conflict (id) do nothing;
-- =============================================================================
