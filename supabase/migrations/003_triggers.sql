-- ============================================================
-- 003_triggers.sql
-- Trigger: cria workspace padrão ao registrar novo usuário
-- ============================================================

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
declare
  v_workspace_id uuid;
  v_base_slug    text;
  v_slug         text;
begin
  -- Slug base: parte local do e-mail, apenas alfanumérico e hífen
  v_base_slug := lower(split_part(new.email, '@', 1));
  v_base_slug := regexp_replace(v_base_slug, '[^a-z0-9]', '-', 'g');

  -- Garante unicidade adicionando sufixo do UUID
  v_slug := v_base_slug || '-' || substr(new.id::text, 1, 8);

  -- Cria workspace padrão
  insert into public.workspaces (name, slug, plan)
  values (
    coalesce(
      new.raw_user_meta_data->>'full_name',
      split_part(new.email, '@', 1)
    ) || '''s Workspace',
    v_slug,
    'free'
  )
  returning id into v_workspace_id;

  -- Adiciona o usuário como admin do workspace
  insert into public.workspace_members (workspace_id, user_id, role)
  values (v_workspace_id, new.id, 'admin');

  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
