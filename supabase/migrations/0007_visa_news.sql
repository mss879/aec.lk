-- =============================================================================
-- 0007_visa_news.sql
-- Feature: Student Visa News — short, dated policy and processing updates
--          managed in the back office and published to /visa-news and
--          /visa-news/[slug].
--
--          Kept separate from blog_posts on purpose: a news item is pinned by
--          recency and carries an official source link and an effective date,
--          none of which an evergreen article needs.
-- Depends on: 0001_admin_core.sql
-- =============================================================================

create table if not exists public.visa_news (
  id                uuid primary key default gen_random_uuid(),

  title             text not null,
  slug              text not null unique,
  summary           text,
  content           text not null default '',

  -- Broad bucket used for the filter chips on the public listing.
  category          text not null default 'Policy Update'
    check (category in (
      'Policy Update',
      'Processing Times',
      'Fees & Charges',
      'Occupation Lists',
      'English Requirements',
      'Work Rights',
      'Other'
    )),

  -- The date the change takes effect, which is not the same as the date the
  -- item was published — an announcement usually lands before it applies.
  effective_date    date,

  -- Attribution back to the official announcement. Editors are expected to
  -- fill these in for anything quoting the Department of Home Affairs.
  source_name       text,
  source_url        text,

  cover_image_url   text,
  cover_image_path  text,

  -- Pins an item to the top of the listing regardless of date.
  is_pinned         boolean not null default false,

  status            text not null default 'draft'
    check (status in ('draft', 'published')),
  published_at      timestamptz,

  seo_title         text,
  seo_description   text,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists visa_news_published_idx
  on public.visa_news (status, is_pinned desc, published_at desc);

create index if not exists visa_news_category_idx
  on public.visa_news (category);

drop trigger if exists set_visa_news_updated_at on public.visa_news;
create trigger set_visa_news_updated_at
  before update on public.visa_news
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- Stamp published_at the first time an item flips to 'published', mirroring
-- how blog_posts behaves so the two editors feel the same.
-- -----------------------------------------------------------------------------
create or replace function public.prepare_visa_news()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'published' and new.published_at is null then
    new.published_at = now();
  end if;

  return new;
end;
$$;

drop trigger if exists prepare_visa_news on public.visa_news;
create trigger prepare_visa_news
  before insert or update on public.visa_news
  for each row execute function public.prepare_visa_news();

-- -----------------------------------------------------------------------------
-- RLS: published items are world-readable; drafts are admin-only.
--
-- The `published_at <= now()` clause is what makes scheduling work — an editor
-- can set a future date and the item stays invisible until it arrives.
-- -----------------------------------------------------------------------------
alter table public.visa_news enable row level security;

drop policy if exists "public reads published visa news" on public.visa_news;
create policy "public reads published visa news"
  on public.visa_news for select
  to anon, authenticated
  using (
    status = 'published'
    and published_at is not null
    and published_at <= now()
  );

drop policy if exists "admins manage visa_news" on public.visa_news;
create policy "admins manage visa_news"
  on public.visa_news for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- -----------------------------------------------------------------------------
-- Storage bucket for news images.
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('visa-news', 'visa-news', true)
on conflict (id) do nothing;

drop policy if exists "public reads visa news images" on storage.objects;
create policy "public reads visa news images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'visa-news');

drop policy if exists "admins upload visa news images" on storage.objects;
create policy "admins upload visa news images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'visa-news' and public.is_admin());

drop policy if exists "admins update visa news images" on storage.objects;
create policy "admins update visa news images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'visa-news' and public.is_admin())
  with check (bucket_id = 'visa-news' and public.is_admin());

drop policy if exists "admins delete visa news images" on storage.objects;
create policy "admins delete visa news images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'visa-news' and public.is_admin());
