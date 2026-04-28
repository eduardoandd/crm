"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import type { Deal, PipelineStage } from "@/types";
import { KanbanColumn } from "./kanban-column";
import { DealDragOverlay } from "./deal-drag-overlay";

export const STAGE_CONFIG: Record<
  PipelineStage,
  { label: string; color: string; bgColor: string }
> = {
  novo_lead: {
    label: "Novo Lead",
    color: "#3B82F6",
    bgColor: "rgba(59,130,246,0.08)",
  },
  contato_realizado: {
    label: "Contato Realizado",
    color: "#06B6D4",
    bgColor: "rgba(6,182,212,0.08)",
  },
  proposta_enviada: {
    label: "Proposta Enviada",
    color: "#F59E0B",
    bgColor: "rgba(245,158,11,0.08)",
  },
  negociacao: {
    label: "Negociação",
    color: "#F97316",
    bgColor: "rgba(249,115,22,0.08)",
  },
  fechado_ganho: {
    label: "Fechado Ganho",
    color: "#22C55E",
    bgColor: "rgba(34,197,94,0.08)",
  },
  fechado_perdido: {
    label: "Fechado Perdido",
    color: "#EF4444",
    bgColor: "rgba(239,68,68,0.08)",
  },
};

const STAGE_ORDER: PipelineStage[] = [
  "novo_lead",
  "contato_realizado",
  "proposta_enviada",
  "negociacao",
  "fechado_ganho",
  "fechado_perdido",
];

interface KanbanBoardProps {
  deals: Deal[];
  onAddDeal?: (stage: PipelineStage) => void;
  onDealClick?: (deal: Deal) => void;
}

function buildColumns(deals: Deal[]): Record<PipelineStage, Deal[]> {
  const columns = Object.fromEntries(
    STAGE_ORDER.map((stage) => [stage, [] as Deal[]])
  ) as Record<PipelineStage, Deal[]>;

  for (const deal of deals) {
    columns[deal.stage].push(deal);
  }

  return columns;
}

function findDealStage(
  columns: Record<PipelineStage, Deal[]>,
  dealId: string
): PipelineStage | null {
  for (const stage of STAGE_ORDER) {
    if (columns[stage].some((d) => d.id === dealId)) {
      return stage;
    }
  }
  return null;
}

export function KanbanBoard({ deals, onAddDeal, onDealClick }: KanbanBoardProps) {
  const [columns, setColumns] = useState<Record<PipelineStage, Deal[]>>(
    () => buildColumns(deals)
  );
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);

  useEffect(() => {
    setColumns(buildColumns(deals));
  }, [deals]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const totalDeals = STAGE_ORDER.reduce(
    (sum, stage) => sum + columns[stage].length,
    0
  );

  function handleDragStart(event: DragStartEvent) {
    const dealId = String(event.active.id);
    const stage = findDealStage(columns, dealId);
    if (!stage) return;
    const deal = columns[stage].find((d) => d.id === dealId) ?? null;
    setActiveDeal(deal);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const activeStage = findDealStage(columns, activeId);
    if (!activeStage) return;

    const overStage = STAGE_ORDER.includes(overId as PipelineStage)
      ? (overId as PipelineStage)
      : findDealStage(columns, overId);

    if (!overStage || activeStage === overStage) return;

    setColumns((prev) => {
      const activeDeals = [...prev[activeStage]];
      const overDeals = [...prev[overStage]];

      const activeIndex = activeDeals.findIndex((d) => d.id === activeId);
      if (activeIndex === -1) return prev;

      const [movedDeal] = activeDeals.splice(activeIndex, 1);
      const updatedDeal = { ...movedDeal, stage: overStage };

      const overIndex = overDeals.findIndex((d) => d.id === overId);
      if (overIndex >= 0) {
        overDeals.splice(overIndex, 0, updatedDeal);
      } else {
        overDeals.push(updatedDeal);
      }

      return {
        ...prev,
        [activeStage]: activeDeals,
        [overStage]: overDeals,
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveDeal(null);

    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const activeStage = findDealStage(columns, activeId);
    if (!activeStage) return;

    const isOverColumn = STAGE_ORDER.includes(overId as PipelineStage);

    if (isOverColumn) return;

    const overStage = findDealStage(columns, overId);
    if (!overStage || activeStage !== overStage) return;

    setColumns((prev) => {
      const stageDeals = [...prev[activeStage]];
      const activeIndex = stageDeals.findIndex((d) => d.id === activeId);
      const overIndex = stageDeals.findIndex((d) => d.id === overId);

      if (activeIndex === -1 || overIndex === -1) return prev;

      return {
        ...prev,
        [activeStage]: arrayMove(stageDeals, activeIndex, overIndex),
      };
    });
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <div
        className="flex rounded-full overflow-hidden h-1.5"
        aria-label="Distribuição de deals por estágio"
      >
        {STAGE_ORDER.map((stage) => {
          const count = columns[stage].length;
          const flexGrow = Math.max(count, 0.5);
          return (
            <div
              key={stage}
              style={{
                flexGrow,
                backgroundColor: STAGE_CONFIG[stage].color,
              }}
              title={`${STAGE_CONFIG[stage].label}: ${count} deal${count !== 1 ? "s" : ""}`}
              className="transition-all duration-300"
            />
          );
        })}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {STAGE_ORDER.map((stage) => {
          const count = columns[stage].length;
          const pct =
            totalDeals > 0 ? Math.round((count / totalDeals) * 100) : 0;
          return (
            <div key={stage} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: STAGE_CONFIG[stage].color }}
              />
              <span className="text-xs text-muted-foreground">
                {STAGE_CONFIG[stage].label}
              </span>
              <span className="text-xs font-medium text-foreground">
                {count}
              </span>
              <span className="text-xs text-muted-foreground/60">
                ({pct}%)
              </span>
            </div>
          );
        })}
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-3 overflow-x-auto pb-4">
          {STAGE_ORDER.map((stage, index) => (
            <KanbanColumn
              key={stage}
              stage={stage}
              deals={columns[stage]}
              index={index}
              onAddDeal={onAddDeal}
              onDealClick={onDealClick}
            />
          ))}
        </div>

        <DragOverlay>
          {activeDeal ? <DealDragOverlay deal={activeDeal} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
