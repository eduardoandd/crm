import type { MOCK_DEALS_DUE } from "@/lib/mock-dashboard"

type Deal = (typeof MOCK_DEALS_DUE)[number]

const STAGE_CONFIG: Record<string, { label: string; color: string }> = {
  novo_lead: { label: "Novo Lead", color: "#3B82F6" },
  contato_realizado: { label: "Contato Realizado", color: "#06B6D4" },
  proposta_enviada: { label: "Proposta Enviada", color: "#F59E0B" },
  negociacao: { label: "Negociação", color: "#F97316" },
  fechado_ganho: { label: "Fechado Ganho", color: "#22C55E" },
  fechado_perdido: { label: "Fechado Perdido", color: "#EF4444" },
}

function formatValue(n: number): string {
  if (n >= 1_000_000) return `R$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `R$${(n / 1_000).toFixed(0)}K`
  return `R$${n}`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
  })
}

function isOverdue(dateStr: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(dateStr + "T00:00:00") < today
}

interface DealsDueSoonProps {
  deals: Deal[]
}

export function DealsDueSoon({ deals }: DealsDueSoonProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-foreground">Prazos Próximos</p>
        <span className="text-xs font-medium bg-secondary text-secondary-foreground rounded-full px-2 py-0.5">
          {deals.length}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        {deals.map((deal) => {
          const stage = STAGE_CONFIG[deal.stage]
          const overdue = isOverdue(deal.dueDate)

          return (
            <div
              key={deal.id}
              className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted/40 transition-colors cursor-default"
            >
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: stage?.color ?? "#6B7280" }}
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate leading-snug">
                  {deal.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {deal.company}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-semibold text-foreground">
                  {formatValue(deal.value)}
                </span>

                <span
                  className="text-xs"
                  style={{ color: overdue ? "#EF4444" : undefined }}
                  aria-label={`Prazo: ${formatDate(deal.dueDate)}${overdue ? " (vencido)" : ""}`}
                >
                  {overdue ? (
                    <span className="text-destructive font-medium">
                      {formatDate(deal.dueDate)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      {formatDate(deal.dueDate)}
                    </span>
                  )}
                </span>

                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 bg-primary/20 text-primary"
                  title={deal.assignee}
                >
                  {deal.assignee}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
