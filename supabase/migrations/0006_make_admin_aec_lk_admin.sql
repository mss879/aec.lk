-- =============================================================================
-- 0006_make_admin_aec_lk_admin.sql
-- Grants admin/owner privileges to admin@aec.lk.
-- Runs idempotently and handles both existing auth accounts and future signups.
-- =============================================================================

-- 1. Immediately grant admin access if admin@aec.lk already exists in auth.users
insert into public.admin_users (id, email, full_name, role)
select id, email, 'Admin AEC', 'owner'
from auth.users
where lower(email) = 'admin@aec.lk'
on conflict (id) do update
set role = 'owner',
    email = excluded.email;

-- 2. Trigger function to automatically add admin@aec.lk to admin_users upon creation in auth.users
create or replace function public.auto_promote_admin_aec_lk()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if lower(new.email) = 'admin@aec.lk' then
    insert into public.admin_users (id, email, full_name, role)
    values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', 'Admin AEC'), 'owner')
    on conflict (id) do update
    set role = 'owner',
        email = excluded.email;
  end if;
  return new;
end;
$$;

-- 3. Attach trigger to auth.users table
drop trigger if exists on_auth_user_created_auto_admin on auth.users;
create trigger on_auth_user_created_auto_admin
  after insert on auth.users
  for each row
  execute function public.auto_promote_admin_aec_lk();
