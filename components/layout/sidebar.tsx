"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Kanban,
  Users,
  LayoutDashboard,
  Settings,
  ChevronsUpDown,
  Check,
  Plus,
  LogOut,
  Zap,
  Menu,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { Workspace } from "@/types";

// ─── Mock data (substituído pelo Supabase no M8) ────────────────────────────

const MOCK_WORKSPACES: Workspace[] = [
  {
    id: "1",
    name: "Agência Crescer",
    slug: "agencia-crescer",
    plan: "pro",
    stripe_customer_id: null,
    created_at: "",
  },
  {
    id: "2",
    name: "StartupX",
    slug: "startupx",
    plan: "free",
    stripe_customer_id: null,
    created_at: "",
  },
  {
    id: "3",
    name: "Freelancer DS",
    slug: "freelancer-ds",
    plan: "free",
    stripe_customer_id: null,
    created_at: "",
  },
];

const MOCK_USER = {
  name: "Eduardo Santos",
  email: "eduardo@credify.com.br",
  initials: "ES",
};

// ─── Nav items ───────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { href: "/pipeline", label: "Pipeline", icon: Kanban },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/settings", label: "Configurações", icon: Settings },
] as const;

// ─── Workspace avatar helper ─────────────────────────────────────────────────

function WorkspaceAvatar({
  name,
  size = "sm",
}: {
  name: string;
  size?: "sm" | "md";
}) {
  const colors = [
    "bg-indigo-600",
    "bg-violet-600",
    "bg-blue-600",
    "bg-emerald-600",
    "bg-amber-600",
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;
  const sizeClass = size === "sm" ? "w-5 h-5 text-[10px]" : "w-6 h-6 text-xs";
  return (
    <div
      className={cn(
        "rounded flex items-center justify-center font-bold text-white flex-shrink-0",
        colors[colorIndex],
        sizeClass
      )}
    >
      {name[0]}
    </div>
  );
}

// ─── Sidebar content compartilhado ──────────────────────────────────────────

function SidebarContent({ onNavClick }: { onNavClick?: () => void }) {
  const pathname = usePathname();
  const [activeWorkspace, setActiveWorkspace] = useState(MOCK_WORKSPACES[0]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const usedLeads = 32;
  const maxLeads = 50;
  const usagePercent = Math.round((usedLeads / maxLeads) * 100);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ── Logo ── */}
      <div className="flex items-center gap-2.5 px-4 h-14 flex-shrink-0">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary shadow-lg shadow-primary/30">
          <Zap className="w-3.5 h-3.5 text-white fill-white" />
        </div>
        <span className="font-semibold text-sm tracking-tight">PipeFlow</span>
      </div>

      <Separator className="flex-shrink-0" />

      {/* ── Workspace Switcher ── */}
      <div className="px-3 py-2 flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between h-9 px-2 text-left font-normal hover:bg-accent/60 group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <WorkspaceAvatar name={activeWorkspace.name} />
                <span className="truncate text-sm font-medium">
                  {activeWorkspace.name}
                </span>
                {activeWorkspace.plan === "pro" && (
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-4 border-indigo-500/40 text-indigo-400 bg-indigo-500/10 flex-shrink-0"
                  >
                    Pro
                  </Badge>
                )}
              </div>
              <ChevronsUpDown className="w-3.5 h-3.5 text-muted-foreground/60 flex-shrink-0 ml-1 group-hover:text-muted-foreground transition-colors" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-60" align="start" sideOffset={4}>
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal pb-1">
              Seus workspaces
            </DropdownMenuLabel>

            {MOCK_WORKSPACES.map((ws) => (
              <DropdownMenuItem
                key={ws.id}
                onClick={() => setActiveWorkspace(ws)}
                className="flex items-center gap-2.5 cursor-pointer py-2"
              >
                <WorkspaceAvatar name={ws.name} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{ws.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    Plano {ws.plan === "pro" ? "Pro" : "Gratuito"}
                  </p>
                </div>
                {ws.id === activeWorkspace.id && (
                  <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                )}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2 cursor-pointer text-muted-foreground hover:text-foreground">
              <Plus className="w-3.5 h-3.5" />
              <span className="text-sm">Novo workspace</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator className="flex-shrink-0" />

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onNavClick}
            className={cn(
              "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-all duration-150",
              isActive(href)
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            <Icon
              className={cn(
                "w-4 h-4 flex-shrink-0 transition-colors",
                isActive(href) ? "text-primary" : "text-muted-foreground/70"
              )}
            />
            {label}
            {isActive(href) && (
              <ChevronRight className="w-3 h-3 ml-auto text-primary/50" />
            )}
          </Link>
        ))}
      </nav>

      <Separator className="flex-shrink-0" />

      {/* ── Bottom section ── */}
      <div className="px-3 py-3 space-y-2 flex-shrink-0">
        {/* Usage bar — só no plano free */}
        {activeWorkspace.plan === "free" && (
          <div className="px-2.5 py-2.5 rounded-lg bg-card border border-border/80">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium">Leads usados</p>
              <span className="text-xs text-muted-foreground">
                {usedLeads}/{maxLeads}
              </span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  usagePercent >= 80 ? "bg-amber-500" : "bg-primary"
                )}
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            <Button
              size="sm"
              className="w-full mt-2.5 h-7 text-xs font-medium shadow-sm shadow-primary/20"
            >
              Fazer upgrade — R$49/mês
            </Button>
          </div>
        )}

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2.5 px-2 h-9 font-normal hover:bg-accent/60 group"
            >
              <Avatar className="w-6 h-6 flex-shrink-0">
                <AvatarFallback className="text-[10px] bg-indigo-700 text-white font-semibold">
                  {MOCK_USER.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start min-w-0 flex-1">
                <span className="text-xs font-medium truncate leading-tight">
                  {MOCK_USER.name}
                </span>
              </div>
              <ChevronsUpDown className="w-3 h-3 text-muted-foreground/60 flex-shrink-0 group-hover:text-muted-foreground transition-colors" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="start" side="top" sideOffset={4}>
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center gap-2.5">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs bg-indigo-700 text-white font-semibold">
                    {MOCK_USER.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{MOCK_USER.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {MOCK_USER.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive cursor-pointer">
              <LogOut className="w-3.5 h-3.5" />
              Sair da conta
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// ─── Desktop Sidebar ─────────────────────────────────────────────────────────

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-[240px] border-r border-border/60 bg-card h-screen fixed left-0 top-0 z-30">
      <SidebarContent />
    </aside>
  );
}

// ─── Mobile Nav (Sheet) ──────────────────────────────────────────────────────

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden w-8 h-8 text-muted-foreground hover:text-foreground"
        >
          <Menu className="w-5 h-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] p-0 bg-card border-r border-border/60">
        <SidebarContent onNavClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
