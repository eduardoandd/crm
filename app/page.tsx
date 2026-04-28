import { NavHeader } from "@/components/marketing/nav-header"
import { HeroSection } from "@/components/marketing/hero-section"
import { StatsSection } from "@/components/marketing/stats-section"
import { FeaturesSection } from "@/components/marketing/features-section"
import { PricingSection } from "@/components/marketing/pricing-section"
import { CtaSection } from "@/components/marketing/cta-section"
import { SiteFooter } from "@/components/marketing/site-footer"

export default function HomePage() {
  return (
    <>
      <NavHeader />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <PricingSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
