-- =============================================================================
-- 0003_crm.sql
-- Feature: CRM — a drag-and-drop pipeline. Qualified inquiries are promoted
--          into `leads`, which always land in the locked "New Leads" stage.
-- Depends on: 0001_admin_core.sql, 0002_inquiries.sql
-- =============================================================================

-- -----------------------------------------------------------------------------
-- pipeline_stages: the kanban columns. Fully user-editable except for the one
-- flagged is_default, which is the guaranteed landing zone for new inquiries.
-- -----------------------------------------------------------------------------
create table if not exists public.pipeline_stages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  color       text not null default '#2563eb',
  position    integer not null default 0,
  is_default  boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Exactly one stage may be the default landing zone.
create unique index if not exists pipeline_stages_single_default_idx
  on public.pipeline_stages (is_default)
  where is_default;

create index if not exists pipeline_stages_position_idx
  on public.pipeline_stages (position);

drop trigger if exists set_pipeline_stages_updated_at on public.pipeline_stages;
create trigger set_pipeline_stages_updated_at
  before update on public.pipeline_stages
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- leads: a card on the board.
-- -----------------------------------------------------------------------------
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  stage_id    uuid not null references public.pipeline_stages (id) on delete restrict,

  -- Set when this lead was promoted from the Inquiries tab. Unique, so the same
  -- inquiry can never be pushed into the pipeline twice.
  inquiry_id  uuid unique references public.inquiries (id) on delete set null,

  full_name   text not null,
  email       text,
  phone       text,
  interest    text,
  notes       text,

  value       numeric(12, 2),
  currency    text not null default 'AUD',
  priority    text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  status      text not null default 'open' check (status in ('open', 'won', 'lost')),

  -- Carried over from the inquiry so you can still see where a lead came from
  -- once it is halfway down the board.
  source_type  text not null default 'manual'
               check (source_type in ('form', 'ai_agent', 'manual', 'import')),
  source_form  text,
  source_label text,

  assigned_to uuid references auth.users (id) on delete set null,

  -- Sort order *within* a stage. Doubles so a card dropped between two others
  -- just takes the midpoint — no reindexing of the whole column.
  position    double precision not null default 0,

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists leads_stage_position_idx on public.leads (stage_id, position);
create index if not exists leads_created_at_idx     on public.leads (created_at desc);
create index if not exists leads_status_idx         on public.leads (status);

drop trigger if exists set_leads_updated_at on public.leads;
create trigger set_leads_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- lead_activities: the timeline shown in a lead's detail panel.
-- -----------------------------------------------------------------------------
create table if not exists public.lead_activities (
  id          uuid primary key default gen_random_uuid(),
  lead_id     uuid not null references public.leads (id) on delete cascade,
  type        text not null default 'note'
              check (type in ('note', 'call', 'email', 'meeting', 'stage_change', 'created')),
  body        text,
  created_by  uuid references auth.users (id) on delete set null,
  created_at  timestamptz not null default now()
);

create index if not exists lead_activities_lead_idx
  on public.lead_activities (lead_id, created_at desc);

-- -----------------------------------------------------------------------------
-- Link back from the inquiry to the lead it became.
-- -----------------------------------------------------------------------------
alter table public.inquiries
  add column if not exists converted_lead_id uuid
  references public.leads (id) on delete set null;

-- -----------------------------------------------------------------------------
-- Guard rails for the default stage: it cannot be renamed, un-defaulted, or
-- deleted, because it is where every new inquiry is guaranteed to land.
-- -----------------------------------------------------------------------------
create or replace function public.protect_default_stage()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'DELETE' then
    if old.is_default then
      raise exception 'The default "New Leads" stage cannot be deleted.'
        using errcode = 'check_violation';
    end if;
    return old;
  end if;

  if old.is_default then
    if new.name is distinct from old.name then
      raise exception 'The default "New Leads" stage cannot be renamed.'
        using errcode = 'check_violation';
    end if;
    if not new.is_default then
      raise exception 'The default stage flag cannot be removed.'
        using errcode = 'check_violation';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists protect_default_stage_update on public.pipeline_stages;
create trigger protect_default_stage_update
  before update on public.pipeline_stages
  for each row execute function public.protect_default_stage();

drop trigger if exists protect_default_stage_delete on public.pipeline_stages;
create trigger protect_default_stage_delete
  before delete on public.pipeline_stages
  for each row execute function public.protect_default_stage();

-- -----------------------------------------------------------------------------
-- Deleting a stage must never delete the leads sitting in it — move them to the
-- default stage instead. Runs BEFORE the foreign-key check, so the ON DELETE
-- RESTRICT above only ever fires if something has gone genuinely wrong.
-- -----------------------------------------------------------------------------
create or replace function public.rehome_leads_on_stage_delete()
returns trigger
language plpgsql
as $$
declare
  fallback_stage_id uuid;
