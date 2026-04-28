"use client";

import { Building2, Calendar } from "lucide-react";
import type { Deal } from "@/types";
import { STAGE_CONFIG } from "./kanban-board";

interface DealDragOverlayProps {
  deal: Deal;
}

function formatCurrency(value: number | null): string {
  if (value === null) return "—";
  if (value >= 1000) {
    return `R$${(value / 1000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

function isOverdue(dateStr: string | null): boolean {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
}

function assigneeInitials(assigneeId: string | null): string {
  if (!assigneeId) return "??";
  return assigneeId.slice(0, 2).toUpperCase();
}

export function DealDragOverlay({ deal }: DealDragOverlayProps) {
  const stageColor = STAGE_CONFIG[deal.stage].color;

  return (
    <div
      className="rounded-lg border bg-background/90 backdrop-blur-sm p-3 w-[264px] select-none"
      style={{
        borderColor: `${stageColor}60`,
        transform: "rotate(2deg) scale(1.03)",
        boxShadow: `0 16px 40px rgba(0,0,0,0.25), 0 4px 16px ${stageColor}30`,
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-sm font-medium text-foreground leading-snug line-clamp-2">
          {deal.title}
        </span>
        <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap shrink-0">
          {formatCurrency(deal.value)}
        </span>
      </div>

      {deal.lead?.company && (
        <div className="flex items-center gap-1.5 mb-2">
          <Building2 className="w-3 h-3 text-muted-foreground shrink-0" />
          <span className="text-xs text-muted-foreground truncate">
            {deal.lead.company}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1.5">
          {deal.due_date && (
            <>
              <Calendar className="w-3 h-3 text-muted-foreground shrink-0" />
              <span
                className={`text-xs ${
                  isOverdue(deal.due_date)
                    ? "text-red-500 font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {formatDate(deal.due_date)}
              </span>
            </>
          )}
        </div>

        {deal.assignee_id && (
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
            style={{ backgroundColor: stageColor }}
          >
            {assigneeInitials(deal.assignee_id)}
          </div>
        )}
      </div>
    </div>
  );
}
