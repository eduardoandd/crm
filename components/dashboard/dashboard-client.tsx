"use client"

import { useState } from "react"
import { Users, Briefcase, TrendingUp, Target } from "lucide-react"
import {
  MOCK_KPIS,
  MOCK_FUNNEL,
  MOCK_DEALS_DUE,
  MOCK_ACTIVITIES,
  type Period,
} from "@/lib/mock-dashboard"
import { MetricCard } from "./metric-card"
import { FunnelChart } from "./funnel-chart"
import { DealsDueSoon } from "./deals-due-soon"
import { RecentActivity } from "./recent-activity"
import { PeriodFilter } from "./period-filter"

function formatLeads(n: number): string {
  return n.toLocaleString("pt-BR")
}

function formatValue(n: number): string {
  if (n >= 1_000_000) return `R$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `R$${(n / 1_000).toFixed(0)}K`
  return `R$${n}`
}

function formatRate(n: number): string {
  return `${n.toFixed(1).replace(".", ",")}%`
}

export function DashboardClient() {
  const [period, setPeriod] = useState<Period>("30d")
  const kpi = MOCK_KPIS[period]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Visão Geral</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Métricas e atividade do seu pipeline
          </p>
        </div>
        <PeriodFilter value={period} onChange={setPeriod} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total de Leads"
          value={formatLeads(kpi.leads)}
          delta={kpi.leadsD}
          icon={<Users size={18} />}
          iconBg="rgba(59,130,246,0.15)"
          iconColor="#3B82F6"
          index={0}
        />
        <MetricCard
          label="Negócios Abertos"
          value={String(kpi.openDeals)}
          delta={kpi.dealsD}
          icon={<Briefcase size={18} />}
          iconBg="rgba(245,158,11,0.15)"
          iconColor="#F59E0B"
          index={1}
        />
        <MetricCard
          label="Valor do Pipeline"
          value={formatValue(kpi.pipelineValue)}
          delta={kpi.valueD}
          icon={<TrendingUp size={18} />}
          iconBg="rgba(34,197,94,0.15)"
          iconColor="#22C55E"
          index={2}
        />
        <MetricCard
          label="Taxa de Conversão"
          value={formatRate(kpi.conversionRate)}
          delta={kpi.convD}
          icon={<Target size={18} />}
          iconBg="rgba(168,85,247,0.15)"
          iconColor="#A855F7"
          index={3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col">
          <FunnelChart data={MOCK_FUNNEL} />
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <DealsDueSoon deals={MOCK_DEALS_DUE} />
          <RecentActivity activities={MOCK_ACTIVITIES} />
        </div>
      </div>
    </div>
  )
}
