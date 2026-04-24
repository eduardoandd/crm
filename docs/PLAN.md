# PipeFlow CRM — Plano de Execução

> **Estratégia**: Interface primeiro, backend depois.
> Cada milestone entrega algo visível e funcional. O banco de dados entra só após a UI estar validada.

---

## Visão Geral dos Milestones

| # | Branch | Fase | Entrega |
|---|--------|------|---------|
| M1 | `feat/setup` | Fundação | Projeto scaffoldado, deps instaladas, estrutura de pastas |
| M2 | `feat/app-shell` | UI | Layout base, sidebar, navegação, tema |
| M3 | `feat/auth-ui` | UI | Páginas de login, signup, forgot-password |
| M4 | `feat/leads-ui` | UI | Lista de leads, detalhe, formulário (dados mock) |
| M5 | `feat/pipeline-ui` | UI | Kanban com drag-and-drop (dados mock) |
| M6 | `feat/dashboard-ui` | UI | Métricas, gráfico de funil (dados mock) |
| M7 | `feat/landing-page` | UI | Landing page pública completa |
| M8 | `feat/auth-backend` | Backend | Supabase Auth + schema DB + RLS + middleware |
| M9 | `feat/leads-backend` | Backend | CRUD de leads conectado ao Supabase |
| M10 | `feat/pipeline-backend` | Backend | Deals + pipeline persistido no banco |
| M11 | `feat/activities` | Full | Timeline de atividades (UI + backend) |
| M12 | `feat/multi-workspace` | Full | Workspaces, convites, papéis (UI + backend) |
| M13 | `feat/monetizacao` | Full | Stripe Checkout + Webhook + Customer Portal |
| M14 | `feat/onboarding` | Full | Fluxo guiado para novos usuários |
| M15 | `feat/deploy` | Deploy | Vercel + Supabase prod + polish final |

---

## M1 — Setup e Fundação

**Branch**: `feat/setup`
**Objetivo**: Projeto funcionando localmente com todas as dependências e estrutura de pastas correta.

### Entregas
- [x] `npx create-next-app@14` com TypeScript, Tailwind CSS, App Router, src/ desabilitado
- [x] Instalar dependências: `shadcn/ui`, `@dnd-kit/core`, `@dnd-kit/sortable`, `recharts`, `@supabase/supabase-js`, `@supabase/ssr`, `stripe`, `resend`, `zod`, `react-hook-form`, `@hookform/resolvers`
- [x] Inicializar shadcn/ui (`npx shadcn@latest init`) com tema slate
- [x] Criar estrutura de pastas conforme CLAUDE.md (`app/`, `components/`, `lib/`, `hooks/`, `types/`, `supabase/`)
- [x] Configurar `tsconfig.json` com `strict: true` e path alias `@/*`
- [x] Criar `.env.local.example` com todas as variáveis necessárias
- [x] Adicionar `.env.local` ao `.gitignore`
- [x] Criar `types/index.ts` com interfaces: `Lead`, `Deal`, `Workspace`, `WorkspaceMember`, `Activity`, `PipelineStage`
- [x] Criar `lib/constants.ts` com `PIPELINE_STAGES` e `FREE_PLAN_LIMITS`
- [x] Confirmar `npm run dev` e `npm run build` sem erros

### Commit Final
```
feat: setup inicial do projeto PipeFlow CRM

- Next.js 14 App Router + TypeScript strict
- shadcn/ui + Tailwind CSS configurados
- Estrutura de pastas, types globais e constantes
```

---

## M2 — App Shell (Layout Base)

**Branch**: `feat/app-shell`
**Objetivo**: O esqueleto visual do app — sidebar, header, navegação e tema funcionando.

