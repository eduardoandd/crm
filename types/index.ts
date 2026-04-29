export type PipelineStage =
  | "novo_lead"
  | "contato_realizado"
  | "proposta_enviada"
  | "negociacao"
  | "fechado_ganho"
  | "fechado_perdido";

export type LeadStatus =
  | "novo"
  | "em_contato"
  | "proposta"
  | "fechado_ganho"
  | "fechado_perdido";

export type ActivityType = "ligacao" | "email" | "reuniao" | "nota";

export type WorkspacePlan = "free" | "pro";

export type WorkspaceMemberRole = "admin" | "member";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: WorkspacePlan;
  stripe_customer_id: string | null;
  onboarding_completed: boolean;
  created_at: string;
}

export interface WorkspaceMember {
  workspace_id: string;
  user_id: string;
  role: WorkspaceMemberRole;
  joined_at: string;
  user?: {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
  };
}

export interface Lead {
  id: string;
  workspace_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  position: string | null;
  status: LeadStatus;
  assignee_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Deal {
  id: string;
  workspace_id: string;
  lead_id: string;
  title: string;
  value: number | null;
  stage: PipelineStage;
  assignee_id: string | null;
  due_date: string | null;
  created_at: string;
  updated_at: string;
  lead?: Pick<Lead, "id" | "name" | "company">;
}

export interface Activity {
  id: string;
  lead_id: string;
  workspace_id: string;
  author_id: string;
  type: ActivityType;
  description: string;
  date: string;
  created_at: string;
  author?: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
}
