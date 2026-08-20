-- =============================================================================
-- 0008_visa_grants.sql
-- Feature: Visa Grant Success Stories — a record of an actual grant, managed in
--          the back office and published to /success-stories and
--          /success-stories/[slug].
--
--          Distinct from testimonials: a testimonial is an opinion, this is an
--          outcome. The structured columns (subclass, processing days, grant
--          date) are what make the listing filterable and what prospective
--          students actually scan for.
-- Depends on: 0001_admin_core.sql
-- =============================================================================

create table if not exists public.visa_grants (
  id                  uuid primary key default gen_random_uuid(),

  -- Display name. Use an initial or a first name only where the student has
  -- not consented to being fully identified; see `consent_on_file` below.
  student_name        text not null,
  slug                text not null unique,

  nationality         text,

  -- e.g. '500', '485', '482', '190'. Free text rather than a check constraint
  -- because subclasses change more often than we want to ship migrations.
  visa_subclass       text not null,
  visa_label          text,          -- e.g. 'Student Visa (Subclass 500)'

  course              text,          -- e.g. 'Master of Data Science'
  institution         text,          -- e.g. 'Monash University'
  destination_country text not null default 'Australia',

  -- The grant itself.
  grant_date          date,
  -- Lodgement to grant. Stored rather than derived so historic records can be
  -- entered without a lodgement date.
  processing_days     integer check (processing_days is null or processing_days >= 0),

  -- The narrative. `summary` is the card blurb, `story` the full page.
  summary             text,
  story               text not null default '',

  consultant_name     text,

  photo_url           text,
  photo_path          text,

  -- Publishing a real person's outcome needs their permission. This is a
  -- record that it was obtained, so nobody has to guess later.
  consent_on_file     boolean not null default false,

  is_published        boolean not null default false,
  is_featured         boolean not null default false,
  position            integer not null default 0,

  seo_title           text,
  seo_description     text,

  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists visa_grants_published_idx
  on public.visa_grants (is_published, position, grant_date desc);

create index if not exists visa_grants_subclass_idx
  on public.visa_grants (visa_subclass);

create index if not exists visa_grants_featured_idx
  on public.visa_grants (is_featured)
  where is_featured;

drop trigger if exists set_visa_grants_updated_at on public.visa_grants;
create trigger set_visa_grants_updated_at
  before update on public.visa_grants
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- A story about a named student must not go public without consent recorded.
-- Enforced in the database rather than only in the form, because the form is
-- not the only thing that can write to this table.
-- -----------------------------------------------------------------------------
create or replace function public.check_visa_grant_consent()
returns trigger
language plpgsql
as $$
begin
  if new.is_published and not new.consent_on_file then
    raise exception
      'Cannot publish a visa grant story without consent_on_file = true (student: %)',
      new.student_name;
  end if;

  return new;
end;
$$;

drop trigger if exists check_visa_grant_consent on public.visa_grants;
create trigger check_visa_grant_consent
  before insert or update on public.visa_grants
  for each row execute function public.check_visa_grant_consent();

-- -----------------------------------------------------------------------------
-- RLS: published stories are world-readable; everything else is admin-only.
-- -----------------------------------------------------------------------------
alter table public.visa_grants enable row level security;

drop policy if exists "public reads published visa grants" on public.visa_grants;
create policy "public reads published visa grants"
  on public.visa_grants for select
  to anon, authenticated
  using (is_published);

drop policy if exists "admins manage visa_grants" on public.visa_grants;
create policy "admins manage visa_grants"
  on public.visa_grants for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- -----------------------------------------------------------------------------
-- Storage bucket for student photos.
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('visa-grants', 'visa-grants', true)
on conflict (id) do nothing;

drop policy if exists "public reads visa grant photos" on storage.objects;
create policy "public reads visa grant photos"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'visa-grants');

drop policy if exists "admins upload visa grant photos" on storage.objects;
create policy "admins upload visa grant photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'visa-grants' and public.is_admin());

drop policy if exists "admins update visa grant photos" on storage.objects;
create policy "admins update visa grant photos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'visa-grants' and public.is_admin())
  with check (bucket_id = 'visa-grants' and public.is_admin());

drop policy if exists "admins delete visa grant photos" on storage.objects;
create policy "admins delete visa grant photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'visa-grants' and public.is_admin());