### Entregas
- [ ] Layout raiz em `app/layout.tsx` com fonte Inter e providers
- [ ] Layout do dashboard em `app/(dashboard)/layout.tsx` com sidebar + área de conteúdo
- [ ] Componente `Sidebar` com logo PipeFlow, links de navegação e workspace switcher (placeholder)
- [ ] Ícones de navegação: Pipeline, Leads, Dashboard, Settings (usando `lucide-react`)
- [ ] Header com breadcrumb, avatar do usuário e botão de logout (placeholder)
- [ ] Página index `/` redirecionando para `/pipeline`
- [ ] Página placeholder `/pipeline` com título e conteúdo vazio
- [ ] Página placeholder `/leads` com título e conteúdo vazio
- [ ] Página placeholder `/dashboard` com título e conteúdo vazio
- [ ] Página placeholder `/settings` com título e conteúdo vazio
- [ ] Responsividade básica: sidebar colapsável em mobile
- [ ] Tema consistente: paleta slate + accent indigo via CSS variables do shadcn/ui

### Commit Final
```
feat: app shell com sidebar, navegação e layout base

- Layout do dashboard com sidebar responsiva
- Navegação: Pipeline, Leads, Dashboard, Settings
- Tema slate/indigo via shadcn/ui
```

---

## M3 — Auth UI (Páginas de Autenticação)

**Branch**: `feat/auth-ui`
**Objetivo**: Fluxo visual completo de autenticação, sem backend ainda.

### Entregas
- [ ] Layout de auth em `app/(auth)/layout.tsx` — tela dividida (formulário + hero visual)
- [ ] Página `/login` com formulário: e-mail, senha, botão "Entrar", link "Esqueci minha senha"
- [ ] Página `/signup` com formulário: nome, e-mail, senha, confirmação de senha, botão "Criar conta"
- [ ] Página `/forgot-password` com formulário: e-mail + botão "Enviar link"
- [ ] Componente `AuthForm` reutilizável com validação via `react-hook-form` + `zod`
- [ ] Link "Não tem conta? Cadastre-se" no login e vice-versa
- [ ] Estado de loading nos botões durante submit
- [ ] Tratamento visual de erros (campo inválido destacado + mensagem)
- [ ] Rota de auth guard (middleware placeholder que sempre redireciona para `/pipeline`)

### Commit Final
```
feat: páginas de autenticação (login, signup, forgot-password)

- Formulários com react-hook-form + zod
- Layout split com hero visual
- Auth guard middleware placeholder
```

---

## M4 — Leads UI

**Branch**: `feat/leads-ui`
**Objetivo**: Gestão visual completa de leads com dados mock — listagem, detalhe e formulário.

### Entregas
- [ ] Criar `lib/mock-data.ts` com 15-20 leads de exemplo e atividades fictícias
- [ ] Página `/leads` com listagem em tabela usando shadcn/ui `DataTable`
  - [ ] Colunas: nome, empresa, status, responsável, data de criação
  - [ ] Busca por nome/empresa (filtro client-side)
  - [ ] Filtro por status (dropdown)
  - [ ] Ordenação por coluna
  - [ ] Paginação (10 por página)
- [ ] Botão "Novo Lead" abre `Sheet` lateral com formulário
- [ ] Componente `LeadForm` com campos: nome, e-mail, telefone, empresa, cargo, status
- [ ] Badge de status com cores: Novo (slate), Em Contato (blue), Proposta (amber), Fechado Ganho (green), Fechado Perdido (red)
- [ ] Página `/leads/[id]` com perfil completo do lead
  - [ ] Header com nome, empresa, status badge e botões de ação
  - [ ] Cards de informações: contato, empresa, responsável
  - [ ] Seção de timeline (placeholder vazio com mensagem "Nenhuma atividade ainda")
  - [ ] Botão "Editar Lead" abre formulário pré-preenchido
- [ ] Componente `LeadCard` para uso futuro no pipeline
- [ ] Confirmação de exclusão via `AlertDialog`

### Commit Final
```
feat: módulo de leads (listagem, detalhe, formulário) com dados mock

- DataTable com busca, filtros e ordenação
- Sheet de criação/edição de leads
- Página de detalhe com perfil completo
```

---

## M5 — Pipeline UI (Kanban)

**Branch**: `feat/pipeline-ui`
**Objetivo**: Kanban visual com drag-and-drop fluido entre colunas, usando dados mock.

