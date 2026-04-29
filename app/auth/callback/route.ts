import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/pipeline";

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=link_expirado", origin));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL("/login?error=link_expirado", origin));
  }

  // Reset de senha: respeita o `next` sem verificar onboarding
  if (next === "/reset-password") {
    return NextResponse.redirect(new URL("/reset-password", origin));
  }

  // Verifica se o workspace do usuário já completou o onboarding
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: membership } = await supabase
      .from("workspace_members")
      .select("workspaces(id, onboarding_completed)")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .limit(1)
      .maybeSingle();

    const workspace = (membership?.workspaces ?? null) as
      | { id: string; onboarding_completed: boolean }
      | null;

    if (workspace && !workspace.onboarding_completed) {
      return NextResponse.redirect(new URL("/onboarding", origin));
    }
  }

  return NextResponse.redirect(new URL(next, origin));
}
