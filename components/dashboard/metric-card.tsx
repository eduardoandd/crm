import React from "react"

interface MetricCardProps {
  label: string
  value: string
  delta: number
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  index: number
}

export function MetricCard({
  label,
  value,
  delta,
  icon,
  iconBg,
  iconColor,
  index,
}: MetricCardProps) {
  const isPositive = delta >= 0

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 hover:border-border/80 transition-colors"
      style={{
        animation: "fadeSlideIn 0.35s ease-out both",
        animationDelay: `${index * 80}ms`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-9 h-9 flex items-center justify-center shrink-0"
          style={{
            backgroundColor: iconBg,
            color: iconColor,
            borderRadius: "10px",
          }}
        >
          {icon}
        </div>

        <span
          className="text-xs font-semibold"
          style={{ color: isPositive ? "#22C55E" : "#EF4444" }}
        >
          {isPositive ? "↑" : "↓"}{" "}
          {Math.abs(delta).toFixed(1).replace(".", ",")}%
        </span>
      </div>

      <p className="text-3xl font-bold text-foreground leading-none">{value}</p>
      <p className="text-sm text-muted-foreground mt-1.5">{label}</p>
    </div>
  )
}
