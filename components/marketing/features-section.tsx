import { Kanban, Users, BarChart2, Building2, UserPlus, Zap, type LucideIcon } from "lucide-react"

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  color: string
}

const features: Feature[] = [
  {
    icon: Kanban,
    title: "Pipeline Kanban",
    description:
      "Arraste deals entre etapas com drag-and-drop. Veja o funil inteiro num relance.",
    color: "#3B82F6",
  },
  {
    icon: Users,
    title: "Gestão de Leads",
    description:
      "Cadastre, filtre e acompanhe cada lead com histórico completo de atividades.",
    color: "#06B6D4",
  },
  {
    icon: BarChart2,
    title: "Dashboard de Métricas",
    description:
      "Taxa de conversão, valor do pipeline e deals próximos do prazo — em tempo real.",
    color: "#F59E0B",
  },
  {
    icon: Building2,
    title: "Multi-workspace",
    description:
      "Gerencie clientes e empresas separados com isolamento total de dados.",
    color: "#F97316",
  },
  {
    icon: UserPlus,
    title: "Convite de Time",
    description:
      "Adicione colaboradores por e-mail. Controle de papéis Admin e Membro.",
    color: "#A855F7",
  },
  {
    icon: Zap,
    title: "Rápido por design",
    description:
      "Interface otimizada para quem precisa de agilidade. Zero curva de aprendizado.",
    color: "#22C55E",
  },
]

export function FeaturesSection() {
  return (
    <section id="funcionalidades" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tudo que seu time de vendas precisa
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Do primeiro contato ao fechamento — sem planilha, sem caos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
                style={{
                  animationDelay: `${index * 0.08}s`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${feature.color}20`,
                    color: feature.color,
                  }}
                >
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-semibold mt-4 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
