"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import type { Deal, PipelineStage } from "@/types"
import { Button } from "@/components/ui/button"
import { KanbanBoard } from "./kanban-board"
import { DealFormDialog, type NewDeal } from "./deal-form-dialog"
import { DealDetailSheet } from "./deal-detail-sheet"
import { MOCK_LEADS } from "./pipeline-mock-data"

interface PipelineClientProps {
  initialDeals: Deal[]
}

function formatPipelineValue(v: number): string {
  if (v >= 1_000_000) return `R$${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000) return `R$${(v / 1_000).toFixed(0)}K`
  return `R$${v}`
}

export function PipelineClient({ initialDeals }: PipelineClientProps) {
  const [deals, setDeals] = useState<Deal[]>(initialDeals)
  const [formOpen, setFormOpen] = useState(false)
  const [formDefaultStage, setFormDefaultStage] =
    useState<PipelineStage>("novo_lead")
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const openDeals = deals.filter((d) => d.stage !== "fechado_perdido")
  const totalValue = openDeals.reduce((sum, d) => sum + (d.value ?? 0), 0)

  function handleAddFromColumn(stage: PipelineStage) {
    setFormDefaultStage(stage)
    setFormOpen(true)
  }

  function handleDealClick(deal: Deal) {
    setSelectedDeal(deal)
    setSheetOpen(true)
  }

  function handleDealCreated(newDeal: NewDeal) {
    const lead = MOCK_LEADS.find((l) => l.id === newDeal.lead_id)
    const deal: Deal = {
      ...newDeal,
      lead: lead
        ? { id: lead.id, name: lead.name, company: lead.company }
        : undefined,
    }
    setDeals((prev) => [...prev, deal])
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {openDeals.length} negócios ·{" "}
            {formatPipelineValue(totalValue)} em aberto
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setFormDefaultStage("novo_lead")
            setFormOpen(true)
          }}
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Novo Negócio
        </Button>
      </div>

      <KanbanBoard
        deals={deals}
        onAddDeal={handleAddFromColumn}
        onDealClick={handleDealClick}
      />

      <DealFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        defaultStage={formDefaultStage}
        onSubmit={handleDealCreated}
      />

      <DealDetailSheet
        deal={selectedDeal}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  )
}
