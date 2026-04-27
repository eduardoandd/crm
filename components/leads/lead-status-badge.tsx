import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LeadStatus } from "@/types";

const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; className: string }
> = {
  novo: {
    label: "Novo",
    className: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  },
  em_contato: {
    label: "Em Contato",
    className: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  },
  proposta: {
    label: "Proposta",
    className: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  fechado_ganho: {
    label: "Fechado Ganho",
    className: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  fechado_perdido: {
    label: "Fechado Perdido",
    className: "bg-red-500/15 text-red-300 border-red-500/30",
  },
};

interface LeadStatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

export function LeadStatusBadge({ status, className }: LeadStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium", config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
