import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { ServicePageContent } from "@/content/service-pages";
import { buildPageMetadata } from "@/lib/seo";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LeadSection } from "@/components/sections/LeadSection";
import { Pains } from "@/components/sections/Pains";
import { Projects } from "@/components/sections/Projects";
import { Solutions } from "@/components/sections/Solutions";
import { Technologies } from "@/components/sections/Technologies";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { JsonLd } from "./JsonLd";

export function servicePageMetadata(page: ServicePageContent): Metadata {
  return buildPageMetadata({ ...page.metadata, path: page.path });
}

/**
 * Página de destino de anúncios: mesma estrutura visual da página inicial,
 * com conteúdo focado em uma intenção de pesquisa.
 */
export function ServiceLandingPage({ page }: { page: ServicePageContent }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.serviceName,
    description: page.metadata.description,
    url: `${siteConfig.url}${page.path}`,
    areaServed: { "@type": "Country", name: "Brasil" },
    provider: { "@type": "ProfessionalService", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1">
        <Hero content={page.hero} />
        <Pains content={page.pains} />
        <Solutions content={page.solutions} />
        <Projects content={page.projects} />
        <HowItWorks content={page.process} />
        <Technologies />
        <LeadSection content={page.lead} />
        <Faq content={page.faq} />
        <FinalCta content={page.finalCta} />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <JsonLd data={jsonLd} />
    </>
  );
}
