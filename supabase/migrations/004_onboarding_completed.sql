-- ============================================================
-- 004_onboarding_completed.sql
-- Adiciona flag de onboarding ao workspace
-- ============================================================

alter table public.workspaces
  add column if not exists onboarding_completed boolean not null default false;
