"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import type { MOCK_FUNNEL } from "@/lib/mock-dashboard"

type FunnelEntry = (typeof MOCK_FUNNEL)[number]

function formatValue(n: number): string {
  if (n >= 1_000_000) return `R$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `R$${(n / 1_000).toFixed(0)}K`
  return `R$${n}`
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ payload: FunnelEntry }>
}

function CustomTooltipContent({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-foreground">{d.label}</p>
      <p className="text-muted-foreground mt-1">{d.deals} deals</p>
      <p className="text-muted-foreground">{formatValue(d.value)}</p>
    </div>
  )
}

interface FunnelChartProps {
  data: typeof MOCK_FUNNEL
}

export function FunnelChart({ data }: FunnelChartProps) {
  const totalDeals = data.reduce((s, d) => s + d.deals, 0)
  const totalValue = data.reduce((s, d) => s + d.value, 0)
  const topStage = data[0]
  const wonStage = data.find((d) => d.stage === "fechado_ganho")
  const convRate =
    topStage && wonStage
      ? ((wonStage.deals / topStage.deals) * 100).toFixed(0)
      : "0"

  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col h-full">
      <div className="mb-4">
        <p className="text-sm font-semibold text-foreground">Funil de Vendas</p>
        <p className="text-xs text-muted-foreground mt-0.5">Deals por estágio</p>
      </div>

      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 12, left: 0, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="label"
              width={130}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltipContent />} cursor={{ fill: "transparent" }} />
            <Bar dataKey="deals" radius={[0, 4, 4, 0]}>
              {data.map((entry) => (
                <Cell key={entry.stage} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Total de deals</p>
          <p className="text-sm font-semibold text-foreground mt-0.5">{totalDeals}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Valor total</p>
          <p className="text-sm font-semibold text-foreground mt-0.5">{formatValue(totalValue)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Conv. entrada→ganho</p>
          <p className="text-sm font-semibold mt-0.5" style={{ color: "#22C55E" }}>{convRate}%</p>
        </div>
      </div>
    </div>
  )
}
