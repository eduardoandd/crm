"use client"

import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { PipelineStage } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { STAGE_CONFIG } from "./kanban-board"
import { MOCK_LEADS, MOCK_ASSIGNEES } from "./pipeline-mock-data"

export interface NewDeal {
  id: string
  title: string
  value: number | null
  lead_id: string
  stage: PipelineStage
  assignee_id: string | null
  due_date: string | null
  workspace_id: string
  created_at: string
  updated_at: string
}

interface DealFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultStage?: PipelineStage
  onSubmit: (deal: NewDeal) => void
}

const STAGE_ORDER: PipelineStage[] = [
  "novo_lead",
  "contato_realizado",
  "proposta_enviada",
  "negociacao",
  "fechado_ganho",
  "fechado_perdido",
]

const schema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  value: z
    .string()
    .optional()
    .nullable()
    .transform((v) => {
      if (v === "" || v === null || v === undefined) return null
      const n = Number(v)
      return Number.isNaN(n) ? null : n
    }),
  lead_id: z.string().min(1, "Selecione um lead"),
  assignee_id: z.string().optional().nullable(),
  due_date: z.string().optional().nullable(),
  stage: z.enum([
    "novo_lead",
    "contato_realizado",
    "proposta_enviada",
    "negociacao",
    "fechado_ganho",
    "fechado_perdido",
  ]),
})

type FormInput = z.input<typeof schema>
type FormOutput = z.output<typeof schema>

export function DealFormDialog({
  open,
  onOpenChange,
  defaultStage = "novo_lead",
  onSubmit,
}: DealFormDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      value: "",
      lead_id: "",
      assignee_id: null,
      due_date: null,
      stage: defaultStage,
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        title: "",
        value: "",
        lead_id: "",
        assignee_id: null,
        due_date: null,
        stage: defaultStage,
      })
    }
  }, [open, defaultStage, reset])

  function onFormSubmit(values: FormOutput) {
    const now = new Date().toISOString()
    const deal: NewDeal = {
      id: crypto.randomUUID(),
      title: values.title,
      value: values.value ?? null,
      lead_id: values.lead_id,
      stage: values.stage,
      assignee_id: values.assignee_id ?? null,
      due_date: values.due_date ?? null,
      workspace_id: "ws-1",
      created_at: now,
      updated_at: now,
    }
    onSubmit(deal)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[480px] p-0 gap-0">
        <DialogHeader className="px-5 pt-5 pb-4">
          <DialogTitle className="text-base font-semibold">
            Novo Negócio
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
          <div className="px-5 py-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title" className="text-xs text-muted-foreground">
                Título
              </Label>
              <Input
                id="title"
                placeholder="Ex: Proposta ERP Totvs"
                className="h-9 text-sm"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-xs text-red-500">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="value"
                  className="text-xs text-muted-foreground"
                >
                  Valor
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground select-none">
                    R$
                  </span>
                  <Input
                    id="value"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="0"
                    className="h-9 text-sm pl-8"
                    {...register("value")}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="due_date"
                  className="text-xs text-muted-foreground"
                >
                  Prazo
                </Label>
                <Input
                  id="due_date"
                  type="date"
                  className="h-9 text-sm"
                  {...register("due_date")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">Lead</Label>
              <Controller
                name="lead_id"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Selecione um lead" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_LEADS.map((lead) => (
                        <SelectItem key={lead.id} value={lead.id}>
                          {lead.name}
                          <span className="ml-1.5 text-muted-foreground">
                            · {lead.company}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.lead_id && (
                <span className="text-xs text-red-500">
                  {errors.lead_id.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">
                Responsável
              </Label>
              <Controller
                name="assignee_id"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={(v) =>
                      field.onChange(v === "__none__" ? null : v)
                    }
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Sem responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">
                        Sem responsável
                      </SelectItem>
                      {MOCK_ASSIGNEES.map((assignee) => (
                        <SelectItem key={assignee.id} value={assignee.id}>
                          <span className="inline-flex items-center gap-2">
                            <span
                              className="inline-flex w-5 h-5 rounded-full items-center justify-center text-[9px] font-bold text-white bg-indigo-500 shrink-0"
                            >
                              {assignee.initials}
                            </span>
                            {assignee.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">Etapa</Label>
              <Controller
                name="stage"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STAGE_ORDER.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          <span className="flex items-center gap-2">
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{
                                backgroundColor: STAGE_CONFIG[stage].color,
                              }}
                            />
                            {STAGE_CONFIG[stage].label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <Separator />

          <DialogFooter className="px-5 py-4 gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" size="sm">
              Criar Negócio
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
