-- =============================================================================
-- 0002_inquiries.sql
-- Feature: Inquiries — every form submission on the website lands here, tagged
--          with which form (or which AI agent) produced it.
-- Depends on: 0001_admin_core.sql
-- =============================================================================

create table if not exists public.inquiries (
  id          uuid primary key default gen_random_uuid(),

  -- Contact details
  first_name  text not null,
  last_name   text,
  email       text not null,
  phone       text,

  -- What they asked about
  interest    text,
  message     text,

  -- ---------------------------------------------------------------------------
  -- Provenance. `source_type` answers "did a human fill in a form, or did the
  -- AI agent create this?"; `source_form` answers "which form exactly?".
  -- ---------------------------------------------------------------------------
  source_type  text not null default 'form'
               check (source_type in ('form', 'ai_agent', 'manual', 'import')),
  source_form  text,          -- machine key, e.g. 'contact_consultation'
  source_label text,          -- human label, e.g. 'Contact Page — Free Consultation'
  source_page  text,          -- path the submission came from, e.g. '/contact'
  agent_name   text,          -- populated when source_type = 'ai_agent'

  -- Pipeline handling
  status      text not null default 'new'
              check (status in ('new', 'contacted', 'qualified', 'unqualified', 'converted', 'archived')),
  admin_notes text,

  -- Anything extra a form or agent wants to attach
  metadata    jsonb not null default '{}'::jsonb,

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists inquiries_created_at_idx  on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx      on public.inquiries (status);
create index if not exists inquiries_source_type_idx on public.inquiries (source_type);
create index if not exists inquiries_source_form_idx on public.inquiries (source_form);
create index if not exists inquiries_email_idx       on public.inquiries (email);

drop trigger if exists set_inquiries_updated_at on public.inquiries;
create trigger set_inquiries_updated_at
  before update on public.inquiries
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- RLS: admins can do anything. Public visitors get no direct access at all —
-- submissions are written server-side with the service-role key, which keeps
-- the table unreadable and un-spammable from the browser.
-- -----------------------------------------------------------------------------
alter table public.inquiries enable row level security;

drop policy if exists "admins manage inquiries" on public.inquiries;
create policy "admins manage inquiries"
  on public.inquiries for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());
