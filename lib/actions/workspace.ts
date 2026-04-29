"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function switchWorkspace(workspaceId: string) {
  const cookieStore = await cookies();
  cookieStore.set("active_workspace_id", workspaceId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

const onboardingSchema = z.object({
  workspaceId: z.string().uuid(),
  name: z.string().min(1, "Nome obrigatório").max(80),
  slug: z
    .string()
    .min(1, "Slug obrigatório")
    .max(60)
    .regex(/^[a-z0-9-]+$/, "Apenas letras minúsculas, números e hífens"),
});

export async function completeOnboarding(
  workspaceId: string,
  name: string,
  slug: string
): Promise<{ error: string } | never> {
  const parsed = onboardingSchema.safeParse({ workspaceId, name, slug });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  }

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("workspaces")
    .select("id")
    .eq("slug", slug)
    .neq("id", workspaceId)
    .maybeSingle();

  if (existing) {
    return { error: "Esse slug já está em uso. Escolha outro." };
  }

  const { error } = await supabase
    .from("workspaces")
    .update({ name, slug, onboarding_completed: true })
    .eq("id", workspaceId);

  if (error) {
    return { error: "Erro ao salvar. Tente novamente." };
  }

  // Garante que o cookie aponta para este workspace
  const cookieStore = await cookies();
  cookieStore.set("active_workspace_id", workspaceId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  redirect("/pipeline");
}
