"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus, PackageOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Deal, PipelineStage } from "@/types";
import { STAGE_CONFIG } from "./kanban-board";
import { DealCard } from "./deal-card";

interface KanbanColumnProps {
  stage: PipelineStage;
  deals: Deal[];
  index: number;
  onAddDeal?: (stage: PipelineStage) => void;
  onDealClick?: (deal: Deal) => void;
}

function formatTotal(deals: Deal[]): string {
  const total = deals.reduce((sum, d) => sum + (d.value ?? 0), 0);
  if (total === 0) return "R$0";
  if (total >= 1000000) {
    return `R$${(total / 1000000).toFixed(1)}M`;
  }
  if (total >= 1000) {
    return `R$${(total / 1000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(total);
}

export function KanbanColumn({ stage, deals, index, onAddDeal, onDealClick }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });
  const config = STAGE_CONFIG[stage];
  const dealIds = deals.map((d) => d.id);

  return (
    <div
      style={{
        animationDelay: `${index * 80}ms`,
        borderTopColor: config.color,
        borderTopWidth: "3px",
        backgroundColor: isOver ? config.bgColor : undefined,
        borderColor: isOver ? `${config.color}66` : undefined,
      }}
      className="flex flex-col w-[280px] shrink-0 rounded-xl border border-border bg-card transition-colors duration-200 animate-[fadeSlideIn_0.35s_ease-out_both]"
    >
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              {config.label}
            </span>
            <Badge
              variant="secondary"
              className="h-5 px-1.5 text-xs font-medium"
            >
              {deals.length}
            </Badge>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {formatTotal(deals)}
          </span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className="flex-1 overflow-y-auto px-3 pb-2 flex flex-col gap-2"
        style={{ maxHeight: "calc(100vh - 260px)", minHeight: "80px" }}
      >
        <SortableContext items={dealIds} strategy={verticalListSortingStrategy}>
          {deals.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
              <PackageOpen className="w-7 h-7 text-muted-foreground/40" />
              <span className="text-xs text-muted-foreground/60">
                Nenhum deal aqui
              </span>
            </div>
          ) : (
            deals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onClick={onDealClick ? () => onDealClick(deal) : undefined}
              />
            ))
          )}
        </SortableContext>
      </div>

      <div className="px-3 pb-3 pt-1">
        <button
          type="button"
          onClick={() => onAddDeal?.(stage)}
          className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors duration-150"
        >
          <Plus className="w-3.5 h-3.5" />
          Adicionar deal
        </button>
      </div>
    </div>
  );
}
