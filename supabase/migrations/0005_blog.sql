-- =============================================================================
-- 0005_blog.sql
-- Feature: Blog — authored in the back office with a cover image, published to
--          /blog and /blog/[slug].
-- Depends on: 0001_admin_core.sql
-- =============================================================================

create table if not exists public.blog_posts (
  id                uuid primary key default gen_random_uuid(),

  title             text not null,
  slug              text not null unique,
  excerpt           text,
  content           text not null default '',

  -- Optional cover image. `cover_image_path` is the storage object key, kept so
  -- the file can be removed when the post is deleted or the image replaced.
  cover_image_url   text,
  cover_image_path  text,

  author_name       text,
  category          text,
  tags              text[] not null default '{}',

  status            text not null default 'draft' check (status in ('draft', 'published')),
  published_at      timestamptz,

  seo_title         text,
  seo_description   text,
  reading_minutes   integer,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists blog_posts_published_idx
  on public.blog_posts (status, published_at desc);

create index if not exists blog_posts_category_idx
  on public.blog_posts (category);

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- Stamp published_at the first time a post flips to 'published', and estimate
-- reading time from the body so the editor never has to fill it in.
-- -----------------------------------------------------------------------------
create or replace function public.prepare_blog_post()
returns trigger
language plpgsql
as $$
declare
  word_count integer;
begin
  if new.status = 'published' and new.published_at is null then
    new.published_at = now();
  end if;

  word_count := array_length(
    regexp_split_to_array(trim(coalesce(new.content, '')), '\s+'),
    1
  );
  new.reading_minutes := greatest(1, ceil(coalesce(word_count, 0) / 200.0)::integer);

  return new;
end;
$$;

drop trigger if exists prepare_blog_post on public.blog_posts;
create trigger prepare_blog_post
  before insert or update on public.blog_posts
  for each row execute function public.prepare_blog_post();

-- -----------------------------------------------------------------------------
-- RLS: published posts are world-readable; drafts are admin-only.
-- -----------------------------------------------------------------------------
alter table public.blog_posts enable row level security;

drop policy if exists "public reads published posts" on public.blog_posts;
create policy "public reads published posts"
  on public.blog_posts for select
  to anon, authenticated
  using (status = 'published' and published_at is not null and published_at <= now());

drop policy if exists "admins manage blog_posts" on public.blog_posts;
create policy "admins manage blog_posts"
  on public.blog_posts for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- -----------------------------------------------------------------------------
-- Storage bucket for cover images and in-body images.
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('blog', 'blog', true)
on conflict (id) do nothing;

drop policy if exists "public reads blog images" on storage.objects;
create policy "public reads blog images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'blog');

drop policy if exists "admins upload blog images" on storage.objects;
create policy "admins upload blog images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog' and public.is_admin());

drop policy if exists "admins update blog images" on storage.objects;
create policy "admins update blog images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'blog' and public.is_admin())
  with check (bucket_id = 'blog' and public.is_admin());

drop policy if exists "admins delete blog images" on storage.objects;
create policy "admins delete blog images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog' and public.is_admin());
