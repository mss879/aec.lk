-- =============================================================================
-- 0010_ai_chat_takeover.sql
-- Feature: Live chat inbox for AEC Assist.
--
--          Adds a session per conversation so the back office can browse chat
--          history, and lets a counsellor pause the AI and take the
--          conversation over by hand.
--
--          Extends (does not replace) 0009_ai_chat.sql.
-- Depends on: 0001_admin_core.sql, 0003_crm.sql, 0009_ai_chat.sql
-- =============================================================================

-- -----------------------------------------------------------------------------
-- ai_chat_sessions: one row per visitor conversation. The row is created by the
-- API route on the visitor's first message and updated on every message after.
-- -----------------------------------------------------------------------------
create table if not exists public.ai_chat_sessions (
  id                uuid primary key default gen_random_uuid(),

  -- The id the widget generates on mount and sends with every message.
  session_id        text not null unique,

  -- open   → visitor may still be around
  -- closed → a counsellor archived it out of the inbox
  status            text not null default 'open'
                    check (status in ('open', 'closed')),

  -- The takeover switch. While false the API route logs the visitor's message
  -- and stays silent, so a human owns the conversation instead of the model.
  agent_enabled     boolean not null default true,

  -- Filled in when the agent (or a counsellor) learns who they are talking to.
  visitor_name      text,
  visitor_phone     text,

  -- Set when the agent files a lead, so the card and the transcript link up.
  lead_id           uuid references public.leads (id) on delete set null,

  -- Where the conversation started, for context in the inbox.
  first_page        text,

  message_count     integer not null default 0,
  last_message_at   timestamptz not null default now(),
  -- Anything after this timestamp is unread in the inbox.
  admin_read_at     timestamptz,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists ai_chat_sessions_recent_idx
  on public.ai_chat_sessions (status, last_message_at desc);

create index if not exists ai_chat_sessions_takeover_idx
  on public.ai_chat_sessions (agent_enabled)
  where not agent_enabled;

drop trigger if exists set_ai_chat_sessions_updated_at on public.ai_chat_sessions;
create trigger set_ai_chat_sessions_updated_at
  before update on public.ai_chat_sessions
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- ai_chat_messages gains a third author: the human counsellor.
--
-- 0009 constrained `role` to ('user','assistant'); widen it rather than drop
-- and recreate the table, which would throw away any transcripts already
-- collected.
-- -----------------------------------------------------------------------------
alter table public.ai_chat_messages
  drop constraint if exists ai_chat_messages_role_check;

alter table public.ai_chat_messages
  add constraint ai_chat_messages_role_check
  check (role in ('user', 'assistant', 'admin'));

-- Who sent it, when the sender was a person.
alter table public.ai_chat_messages
  add column if not exists admin_id uuid references auth.users (id) on delete set null;

alter table public.ai_chat_messages
  add column if not exists author_name text;

-- -----------------------------------------------------------------------------
-- Backfill: any transcript rows written before this migration have no session.
-- Create one per distinct session_id so nothing is orphaned in the inbox.
-- -----------------------------------------------------------------------------
insert into public.ai_chat_sessions (session_id, message_count, last_message_at, created_at)
select
  m.session_id,
  count(*),
  max(m.created_at),
  min(m.created_at)
from public.ai_chat_messages m
group by m.session_id
on conflict (session_id) do nothing;

-- -----------------------------------------------------------------------------
-- RLS: same posture as 0009. The API route writes with the service-role key
-- (which bypasses RLS), so the anon key can neither read other people's
-- conversations nor spam the tables. Admins read and manage.
--
-- Note there is deliberately no anon SELECT policy: the widget reads its own
-- messages through the API route, which checks the session id, rather than
-- querying Supabase directly — otherwise anyone could enumerate transcripts.
-- -----------------------------------------------------------------------------
alter table public.ai_chat_sessions enable row level security;

drop policy if exists "admins manage chat sessions" on public.ai_chat_sessions;
create policy "admins manage chat sessions"
  on public.ai_chat_sessions for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- 0009 granted admins SELECT on messages; they now also need INSERT to reply.
drop policy if exists "admins write chat replies" on public.ai_chat_messages;
create policy "admins write chat replies"
  on public.ai_chat_messages for insert
  to authenticated
  with check (public.is_admin());
