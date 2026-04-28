import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full -z-10" />
          <h2 className="text-3xl md:text-4xl font-bold">
            Pronto para organizar
            <br />
            suas vendas?
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Crie sua conta em menos de 1 minuto. Sem cartão de crédito.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Criar conta grátis →</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Já tenho conta</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
