-- ============================================================
-- 001_init_schema.sql
-- Tabelas principais do PipeFlow CRM
-- ============================================================

create extension if not exists "uuid-ossp";

-- ----------------------------------------------------------
-- workspaces
-- ----------------------------------------------------------
create table public.workspaces (
  id                 uuid        default uuid_generate_v4() primary key,
  name               text        not null,
  slug               text        not null unique,
  plan               text        not null default 'free' check (plan in ('free', 'pro')),
  stripe_customer_id text,
  created_at         timestamptz not null default now()
);

-- ----------------------------------------------------------
-- workspace_members
-- ----------------------------------------------------------
create table public.workspace_members (
  workspace_id uuid        not null references public.workspaces(id) on delete cascade,
  user_id      uuid        not null references auth.users(id) on delete cascade,
  role         text        not null default 'member' check (role in ('admin', 'member')),
  joined_at    timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

-- ----------------------------------------------------------
-- leads
-- ----------------------------------------------------------
create table public.leads (
  id           uuid        default uuid_generate_v4() primary key,
  workspace_id uuid        not null references public.workspaces(id) on delete cascade,
  name         text        not null,
  email        text,
  phone        text,
  company      text,
  position     text,
  status       text        not null default 'novo'
                 check (status in ('novo', 'em_contato', 'proposta', 'fechado_ganho', 'fechado_perdido')),
  assignee_id  uuid        references auth.users(id) on delete set null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ----------------------------------------------------------
-- deals
-- ----------------------------------------------------------
create table public.deals (
  id           uuid           default uuid_generate_v4() primary key,
  workspace_id uuid           not null references public.workspaces(id) on delete cascade,
  lead_id      uuid           not null references public.leads(id) on delete cascade,
  title        text           not null,
  value        numeric(12, 2) not null default 0,
  stage        text           not null default 'novo_lead'
                 check (stage in ('novo_lead', 'contato_realizado', 'proposta_enviada', 'negociacao', 'fechado_ganho', 'fechado_perdido')),
  assignee_id  uuid           references auth.users(id) on delete set null,
  due_date     date,
  created_at   timestamptz    not null default now(),
  updated_at   timestamptz    not null default now()
);

-- ----------------------------------------------------------
-- activities
-- ----------------------------------------------------------
create table public.activities (
  id           uuid        default uuid_generate_v4() primary key,
  lead_id      uuid        not null references public.leads(id) on delete cascade,
  workspace_id uuid        not null references public.workspaces(id) on delete cascade,
  author_id    uuid        references auth.users(id) on delete set null,
  type         text        not null check (type in ('ligacao', 'email', 'reuniao', 'nota')),
  description  text        not null,
  date         timestamptz not null default now(),
  created_at   timestamptz not null default now()
);

-- ----------------------------------------------------------
-- subscriptions (espelho do Stripe para o webhook)
-- ----------------------------------------------------------
create table public.subscriptions (
  id                     uuid        default uuid_generate_v4() primary key,
  workspace_id           uuid        not null unique references public.workspaces(id) on delete cascade,
  stripe_subscription_id text        unique,
  stripe_price_id        text,
  status                 text        not null default 'inactive'
                           check (status in ('active', 'inactive', 'past_due', 'canceled', 'trialing')),
  current_period_start   timestamptz,
  current_period_end     timestamptz,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

-- ----------------------------------------------------------
-- Índices de performance
-- ----------------------------------------------------------
create index on public.workspace_members (user_id);
create index on public.leads             (workspace_id);
create index on public.leads             (assignee_id);
create index on public.deals             (workspace_id);
create index on public.deals             (lead_id);
create index on public.deals             (assignee_id);
create index on public.activities        (lead_id);
create index on public.activities        (workspace_id);
create index on public.subscriptions     (workspace_id);

-- ----------------------------------------------------------
-- Trigger: atualiza updated_at automaticamente
-- ----------------------------------------------------------
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_updated_at
  before update on public.leads
  for each row execute procedure public.handle_updated_at();

create trigger deals_updated_at
  before update on public.deals
  for each row execute procedure public.handle_updated_at();

create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute procedure public.handle_updated_at();
