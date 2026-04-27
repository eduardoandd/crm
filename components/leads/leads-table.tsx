"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LeadStatusBadge } from "@/components/leads/lead-status-badge";
import { LeadForm } from "@/components/leads/lead-form";
import { LEAD_STATUSES, FREE_PLAN_LIMITS } from "@/lib/constants";
import { MOCK_USERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Lead, LeadStatus } from "@/types";

type SortField = "name" | "company" | "status" | "created_at";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 10;

function SortIcon({
  field,
  sortField,
  sortDir,
}: {
  field: SortField;
  sortField: SortField;
  sortDir: SortDir;
}) {
  if (field !== sortField) return <ChevronsUpDown className="w-3 h-3 ml-1 opacity-40" />;
  return sortDir === "asc"
    ? <ChevronUp className="w-3 h-3 ml-1 text-primary" />
    : <ChevronDown className="w-3 h-3 ml-1 text-primary" />;
}

interface LeadsTableProps {
  initialLeads: Lead[];
}

export function LeadsTable({ initialLeads }: LeadsTableProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);

  // Sheet de criar/editar
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  // AlertDialog de exclusão
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // ── Filtro + ordenação ────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = leads;

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          (l.company ?? "").toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      list = list.filter((l) => l.status === statusFilter);
    }

    list = [...list].sort((a, b) => {
      let av = a[sortField] ?? "";
      let bv = b[sortField] ?? "";
      if (typeof av === "string") av = av.toLowerCase();
      if (typeof bv === "string") bv = bv.toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [leads, search, statusFilter, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSort(field: SortField) {
    if (field === sortField) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(1);
  }

  // ── Ações ─────────────────────────────────────────────────────────────────
  function handleNew() {
    setEditingLead(null);
    setSheetOpen(true);
  }

  function handleEdit(lead: Lead) {
    setEditingLead(lead);
    setSheetOpen(true);
  }

  async function handleSave(data: Partial<Lead>, id?: string) {
    await new Promise((r) => setTimeout(r, 800));
    const now = new Date().toISOString();
    if (id) {
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, ...data, updated_at: now } : l))
      );
    } else {
      const newLead: Lead = {
        id: String(Date.now()),
        workspace_id: "1",
        name: data.name ?? "",
        email: data.email || null,
        phone: data.phone || null,
        company: data.company ?? null,
        position: data.position ?? null,
        status: (data.status as LeadStatus) ?? "novo",
        assignee_id: null,
        created_at: now,
        updated_at: now,
      };
      setLeads((prev) => [newLead, ...prev]);
    }
  }

  function handleDelete() {
    if (!deleteId) return;
    setLeads((prev) => prev.filter((l) => l.id !== deleteId));
    setDeleteId(null);
  }

  const atLimit = leads.length >= FREE_PLAN_LIMITS.leads;

  return (
    <>
      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou empresa…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(v) => { setStatusFilter(v as LeadStatus | "all"); setPage(1); }}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Todos os status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {LEAD_STATUSES.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={handleNew}
          disabled={atLimit}
          title={atLimit ? "Limite do plano Free atingido" : undefined}
          className="shrink-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Lead
        </Button>
      </div>

      {/* ── Tabela ── */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("name")}
              >
                <span className="flex items-center">
                  Nome <SortIcon field="name" sortField={sortField} sortDir={sortDir} />
                </span>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none hidden md:table-cell"
                onClick={() => handleSort("company")}
              >
                <span className="flex items-center">
                  Empresa <SortIcon field="company" sortField={sortField} sortDir={sortDir} />
                </span>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("status")}
              >
                <span className="flex items-center">
                  Status <SortIcon field="status" sortField={sortField} sortDir={sortDir} />
                </span>
              </TableHead>
              <TableHead className="hidden lg:table-cell">Responsável</TableHead>
              <TableHead
                className="cursor-pointer select-none hidden lg:table-cell"
                onClick={() => handleSort("created_at")}
              >
                <span className="flex items-center">
                  Criado em <SortIcon field="created_at" sortField={sortField} sortDir={sortDir} />
                </span>
              </TableHead>
              <TableHead className="w-20" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  {search || statusFilter !== "all"
                    ? "Nenhum lead encontrado com esses filtros."
                    : "Nenhum lead cadastrado ainda."}
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((lead) => {
                const user = lead.assignee_id ? MOCK_USERS[lead.assignee_id] : null;
                return (
                  <TableRow key={lead.id} className="group">
                    <TableCell>
                      <Link
                        href={`/leads/${lead.id}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {lead.name}
                      </Link>
                      {lead.position && (
                        <p className="text-xs text-muted-foreground mt-0.5 md:hidden">
                          {lead.company}
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {lead.company ?? "—"}
                    </TableCell>
                    <TableCell>
                      <LeadStatusBadge status={lead.status} />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {user ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-[10px] bg-indigo-700 text-white">
                              {user.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{user.name}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                      {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      <div className={cn(
                        "flex items-center gap-1 justify-end",
                        "opacity-0 group-hover:opacity-100 transition-opacity"
                      )}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-7 h-7"
                          onClick={() => handleEdit(lead)}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-7 h-7 text-destructive hover:text-destructive"
                          onClick={() => setDeleteId(lead.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Paginação ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            {filtered.length} lead{filtered.length !== 1 ? "s" : ""} •{" "}
            página {page} de {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ── Sheet criar/editar ── */}
      <LeadForm
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        lead={editingLead}
        onSave={handleSave}
      />

      {/* ── AlertDialog exclusão ── */}
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir lead?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O lead e todas as suas
              atividades serão removidos permanentemente.
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
