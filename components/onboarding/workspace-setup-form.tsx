"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, AlertCircle } from "lucide-react";
import { completeOnboarding } from "@/lib/actions/workspace";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatório").max(80),
  slug: z
    .string()
    .min(1, "Slug obrigatório")
    .max(60)
    .regex(/^[a-z0-9-]+$/, "Apenas letras minúsculas, números e hífens"),
});

type FormData = z.infer<typeof schema>;

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface WorkspaceSetupFormProps {
  workspaceId: string;
  defaultName: string;
  defaultSlug: string;
}

export function WorkspaceSetupForm({
  workspaceId,
  defaultName,
  defaultSlug,
}: WorkspaceSetupFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: defaultName, slug: defaultSlug },
  });

  function handleNameChange(value: string) {
    form.setValue("name", value);
    // Atualiza o slug automaticamente apenas se o usuário não o editou ainda
    if (!form.formState.dirtyFields.slug) {
      form.setValue("slug", toSlug(value));
    }
  }

  function onSubmit(data: FormData) {
    setServerError(null);
    startTransition(async () => {
      const result = await completeOnboarding(workspaceId, data.name, data.slug);
      if (result?.error) {
        setServerError(result.error);
      }
    });
  }

  return (
    <div className="w-full max-w-md">
      {serverError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do workspace</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Agência Crescer"
                    disabled={isPending}
                    {...field}
                    onChange={(e) => handleNameChange(e.target.value)}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  O nome que aparece na sidebar e nos convites.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug (URL)</FormLabel>
                <FormControl>
                  <div className="flex items-center rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <span className="px-3 text-sm text-muted-foreground border-r border-input bg-muted/50 h-9 flex items-center rounded-l-md select-none">
                      pipeflow.com/
                    </span>
                    <Input
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-l-none"
                      placeholder="agencia-crescer"
                      disabled={isPending}
                      {...field}
                      onChange={(e) => {
                        form.setValue("slug", toSlug(e.target.value), {
                          shouldDirty: true,
                        });
                      }}
                    />
                  </div>
                </FormControl>
                <FormDescription className="text-xs">
                  Identificador único. Pode ser alterado depois nas configurações.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Configurando…
              </>
            ) : (
              "Entrar no PipeFlow →"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
