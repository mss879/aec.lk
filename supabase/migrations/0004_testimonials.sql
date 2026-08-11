-- =============================================================================
-- 0004_testimonials.sql
-- Feature: Testimonials — managed from the back office, rendered on the public
--          /testimonials page. The photo is optional.
-- Depends on: 0001_admin_core.sql
-- =============================================================================

create table if not exists public.testimonials (
  id            uuid primary key default gen_random_uuid(),

  name          text not null,
  role          text,           -- e.g. 'Master of Data Science'
  institution   text,           -- e.g. 'Monash University'
  location      text,           -- e.g. 'Colombo, Sri Lanka'

  quote         text not null,
  rating        smallint not null default 5 check (rating between 1 and 5),

  -- Optional photo. `image_path` is the object key inside the storage bucket and
  -- is what lets us delete the file when the testimonial is removed or replaced.
  image_url     text,
  image_path    text,

  is_published  boolean not null default true,
  is_featured   boolean not null default false,
  position      integer not null default 0,

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists testimonials_published_idx
  on public.testimonials (is_published, position, created_at desc);

create index if not exists testimonials_featured_idx
  on public.testimonials (is_featured)
  where is_featured;

drop trigger if exists set_testimonials_updated_at on public.testimonials;
create trigger set_testimonials_updated_at
  before update on public.testimonials
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- RLS: anyone may read published testimonials (that is the point of the public
-- page); only admins can see drafts or write anything.
-- -----------------------------------------------------------------------------
alter table public.testimonials enable row level security;

drop policy if exists "public reads published testimonials" on public.testimonials;
create policy "public reads published testimonials"
  on public.testimonials for select
  to anon, authenticated
  using (is_published);

drop policy if exists "admins manage testimonials" on public.testimonials;
create policy "admins manage testimonials"
  on public.testimonials for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- -----------------------------------------------------------------------------
-- Storage bucket for testimonial photos.
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('testimonials', 'testimonials', true)
on conflict (id) do nothing;

drop policy if exists "public reads testimonial images" on storage.objects;
create policy "public reads testimonial images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'testimonials');

drop policy if exists "admins upload testimonial images" on storage.objects;
create policy "admins upload testimonial images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'testimonials' and public.is_admin());

drop policy if exists "admins update testimonial images" on storage.objects;
create policy "admins update testimonial images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'testimonials' and public.is_admin())
  with check (bucket_id = 'testimonials' and public.is_admin());

drop policy if exists "admins delete testimonial images" on storage.objects;
create policy "admins delete testimonial images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'testimonials' and public.is_admin());