### Entregas
- [ ] Página `/pipeline` com layout horizontal de colunas scrolláveis
- [ ] Componente `KanbanBoard` como container principal com `DndContext` do `@dnd-kit`
- [ ] Componente `KanbanColumn` para cada estágio do pipeline
  - [ ] Header com nome da etapa, contagem de deals e valor total (R$)
  - [ ] Área droppable para receber cards
  - [ ] Botão "+" para adicionar deal naquela coluna
- [ ] 6 colunas: Novo Lead, Contato Realizado, Proposta Enviada, Negociação, Fechado Ganho, Fechado Perdido
- [ ] Componente `DealCard` com:
  - [ ] Título do negócio
  - [ ] Valor estimado formatado em R$
  - [ ] Avatar + nome do responsável
  - [ ] Prazo com indicação visual (verde, amarelo, vermelho)
  - [ ] Nome do lead vinculado
- [ ] Drag-and-drop entre colunas com animação suave (`@dnd-kit/sortable`)
- [ ] Estado local de atualização de etapa (sem persistência ainda)
- [ ] Formulário de criação de deal em `Dialog`: título, valor, lead, responsável, prazo, etapa
- [ ] Ao clicar no card, abre `Sheet` lateral com detalhe do deal (placeholder)
- [ ] Header da página com total de negócios abertos e valor agregado do pipeline

### Commit Final
```
feat: pipeline Kanban com drag-and-drop entre estágios

- KanbanBoard/Column/DealCard com @dnd-kit
- 6 estágios, valor agregado por coluna
- Formulário de criação de deal
```

---

## M6 — Dashboard UI

**Branch**: `feat/dashboard-ui`
**Objetivo**: Painel de métricas e gráficos com dados mock representativos.

### Entregas
- [ ] Página `/dashboard` com grid de cards e gráfico
- [ ] 4 cards de métricas (componente `MetricCard`):
  - [ ] Total de Leads
  - [ ] Negócios Abertos
  - [ ] Valor do Pipeline (R$)
  - [ ] Taxa de Conversão (%)
- [ ] Cada card com: valor principal, variação percentual e ícone
- [ ] Componente `FunnelChart` com Recharts mostrando leads por estágio
- [ ] Seção "Negócios com prazo próximo" — lista dos 5 deals com prazo nos próximos 7 dias
- [ ] Seção "Atividade recente" — timeline das últimas 5 atividades do workspace
- [ ] Filtro de período no header: Últimos 7 dias / 30 dias / 90 dias / Este mês
- [ ] Layout responsivo: 2 colunas no desktop, 1 coluna no mobile

### Commit Final
```
feat: dashboard de métricas com gráfico de funil e cards KPI

- 4 cards de métricas, FunnelChart com Recharts
- Deals com prazo próximo, atividade recente
- Filtro de período
```

---

## M7 — Landing Page

**Branch**: `feat/landing-page`
**Objetivo**: Página pública de apresentação do PipeFlow CRM, pronta para mostrar ao mercado.

### Entregas
- [ ] Layout de marketing em `app/(marketing)/layout.tsx` com header e footer públicos
- [ ] Página `/` (raiz) como landing page pública
- [ ] Seção **Hero**: headline impactante, subheadline, CTA "Começar grátis" + "Ver demo", screenshot do pipeline
- [ ] Seção **Funcionalidades**: 6 cards com ícone, título e descrição (Pipeline Kanban, Gestão de Leads, Multi-empresa, Dashboard, Integração Stripe, Convite de Time)
- [ ] Seção **Como funciona**: 3 passos visuais (Crie seu workspace → Cadastre leads → Feche negócios)
- [ ] Seção **Preços**: 2 planos em cards (Free e Pro) com lista de features e botão de CTA
- [ ] Seção **Depoimentos**: 3 depoimentos fictícios de personas (Empreendedor, Vendedor, Freelancer)
- [ ] Seção **CTA final**: "Comece a organizar suas vendas hoje" + botão
- [ ] Header público com logo, links de navegação e botões "Login" / "Começar grátis"
- [ ] Footer com links e copyright
- [ ] Totalmente responsivo (mobile-first)
- [ ] Rota `/` redireciona usuários autenticados para `/pipeline`

