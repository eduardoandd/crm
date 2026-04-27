import Link from "next/link";
import { Building2, Mail, Phone } from "lucide-react";
import { LeadStatusBadge } from "@/components/leads/lead-status-badge";
import type { Lead } from "@/types";

interface LeadCardProps {
  lead: Lead;
}

export function LeadCard({ lead }: LeadCardProps) {
  return (
    <Link
      href={`/leads/${lead.id}`}
      className="block rounded-lg border border-border bg-card p-4 hover:border-primary/40 hover:bg-card/80 transition-colors"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <p className="font-medium text-sm leading-tight">{lead.name}</p>
        <LeadStatusBadge status={lead.status} />
      </div>

      <div className="space-y-1.5">
        {lead.company && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Building2 className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{lead.company}</span>
          </div>
        )}
        {lead.email && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Mail className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{lead.email}</span>
          </div>
        )}
        {lead.phone && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Phone className="w-3 h-3 flex-shrink-0" />
            <span>{lead.phone}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
