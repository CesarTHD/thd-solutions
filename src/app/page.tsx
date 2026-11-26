import { siteConfig } from "@/config/site";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
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

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.seo.description,
    url: siteConfig.url,
    areaServed: { "@type": "Country", name: "Brasil" },
    serviceType: [
      "Integração de sistemas ERP",
      "Automação de processos",
      "Integração com WhatsApp",
      "Business Intelligence",
      "Inteligência artificial aplicada",
    ],
  };

  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1">
        <Hero />
        <Pains />
        <Solutions />
        <Projects />
        <SoftwareHouses />
        <HowItWorks />
        <Technologies />
        <LeadSection />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
