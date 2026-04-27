import Link from "next/link";
import { Zap, TrendingUp, Users, BarChart3 } from "lucide-react";

const HERO_FEATURES = [
  { icon: TrendingUp, text: "Pipeline Kanban com drag-and-drop" },
  { icon: Users, text: "Gestão completa de leads e contatos" },
  { icon: BarChart3, text: "Métricas de vendas em tempo real" },
];

const MOCK_DEALS = [
  { stage: "Novo Lead", company: "Tech Solutions", value: "R$ 8.400", color: "bg-slate-500/30 border-slate-400/30" },
  { stage: "Proposta", company: "Agência Nova", value: "R$ 24.000", color: "bg-indigo-500/30 border-indigo-400/30" },
  { stage: "Negociação", company: "StartupX", value: "R$ 36.000", color: "bg-violet-500/30 border-violet-400/30" },
  { stage: "Fechado ✓", company: "Corp Brasil", value: "R$ 15.800", color: "bg-emerald-500/30 border-emerald-400/30" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* ── Coluna esquerda: formulário ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-10 group w-fit">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow">
              <Zap className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight">PipeFlow</span>
          </Link>

          {children}
        </div>
      </div>

      {/* ── Coluna direita: hero (só desktop) ── */}
      <div className="hidden lg:flex w-[48%] relative overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#1a1060] to-[#24243e]">
        {/* Glow de fundo */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(99,102,241,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(139,92,246,0.2),transparent_60%)]" />

        {/* Grade sutil */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between w-full p-14">
          {/* Tagline */}
          <div>
            <p className="text-xs font-medium text-indigo-300/70 uppercase tracking-widest mb-4">
              CRM para equipes de vendas
            </p>
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Feche mais negócios.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">
                Com clareza total.
              </span>
            </h2>
            <p className="text-sm text-white/50 leading-relaxed">
              Visualize seu pipeline, acompanhe leads e tome decisões com
              dados — tudo em um só lugar.
            </p>
          </div>

          {/* Mini pipeline preview */}
          <div className="my-10 space-y-2.5">
            <p className="text-[11px] text-white/30 uppercase tracking-wider mb-4">
              Pipeline ao vivo
            </p>
            {MOCK_DEALS.map((deal) => (
              <div
                key={deal.company}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border backdrop-blur-sm ${deal.color}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-white/90">{deal.company}</p>
                    <p className="text-[11px] text-white/40">{deal.stage}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-white/70">{deal.value}</span>
              </div>
            ))}
          </div>

          {/* Features */}
          <ul className="space-y-3">
            {HERO_FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-indigo-300" />
                </div>
                <span className="text-sm text-white/60">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
