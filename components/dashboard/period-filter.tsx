"use client"

import type { Period } from "@/lib/mock-dashboard"
import { PERIOD_LABELS } from "@/lib/mock-dashboard"

interface PeriodFilterProps {
  value: Period
  onChange: (p: Period) => void
}

const PERIODS: Period[] = ["7d", "30d", "90d", "mes"]

export function PeriodFilter({ value, onChange }: PeriodFilterProps) {
  return (
    <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
      {PERIODS.map((period) => {
        const isActive = period === value
        return (
          <button
            key={period}
            onClick={() => onChange(period)}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              isActive
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {PERIOD_LABELS[period]}
          </button>
        )
      })}
    </div>
  )
}
