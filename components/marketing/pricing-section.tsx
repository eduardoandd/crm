import Link from "next/link"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PlanFeature {
  text: string
  included: boolean
}

const freeFeatures: PlanFeature[] = [
  { text: "Até 50 leads", included: true },
  { text: "Até 2 membros no time", included: true },
  { text: "1 workspace", included: true },
  { text: "Pipeline Kanban visual", included: true },
  { text: "Dashboard de métricas", included: true },
  { text: "Suporte prioritário", included: false },
  { text: "Workspaces ilimitados", included: false },
]

const proFeatures: PlanFeature[] = [
  { text: "Leads ilimitados", included: true },
  { text: "Membros ilimitados", included: true },
  { text: "Workspaces ilimitados", included: true },
  { text: "Pipeline Kanban visual", included: true },
  { text: "Dashboard de métricas", included: true },
  { text: "Suporte prioritário", included: true },
]

function FeatureItem({ feature }: { feature: PlanFeature }) {
  return (
    <li className="flex items-center gap-3 text-sm">
      {feature.included ? (
        <Check size={15} className="text-primary shrink-0" />
      ) : (
        <X size={15} className="text-muted-foreground/40 shrink-0" />
      )}
      <span className={feature.included ? "text-foreground" : "text-muted-foreground/40"}>
        {feature.text}
      </span>
    </li>
  )
}

export function PricingSection() {
  return (
    <section id="precos" className="py-24 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simples e transparente
          </h2>
          <p className="text-muted-foreground text-lg">
            Comece grátis. Faça upgrade quando precisar crescer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col">
            <div className="mb-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Grátis
              </p>
              <h3 className="text-lg font-semibold mb-1">
                Para quem está começando
              </h3>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-4xl font-bold">R$0</span>
                <span className="text-sm text-muted-foreground">/ sempre grátis</span>
              </div>
            </div>

            <ul className="space-y-3 flex-1 mb-8">
              {freeFeatures.map((feature) => (
                <FeatureItem key={feature.text} feature={feature} />
              ))}
            </ul>

            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup">Criar conta grátis</Link>
            </Button>
          </div>

          <div className="bg-primary/5 border border-primary/50 rounded-2xl p-8 flex flex-col relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                Mais popular
              </span>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Pro
              </p>
              <h3 className="text-lg font-semibold mb-1">
                Para times em crescimento
              </h3>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-4xl font-bold">R$49</span>
                <span className="text-sm text-muted-foreground">
                  / mês por workspace
                </span>
              </div>
            </div>

            <ul className="space-y-3 flex-1 mb-8">
              {proFeatures.map((feature) => (
                <FeatureItem key={feature.text} feature={feature} />
              ))}
            </ul>

            <Button className="w-full" asChild>
              <Link href="/signup">Começar com Pro →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
