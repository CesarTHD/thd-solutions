import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/pages";
import { faq, finalCta, hero, howItWorks, leadForm, pains, projects, solutions } from "@/content/landing";
import { buildPageMetadata } from "@/lib/seo";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/layout/JsonLd";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LeadSection } from "@/components/sections/LeadSection";
import { Pains } from "@/components/sections/Pains";
import { Projects } from "@/components/sections/Projects";
import { Solutions } from "@/components/sections/Solutions";
import { SoftwareHouses } from "@/components/sections/SoftwareHouses";
import { Technologies } from "@/components/sections/Technologies";

export const metadata: Metadata = buildPageMetadata({
  title: `${siteConfig.name} | ${siteConfig.seo.title}`,
  absolute: true,
  description: siteConfig.seo.description,
  path: routes.home,
});

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.seo.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo.png`,
    areaServed: { "@type": "Country", name: "Brasil" },
    serviceType: [
      "Integração de sistemas",
      "Desenvolvimento de software sob medida",
      "Integração com ERP",
      "Desenvolvimento e integração de APIs",
      "Automação de processos empresariais",
      "Inteligência de dados",
      "Inteligência artificial aplicada",
    ],
  };

  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1">
        <Hero content={hero} />
        <Pains content={pains} />
        <Solutions content={solutions} />
        <Projects content={projects} />
        <SoftwareHouses />
        <HowItWorks content={howItWorks} />
        <Technologies />
        <LeadSection content={leadForm} />
        <Faq content={faq} />
        <FinalCta content={finalCta} />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <JsonLd data={jsonLd} />
    </>
  );
}
