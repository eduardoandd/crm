"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function NavHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-background/80 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Pipe<span className="text-primary">Flow</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#funcionalidades"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Funcionalidades
          </Link>
          <Link
            href="#precos"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Preços
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Começar grátis →</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
