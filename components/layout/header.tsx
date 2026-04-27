"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MobileNav } from "@/components/layout/sidebar";

const PAGE_LABELS: Record<string, string> = {
  "/pipeline": "Pipeline",
  "/leads": "Leads",
  "/dashboard": "Dashboard",
  "/settings": "Configurações",
};

export function Header() {
  const pathname = usePathname();

  const pageLabel =
    Object.entries(PAGE_LABELS).find(
      ([href]) => pathname === href || pathname.startsWith(href + "/")
    )?.[1] ?? "PipeFlow";

  return (
    <header className="h-14 border-b border-border/60 flex items-center gap-3 px-4 lg:px-5 sticky top-0 bg-background/80 backdrop-blur-md z-20">
      {/* Mobile hamburger */}
      <MobileNav />

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold truncate">{pageLabel}</h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-muted-foreground hover:text-foreground relative"
        >
          <Bell className="w-4 h-4" />
          {/* Badge de notificação — placeholder */}
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="sr-only">Notificações</span>
        </Button>

        <Avatar className="w-7 h-7 cursor-pointer">
          <AvatarFallback className="text-[10px] bg-indigo-700 text-white font-semibold">
            ES
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
