"use client"

import { DollarSign, Calendar, User, Activity } from "lucide-react"
import type { Deal } from "@/types"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { STAGE_CONFIG } from "./kanban-board"
import { MOCK_ASSIGNEES } from "./pipeline-mock-data"

interface DealDetailSheetProps {
  deal: Deal | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function formatCurrencyFull(value: number | null): string {
  if (value === null) return "—"
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDateFull(dateStr: string | null): string | null {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function isOverdue(dateStr: string | null): boolean {
  if (!dateStr) return false
  return new Date(dateStr) < new Date()
}

export function DealDetailSheet({
  deal,
  open,
  onOpenChange,
}: DealDetailSheetProps) {
  if (!deal) return null

  const stageConfig = STAGE_CONFIG[deal.stage]
  const assignee = MOCK_ASSIGNEES.find((a) => a.id === deal.assignee_id) ?? null
  const formattedDate = formatDateFull(deal.due_date)
  const overdue = isOverdue(deal.due_date)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[420px] sm:max-w-[420px] p-0 flex flex-col"
      >
        <SheetHeader className="px-5 pt-5 pb-4 shrink-0">
          <div className="flex items-start justify-between gap-3 pr-6">
            <SheetTitle className="text-base font-semibold leading-snug">
              {deal.title}
            </SheetTitle>
            <Badge
              variant="secondary"
              className="shrink-0 mt-0.5 text-xs font-medium"
              style={{
                backgroundColor: `${stageConfig.color}20`,
                color: stageConfig.color,
                borderColor: `${stageConfig.color}40`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0"
                style={{ backgroundColor: stageConfig.color }}
              />
              {stageConfig.label}
            </Badge>
          </div>
        </SheetHeader>

        <Separator />

        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Detalhes
            </h3>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <DollarSign className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-xs">Valor</span>
                </div>
                <span className="text-sm font-medium text-foreground pl-5">
                  {formatCurrencyFull(deal.value)}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-xs">Prazo</span>
                </div>
                {formattedDate ? (
                  <span
                    className={`text-sm font-medium pl-5 ${
                      overdue ? "text-red-500" : "text-foreground"
                    }`}
                  >
                    {formattedDate}
                    {overdue && (
                      <span className="ml-1.5 text-[10px] font-semibold uppercase tracking-wide">
                        vencido
                      </span>
                    )}
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground pl-5">
                    Sem prazo
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <User className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-xs">Lead</span>
                </div>
                {deal.lead ? (
                  <div className="pl-5">
                    <span className="text-sm font-medium text-foreground block">
                      {deal.lead.name}
                    </span>
                    {deal.lead.company && (
                      <span className="text-xs text-muted-foreground">
                        {deal.lead.company}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground pl-5">—</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">
                  Responsável
                </span>
                {assignee ? (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                      {assignee.initials}
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {assignee.name}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Não atribuído
                  </span>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-3.5 h-3.5 text-muted-foreground" />
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Atividades
              </h3>
              <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
                Em breve
              </Badge>
            </div>

            <div className="flex flex-col items-start gap-3 py-4">
              <p className="text-sm text-muted-foreground">
                Registre ligações, e-mails e reuniões aqui.
              </p>
              <Button variant="outline" size="sm" disabled>
                Registrar atividade
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
