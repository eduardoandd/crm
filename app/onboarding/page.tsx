import { redirect } from "next/navigation";
import { Zap } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { WorkspaceSetupForm } from "@/components/onboarding/workspace-setup-form";

export const metadata = { title: "Configure seu workspace — PipeFlow" };

export default async function OnboardingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Busca o workspace criado automaticamente pelo trigger
  const { data: membership } = await supabase
    .from("workspace_members")
    .select("workspaces(id, name, slug, onboarding_completed)")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .limit(1)
    .maybeSingle();

  const workspace = (membership?.workspaces ?? null) as
    | { id: string; name: string; slug: string; onboarding_completed: boolean }
    | null;

  // Já completou o onboarding — vai direto para o app
  if (workspace?.onboarding_completed) {
    redirect("/pipeline");
  }

  if (!workspace) {
    // Trigger não criou o workspace ainda (race condition muito rara)
    redirect("/login?error=workspace_not_found");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-background">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary shadow-lg shadow-primary/30">
          <Zap className="w-4 h-4 text-white fill-white" />
        </div>
        <span className="font-semibold text-base tracking-tight">PipeFlow</span>
      </div>

      {/* Header */}
      <div className="text-center mb-10 max-w-sm">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Bem-vindo ao PipeFlow!
        </h1>
        <p className="text-sm text-muted-foreground">
          Dê um nome ao seu workspace para começar a organizar suas vendas.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-8 h-px bg-border" />
        <div className="w-2 h-2 rounded-full bg-border" />
        <div className="w-8 h-px bg-border" />
        <div className="w-2 h-2 rounded-full bg-border" />
      </div>

      <WorkspaceSetupForm
        workspaceId={workspace.id}
        defaultName={workspace.name}
        defaultSlug={workspace.slug}
      />
    </div>
  );
}
