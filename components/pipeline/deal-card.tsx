"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Building2, Calendar } from "lucide-react";
import type { Deal } from "@/types";
import { STAGE_CONFIG } from "./kanban-board";

interface DealCardProps {
  deal: Deal;
  onClick?: () => void;
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

export function DealCard({ deal, onClick }: DealCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id });

  const stageColor = STAGE_CONFIG[deal.stage].color;

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group relative rounded-lg border border-border bg-background/60 backdrop-blur-sm p-3 cursor-grab active:cursor-grabbing select-none transition-all duration-200 hover:-translate-y-0.5"
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = `${stageColor}40`;
        el.style.boxShadow = `0 4px 12px ${stageColor}1a`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "";
        el.style.boxShadow = "";
      }}
      onPointerUp={() => {
        if (!isDragging) {
          onClick?.();
        }
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
            title={deal.assignee_id}
          >
            {assigneeInitials(deal.assignee_id)}
          </div>
        )}
      </div>
    </div>
  );
}
