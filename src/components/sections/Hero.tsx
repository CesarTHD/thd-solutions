import { ArrowRight, Check } from "lucide-react";
import type { HeroContent } from "@/content/types";
import { WhatsAppCta } from "@/components/cta/WhatsAppCta";
import { Container } from "@/components/ui/Container";
import { EcosystemVisual } from "./EcosystemVisual";

export function Hero({ content }: { content: HeroContent }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="grid-bg absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
      />
      <Container className="relative grid items-center gap-14 pt-9 pb-20 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pt-24 lg:pb-28">
        <div>
          <p className="enter eyebrow flex items-start gap-2 leading-relaxed">
            <span className="mt-[0.6em] h-px w-6 shrink-0 bg-electric-600" aria-hidden="true" />
            {content.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mt-4 text-[2.15rem] leading-[1.1] font-semibold tracking-tight sm:mt-5 sm:text-5xl sm:leading-[1.08] lg:text-[3.3rem]"
          >
            {content.title} <span className="text-electric-600">{content.titleHighlight}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">{content.subtitle}</p>

          <div className="enter mt-7 flex flex-col gap-3 [--enter-delay:120ms] sm:mt-9 sm:flex-row">
            <WhatsAppCta
              message={content.whatsappMessage}
              location="hero"
              buttonId="hero_diagnostico"
              className="btn btn-primary btn-lg"
            >
              {content.primaryCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </WhatsAppCta>
            <a href="#solucoes" className="btn btn-outline btn-lg">
              {content.secondaryCta}
            </a>
          </div>

          <ul className="enter mt-8 flex [--enter-delay:220ms] flex-col gap-2.5 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {content.assurances.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-4 text-electric-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="enter [--enter-delay:160ms]">
          <EcosystemVisual />
        </div>
      </Container>
    </section>
  );
}
