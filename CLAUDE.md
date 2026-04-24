# PipeFlow CRM — Briefing do Projeto

> CRM SaaS multi-empresa com pipeline Kanban visual, gestão de leads e monetização via Stripe.
> PRD completo em [docs/PRD.md](docs/PRD.md).

---

## Stack Técnica

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 14 (App Router) |
| UI | React 18 + shadcn/ui + Tailwind CSS |
| Banco de dados | Supabase (PostgreSQL + RLS + Auth) |
| Pagamento | Stripe (Checkout + Webhooks + Customer Portal) |
| E-mail | Resend |
| Drag-and-drop | @dnd-kit |
| Gráficos | Recharts |
| Linguagem | TypeScript 5 (strict mode) |
| Deploy | Vercel (frontend) + Supabase (backend/DB) |

---

## Estrutura de Pastas

```
crm/
├── app/
│   ├── (auth)/                 # /login, /signup, /forgot-password
│   ├── (dashboard)/            # Rotas protegidas
│   │   ├── pipeline/           # Kanban principal
│   │   ├── leads/              # Lista e detalhe de leads
│   │   ├── dashboard/          # Métricas e gráficos
│   │   └── settings/           # Workspace, plano, membros
│   ├── (marketing)/            # Landing page pública
│   └── api/
│       ├── stripe/
│       │   └── webhook/        # Webhook Stripe
│       └── invites/            # Convites por e-mail
├── components/
│   ├── ui/                     # shadcn/ui base components
│   ├── leads/                  # LeadCard, LeadForm, LeadDetail
│   ├── pipeline/               # KanbanBoard, KanbanColumn, DealCard
│   └── dashboard/              # MetricCard, FunnelChart
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Client-side Supabase
│   │   ├── server.ts           # Server-side Supabase
│   │   └── middleware.ts       # Auth middleware
│   ├── stripe/
│   │   └── client.ts           # Stripe client + helpers
│   └── utils.ts
├── hooks/                      # Custom React hooks
├── types/                      # TypeScript types globais
├── docs/
│   └── PRD.md
└── supabase/
    ├── migrations/             # SQL migrations versionadas
    └── functions/              # Edge Functions (webhooks Stripe)
```

---

## Convenções de Código

### TypeScript
- `strict: true` em tsconfig — sem `any` explícito
- Types em `types/` para entidades de domínio (Lead, Deal, Workspace, Member)
- Interfaces para props de componentes, types para unions e dados

### Componentes React
- Server Components por padrão; `"use client"` só quando necessário (interatividade, hooks)
- Componentes em PascalCase, arquivos em kebab-case: `lead-card.tsx`
- Props explicitamente tipadas com interface local ou importada de `types/`

### Supabase / Banco
- Sempre usar RLS — nenhuma tabela sem política de segurança
- Queries no servidor via `lib/supabase/server.ts`, nunca expor service role no client
- Migrations versionadas em `supabase/migrations/` com nome descritivo

### Stripe
- Webhooks processados em `app/api/stripe/webhook/route.ts`
- Verificar assinatura do webhook com `stripe.webhooks.constructEvent`
- Nunca confiar em dados do client para ativar/desativar plano — sempre via webhook

### Nomenclatura
- Funções: camelCase (`createLead`, `updateDealStage`)
- Constantes: UPPER_SNAKE_CASE (`PIPELINE_STAGES`, `FREE_PLAN_LIMITS`)
- DB columns: snake_case (`created_at`, `workspace_id`)
- Rotas API: kebab-case (`/api/stripe/webhook`)

---

## Modelo de Dados (principais entidades)

```
workspaces        → id, name, slug, plan, stripe_customer_id
workspace_members → workspace_id, user_id, role (admin | member)
leads             → id, workspace_id, name, email, phone, company, status
deals             → id, workspace_id, lead_id, title, value, stage, assignee_id, due_date
activities        → id, lead_id, author_id, type (call|email|meeting|note), description, date
```

---

## Pipeline Kanban — Estágios

```
Novo Lead → Contato Realizado → Proposta Enviada → Negociação → Fechado Ganho | Fechado Perdido
```

---

## Planos e Limites

| Feature | Free | Pro (R$49/mês) |
|---------|------|----------------|
| Colaboradores | até 2 | ilimitado |
| Leads | até 50 | ilimitado |
| Workspaces | 1 | ilimitado |
| Suporte | — | prioritário |

---

## Identidade Visual

- **Referências**: HubSpot CRM (clareza), Pipedrive (foco em pipeline e ação)
- **Princípio de design**: limpo, profissional, centrado no pipeline
- **Componentes**: shadcn/ui (base) + customizações via Tailwind
- **Paleta**: neutros (slate/gray) + accent azul ou índigo para ações primárias
- **UX**: pipeline é o centro — onboarding rápido, zero complexidade desnecessária

---

## Skills Disponíveis (`.claude/skills/`)

| Skill | Quando usar |
|-------|-------------|
| `frontend-design` | Criar/melhorar componentes UI, landing page, layouts |
| `stripe-integration` | Implementar checkout, webhooks, portal, dunning |
| `supabase-postgres-best-practices` | Schema, RLS, queries, indexes, migrations |
| `micro-saas-launcher` | Decisões de produto, pricing, validação, go-to-market |
| `senior-secops` | Auditoria de segurança, RLS, validação de inputs |
| `code-reviewer` | Review de PRs e qualidade geral do código |

---

## Agentes Disponíveis (`.claude/agents/`)

- **`frontend-developer`** — especialista em React 19+, Next.js, Tailwind, shadcn/ui
- **`code-reviewer`** — revisão completa de código com foco em qualidade e segurança

---

## Milestones de Desenvolvimento

1. **M1 — Fundação**: Setup Next.js + Supabase + Auth + estrutura de pastas
2. **M2 — Leads**: CRUD de leads com listagem, busca e filtros
3. **M3 — Pipeline**: Kanban com drag-and-drop e persistência
4. **M4 — Atividades**: Timeline de atividades por lead
5. **M5 — Multi-workspace**: Workspaces, convites, papéis (Admin/Membro)
6. **M6 — Dashboard**: Métricas de vendas e gráfico de funil
7. **M7 — Monetização**: Stripe Checkout + Webhook + Customer Portal
8. **M8 — Landing Page**: Página pública de apresentação
9. **M9 — Onboarding**: Fluxo guiado para novos usuários
10. **M10 — Polimento**: Performance, testes, acessibilidade, deploy

---

## Comandos Úteis

```bash
# Dev
npm run dev

# Supabase local
supabase start
supabase db reset
supabase migration new <nome>

# Stripe webhook local
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Build e lint
npm run build
npm run lint
```
