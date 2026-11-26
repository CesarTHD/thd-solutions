import { ArrowRight, Check } from "lucide-react";
import { hero } from "@/content/landing";
import { WhatsAppCta } from "@/components/cta/WhatsAppCta";
import { Container } from "@/components/ui/Container";
import { EcosystemVisual } from "./EcosystemVisual";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="grid-bg absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
      />
      <Container className="relative grid items-center gap-14 pt-14 pb-20 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pt-24 lg:pb-28">
        <div>
          <p className="eyebrow inline-flex items-center gap-2">
            <span className="h-px w-6 bg-electric-600" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mt-5 text-[2.35rem] leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-[3.4rem]"
          >
            {hero.title} <span className="text-electric-600">{hero.titleHighlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">{hero.subtitle}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <WhatsAppCta origin="hero" section="hero" buttonId="hero_diagnostico" className="btn btn-primary btn-lg">
              {hero.primaryCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </WhatsAppCta>
            <a href="#solucoes" className="btn btn-outline btn-lg">
              {hero.secondaryCta}
            </a>
          </div>

          <ul className="mt-8 flex flex-col gap-2.5 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {hero.assurances.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-4 text-electric-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <EcosystemVisual />
      </Container>
    </section>
  );
}