### Commit Final
```
feat: landing page pública do PipeFlow CRM

- Seções: hero, funcionalidades, como funciona, preços, CTA
- Header/footer públicos, totalmente responsiva
```

---

## M8 — Auth & Backend (Supabase)

**Branch**: `feat/auth-backend`
**Objetivo**: Banco de dados real, auth funcionando e middleware de proteção de rotas.

### Entregas
- [ ] Configurar projeto Supabase (local via `supabase start`)
- [ ] Criar `lib/supabase/client.ts` (browser client com `createBrowserClient`)
- [ ] Criar `lib/supabase/server.ts` (server client com `createServerClient`)
- [ ] Criar `middleware.ts` na raiz com refresh de sessão e proteção de rotas
- [ ] Migration `001_init_schema.sql`:
  - [ ] Tabela `workspaces` (id, name, slug, plan, stripe_customer_id, created_at)
  - [ ] Tabela `workspace_members` (workspace_id, user_id, role, joined_at)
  - [ ] Tabela `leads` (id, workspace_id, name, email, phone, company, position, status, assignee_id, created_at, updated_at)
  - [ ] Tabela `deals` (id, workspace_id, lead_id, title, value, stage, assignee_id, due_date, created_at, updated_at)
  - [ ] Tabela `activities` (id, lead_id, workspace_id, author_id, type, description, date, created_at)
- [ ] Migration `002_rls_policies.sql` — RLS para todas as tabelas baseado em `workspace_id`
- [ ] Trigger para criar workspace padrão ao registrar novo usuário
- [ ] Conectar formulários de auth ao Supabase Auth:
  - [ ] Login com e-mail/senha
  - [ ] Signup com criação de perfil e workspace
  - [ ] Forgot password com e-mail de reset
  - [ ] Logout
- [ ] Remover middleware placeholder e ativar auth guard real
- [ ] Variáveis de ambiente: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Commit Final
```
feat: Supabase Auth + schema completo + RLS + middleware de auth

- Schema: workspaces, leads, deals, activities com RLS
- Auth completo: login, signup, logout, reset de senha
- Middleware protegendo rotas do dashboard
```

---

## M9 — Leads Backend

**Branch**: `feat/leads-backend`
**Objetivo**: CRUD de leads conectado ao Supabase, substituindo dados mock.

### Entregas
- [ ] Server Action `createLead(data)` com validação zod e insert no Supabase
- [ ] Server Action `updateLead(id, data)` com verificação de permissão via RLS
- [ ] Server Action `deleteLead(id)` com confirmação e soft-delete
- [ ] Server Component na página `/leads` buscando leads reais do workspace ativo
- [ ] Busca e filtros server-side (URL search params com `useSearchParams`)
- [ ] Paginação server-side
- [ ] Página `/leads/[id]` buscando lead real + atividades
- [ ] Hook `useLeads()` para operações client-side se necessário
- [ ] `revalidatePath` após mutações para atualizar a UI
- [ ] Remover `mock-data.ts` após validação completa
- [ ] Tratamento de erros: leads não encontrados, sem permissão, limite do plano Free (50 leads)

### Commit Final
```
feat: leads CRUD conectado ao Supabase

- Server Actions para create/update/delete
- Busca, filtros e paginação server-side
- Limites do plano Free aplicados
```

---

## M10 — Pipeline Backend

**Branch**: `feat/pipeline-backend`
**Objetivo**: Deals criados, editados e movidos entre colunas com persistência real.

### Entregas
- [ ] Server Action `createDeal(data)` com vinculação ao lead e workspace
- [ ] Server Action `updateDealStage(id, stage)` — chamada no drop do DnD
- [ ] Server Action `updateDeal(id, data)` para edição completa
- [ ] Server Action `deleteDeal(id)`
- [ ] Server Component na página `/pipeline` carregando deals agrupados por stage
- [ ] Atualização otimista no drag-and-drop (UI muda imediatamente, persiste no background)
- [ ] Recálculo automático dos totais por coluna após mutação
- [ ] `revalidatePath` nas mutações
- [ ] Tratamento de erro com rollback visual se a persistência falhar

### Commit Final
```
feat: pipeline backend com persistência de deals e stages

- Server Actions para CRUD de deals
- Atualização otimista no drag-and-drop
- Totais por coluna calculados do banco
```

