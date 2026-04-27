"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Mail,
  Phone,
  Building2,
  Briefcase,
  UserCircle,
  Clock,
  PhoneCall,
  MailIcon,
  CalendarDays,
  StickyNote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LeadStatusBadge } from "@/components/leads/lead-status-badge";
import { LeadForm } from "@/components/leads/lead-form";
import { MOCK_LEADS, MOCK_ACTIVITIES, MOCK_USERS } from "@/lib/mock-data";
import type { ActivityType } from "@/types";

const ACTIVITY_ICONS: Record<ActivityType, React.ElementType> = {
  ligacao: PhoneCall,
  email: MailIcon,
  reuniao: CalendarDays,
  nota: StickyNote,
};

const ACTIVITY_LABELS: Record<ActivityType, string> = {
  ligacao: "Ligação",
  email: "E-mail",
  reuniao: "Reunião",
  nota: "Nota",
};

export default function LeadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const lead = MOCK_LEADS.find((l) => l.id === params.id);

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <p className="text-muted-foreground">Lead não encontrado.</p>
        <Link href="/leads">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
        </Link>
      </div>
    );
  }

  const activities = MOCK_ACTIVITIES.filter((a) => a.lead_id === lead.id).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const assignee = lead.assignee_id ? MOCK_USERS[lead.assignee_id] : null;

  function handleDelete() {
    setDeleteOpen(false);
    router.push("/leads");
  }

  return (
    <>
      {/* ── Header ── */}
      <div className="flex items-start gap-4 mb-6">
        <Link href="/leads">
          <Button variant="ghost" size="icon" className="w-8 h-8 mt-0.5">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h2 className="text-xl font-semibold">{lead.name}</h2>
            <LeadStatusBadge status={lead.status} />
          </div>
          {lead.company && (
            <p className="text-sm text-muted-foreground">
              {lead.position ? `${lead.position} · ` : ""}
              {lead.company}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
            <Pencil className="w-3.5 h-3.5 mr-2" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive border-destructive/40 hover:bg-destructive/10"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="w-3.5 h-3.5 mr-2" />
            Excluir
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Info cards ── */}
        <div className="lg:col-span-1 space-y-4">
          {/* Contato */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Contato
            </h3>
            <div className="space-y-3">
              {lead.email ? (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <a
                    href={`mailto:${lead.email}`}
                    className="text-sm hover:text-primary transition-colors truncate"
                  >
                    {lead.email}
                  </a>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">—</span>
                </div>
              )}
              {lead.phone ? (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm">{lead.phone}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">—</span>
                </div>
              )}
            </div>
          </div>

          {/* Empresa */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Empresa
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm">{lead.company ?? "—"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm">{lead.position ?? "—"}</span>
              </div>
            </div>
          </div>

          {/* Responsável */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Responsável
            </h3>
            {assignee ? (
              <div className="flex items-center gap-2.5">
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="text-[10px] bg-indigo-700 text-white font-semibold">
                    {assignee.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{assignee.name}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <UserCircle className="w-4 h-4 text-muted-foreground/40" />
                <span className="text-sm text-muted-foreground">Não atribuído</span>
              </div>
            )}
          </div>

          {/* Datas */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Datas
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Criado em</span>
                <span className="text-xs">
                  {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Atualizado</span>
                <span className="text-xs">
                  {new Date(lead.updated_at).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Timeline de atividades ── */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">
                Atividades{" "}
                {activities.length > 0 && (
                  <span className="text-muted-foreground font-normal">
                    ({activities.length})
                  </span>
                )}
              </h3>
            </div>

            {activities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-2">
                <Clock className="w-8 h-8 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">
                  Nenhuma atividade ainda.
                </p>
                <p className="text-xs text-muted-foreground">
                  As atividades serão implementadas no M11.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {activities.map((activity, idx) => {
                  const Icon = ACTIVITY_ICONS[activity.type];
                  const isLast = idx === activities.length - 1;
                  return (
                    <div key={activity.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>
                        {!isLast && (
                          <div className="w-px flex-1 bg-border mt-1" />
                        )}
                      </div>
                      <div className={`pb-4 flex-1 min-w-0 ${isLast ? "pb-0" : ""}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium">
                            {ACTIVITY_LABELS[activity.type]}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(activity.date).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {activity.description}
                        </p>
                        {activity.author?.full_name && (
                          <p className="text-xs text-muted-foreground/60 mt-1">
                            por {activity.author.full_name}
                          </p>
                        )}
                        {!isLast && <Separator className="mt-4" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Sheet de edição ── */}
      <LeadForm
        open={editOpen}
        onOpenChange={setEditOpen}
        lead={lead}
        onSave={async () => {}}
      />

      {/* ── AlertDialog de exclusão ── */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir lead?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O lead{" "}
              <strong>{lead.name}</strong> e todas as suas atividades serão
              removidos permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
