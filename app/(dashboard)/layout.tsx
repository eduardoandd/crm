import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import type { Workspace } from "@/types";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Carrega workspaces do usuário com dados de membership
  const { data: memberships } = await supabase
    .from("workspace_members")
    .select(
      "role, workspaces(id, name, slug, plan, stripe_customer_id, onboarding_completed, created_at)"
    )
    .eq("user_id", user.id)
    .order("joined_at", { ascending: true });

  const workspaces: Workspace[] = (memberships ?? [])
    .map((m) => m.workspaces as unknown as Workspace | null)
    .filter((w): w is Workspace => w !== null);

  // Redireciona para onboarding se o workspace não foi configurado
  const cookieStore = await cookies();
  const activeWorkspaceId = cookieStore.get("active_workspace_id")?.value;
  const activeWorkspace =
    workspaces.find((w) => w.id === activeWorkspaceId) ?? workspaces[0];

  if (!activeWorkspace || !activeWorkspace.onboarding_completed) {
    redirect("/onboarding");
  }

  const userMeta = {
    id: user.id,
    email: user.email!,
    full_name: (user.user_metadata?.full_name as string | null) ?? null,
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        workspaces={workspaces}
        activeWorkspaceId={activeWorkspace.id}
        user={userMeta}
      />

      <div className="lg:pl-[240px] flex flex-col min-h-screen">
        <Header
          workspaces={workspaces}
          activeWorkspaceId={activeWorkspace.id}
          user={userMeta}
        />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