---

## M11 — Atividades (Timeline)

**Branch**: `feat/activities`
**Objetivo**: Timeline cronológica de atividades por lead, com UI e backend integrados.

### Entregas
- [ ] Componente `ActivityTimeline` na página de detalhe do lead
- [ ] Componente `ActivityItem` com ícone por tipo (ligação, e-mail, reunião, nota)
- [ ] Formulário "Registrar Atividade" em `Dialog`: tipo, descrição, data
- [ ] Server Action `createActivity(data)` com vinculação ao lead e workspace
- [ ] Query de atividades ordenada por data (mais recente primeiro)
- [ ] Exibição do autor (nome + avatar) em cada atividade
- [ ] Atividades listadas na seção "Atividade recente" do Dashboard (substituindo mock)
- [ ] Contagem de atividades no header da página do lead

### Commit Final
```
feat: timeline de atividades por lead (UI + backend)

- ActivityTimeline com ícones por tipo
- Formulário de registro de atividade
- Dashboard atualizado com atividades reais
```

---

## M12 — Multi-Workspace e Colaboração

**Branch**: `feat/multi-workspace`
**Objetivo**: Usuários podem criar múltiplos workspaces, convidar colaboradores e alternar entre eles.

### Entregas
- [ ] Workspace switcher na sidebar com dropdown e lista de workspaces do usuário
- [ ] Botão "Criar workspace" abre `Dialog` com formulário (nome, slug)
- [ ] Server Action `createWorkspace(data)` com validação de slug único
- [ ] Página `/settings` com abas: Workspace, Membros, Plano
- [ ] Aba Membros: lista de membros com role badge e botão "Remover"
- [ ] Formulário de convite: campo e-mail + select de role (Admin/Membro)
- [ ] Server Action `inviteMember(email, role)` enviando e-mail via Resend
- [ ] Template de e-mail de convite com link de aceite
- [ ] Rota `/invites/[token]` para aceitar convite e entrar no workspace
- [ ] Server Action `removeMember(userId)` somente para Admin
- [ ] Isolamento completo de dados: query sempre filtrada por `workspace_id` ativo
- [ ] `workspace_id` ativo armazenado em cookie httpOnly (sem exposição ao client)
- [ ] Limite do plano Free: máximo 2 membros — bloquear convite com mensagem de upgrade

### Commit Final
```
feat: multi-workspace com convites por e-mail e controle de papéis

- Criar workspaces, convidar membros, alternar via sidebar
- Convite por e-mail via Resend com link de aceite
- Limite de 2 membros no plano Free
```

---

## M13 — Monetização (Stripe)

**Branch**: `feat/monetizacao`
**Objetivo**: Plano Free e Pro funcionando com checkout, webhook e portal de gerenciamento.

### Entregas
- [ ] Configurar produtos e preços no Stripe Dashboard (plano Pro R$49/mês)
- [ ] Criar `lib/stripe/client.ts` com instância do Stripe
- [ ] Server Action `createCheckoutSession()` para upgrade para Pro
- [ ] Server Action `createPortalSession()` para gerenciar assinatura existente
- [ ] Rota `app/api/stripe/webhook/route.ts`:
  - [ ] Verificação de assinatura com `stripe.webhooks.constructEvent`
  - [ ] Handler `checkout.session.completed` → atualizar `plan = 'pro'` no workspace
  - [ ] Handler `customer.subscription.deleted` → reverter `plan = 'free'`
  - [ ] Handler `invoice.payment_failed` → notificar via e-mail (Resend)
- [ ] Página `/settings` aba Plano: exibir plano atual, limites usados e CTA de upgrade
- [ ] Botão "Fazer upgrade" no bloco de limite atingido (leads, membros)
- [ ] Lógica de gate no plano Free:
  - [ ] Bloquear criação de lead se `leads >= 50`
  - [ ] Bloquear convite se `members >= 2`
  - [ ] Exibir banner de upgrade quando 80% do limite atingido
