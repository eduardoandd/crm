-- ============================================================
-- 002_rls_policies.sql
-- Row Level Security — isolamento total por workspace
-- ============================================================

-- ----------------------------------------------------------
-- Habilitar RLS
-- ----------------------------------------------------------
alter table public.workspaces        enable row level security;
alter table public.workspace_members enable row level security;
alter table public.leads             enable row level security;
alter table public.deals             enable row level security;
alter table public.activities        enable row level security;
alter table public.subscriptions     enable row level security;

-- ----------------------------------------------------------
-- Funções auxiliares (security definer = sem recursão no RLS)
-- ----------------------------------------------------------
create or replace function public.is_workspace_member(ws_id uuid)
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.workspace_members
    where workspace_id = ws_id
      and user_id = auth.uid()
  );
$$;

create or replace function public.is_workspace_admin(ws_id uuid)
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.workspace_members
    where workspace_id = ws_id
      and user_id = auth.uid()
      and role = 'admin'
  );
$$;

-- ----------------------------------------------------------
-- workspaces
-- ----------------------------------------------------------
create policy "Membros veem seus workspaces"
  on public.workspaces for select
  using (public.is_workspace_member(id));

create policy "Admins atualizam o workspace"
  on public.workspaces for update
  using (public.is_workspace_admin(id));

-- ----------------------------------------------------------
-- workspace_members
-- ----------------------------------------------------------
create policy "Membros veem outros membros do workspace"
  on public.workspace_members for select
  using (public.is_workspace_member(workspace_id));

create policy "Admins adicionam membros"
  on public.workspace_members for insert
  with check (public.is_workspace_admin(workspace_id));

create policy "Admins removem membros"
  on public.workspace_members for delete
  using (public.is_workspace_admin(workspace_id));

-- ----------------------------------------------------------
-- leads
-- ----------------------------------------------------------
create policy "Membros veem leads do workspace"
  on public.leads for select
  using (public.is_workspace_member(workspace_id));

create policy "Membros criam leads"
  on public.leads for insert
  with check (public.is_workspace_member(workspace_id));

create policy "Membros editam leads"
  on public.leads for update
  using (public.is_workspace_member(workspace_id));

create policy "Admins deletam leads"
  on public.leads for delete
  using (public.is_workspace_admin(workspace_id));

-- ----------------------------------------------------------
-- deals
-- ----------------------------------------------------------
create policy "Membros veem deals do workspace"
  on public.deals for select
  using (public.is_workspace_member(workspace_id));

create policy "Membros criam deals"
  on public.deals for insert
  with check (public.is_workspace_member(workspace_id));

create policy "Membros editam deals"
  on public.deals for update
  using (public.is_workspace_member(workspace_id));

create policy "Admins deletam deals"
  on public.deals for delete
  using (public.is_workspace_admin(workspace_id));

-- ----------------------------------------------------------
-- activities
-- ----------------------------------------------------------
create policy "Membros veem atividades do workspace"
  on public.activities for select
  using (public.is_workspace_member(workspace_id));

create policy "Membros registram atividades"
  on public.activities for insert
  with check (public.is_workspace_member(workspace_id));

create policy "Autor edita sua atividade"
  on public.activities for update
  using (public.is_workspace_member(workspace_id) and author_id = auth.uid());

create policy "Admins deletam atividades"
  on public.activities for delete
  using (public.is_workspace_admin(workspace_id));

-- ----------------------------------------------------------
-- subscriptions
-- (leitura para membros; escrita exclusiva para service_role via webhook)
-- ----------------------------------------------------------
create policy "Membros veem assinatura do workspace"
  on public.subscriptions for select
  using (public.is_workspace_member(workspace_id));

create policy "Service role gerencia assinaturas"
  on public.subscriptions for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
