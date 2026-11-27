import { leadFormShared } from "@/content/landing";
import type { LeadContent } from "@/content/types";
import { LeadForm } from "@/components/forms/LeadForm";
import { Container } from "@/components/ui/Container";

export function LeadSection({ content }: { content: LeadContent }) {
  return (
    <section id="diagnostico" aria-labelledby="diagnostico-title" className="section bg-paper">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:pt-4">
          <p className="eyebrow">Diagnóstico gratuito</p>
          <h2 id="diagnostico-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl sm:leading-[1.15]">
            {content.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{content.subtitle}</p>

          <div className="mt-10 hidden lg:block">
            <h3 className="text-sm font-semibold text-navy-900">O que acontece depois</h3>
            <ol className="mt-4 space-y-4">
              {leadFormShared.nextSteps.map((s, i) => (
                <li key={s} className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-slate-600">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-navy-900 font-mono text-[11px] font-semibold text-white">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <LeadForm category={content.category} needPlaceholder={content.needPlaceholder} />
      </Container>
    </section>
  );
}