- [ ] Página de sucesso `/success` após checkout concluído
- [ ] Variáveis de ambiente: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Commit Final
```
feat: monetização com Stripe Checkout, webhook e Customer Portal

- Checkout para upgrade Pro (R$49/mês)
- Webhook para ativar/desativar plano
- Gates de limite Free com CTA de upgrade
```

---

## M14 — Onboarding

**Branch**: `feat/onboarding`
**Objetivo**: Novos usuários têm um fluxo guiado claro até o primeiro valor do produto.

### Entregas
- [ ] Fluxo de onboarding em `/onboarding` com 3 steps:
  - [ ] Step 1: "Dê um nome ao seu workspace" (nome + slug)
  - [ ] Step 2: "Cadastre seu primeiro lead" (formulário simplificado)
  - [ ] Step 3: "Adicione um negócio ao pipeline" (formulário simplificado)
- [ ] Componente `OnboardingProgress` com stepper visual
- [ ] Redirect automático para `/onboarding` após primeiro signup (flag `onboarding_completed` no workspace)
- [ ] Botão "Pular" em cada step (vai para o próximo ou para `/pipeline`)
- [ ] Ao concluir, marcar `onboarding_completed = true` e redirecionar para `/pipeline`
- [ ] Checklist de "Primeiros passos" na sidebar para usuários recém-chegados (desaparece após completar)
- [ ] Tooltip de boas-vindas na primeira visita ao pipeline

### Commit Final
```
feat: fluxo de onboarding em 3 passos para novos usuários

- Steps: workspace → primeiro lead → primeiro deal
- Checklist de primeiros passos na sidebar
- Flag onboarding_completed no workspace
```

---

## M15 — Deploy e Polimento Final

**Branch**: `feat/deploy`
**Objetivo**: App em produção, performático, sem erros e pronto para usuários reais.

### Entregas

#### Deploy
- [ ] Criar projeto no Vercel e linkar ao repositório GitHub
- [ ] Configurar variáveis de ambiente no Vercel (Supabase, Stripe, Resend)
- [ ] Configurar projeto Supabase em produção (rodar migrations)
- [ ] Configurar webhook do Stripe para a URL de produção
- [ ] Verificar domínio customizado (se aplicável)
- [ ] Testar fluxo completo em produção: signup → lead → deal → upgrade → portal

#### Performance
- [ ] Auditar com Lighthouse (meta: 90+ em Performance e Acessibilidade)
- [ ] Adicionar `loading.tsx` em todas as rotas do dashboard (Suspense)
- [ ] Adicionar `error.tsx` em todas as rotas do dashboard
- [ ] Otimizar imagens com `next/image`
- [ ] Verificar ausência de waterfalls de dados desnecessários

#### Qualidade
- [ ] Rodar `npm run build` sem erros ou warnings de TypeScript
- [ ] Revisar e remover todos os `TODO` e dados mock residuais
- [ ] Verificar todos os formulários: validação, estados de loading, mensagens de erro
- [ ] Testar fluxo de convite por e-mail de ponta a ponta
- [ ] Testar webhook do Stripe com `stripe trigger` em produção
- [ ] Verificar RLS: usuário de workspace A não consegue ver dados do workspace B

#### SEO e Meta
- [ ] Adicionar `metadata` nas páginas públicas (title, description, og:image)
- [ ] Criar `favicon.ico` e `og-image.png`
- [ ] Adicionar `sitemap.xml` para as páginas públicas

### Commit Final
```
feat: deploy em produção + polimento de performance e qualidade

- Deploy Vercel + Supabase prod configurados
- Lighthouse 90+, loading/error boundaries
- RLS validado, formulários revisados
```

---

## Regras de Trabalho

1. **Um milestone por vez** — completar e fazer merge antes de iniciar o próximo
2. **Interface primeiro** — M1 a M7 são 100% frontend com dados mock; banco só entra no M8
3. **Commit ao final de cada milestone** — mensagem padronizada conforme descrito acima
4. **Branch da main** — cada milestone parte do `master` após merge do anterior
5. **Sem backend prematuro** — não criar tabelas ou queries enquanto a UI não estiver aprovada
6. **Checklist como critério de done** — milestone só está completo quando todos os itens estão marcados
