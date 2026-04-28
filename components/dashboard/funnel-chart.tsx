"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  useActiveTooltipDataPoints,
  useIsTooltipActive,
} from "recharts"
import type { MOCK_FUNNEL } from "@/lib/mock-dashboard"

type FunnelEntry = (typeof MOCK_FUNNEL)[number]

function formatValue(n: number): string {
  if (n >= 1_000_000) return `R$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `R$${(n / 1_000).toFixed(0)}K`
  return `R$${n}`
}

interface TooltipDataPoint {
  payload: FunnelEntry
}

function CustomTooltipContent() {
  const isActive = useIsTooltipActive()
  const dataPoints = useActiveTooltipDataPoints() as TooltipDataPoint[] | null

  if (!isActive || !dataPoints?.length) return null
  const d = dataPoints[0].payload

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
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="mb-4">
        <p className="text-sm font-semibold text-foreground">Funil de Vendas</p>
        <p className="text-xs text-muted-foreground mt-0.5">Deals por estágio</p>
      </div>

      <div style={{ height: 220 }}>
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
    </div>
  )
}
