import { Phone, Mail, Calendar, FileText } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { MOCK_ACTIVITIES } from "@/lib/mock-dashboard"

type Activity = (typeof MOCK_ACTIVITIES)[number]

interface ActivityIconConfig {
  icon: LucideIcon
  color: string
  bg: string
}

const ACTIVITY_ICONS: Record<string, ActivityIconConfig> = {
  ligacao: { icon: Phone, color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
  email: { icon: Mail, color: "#06B6D4", bg: "rgba(6,182,212,0.12)" },
  reuniao: { icon: Calendar, color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  nota: { icon: FileText, color: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
}

function relativeTime(minutesAgo: number): string {
  if (minutesAgo < 60) return `há ${minutesAgo} min`
  if (minutesAgo < 1440) return `há ${Math.floor(minutesAgo / 60)}h`
  const days = Math.floor(minutesAgo / 1440)
  return `há ${days} dia${days > 1 ? "s" : ""}`
}

interface RecentActivityProps {
  activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <p className="text-sm font-semibold text-foreground mb-4">
        Atividade Recente
      </p>

      <div className="flex flex-col">
        {activities.map((activity, idx) => {
          const config = ACTIVITY_ICONS[activity.type]
          const Icon = config?.icon ?? FileText
          const isLast = idx === activities.length - 1

          return (
            <div key={activity.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: config?.bg ?? "rgba(107,114,128,0.12)",
                    color: config?.color ?? "#6B7280",
                  }}
                >
                  <Icon size={14} />
                </div>
                {!isLast && (
                  <div className="w-px flex-1 bg-border mt-1 mb-1" />
                )}
              </div>

              <div className={`pb-4 min-w-0 flex-1 ${isLast ? "" : ""}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-foreground truncate">
                    {activity.author}
                    <span className="text-muted-foreground font-normal">
                      {" "}
                      · {activity.company}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {relativeTime(activity.minutesAgo)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                  {activity.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
