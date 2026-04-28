export type Period = "7d" | "30d" | "90d" | "mes"

export const PERIOD_LABELS: Record<Period, string> = {
  "7d": "7 dias",
  "30d": "30 dias",
  "90d": "90 dias",
  mes: "Este mês",
}

export const MOCK_KPIS: Record<
  Period,
  {
    leads: number
    openDeals: number
    pipelineValue: number
    conversionRate: number
    leadsD: number
    dealsD: number
    valueD: number
    convD: number
  }
> = {
  "7d": {
    leads: 1284,
    openDeals: 47,
    pipelineValue: 892000,
    conversionRate: 34.2,
    leadsD: 4.1,
    dealsD: 2.3,
    valueD: 7.8,
    convD: 1.2,
  },
  "30d": {
    leads: 1284,
    openDeals: 47,
    pipelineValue: 892000,
    conversionRate: 34.2,
    leadsD: 12.0,
    dealsD: 8.0,
    valueD: 23.4,
    convD: 5.1,
  },
  "90d": {
    leads: 1284,
    openDeals: 47,
    pipelineValue: 892000,
    conversionRate: 34.2,
    leadsD: 31.5,
    dealsD: 19.0,
    valueD: 48.2,
    convD: 11.3,
  },
  mes: {
    leads: 1284,
    openDeals: 47,
    pipelineValue: 892000,
    conversionRate: 34.2,
    leadsD: 9.3,
    dealsD: 6.1,
    valueD: 18.7,
    convD: 3.8,
  },
}

export const MOCK_FUNNEL = [
  {
    stage: "novo_lead",
    label: "Novo Lead",
    deals: 18,
    value: 423000,
    color: "#3B82F6",
  },
  {
    stage: "contato_realizado",
    label: "Contato Realizado",
    deals: 12,
    value: 287000,
    color: "#06B6D4",
  },
  {
    stage: "proposta_enviada",
    label: "Proposta Enviada",
    deals: 9,
    value: 198000,
    color: "#F59E0B",
  },
  {
    stage: "negociacao",
    label: "Negociação",
    deals: 5,
    value: 132000,
    color: "#F97316",
  },
  {
    stage: "fechado_ganho",
    label: "Fechado Ganho",
    deals: 3,
    value: 89000,
    color: "#22C55E",
  },
  {
    stage: "fechado_perdido",
    label: "Fechado Perdido",
    deals: 2,
    value: 51000,
    color: "#EF4444",
  },
]

export const MOCK_DEALS_DUE = [
  {
    id: "d1",
    title: "CRM Corporativo Bradesco",
    company: "Bradesco",
    value: 150000,
    dueDate: "2026-04-30",
    stage: "proposta_enviada",
    assignee: "EA",
  },
  {
    id: "d2",
    title: "Reunião Diagnóstico Ambev",
    company: "Ambev",
    value: 47500,
    dueDate: "2026-04-28",
    stage: "contato_realizado",
    assignee: "EA",
  },
  {
    id: "d3",
    title: "Proposta Plataforma B2B",
    company: "Magazine Luiza",
    value: 92000,
    dueDate: "2026-04-25",
    stage: "proposta_enviada",
    assignee: "JL",
  },
  {
    id: "d4",
    title: "Negociação Infraestrutura AWS",
    company: "Itaú Unibanco",
    value: 78000,
    dueDate: "2026-04-22",
    stage: "negociacao",
    assignee: "EA",
  },
  {
    id: "d5",
    title: "Módulo BI Corporativo",
    company: "Vale S.A.",
    value: 54000,
    dueDate: "2026-04-20",
    stage: "negociacao",
    assignee: "JL",
  },
]

export const MOCK_ACTIVITIES = [
  {
    id: "a1",
    type: "ligacao",
    author: "Eduardo A.",
    company: "Bradesco",
    description: "Follow-up sobre proposta de CRM corporativo",
    minutesAgo: 45,
  },
  {
    id: "a2",
    type: "email",
    author: "Rafael F.",
    company: "Petrobras",
    description: "Envio de proposta revisada com desconto de 10%",
    minutesAgo: 180,
  },
  {
    id: "a3",
    type: "reuniao",
    author: "Julia L.",
    company: "Magazine Luiza",
    description: "Demo da plataforma B2B para equipe de TI",
    minutesAgo: 360,
  },
  {
    id: "a4",
    type: "nota",
    author: "Eduardo A.",
    company: "Itaú Unibanco",
    description: "Cliente solicitou análise de ROI detalhada para Apr 30",
    minutesAgo: 720,
  },
  {
    id: "a5",
    type: "ligacao",
    author: "Rafael F.",
    company: "Ambev",
    description:
      "Agendamento de reunião de diagnóstico para semana que vem",
    minutesAgo: 1440,
  },
]
