-- =============================================================================
-- 0009_ai_chat.sql
-- Feature: AEC Assist — transcript log for the website AI agent (/api/chat).
--          Leads the agent captures are NOT stored here; they go through the
--          existing `inquiries` table (source_type = 'ai_agent') like every
--          other intake, so they show up in /admin/inquiries and the CRM.
-- Depends on: 0001_admin_core.sql
-- =============================================================================

create table if not exists public.ai_chat_messages (
  id          uuid primary key default gen_random_uuid(),

  -- Groups one visitor's conversation. Generated client-side per widget mount.
  session_id  text not null,

  role        text not null check (role in ('user', 'assistant')),
  content     text not null,

  created_at  timestamptz not null default now()
);

create index if not exists ai_chat_messages_session_idx
  on public.ai_chat_messages (session_id, created_at);

create index if not exists ai_chat_messages_created_idx
  on public.ai_chat_messages (created_at desc);

-- -----------------------------------------------------------------------------
-- RLS: deliberately NO anon insert policy. The API route writes with the
-- service-role key (which bypasses RLS), so the anon key cannot be used to
-- spam this table directly from a browser. Admins may read transcripts for
-- review; nobody edits or deletes them through the app.
-- -----------------------------------------------------------------------------
alter table public.ai_chat_messages enable row level security;

drop policy if exists "admins read chat transcripts" on public.ai_chat_messages;
create policy "admins read chat transcripts"
  on public.ai_chat_messages for select
  to authenticated
  using (public.is_admin());
