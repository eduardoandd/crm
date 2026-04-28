import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start gap-8">
          <div>
            <Link href="/" className="text-lg font-bold tracking-tight">
              Pipe<span className="text-primary">Flow</span>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 text-center md:text-left">
            <div>
              <p className="text-sm font-medium text-foreground mb-3">
                Produto
              </p>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#funcionalidades"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link
                    href="#precos"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Preços
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground mb-3">
                Empresa
              </p>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 PipeFlow. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