begin
  select id into fallback_stage_id
  from public.pipeline_stages
  where is_default
  limit 1;

  if fallback_stage_id is null then
    raise exception 'No default stage exists to move leads into.'
      using errcode = 'check_violation';
  end if;

  update public.leads
  set stage_id = fallback_stage_id
  where stage_id = old.id;

  return old;
end;
$$;

drop trigger if exists rehome_leads_on_stage_delete on public.pipeline_stages;
create trigger rehome_leads_on_stage_delete
  before delete on public.pipeline_stages
  for each row execute function public.rehome_leads_on_stage_delete();

-- -----------------------------------------------------------------------------
-- promote_inquiry_to_lead(): one transactional step for the "move to CRM"
-- button. Creates the card in the default stage, stamps the inquiry as
-- converted, and opens the activity timeline.
-- -----------------------------------------------------------------------------
create or replace function public.promote_inquiry_to_lead(p_inquiry_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_inquiry     public.inquiries%rowtype;
  v_stage_id    uuid;
  v_existing    uuid;
  v_lead_id     uuid;
  v_min_position double precision;
begin
  if not public.is_admin() then
    raise exception 'Only administrators can promote inquiries.'
      using errcode = 'insufficient_privilege';
  end if;

  select * into v_inquiry from public.inquiries where id = p_inquiry_id;
  if not found then
    raise exception 'Inquiry % not found.', p_inquiry_id using errcode = 'no_data_found';
  end if;

  -- Already promoted? Hand back the existing card rather than duplicating it.
  select id into v_existing from public.leads where inquiry_id = p_inquiry_id;
  if v_existing is not null then
    return v_existing;
  end if;

  select id into v_stage_id from public.pipeline_stages where is_default limit 1;
  if v_stage_id is null then
    raise exception 'No default stage configured.' using errcode = 'check_violation';
  end if;

  -- New cards go to the top of the column.
  select coalesce(min(position), 0) into v_min_position
  from public.leads where stage_id = v_stage_id;

  insert into public.leads (
    stage_id, inquiry_id, full_name, email, phone, interest, notes,
    source_type, source_form, source_label, position
  )
  values (
    v_stage_id,
    v_inquiry.id,
    trim(both from coalesce(v_inquiry.first_name, '') || ' ' || coalesce(v_inquiry.last_name, '')),
    v_inquiry.email,
    v_inquiry.phone,
    v_inquiry.interest,
    v_inquiry.message,
    v_inquiry.source_type,
    v_inquiry.source_form,
    v_inquiry.source_label,
    v_min_position - 1000
  )
  returning id into v_lead_id;

  update public.inquiries
  set status = 'converted', converted_lead_id = v_lead_id
  where id = p_inquiry_id;

  insert into public.lead_activities (lead_id, type, body, created_by)
  values (
    v_lead_id,
    'created',
    'Promoted from inquiry (' || coalesce(v_inquiry.source_label, v_inquiry.source_type) || ').',
    auth.uid()
  );

  return v_lead_id;
end;
$$;

revoke all on function public.promote_inquiry_to_lead(uuid) from public;
grant execute on function public.promote_inquiry_to_lead(uuid) to authenticated;

-- -----------------------------------------------------------------------------
-- RLS: back-office only.
-- -----------------------------------------------------------------------------
alter table public.pipeline_stages enable row level security;
alter table public.leads           enable row level security;
alter table public.lead_activities enable row level security;

drop policy if exists "admins manage pipeline_stages" on public.pipeline_stages;
create policy "admins manage pipeline_stages"
  on public.pipeline_stages for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admins manage leads" on public.leads;
create policy "admins manage leads"
  on public.leads for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admins manage lead_activities" on public.lead_activities;
create policy "admins manage lead_activities"
  on public.lead_activities for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- -----------------------------------------------------------------------------
-- Seed: the locked default stage plus a sensible starting board.
-- -----------------------------------------------------------------------------
insert into public.pipeline_stages (name, description, color, position, is_default)
select 'New Leads', 'Every inquiry promoted from the Inquiries tab lands here.', '#2563eb', 0, true
where not exists (select 1 from public.pipeline_stages where is_default);

insert into public.pipeline_stages (name, description, color, position, is_default)
select v.name, v.description, v.color, v.position, false
from (values
  ('Contacted',   'First call or email made.',              '#7c3aed', 1),
  ('Counselling', 'Course and destination shortlisting.',   '#0891b2', 2),
  ('Application', 'Documents collected, applying now.',     '#ea580c', 3),
  ('Enrolled',    'Offer accepted and deposit paid.',       '#16a34a', 4)
) as v(name, description, color, position)
where not exists (select 1 from public.pipeline_stages where name = v.name);
