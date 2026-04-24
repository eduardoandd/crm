import type { PipelineStage, LeadStatus } from "@/types";

export const PIPELINE_STAGES: { id: PipelineStage; label: string }[] = [
  { id: "novo_lead", label: "Novo Lead" },
  { id: "contato_realizado", label: "Contato Realizado" },
  { id: "proposta_enviada", label: "Proposta Enviada" },
  { id: "negociacao", label: "Negociação" },
  { id: "fechado_ganho", label: "Fechado Ganho" },
  { id: "fechado_perdido", label: "Fechado Perdido" },
];

export const LEAD_STATUSES: { id: LeadStatus; label: string; color: string }[] = [
  { id: "novo", label: "Novo", color: "slate" },
  { id: "em_contato", label: "Em Contato", color: "blue" },
  { id: "proposta", label: "Proposta", color: "amber" },
  { id: "fechado_ganho", label: "Fechado Ganho", color: "green" },
  { id: "fechado_perdido", label: "Fechado Perdido", color: "red" },
];

export const FREE_PLAN_LIMITS = {
  leads: 50,
  members: 2,
  workspaces: 1,
} as const;

export const PRO_PLAN_PRICE_BRL = 49;
