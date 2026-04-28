const stats = [
  { value: "+47%", label: "Conversão" },
  { value: "3.2x", label: "Leads qualif." },
  { value: "-62%", label: "Ciclo de venda" },
  { value: "1.200+", label: "Times usando" },
]

export function StatsSection() {
  return (
    <section className="py-16 px-4 bg-card/50">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={[
                "text-center py-8 px-4 border-border",
                index % 2 === 0 ? "border-r" : "",
                index < 2 ? "border-b md:border-b-0" : "",
                index < 3 ? "md:border-r" : "md:border-r-0",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <p className="text-4xl md:text-5xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
