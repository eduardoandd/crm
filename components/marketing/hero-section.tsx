import Link from "next/link"
import { Button } from "@/components/ui/button"

const newLeadCards = [
  { title: "ERP Totvs", value: "R$85K", company: "Totvs S.A." },
  { title: "Suite Marketing", value: "R$32K", company: "Americanas" },
  { title: "Cloud Enterprise", value: "R$120K", company: "Embraer" },
]

const proposalCards = [
  { title: "Plataforma B2B", value: "R$92K", company: "Magalu" },
  { title: "CRM Bradesco", value: "R$150K", company: "Bradesco" },
]

const wonCards = [
  { title: "SaaS Anual", value: "R$36K", company: "Localiza" },
  { title: "Expansão Rede", value: "R$112K", company: "Renner" },
  { title: "Integração", value: "R$27K", company: "Weg S.A." },
]

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="animate-[fadeSlideIn_0.5s_ease-out_both]">
          <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted-foreground mb-6">
            Pipeline visual para times de vendas
          </span>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            Feche mais{" "}
            <span className="text-primary">negócios.</span>
            <br />
            Perca menos{" "}
            <span className="text-primary">tempo.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
            Pipeline Kanban, gestão de leads e métricas de conversão — tudo num
            CRM simples que sua equipe vai realmente usar.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" asChild>
              <Link href="/signup">Criar conta grátis →</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#funcionalidades">Ver funcionalidades</Link>
            </Button>
          </div>
        </div>

        <div
          className="animate-[fadeSlideIn_0.5s_ease-out_0.15s_both]"
        >
          <div className="relative w-full max-w-lg mx-auto">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />

            <div className="relative bg-card border border-border rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs font-medium text-muted-foreground">
                  Pipeline — Agência Crescer
                </span>
              </div>

              <div className="flex gap-3 overflow-hidden">
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Novo Lead
                    <span className="ml-auto">3</span>
                  </div>
                  {newLeadCards.map((card) => (
                    <div
                      key={card.title}
                      className="bg-background border border-border rounded-lg p-2 mb-1.5 hover:border-blue-500/40 transition-colors"
                    >
                      <p className="text-[10px] font-medium text-foreground leading-tight">
                        {card.title}
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        {card.company}
                      </p>
                      <p className="text-[10px] font-semibold text-primary mt-1">
                        {card.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Proposta
                    <span className="ml-auto">2</span>
                  </div>
                  {proposalCards.map((card) => (
                    <div
                      key={card.title}
                      className="bg-background border border-border rounded-lg p-2 mb-1.5 hover:border-amber-500/40 transition-colors"
                    >
                      <p className="text-[10px] font-medium text-foreground leading-tight">
                        {card.title}
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        {card.company}
                      </p>
                      <p className="text-[10px] font-semibold text-primary mt-1">
                        {card.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Ganho
                    <span className="ml-auto">3</span>
                  </div>
                  {wonCards.map((card) => (
                    <div
                      key={card.title}
                      className="bg-background border border-border rounded-lg p-2 mb-1.5 hover:border-emerald-500/40 transition-colors"
                    >
                      <p className="text-[10px] font-medium text-foreground leading-tight">
                        {card.title}
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        {card.company}
                      </p>
                      <p className="text-[10px] font-semibold text-emerald-500 mt-1">
                        {card.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
